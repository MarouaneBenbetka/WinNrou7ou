import Image from "next/image";
import { motion } from "framer-motion";
const SuggestionCard = ({ title, img, id, clickHandler }) => {
	return (
		<motion.div
			className="carousel-item py-3 px-3 cursor-pointer"
			onClick={clickHandler}
		>
			<div className="relative hover:scale-[1.03] transition">
				<div className="w-[260px] h-[170px] relative">
					<div className="absolute inset-0  bg-dark opacity-10 z-20"></div>
					<Image
						src={img || "/images/placeholder.png"}
						alt={title}
						fill
						className="rounded-xl object-cover object-center z-0"
					/>
				</div>

				<div className="absolute top-0 left-0 w-full h-full bg-dark opacity-[.15] rounded-xl"></div>
				<h2 className="text-white font-bold text-xl absolute bottom-3 left-4  z-50">
					{title}
				</h2>
			</div>
		</motion.div>
	);
};

export default SuggestionCard;
