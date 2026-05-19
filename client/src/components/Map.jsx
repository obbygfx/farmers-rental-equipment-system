import { GoogleMap, useJsApiLoader, Polygon, Marker } from '@react-google-maps/api';
import { useState, useCallback, useRef } from 'react';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: -6.7924,
  lng: 39.2083
};

const Map = ({ onAreaCalculated, markers = [] }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['geometry', 'drawing']
  });

  const [path, setPath] = useState([]);
  const polygonRef = useRef(null);

  const onMapClick = useCallback((e) => {
    setPath(current => [...current, { lat: e.latLng.lat(), lng: e.latLng.lng() }]);
  }, []);

  const calculateArea = useCallback(() => {
    if (path.length > 2 && window.google) {
      const areaInSquareMeters = window.google.maps.geometry.spherical.computeArea(
        path.map(p => new window.google.maps.LatLng(p.lat, p.lng))
      );
      const hectares = areaInSquareMeters / 10000;
      onAreaCalculated(hectares.toFixed(2));
    }
  }, [path, onAreaCalculated]);

  const clearPath = () => {
    setPath([]);
    onAreaCalculated(0);
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="space-y-4">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onClick={onMapClick}
      >
        {path.length > 0 && (
          <Polygon
            ref={polygonRef}
            path={path}
            options={{
              fillColor: "#10b981",
              fillOpacity: 0.3,
              strokeColor: "#059669",
              strokeWeight: 2,
            }}
          />
        )}

        {markers.map((m, i) => (
          <Marker key={i} position={{ lat: m.latitude, lng: m.longitude }} />
        ))}
      </GoogleMap>

      <div className="flex space-x-4">
        <button
          onClick={calculateArea}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-bold"
        >
          Calculate Hectares
        </button>
        <button
          onClick={clearPath}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Map;
