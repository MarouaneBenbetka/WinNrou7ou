import SmallEventCard from "@/components/events/SmallEventCard";
import Place from "@/components/userCards/Place";
import Footer from "@/components/shared/Footer";
import Image from "next/image";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import Notification from "@/components/userCards/Notification";
import { useSession } from "next-auth/react";

const links = [
	{ id: 1, title: "Places" },
	{ id: 2, title: "Events" },
	{ id: 3, title: "Notifications" },
];

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
	{
		id: 4,
		title: "Timgad International Festival of Music",
		date: "25-05-2023",
		image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/48/c3/60/20180224-122151-largejpg.jpg?w=900&h=600&s=1",
	},
	{
		id: 5,
		title: "Timgad International Festival of Music",
		date: "25-05-2023",
		image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/48/c3/60/20180224-122151-largejpg.jpg?w=900&h=600&s=1",
	},
	{
		id: 6,
		title: "Timgad International Festival of Music",
		date: "25-05-2023",
		image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/48/c3/60/20180224-122151-largejpg.jpg?w=900&h=600&s=1",
	},
];

const User = () => {
	const [active, setActive] = useState(1);
	const { status, data: session } = useSession();

	const editProlifeHandler = () => {
		console.log("edit profile");
	};

	return (
		<>
			<div className="min-h-screen bg-white flex flex-col items-center">
				<div className="h-[40vh] relative w-screen">
					<div className="absolute inset-0  bg-black opacity-30 z-10"></div>
					<Image
						src={"/images/bg-user.png"}
						alt=""
						fill
						className="object-cover object-center"
					/>
					<div
						className="absolute -bottom-[100px] left-0 right-0 flex flex-col justify-center items-center cursor-pointer"
						onClick={editProlifeHandler}
					>
						<div className="w-[146px] h-[146px]   rounded-full overflow-hidden relative border-4 border-blue z-20">
							<Image
								src={
									session?.user?.image ||
									"/images/user-placeholder.png"
								}
								alt=""
								fill
							/>
						</div>
						<div className="text-center flex items-center  gap-3">
							<h1 className="text-dark text-2xl mt-2">
								{session.user.name}
							</h1>
							<FiEdit2 size={22} className="text-black" />
						</div>
					</div>
				</div>
				<div>
					<div className="w-screen flex gap-10 sm:gap-x-20 md:gap-x-28 justify-center items-center mt-[150px]">
						{links.map((item) => (
							<div
								key={item.id}
								className="cursor-pointer hover:scale-[1.07] transition"
								onClick={() => setActive(item.id)}
							>
								<h2
									className={
										"text-dark text-xl md:text-3xl md:w-[210px] text-center " +
										(item.id === active
											? "font-semibold"
											: "font-medium")
									}
								>
									{item.title}
								</h2>
								{item.id === active && (
									<div className="w-[10px] h-[10px] rounded-full bg-blue mx-auto" />
								)}
							</div>
						))}
					</div>
					<div className="flex justify-center items-center mb-6">
						{active === 1 && (
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6  mt-8   w-fit justify-center items-center">
								{DUMMY_EVENTS.map((event) => (
									<Place
										id={event.id}
										key={event.id}
										title={event.title}
										date={event.date}
										image={event.image}
									/>
								))}
							</div>
						)}
						{active === 2 && (
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6  mt-8   w-fit justify-center items-center">
								{DUMMY_EVENTS.map((event) => (
									<SmallEventCard
										id={event.id}
										key={event.id}
										title={event.title}
										date={event.date}
										image={event.image}
									/>
								))}
							</div>
						)}
						{active === 3 && (
							<div className="flex flex-col items-center mt-6 gap-4">
								<Notification color={"blue"} />
								<Notification color={"green"} />
								<Notification color={"orange"} />
								<Notification color={"blue"} />
							</div>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default User;
