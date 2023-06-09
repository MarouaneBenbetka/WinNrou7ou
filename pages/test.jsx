import { useState, useEffect, useRef } from "react";
import TypingAnimation from "@/components/chat/TypingAnimation";

export default function Test() {
	const [inputValue, setInputValue] = useState("");
	const [chatLog, setChatLog] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const bottomRef = useRef();

	useEffect(() => {
		// 👇️ scroll to bottom every time messages change
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [chatLog]);

	const handleSubmit = (event) => {
		event.preventDefault();

		if (inputValue.trim() == "") return;
		setChatLog((prevChatLog) => [
			...prevChatLog,
			{ type: "user", message: inputValue },
		]);

		sendMessage(inputValue);

		setInputValue("");
	};

	const sendMessage = (message) => {
		setIsLoading(true);

		setTimeout(() => {
			setChatLog((prevChatLog) => [
				...prevChatLog,
				{
					type: "bot",
					message: "hi this is my response",
				},
			]);
			setIsLoading(false);
			const value = new SpeechSynthesisUtterance(
				"hi this is my response"
			);
			window.speechSynthesis.speak(value);
		}, 2000);
	};

	return (
		<div className="container mx-auto max-w-[700px] ">
			<div className="flex flex-col h-screen bg-gray-900">
				<h1 className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center py-3 font-bold text-6xl">
					ChatGPT
				</h1>
				<div className="flex-grow p-6 overflow-y-auto overflow-x-hidden">
					<div className="flex flex-col space-y-4 h-auto">
						{chatLog.map((message, index) => (
							<div
								key={index}
								className={`flex ${
									message.type === "user"
										? "justify-end"
										: "justify-start"
								}`}
							>
								<div
									className={`${
										message.type === "user"
											? "bg-purple-500"
											: "bg-gray-800"
									} rounded-lg p-4 text-white max-w-sm`}
								>
									{message.message}
								</div>
							</div>
						))}
						{isLoading && (
							<div
								key={chatLog.length}
								className="flex justify-start"
							>
								<TypingAnimation />
							</div>
						)}
						<div ref={bottomRef} />
					</div>
				</div>
				<form onSubmit={handleSubmit} className="flex-none p-6">
					<div className="flex rounded-lg border border-gray-700 bg-gray-800">
						<input
							type="text"
							className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
							placeholder="Type your message..."
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
						/>
						<button
							type="submit"
							className="bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300"
						>
							Send
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
