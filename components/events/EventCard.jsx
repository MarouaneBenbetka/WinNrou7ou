import Image from "next/image";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FiCalendar } from "react-icons/fi";
import { motion } from "framer-motion";
const EventCard = ({ title, date, image }) => {
	const [isFavorite, setIsFavorite] = useState(false);
	return (
		<div className=" carousel-item  relative mx-5 w-fit rounded-2xl overflow-hidden shadow-xl hover:scale-[1.04] transition">
			<div className="absolute inset-0  bg-[#0B1723] opacity-10 z-10"></div>
			<div className="w-[300px] h-[440px]">
				<Image
					fill
					src={image}
					alt=""
					className="rounded-2xl object-cover"
				/>
			</div>
			<div className="absolute bottom-0 w-full h-[120px] bg-black  bg-opacity-60 flex flex-col justify-center items-center">
				<h2 className="font-semibold text-center px-3">{title}</h2>
				<div className="flex gap-3 text-sm items-center mt-1">
					<FiCalendar size={22} className="text-white opacity-80" />
					<p>{date}</p>
				</div>
			</div>
			<div
				className="absolute top-2 right-2 cursor-pointer z-40"
				onClick={() => setIsFavorite((prev) => !prev)}
			>
				{isFavorite ? (
					<AiFillHeart size={28} className="text-white" />
				) : (
					<AiOutlineHeart size={28} className="text-white" />
				)}
			</div>
		</div>
	);
};

export default EventCard;
