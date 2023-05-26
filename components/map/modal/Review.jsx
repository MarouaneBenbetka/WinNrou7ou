import Image from "next/image";

const Review = ({ sender, image, comment }) => {
	return (
		<div className="flex gap-3 mb-3 pb-2 border-b border-gray-300">
			<div className="w-10 h-10 rounded-full relative">
				<Image src={image} alt="" fill className="rounded-full" />
			</div>
			<div className="w-[210px] text-justify pt-1">
				<h2 className="text-lg font-semibold text-dark ">{sender}</h2>
				<p className="text-gray-600 leading-4 text-sm">{comment}</p>
			</div>
		</div>
	);
};

export default Review;
