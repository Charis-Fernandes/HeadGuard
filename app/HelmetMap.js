import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom Helmet Icon
const helmetIcon = new L.Icon({
  iconUrl: "https://storage.googleapis.com/tagjs-prod.appspot.com/GqbXjbiBh1/127rle68.png", // Use an actual helmet image
  iconSize: [65, 65],
  iconAnchor: [17, 35],
  popupAnchor: [0, -30],
});

const HelmetMap = ({ latitude, longitude, onHelmetClick }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This will run only on the client
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <MapContainer center={[latitude, longitude]} zoom={15} style={{ height: "650px", width: "70%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <Marker position={[latitude, longitude]} icon={helmetIcon} eventHandlers={{
        click: () => {
          onHelmetClick("Sensor data will be displayed here."); // Call the callback with placeholder data
        },
      }}>
        <Popup>Helmet Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default HelmetMap;
