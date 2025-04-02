import { useEffect, useState } from 'react';

export default function LiveSensorData({ setSensorData, setGlow }) {
  const [sensorData, setSensorDataState] = useState({
    accelerometer: null,
    heartRate: null,
    gps: null
  });

  useEffect(() => {
    // Simulate incoming data every 2 seconds
    const interval = setInterval(() => {
      const dummyAccelX = (Math.random() * 10).toFixed(2);
      const dummyAccelY = (Math.random() * 10 - 5).toFixed(2);
      const dummyAccelZ = (Math.random() * 10 - 5).toFixed(2);
      const dummyHeartRate = Math.floor(Math.random() * 100 + 60);
      const dummyGPS = `Lat=${(Math.random() * 180 - 90).toFixed(4)}° N, Long=${(Math.random() * 360 - 180).toFixed(4)}° W`;

      // Update state with dummy data
      setSensorDataState({
        accelerometer: `📡 Accel: X=${dummyAccelX} Y=${dummyAccelY} Z=${dummyAccelZ}`,
        heartRate: `💓 Heart Rate: ${dummyHeartRate} BPM`,
        gps: dummyGPS
      });

      // Call the setter function to update the parent component
      setSensorData({
        accelerometer: `📡 Accel: X=${dummyAccelX} Y=${dummyAccelY} Z=${dummyAccelZ}`,
        heartRate: `💓 Heart Rate: ${dummyHeartRate} BPM`,
        gps: dummyGPS
      });

      // Check thresholds
      const accelMagnitude = Math.sqrt(dummyAccelX ** 2 + dummyAccelY ** 2 + dummyAccelZ ** 2);
      const shouldGlow = accelMagnitude > 5 || dummyHeartRate > 150; // Example conditions
      setGlow(shouldGlow); // Update glow state
    }, 2000); // Update every 2 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [setSensorData, setGlow]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-black">Live Sensor Data</h2>
      <div className="space-y-4">
            {/* Worker Information Section */}
            <div className="border p-2 rounded mt-4 bg-[#F9F9F9]">
        <h3 className="font-semibold text-black">Worker's Information</h3>
        <p className="text-black">Name: Lalu Prasad Yadav</p>
        <p className="text-black">Position: Brick Layer</p>
        <p className="text-black">Age: 37</p>
        <p className="text-black">Weight: 67.3 kg</p>
        <p className="text-black">Worker ID: 221027</p>
      </div>
        <div className="border p-3 rounded">
          <h3 className="font-semibold text-black">Accelerometer</h3>
          <p className="text-black">{sensorData.accelerometer || 'Waiting for data...'}</p>
        </div>
        <div className="border p-3 rounded">
          <h3 className="font-semibold text-black">Heart Rate</h3>
          <p className="text-black">{sensorData.heartRate || 'Waiting for data...'}</p>
        </div>
        <div className="border p-3 rounded">
          <h3 className="font-semibold text-black">GPS</h3>
          <p className="text-black">{sensorData.gps || 'Waiting for data...'}</p>
        </div>
      </div>

    </div>
  );
} 