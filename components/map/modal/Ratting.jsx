import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Ratting = ({ num }) => {
	return (
		<div className="flex gap-1">
			{[...Array(num)].map((_, index) => (
				<AiFillStar key={index} size={26} className="text-orange" />
			))}
			{num < 5 &&
				[...Array(5 - num)].map((_, index) => (
					<AiOutlineStar
						key={index}
						size={26}
						className="text-dark opacity-70"
					/>
				))}
		</div>
	);
};

export default Ratting;
