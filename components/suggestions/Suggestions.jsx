import { DUMMY_SUGGESTIONS } from "@/data/data";
import SuggestionCard from "./SuggestionCard";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { useEffect, useState } from "react";
import { instance } from "@/utils/services/url";
import axios from "axios";
import { MoonLoader } from "react-spinners";

const Suggestions = ({ id, moveToSuggestion }) => {
	const [collapsedBar, setCollapsedBar] = useState(true);
	const [data, setData] = useState(DUMMY_SUGGESTIONS);
	const [loading, setLoading] = useState(true);
	const toggleCollapseHanlder = () => {
		setCollapsedBar((prev) => !prev);
	};

	useEffect(() => {
		const fetchSuggestions = async () => {
			try {
				setLoading(true);
				const res = await instance.get("/api/monuments/random");
				setData(res.data.monuments);
				console.log(res.data.monuments);
				setLoading(false);
			} catch (e) {
				console.log(e);
				setLoading(false);
			}
		};

		fetchSuggestions();
	}, [id]);

	return (
		<section
			className={`${
				collapsedBar ? "" : "slideUpAnimation"
			} w-[80vw] sm:w-[90vw] md:w-[85vw] flex justify-center    mt-0 rounded-t-[20px]  bg-white fixed bottom-0 z-50 border-2 border-green `}
		>
			<div className="relative w-full h-full flex justify-center ">
				{!collapsedBar &&
					(loading ? (
						<div className=" flex ">
							<MoonLoader size={32} color="#069ADF" />
						</div>
					) : (
						<div className=" carousel carousel-start w-[280px]  x2:w-[580px] x3:w-[850px] x4:w-[1125px] rounded-t-[20px] ">
							{data.map((item) => (
								<SuggestionCard
									key={item.id}
									title={item.title}
									img={item.img}
									id={item.id}
									clickHandler={() => {
										moveToSuggestion({
											id: item.id,
											title: item.title,
											latitude: item.latitude,
											longitude: item.longitude,
										});
										setCollapsedBar(true);
									}}
								/>
							))}
						</div>
					))}
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
