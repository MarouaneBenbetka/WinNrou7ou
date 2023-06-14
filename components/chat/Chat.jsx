import { useState, useEffect, useRef } from "react";
import TypingAnimation from "./TypingAnimation";
import DotsAnimation from "./DotsAnimation";
import { PuffLoader } from "react-spinners";
import ErrorAlert from "./ErrorAlert";

export default function Chat({ visible }) {
	const [inputValue, setInputValue] = useState("");
	const [chatLog, setChatLog] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const bottomRef = useRef();

	const [displayResponse, setDisplayResponse] = useState("");
	const [completedTyping, setCompletedTyping] = useState(false);
	const [showError, setShowError] = useState(true);

	useEffect(() => {
		if (visible) {
			bottomRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [visible]);

	useEffect(() => {
		if (!chatLog?.length) {
			return;
		}

		setCompletedTyping(false);

		let i = 0;
		const stringResponse = chatLog[chatLog.length - 1].message;

		const intervalId = setInterval(() => {
			setDisplayResponse(stringResponse.slice(0, i));

			i++;

			if (i > stringResponse.length) {
				clearInterval(intervalId);
				setCompletedTyping(true);
			}
		}, 20);

		return () => clearInterval(intervalId);
	}, [chatLog]);

	useEffect(() => {
		// 👇️ scroll to bottom every time messages change
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [chatLog]);

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!isLoading) {
			if (inputValue.trim() == "") return;
			setChatLog((prevChatLog) => [
				...prevChatLog,
				{ type: "user", message: inputValue },
			]);

			sendMessage(inputValue);

			setInputValue("");
		}
	};

	const sendMessage = (message) => {
		setIsLoading(true);

		setTimeout(() => {
			setChatLog((prevChatLog) => [
				...prevChatLog,
				{
					type: "bot",
					message:
						"hi this is my response i want to know that you are the best man i want to teach dsfoads alskdf asdjf and that's all man",
				},
			]);
			setIsLoading(false);
			const value = new SpeechSynthesisUtterance(
				"hi this is my response"
			);
			window.speechSynthesis.speak(value);
		}, 4000);
	};

	return (
		visible && (
			<div className="fixed origin-bottom-right bottom-0 right-0 z-[200] mr-[120px] ">
				<div className="flex flex-col  bg-gray-900 h-[90vh] mb-5 pt-3">
					<div className="flex-grow p-6 overflow-y-auto overflow-x-hidden">
						<div className="flex flex-col space-y-4 h-auto">
							{chatLog.map((message, index) =>
								message.type === "user" ||
								index < chatLog.length - 1 ? (
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
											} rounded-lg p-4 text-white max-w-sm break-words`}
										>
											{message.message}
										</div>
									</div>
								) : (
									<div
										className="flex justify-start"
										key={index}
									>
										<span className="bg-gray-800 rounded-lg p-4 text-white max-w-sm break-words whitespace-pre-line">
											{displayResponse}
											{!completedTyping && (
												<svg
													viewBox="8 4 8 16"
													xmlns="http://www.w3.org/2000/svg"
													className="cursor"
												>
													<rect
														x="10"
														y="6"
														width="4"
														height="12"
														fill="#fff"
													/>
												</svg>
											)}
										</span>
									</div>
								)
							)}
							{isLoading && (
								<div
									key={chatLog.length}
									className="flex justify-start"
								>
									<TypingAnimation />
								</div>
							)}
							{showError && (
								<ErrorAlert setShowError={setShowError} />
							)}
							<div ref={bottomRef} />
						</div>
					</div>
					<form onSubmit={handleSubmit} className="flex-none p-6">
						<div className="flex rounded-lg border border-gray-700 bg-gray-800">
							<input
								autoFocus
								type="text"
								className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
								placeholder="Type your message..."
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
							/>
							<button
								type="submit"
								className="w-[74px] flex justify-center items-center bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300"
							>
								{!isLoading ? (
									"Send"
								) : (
									<PuffLoader
										loading={isLoading}
										aria-label="Loading Spinner"
										data-testid="loader"
										size={28}
									/>
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		)
	);
}
