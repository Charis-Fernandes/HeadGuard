import { useEffect, useState } from 'react';

export default function TestWebSocket() {
  const [status, setStatus] = useState('Connecting...');
  const [latestData, setLatestData] = useState({
    gps: { lat: null, lon: null },
    accel: { x: null, y: null, z: null },
    heartRate: null,
    spO2: null
  });

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      setStatus('Connected to WebSocket server');
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const data = event.data;
      console.log('Received:', data);

      // Parse the incoming data
      if (data.includes('GPS:')) {
        const gpsMatch = data.match(/GPS: ([\d.]+), ([\d.]+)/);
        if (gpsMatch) {
          setLatestData(prev => ({
            ...prev,
            gps: { lat: gpsMatch[1], lon: gpsMatch[2] }
          }));
        }
      } else if (data.includes('Accel:')) {
        const accelMatch = data.match(/Accel: X=([-\d.]+) Y=([-\d.]+) Z=([-\d.]+)/);
        if (accelMatch) {
          setLatestData(prev => ({
            ...prev,
            accel: { x: accelMatch[1], y: accelMatch[2], z: accelMatch[3] }
          }));
        }
      } else if (data.includes('Heart Rate:')) {
        const hrMatch = data.match(/Heart Rate: ([\d.]+) bpm/);
        if (hrMatch) {
          setLatestData(prev => ({
            ...prev,
            heartRate: hrMatch[1]
          }));
        }
      } else if (data.includes('SpO2:')) {
        const spO2Match = data.match(/SpO2: ([\d.]+) %/);
        if (spO2Match) {
          setLatestData(prev => ({
            ...prev,
            spO2: spO2Match[1]
          }));
        }
      }
    };

    ws.onerror = (error) => {
      setStatus('Error connecting to WebSocket server');
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      setStatus('Disconnected from WebSocket server');
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Real-time Sensor Data</h1>
      
      {/* Connection Status */}
      <div className="mb-6">
        <p className="font-semibold">
          Status: <span className={status.includes('Connected') ? 'text-green-600' : 'text-red-600'}>{status}</span>
        </p>
      </div>

      {/* Sensor Data Display */}
      <div className="space-y-4">
        {/* GPS Data */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">📍 GPS Location</h2>
          <p>Latitude: {latestData.gps.lat || 'N/A'}</p>
          <p>Longitude: {latestData.gps.lon || 'N/A'}</p>
        </div>

        {/* Accelerometer Data */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">🔄 Accelerometer</h2>
          <p>X: {latestData.accel.x || 'N/A'}</p>
          <p>Y: {latestData.accel.y || 'N/A'}</p>
          <p>Z: {latestData.accel.z || 'N/A'}</p>
        </div>

        {/* Health Data */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="font-semibold mb-2">❤️ Health Metrics</h2>
          <p>Heart Rate: {latestData.heartRate ? `${latestData.heartRate} bpm` : 'N/A'}</p>
          <p>SpO2: {latestData.spO2 ? `${latestData.spO2}%` : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
} 