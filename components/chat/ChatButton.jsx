import { BsChatText } from "react-icons/bs";
import Chat from "./Chat";
import { useState } from "react";
import Image from "next/image";

const ChatButton = () => {
	const [chatOpened, setChatOpened] = useState(false);

	return (
		<>
			<Chat visible={chatOpened} />
			<div
				className="flex justify-center items-center h-[64px] w-[64px] md:w-[76px] md:h-[76px] rounded-full bg-white fixed bottom-3 right-14 z-[200] cursor-pointer transition hover:scale-[1.05]"
				onClick={() => {
					setChatOpened((prev) => !prev);
				}}
			>
				<div className="w-[46px] h-[46px] md:w-[50px] md:h-[50px] relative">
					<Image src={"/images/fennec.png"} alt="" fill />
				</div>
			</div>
		</>
	);
};

export default ChatButton;
