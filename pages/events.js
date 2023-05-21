import EventCard from "@/components/events/EventCard";
import SuggestionCard from "@/components/suggestions/SuggestionCard";
import { staggerContainer, textVariant } from "@/styles/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const DUMMY_EVENTS = [
	{
		id: 1,
		title: "Timgad International Festival of Music",
		date: "25-05-2023",
		image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/48/c3/60/20180224-122151-largejpg.jpg?w=900&h=600&s=1",
	},
	{
		id: 2,
		title: "Timgad International Festival of Music",
		date: "25-05-2023",
		image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/48/c3/60/20180224-122151-largejpg.jpg?w=900&h=600&s=1",
	},
	{
		id: 3,
		title: "Timgad International Festival of Music",
		date: "25-05-2023",
		image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/48/c3/60/20180224-122151-largejpg.jpg?w=900&h=600&s=1",
	},
];

const Events = () => {
	const nextSectionRef = useRef();

	return (
		<div className="bg-white">
			<motion.section
				className="relative  h-screen w-full bg-events bg-cover "
				variants={staggerContainer}
				initial="hidden"
				whileInView="show"
			>
				<div className="absolute inset-0  bg-[#0B1723] opacity-50 z-10"></div>
				<div className="relative  h-screen w-full flex flex-col items-center justify-center z-40">
					<motion.h1
						className="text-4xl md:text-6xl pb-2  font-bold "
						variants={textVariant(0.4)}
					>
						Algerian Events
					</motion.h1>
					<motion.p
						className="mx-5 md:mx-[20vw] text-center text-lg md:text-xl mt-6"
						variants={textVariant(0.6)}
					>
						Step into the Soul of Algeria: An Enchanting Cultural
						Experience
					</motion.p>
					<motion.div
						className="floatAnimation absolute bottom-4 cursor-pointer"
						variants={textVariant(0.8)}
						onClick={() =>
							nextSectionRef.current.scrollIntoView({
								behavior: "smooth",
							})
						}
					>
						<Image
							src={"/images/scroll.svg"}
							alt=""
							width={28}
							height={28}
						/>
					</motion.div>
				</div>
			</motion.section>
			<section
				ref={nextSectionRef}
				className="min-h-screen w-full flex  items-center flex-col pt-[150px] relative"
			>
				<div className="relative">
					<h1 className="text-dark font-bold text-5xl relative z-10 before:content-[''] before:h-5 before:bg-blue before:w-full before:absolute before:bottom-0 before:left-0 before:-z-10">
						Soon
					</h1>
				</div>
				<div className="w-[105vw] h-[320px]  absolute top-0 left-0 ">
					<Image
						src={"/images/asset.png"}
						alt=""
						fill
						className="object-fill"
					/>
				</div>
				<div className=" px-10 ">
					<div className="carousel carousel-start overflow-visible md:flex  mt-7 w-[300px] md:w-[640px]  x3:w-auto py-4 px-6">
						{DUMMY_EVENTS.map((event) => (
							<EventCard
								key={event.id}
								title={event.title}
								date={event.date}
								image={event.image}
							/>
						))}
					</div>
				</div>
			</section>
			<section className="min-h-screen w-screen flex  items-center flex-col pt-[150px] relative">
				<div className="relative">
					<h1 className="text-dark font-bold text-5xl relative z-10 before:content-[''] before:h-5 before:bg-blue before:w-full before:absolute before:bottom-0 before:left-0 before:-z-10">
						Events
					</h1>
				</div>
				<div className="w-[45vw] h-[220px]  absolute top-0 right-0 ">
					<Image
						src={"/images/asset2.png"}
						alt=""
						fill
						className="object-fill"
					/>
				</div>
			</section>
		</div>
	);
};

export default Events;
