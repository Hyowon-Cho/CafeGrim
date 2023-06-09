import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        const response = await axios.get(`/cafes?lat=${position.coords.latitude}&lng=${position.coords.longitude}`);
        setCafes(response.data);
      }, error => {
        console.error(error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <div>
      <h1>Recommend my nearby cafe</h1>
      <ul>
        {cafes.map(cafe => (
          <li key={cafe.name}>
            <h2>{cafe.name}</h2>
            <p>Score: {cafe.rating}</p>
            <p>Address: {cafe.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
