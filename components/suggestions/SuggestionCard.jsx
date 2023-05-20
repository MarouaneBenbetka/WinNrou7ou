import Image from "next/image";

const SuggestionCard = ({ title, img }) => {
	return (
		<div className="carousel-item py-3 px-3">
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
		</div>
	);
};

export default SuggestionCard;
