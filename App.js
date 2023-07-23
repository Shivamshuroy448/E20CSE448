import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [urls, setUrls] = useState('');
    const [numbers, setNumbers] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const urlArray = urls.split(',').map(url => url.trim());
        const params = new URLSearchParams();
        urlArray.forEach(url => params.append('url', url));
        try {
            const response = await axios.get(`http://localhost:8008/numbers?${params.toString()}`);
            setNumbers(response.data.numbers);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    URLs:
                    <input type="text" value={urls} onChange={event => setUrls(event.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <ul>
                {numbers.map(number => <li key={number}>{number}</li>)}
            </ul>
        </div>
    );
}

export default App;
