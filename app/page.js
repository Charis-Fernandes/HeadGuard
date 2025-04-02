'use client';
import React, { useState } from "react";
import LiveSensorData from '../components/LiveSensorData'; // Adjust the import path as necessary
import HelmetMap from "./HelmetMap";

// Helmet image URL
const helmetImageUrl = "https://storage.googleapis.com/tagjs-prod.appspot.com/GqbXjbiBh1/127rle68.png";

const ACCEL_THRESHOLD = 5; // Example threshold for accelerometer
const HEART_RATE_THRESHOLD = 100; // Example threshold for heart rate

export default function Home() {
	const [sensorData, setSensorData] = useState({
		accelerometer: null,
		heartRate: null,
		gps: null
	});
	const [isDataVisible, setIsDataVisible] = useState(false); // State to manage visibility
	const [shouldGlow, setGlow] = useState(false); // State to manage glow effect

	const handleHelmetClick = () => {
		setIsDataVisible(true); // Show the sensor data when helmet is clicked
	};

	return (
		<div className="flex flex-col bg-[#FFFFFF] h-screen"> {/* Stretch to full height */}
			<div className="flex items-center justify-between bg-[#000000] p-4 mb-4 border-[2px] border-solid border-[#000000]">
				<div className="flex flex-col items-center">
					<span className="text-[#FFFD54] text-[14px]">
						{"ADD USER"}
					</span>
				</div>
				<div className="flex items-center justify-center ml-[-50px]">
					<img
						src={helmetImageUrl}
						className="w-[50px] h-[50px] mr-2" // Adjust size as needed
						alt="Helmet Icon"
					/>
					<span className="text-[#FFFD54] text-[24px] font-bold font-Copperplate">
						{"HEADGUARD"}
					</span>
				</div>
				<div className="flex flex-col items-center">
					<span className="text-[#FFFD54] text-[14px]">
						{"ABOUT US"}
					</span>
				</div>
			</div>
			<div className="flex items-start self-stretch mb-[20px] ml-[12px] mr-[12px]">
				<div className="flex-1 mr-[12px]">
					{isDataVisible && ( // Conditionally render the Live Sensor Data
						<LiveSensorData setSensorData={setSensorData} setGlow={setGlow} /> // Pass the setter function
					)}
				</div>
				<HelmetMap 
					latitude={19.2437496059942} // Replace with actual latitude
					longitude={72.85530273769838} // Replace with actual longitude
					onHelmetClick={handleHelmetClick} 
					sensorData={sensorData} // Pass the sensor data
					shouldGlow={shouldGlow} // Pass the glow state
				/>
			</div>
		</div>
	);
}