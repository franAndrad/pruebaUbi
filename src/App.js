// import React, { Component } from 'react';
// import { MapContainer, TileLayer } from 'react-leaflet';
// import './App.css';
// 
// // Marcador
// import { Marker, Popup, Tooltip } from 'react-leaflet';
// 
// let position;
// let zoomMap;
// 
// class App extends Component {
// 
// constructor() {
//     
//    super();
// 
//    this.state = {
//      lat: 29.0667,
//      lng: -110.9667,
//      zoom: 11,
//    };
//  }
// 
// 
// 
// render() {
//    const { lat, lng, zoom } = this.state;
//    position = [lat, lng];
//    zoomMap = zoom;
//    
//     return (
// //Sin marcador
// //     <MapContainer center={position} zoom={zoomMap} id="mapid" ref={e => { this.mapInstance = e }}>
// //       <TileLayer
// //         attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
// //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //       />
// //     </MapContainer>
// 
//         
// 
// <MapContainer center={position} zoom={zoomMap} id="mapid" ref={e => { this.mapInstance = e }}>
//        <TileLayer
//          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
//          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//        />
//        <Marker position={position} >
//           </Marker>
//      </MapContainer>
//    );
//  }
// }
// 
// export default App;

import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import './App.css';

// Marcador
import { Marker } from 'react-leaflet';

const App = () => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [zoom, setZoom] = useState(11);

  const mapRef = useRef(null);
  const position = [lat, lng];

  const miubi = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        (error) => {
          console.error('Error obtaining geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    miubi();
  }, []);

  return (
    <div>
      {lat !== 0 ? (
        <MapContainer center={position} zoom={zoom} id="mapid" ref={mapRef}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {lat && lng && <Marker position={position} />}
        </MapContainer>
      ) : (
        ''
      )}
    </div>
  );
};

export default App;

