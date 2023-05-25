import Image from "next/image";
import { motion } from "framer-motion";
const SuggestionCard = ({ title, img }) => {
	return (
		<motion.div
			className="carousel-item py-3 px-3"
			drag
			whileDrag={{
				scale: 1.08,
				zIndex: 100,
				border: 1,
				borderBlockColor: "#D5DD18",
			}}
			dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
		>
			<div className="relative hover:scale-[1.03] transition">
				<Image
					src={img}
					alt={title}
					width={260}
					height={140}
					className="rounded-xl"
				/>
				<div className="absolute top-0 left-0 w-full h-full bg-dark opacity-[.15] rounded-xl"></div>
				<h2 className="text-white font-bold text-xl absolute bottom-3 left-4">
					{title}
				</h2>
			</div>
		</motion.div>
	);
};

export default SuggestionCard;
