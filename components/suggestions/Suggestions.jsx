import { DUMMY_SUGGESTIONS } from "@/data/data";
import SuggestionCard from "./SuggestionCard";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { useState } from "react";

const Suggestions = () => {
	const [collapsedBar, setCollapsedBar] = useState(true);
	const toggleCollapseHanlder = () => {
		setCollapsedBar((prev) => !prev);
	};

	return (
		<section
			className={`${
				collapsedBar ? "" : "slideUpAnimation"
			} w-[80vw] sm:w-[90vw] md:w-[85vw] flex justify-center    mt-0 rounded-t-[20px]  bg-white fixed bottom-0 z-50 border-2 border-green`}
		>
			<div className="relative w-full h-full flex justify-center">
				{!collapsedBar && (
					<div className=" carousel carousel-start w-[280px]  x2:w-[580px] x3:w-[850px] x4:w-[1125px] rounded-t-[20px] ">
						{DUMMY_SUGGESTIONS.map((item) => (
							<SuggestionCard
								key={item.id}
								title={item.title}
								img={item.img}
							/>
						))}
					</div>
				)}
				<div
					className={`floatAnimation ${
						collapsedBar
							? "fixed bottom-0 left-0 md:left-14 border-2 bg-green rounded-t-2xl"
							: "absolute top-2 left-0 "
					} cursor-pointer  rounded-t-2xl`}
					onClick={toggleCollapseHanlder}
				>
					<MdOutlineKeyboardDoubleArrowUp
						size={38}
						className={
							(collapsedBar
								? "rotate-0 text-white"
								: "rotate-180 text-green") +
							" transition-all ease-in-out duration-500 "
						}
					/>
				</div>
			</div>
		</section>
	);
};

export default Suggestions;
