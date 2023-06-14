import { BsChatText } from "react-icons/bs";
import Chat from "./Chat";
import { useState } from "react";

const ChatButton = () => {
	const [chatOpened, setChatOpened] = useState(false);

	return (
		<>
			<Chat visible={chatOpened} />
			<div
				className="flex justify-center items-center w-[60px] h-[60px] rounded-full bg-white fixed bottom-3 right-14 z-[200] cursor-pointer transition hover:scale-[1.05]"
				onClick={() => {
					setChatOpened((prev) => !prev);
				}}
			>
				<BsChatText size={26} className="text-black" />
			</div>
		</>
	);
};

export default ChatButton;
