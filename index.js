const express = require('express');
const app = express();
const axios = require('axios');
const port = 8008;

app.get('/numbers', async (req, res) => {
    const urls = req.query.url;
    let numbers = [];
    if (urls) {
        const promises = urls.map(url => axios.get(url, { timeout: 500 }));
        const responses = await Promise.allSettled(promises);
        responses.forEach(response => {
            if (response.status === 'fulfilled') {
                numbers.push(...response.value.data.numbers);
            }
        });
    }
    numbers = [...new Set(numbers)].sort((a, b) => a - b);
    res.json({ numbers });
});

app.listen(port, () => console.log(`Number management service listening on port ${port}!`));
