import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic"; // Import dynamic from Next.js
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Dynamically import the MapContainer to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

// Custom Helmet Icon
const helmetIcon = new L.Icon({
  iconUrl: "https://storage.googleapis.com/tagjs-prod.appspot.com/GqbXjbiBh1/127rle68.png", // Use an actual helmet image
  iconSize: [65, 65],
  iconAnchor: [17, 35],
  popupAnchor: [0, -30],
});

// Glowing Helmet Icon
const glowingHelmetIcon = new L.Icon({
  iconUrl: "https://path-to-your-glowing-helmet-image.png", // Replace with the glowing helmet image URL
  iconSize: [65, 65],
  iconAnchor: [17, 35],
  popupAnchor: [0, -30],
});

const HelmetMap = ({ latitude, longitude, onHelmetClick, sensorData, shouldGlow }) => {
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
      <Marker 
        position={[latitude, longitude]} 
        icon={L.divIcon({
          className: shouldGlow ? 'glow' : '', // Apply glow class conditionally
          html: `<img src="${helmetIcon.options.iconUrl}" style="width: 65px; height: 65px;" />`,
          iconSize: [65, 65],
        })} 
        eventHandlers={{
          click: () => {
            onHelmetClick(sensorData); // Pass the sensor data to the callback
          },
        }}>
        <Popup>Helmet Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default HelmetMap;
