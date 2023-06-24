import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleConvertClick = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setLat(lat);
        setLng(lon);
      } else {
        console.error('No se encontraron resultados para la dirección proporcionada.');
      }
    } catch (error) {
      console.error('Error al convertir la dirección en coordenadas:', error);
    }
  };

  return (
    <div>
      <input type="text" value={address} onChange={handleAddressChange} placeholder="Dirección" />
      <button onClick={handleConvertClick}>Convertir</button>

      {lat && lng && (
        <div>
          <p>Latitud: {lat}</p>
          <p>Longitud: {lng}</p>
        </div>
      )}
    </div>
  );
};

export default App;

