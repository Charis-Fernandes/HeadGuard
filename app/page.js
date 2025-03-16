'use client';
import React, {useState} from "react";
export default (props) => {
	const [input1, onChangeInput1] = useState('');
	return (
		<div className="flex flex-col bg-[#FFFFFF]">
			<div className="self-stretch bg-[#FFFFFF] h-[517px]">
				<div className="flex items-center self-stretch bg-[#000000] pl-[21px] pr-[21px] mb-[16px] border-[2px] border-solid border-[#000000]">
					<div className="flex flex-col items-start pt-[7px] pb-[7px] pl-[8px] pr-[8px] mt-[29px] mb-[29px] mr-[202px]">
						<span className="text-[#FFFD54] text-[14px]" >
							{"ADD USER"}
						</span>
					</div>
					<div className="flex flex-col items-start relative">
						<img
							src={"https://storage.googleapis.com/tagjs-prod.appspot.com/GqbXjbiBh1/127rle68.png"} 
							className="w-[82px] h-[80px] object-fill"
						/>
						<span className="text-[#FFFD54] text-[36px] absolute bottom-[25px] left-[56px]" >
							{"HEADGUARD"}
						</span>
					</div>
					<div className="flex-1 self-stretch">
					</div>
					<span className="text-[#FFFD54] text-[14px] mt-[36px] mb-[36px] mr-[17px]" >
						{"ABOUT US"}
					</span>
					<div className="bg-[#FFFD54] w-[1px] h-[38px] mt-[20px] mb-[20px] mr-[9px]">
					</div>
					<img
						src={"https://storage.googleapis.com/tagjs-prod.appspot.com/GqbXjbiBh1/iopx57le.png"} 
						className="w-[29px] h-[23px] mt-[28px] mb-[28px] object-fill"
					/>
				</div>
				<div className="flex items-start self-stretch mb-[20px] ml-[12px] mr-[12px]">
					<div className="flex-1 mr-[12px]">
						<div className="self-stretch bg-[#FFF1B8] pt-[3px] pb-[3px] mb-[9px] rounded-[5px]" 
							style={{
								boxShadow: "0px 8.148148536682129px 6px #00000000"
							}}>
							<div className="flex items-center self-stretch ml-[20px] mr-[20px]">
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/GqbXjbiBh1/12ajkyj4.png"} 
									className="w-[24px] h-[24px] mr-[11px] object-fill"
								/>
								<span className="flex-1 text-[#25131A] text-[14px] mt-[6px] mb-[6px]" >
									{"Search"}
								</span>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/GqbXjbiBh1/w1chkuis.png"} 
									className="w-[24px] h-[24px] object-fill"
								/>
							</div>
						</div>
						<div className="flex flex-col items-start self-stretch relative">
							<div className="flex flex-col items-start self-stretch bg-[#FFFBE6] pt-[7px] pb-[7px] rounded-[5px]">
								<div className="flex items-center mb-[256px] ml-[3px]">
									<img
										src={"https://storage.googleapis.com/tagjs-prod.appspot.com/GqbXjbiBh1/dh995bvd.png"} 
										className="w-[51px] h-[51px] mr-[19px] object-fill"
									/>
									<span className="text-[#000000] mt-[2px] mb-[2px]" >
										{"Lalu Prasad Yadav\nage :37 | sex : Male\nweight : 67.3 kg"}
									</span>
								</div>
								<div className="flex items-start self-stretch ml-[11px] mr-[11px]">
									<button className="flex flex-col items-start bg-[#F81F10] text-left pt-[8px] pb-[8px] pl-[12px] pr-[12px] mr-[20px] rounded-[5px] border-0"
										onClick={()=>alert("Pressed!")}>
										<span className="text-[#FFFFFF] text-[10px] font-bold" >
											{"Alert Others"}
										</span>
									</button>
									<input
										placeholder={"Emergency Contact"}
										value={input1}
										onChange={(event)=>onChangeInput1(event.target.value)}
										className="flex-1 self-stretch text-[#FFFFFF] bg-[#F88F10] text-[9px] font-bold pt-[9px] pb-[9px] pl-[6px] pr-[6px] rounded-[5px] border-0"
									/>
								</div>
							</div>
							<span className="text-[#000000] text-[13px] w-[254px] absolute top-[68px] left-[6px]" >
								{"Worker ID : 221027\n\nWorker Post : Engineer\n\nShift Timings : 9am - 5pm\n\nLocation details : hgrvgfvkugawkdhcgvkwvgkwvcgk,w,HGVK\n\nHeart Rate  : 98 BPM\n\nFall Detection : Yes / No\n\nBuzzer Alert : Yes / No"}
							</span>
						</div>
					</div>
					<img
						src={"https://storage.googleapis.com/tagjs-prod.appspot.com/GqbXjbiBh1/s61asb16.png"} 
						className="w-[600px] h-[395px] rounded-[5px] object-fill"
					/>
				</div>
			</div>
		</div>
	)
}