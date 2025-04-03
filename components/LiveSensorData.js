import { useEffect, useState } from 'react';

export default function LiveSensorData({ setSensorData, setGlow }) {
  const [sensorData, setSensorDataState] = useState({
    accelerometer: null,
    heartRate: "💓 Heart Rate: 0 bpm",
    gps: "📍 GPS: 19.0760000, 72.8777000",
    spO2: null
  });
  const [emergency, setEmergency] = useState(false);
  const [heartRateInterval, setHeartRateInterval] = useState(null);

  // Start GPS simulation on component mount
  useEffect(() => {
    const simulateGPS = () => {
      // Keep base coordinates, only change decimals
      const baseLat = 19.076;
      const baseLong = 72.877;
      
      // Add random decimals (up to 6 decimal places)
      const randomDecimals = () => (Math.random() * 0.001).toFixed(6);
      const newLat = (baseLat + parseFloat(randomDecimals())).toFixed(6);
      const newLong = (baseLong + parseFloat(randomDecimals())).toFixed(6);
      
      const newGPS = `📍 GPS: ${newLat}, ${newLong}`;
      setSensorDataState(prev => ({
        ...prev,
        gps: newGPS
      }));
      setSensorData(prev => ({
        ...prev,
        gps: newGPS
      }));
    };

    // Run GPS simulation every 20 seconds
    simulateGPS(); // Initial simulation
    const gpsInterval = setInterval(simulateGPS, 20000);

    return () => clearInterval(gpsInterval);
  }, [setSensorData]);

  const startHeartRateSimulation = () => {
    if (heartRateInterval) return; // Don't start if already running
    
    const interval = setInterval(() => {
      const randomHeartRate = Math.floor(Math.random() * (120 - 60 + 1)) + 60;
      const newHeartRate = `💓 Heart Rate: ${randomHeartRate} bpm`;
      setSensorDataState(prev => ({
        ...prev,
        heartRate: newHeartRate
      }));
      setSensorData(prev => ({
        ...prev,
        heartRate: newHeartRate
      }));
    }, 2000); // Update every 2 seconds
    
    setHeartRateInterval(interval);
    
    // Stop after 20 seconds
    setTimeout(() => {
      clearInterval(interval);
      setHeartRateInterval(null);
      // Reset to 0
      const zeroHeartRate = "💓 Heart Rate: 0 bpm";
      setSensorDataState(prev => ({
        ...prev,
        heartRate: zeroHeartRate
      }));
      setSensorData(prev => ({
        ...prev,
        heartRate: zeroHeartRate
      }));
    }, 20000);
  };

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    console.log('Connecting to WebSocket...');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const data = event.data;
      console.log('Received:', data);

      // Check for buzzer alert first
      if (data.includes('Sudden movement detected!')) {
        setGlow(true);
        setEmergency(true);
      }
      // Parse different types of data
      else if (data.includes('Accel:')) {
        setSensorDataState(prev => ({
          ...prev,
          accelerometer: `📡 ${data}`
        }));
        setSensorData(prev => ({
          ...prev,
          accelerometer: `📡 ${data}`
        }));
      } 
      else if (data.includes('SpO2:')) {
        setSensorDataState(prev => ({
          ...prev,
          spO2: `🫁 ${data}`
        }));
        setSensorData(prev => ({
          ...prev,
          spO2: `🫁 ${data}`
        }));
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      if (heartRateInterval) {
        clearInterval(heartRateInterval);
      }
      ws.close();
    };
  }, [setSensorData, setGlow, heartRateInterval]);

  return (
    <div className="p-4">
      {emergency && (
        <div className="mb-6 p-4 bg-red-600 text-white rounded-lg shadow-lg animate-pulse">
          <h2 className="text-2xl font-bold mb-2 flex items-center">
            ⚠️ EMERGENCY ALERT
            <button 
              onClick={() => {
                setEmergency(false);
                setGlow(false);
              }}
              className="ml-auto text-sm bg-white text-red-600 px-2 py-1 rounded hover:bg-red-100"
            >
              Clear Alert
            </button>
          </h2>
          <p>Fall detected! Please check on the worker immediately.</p>
        </div>
      )}
      
      <h2 className="text-2xl font-bold mb-4 text-black">Live Sensor Data</h2>
      <div className="space-y-4">
        {/* Emergency Buttons */}
        <div className="flex space-x-4 mb-4">
          <button 
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
            onClick={() => {
              setEmergency(true);
              setGlow(true);
            }}
          >
            Alert Others
          </button>
          <button 
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
          >
            Emergency Contact
          </button>
        </div>

        {/* Worker Information Section */}
        <div className={`border p-2 rounded mt-4 ${emergency ? 'bg-red-50' : 'bg-[#F9F9F9]'} transition-colors duration-500`}>
          <h3 className="font-semibold text-black">Worker's Information</h3>
          <p className="text-black">Name: Lalu Prasad Yadav</p>
          <p className="text-black">Position: Brick Layer</p>
          <p className="text-black">Age: 37</p>
          <p className="text-black">Weight: 67.3 kg</p>
          <p className="text-black">Worker ID: 221027</p>
        </div>
        <div className={`border p-3 rounded ${emergency ? 'bg-red-50' : 'bg-white'} transition-colors duration-500`}>
          <h3 className="font-semibold text-black">Accelerometer</h3>
          <p className="text-black">{sensorData.accelerometer || 'Waiting for data...'}</p>
        </div>
        <div className={`border p-3 rounded ${emergency ? 'bg-red-50' : 'bg-white'} transition-colors duration-500`}>
          <h3 className="font-semibold text-black">Heart Rate</h3>
          <p 
            className="text-black cursor-pointer"
            onClick={startHeartRateSimulation}
          >
            {sensorData.heartRate || 'Waiting for data...'}
          </p>
        </div>
        <div className={`border p-3 rounded ${emergency ? 'bg-red-50' : 'bg-white'} transition-colors duration-500`}>
          <h3 className="font-semibold text-black">GPS Location</h3>
          <p className="text-black">{sensorData.gps || 'Waiting for data...'}</p>
        </div>
      </div>
    </div>
  );
} 