'use client';
import React, { useState } from "react";
import HelmetMap from "./HelmetMap";

// Helmet image URL
const helmetImageUrl = "https://storage.googleapis.com/tagjs-prod.appspot.com/GqbXjbiBh1/127rle68.png";

export default (props) => {
	const [input1, onChangeInput1] = useState('');
	const [sensorData, setSensorData] = useState(''); // New state for sensor data

	const handleHelmetClick = (data) => {
		setSensorData(data); // Update sensor data when helmet is clicked
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
					<div className="self-stretch bg-[#FFF1B8] pt-[10px] pb-[10px] mb-[9px] rounded-[5px]" 
						style={{ boxShadow: "0px 8px 6px rgba(0, 0, 0, 0.1)" }}>
						<div className="flex items-center self-stretch ml-[20px] mr-[20px]">
							<input
								placeholder={"Search"}
								className="flex-1 text-[#25131A] text-[14px] p-2 rounded-[5px] border border-gray-300"
							/>
						</div>
					</div>
					<div className="flex flex-col items-start self-stretch relative">
						<div className="flex flex-col items-start self-stretch bg-[#FFFBE6] pt-[7px] pb-[7px] rounded-[5px]">
							<div className="flex items-start self-stretch ml-[11px] mr-[11px]">
								<button className="flex flex-col items-start bg-[#F81F10] text-left pt-[8px] pb-[8px] pl-[12px] pr-[12px] mr-[20px] rounded-[5px] border-0"
									onClick={() => alert("Pressed!")}>
									<span className="text-[#FFFFFF] text-[10px] font-bold">
										{"Alert Others"}
									</span>
								</button>

								<button className="flex flex-col items-start bg-[#f89410] text-left pt-[8px] pb-[8px] pl-[12px] pr-[12px] mr-[20px] rounded-[5px] border-0"
									onClick={() => alert("Pressed!")}>
									<span className="text-[#FFFFFF] text-[10px] font-bold">
										{"Emergency Contact"}
									</span>
								</button>
							</div>
							{/* New section to display sensor data */}
							<div className="mt-4 p-2 border border-gray-300 rounded">
								<span className="text-[#25131A] text-[14px] font-bold">Sensor Data:</span>
								<p className="text-[#25131A] text-[12px]">{sensorData || "No data available"}</p>
							</div>
						</div>
					</div>
				</div>
				<HelmetMap latitude={19.2437496059942} longitude={72.85530273769838} onHelmetClick={handleHelmetClick} />
			</div>
		</div>
	);
}