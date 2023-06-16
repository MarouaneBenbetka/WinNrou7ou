import { useRouter } from "next/router";
import { MdOutlineNavigateBefore, MdOutlineWatchLater } from "react-icons/md";
import { motion } from "framer-motion";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import Image from "next/image";
import Footer from "@/components/shared/Footer";
import dynamic from "next/dynamic";
import { useErrorBoundary } from "react-error-boundary";
import { useEffect } from "react";
import axios from "axios";
const MapWrapper = dynamic(() => import("@/components/map/SimpleMap"), {
	ssr: false,
});

const Event = ({ event, status }) => {
	const { showBoundary } = useErrorBoundary();
	const router = useRouter();
	console.log(status);
	useEffect(() => {
		if (status != "ok") {
			showBoundary(status);
			console.log("hi");
		}
	}, [status, showBoundary]);

	return (
		<div>
			<section
				style={{ backgroundImage: `url(${event?.main_image_url})` }}
				className={` bg-center bg-no-repeat bg-cover min-h-screen pt-24 relative`}
			>
				<div className="absolute inset-0  bg-black opacity-[.55] z-10"></div>
				<div className="relative z-40">
					<motion.div
						className="mt-10 ml-[70px] flex gap-1 items-center cursor-pointer"
						onClick={() => router.back()}
						whileHover={{
							scale: 1.15,
							originX: 0,
						}}
					>
						<MdOutlineNavigateBefore
							className="text-white"
							size={32}
						/>
						<h1 className="font-semibold text-lg">back</h1>
					</motion.div>
					<div className="flex flex-col md:flex-row justify-center gap-10 items-center mt-[30px] md:mt-[80px] ">
						<div className="w-[85vw] md:w-[400px] lg:w-[600px] ">
							<h1 className="font-bold text-3xl md:text-4xl lg:text-5xl ">
								{event.title}
							</h1>
							<div className="pl-4 mt-8 font-semibold text-lg">
								<div className="flex gap-3 items-center">
									<FiMapPin
										size={24}
										className="text-white"
									/>
									<h2>{event.address}</h2>
								</div>
								<div className="flex gap-3 items-center">
									<FiCalendar
										size={24}
										className="text-white opacity-80"
									/>
									<h2>{event.date?.split("T")[0]}</h2>
								</div>
							</div>
						</div>
						<div className="w-[250px] md:w-[320px] lg:w-[calc(300px+10vw)] h-[210px] md:h-[290px] lg:h-[320px] bg-white relative">
							<Image
								src={event.secondary_image_url}
								alt="singer.png"
								fill
							/>
						</div>
					</div>
				</div>
			</section>
			<section className="min-h-screen bg-white flex flex-col px-10 md:px-0 md:flex-row md:gap-[80px] lg:gap-[150px] justify-center items-start text-dark pt-[150px]">
				<div className=" md:w-[420px] lg:w-[550px]">
					<h1 className="text-4xl font-bold mb-4">Description</h1>
					<p className="text-justify">{event.description}</p>
				</div>
				<div className="">
					<h1 className="text-4xl font-bold mb-4">Location</h1>
					<div className="w-[90vw] md:w-[300px] lg:w-[350px] h-[180px] md:h-[190px] lg:h-[220px] bg-black mb-6">
						<MapWrapper
							lat={event.latitude}
							lng={event.longitude}
						/>
					</div>
					<h1 className="text-4xl font-bold mb-4">Hours</h1>
					<div className="pl-2 mb-4">
						<div className="flex gap-3 items-center mb-2">
							<MdOutlineWatchLater
								size={24}
								className="text-blue "
							/>
							<h2>08:00 AM to 04:00PM</h2>
						</div>
						<div className="flex gap-3 items-center">
							<FiCalendar size={24} className="text-blue " />
							<h2>{event.date?.split("T")[0]}</h2>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default Event;

export async function getServerSideProps({ params }) {
	try {
		const res = await axios.get(
			`http://localhost:3000/api/events/${params.id}`
		);
		console.log(res.data.event);
		return {
			props: {
				event: res?.data.event,
				status: "ok",
			},
		};
	} catch (e) {
		return {
			props: {
				event: {},
				status: "error",
			},
		};
	}
}
