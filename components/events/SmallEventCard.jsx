import Image from "next/image";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FiCalendar, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";
import Link from "next/link";
const SmallEventCard = ({ id, title, date, image }) => {
	const [isFavorite, setIsFavorite] = useState(false);
	const [isHovering, setIsHovering] = useState(false);
	return (
		<div
			className=" carousel-item  relative mx-1 w-fit rounded-2xl overflow-hidden shadow-xl hover:scale-[1.04] transition cursor-pointer"
			onMouseOver={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			<div className="absolute inset-0  bg-[#0B1723] opacity-10 z-10"></div>
			<Link href={"/events/" + id} className="z-30">
				<div className="w-[240px] h-[300px]">
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
						<FiCalendar
							size={22}
							className="text-white opacity-80"
						/>
						<p>{date}</p>
					</div>
				</div>
			</Link>
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
			{isHovering && (
				<motion.div
					className="absolute bottom-2 right-2 z-50"
					initial={{ y: 30, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.3 }}
				>
					<FiExternalLink size={26} className="text-white  " />
				</motion.div>
			)}
		</div>
	);
};

export default SmallEventCard;
