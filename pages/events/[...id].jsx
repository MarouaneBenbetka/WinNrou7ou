import { useRouter } from "next/router";
import { MdOutlineNavigateBefore, MdOutlineWatchLater } from "react-icons/md";
import { motion } from "framer-motion";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import Image from "next/image";
import Footer from "@/components/shared/Footer";
import dynamic from "next/dynamic";
const MapWrapper = dynamic(() => import("@/components/map/SimpleMap"), {
	ssr: false,
});

export async function getServerSideProps(context) {
	console.log("id here", context.id);
	return {
		props: {},
	};
}

const Event = () => {
	const router = useRouter();
	const { id } = router.query;
	console.log(id);

	return (
		<div>
			<section className="bg-event bg-center bg-no-repeat bg-cover min-h-screen pt-24 relative">
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
								Timgad International Festival of Music
							</h1>
							<div className="pl-4 mt-8 font-semibold text-lg">
								<div className="flex gap-3 items-center">
									<FiMapPin
										size={24}
										className="text-white"
									/>
									<h2>Timgad,(Batna) Algérie</h2>
								</div>
								<div className="flex gap-3 items-center">
									<FiCalendar
										size={24}
										className="text-white opacity-80"
									/>
									<h2>25-05-2023</h2>
								</div>
							</div>
						</div>
						<div className="w-[250px] md:w-[320px] lg:w-[calc(300px+10vw)] h-[210px] md:h-[290px] lg:h-[320px] bg-white relative">
							<Image
								src={"/images/singer.png"}
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
					<p className="text-justify">
						The Timgad International Festival of Music is an annual
						event held in the ancient Roman city of Timgad, located
						in the Batna province of northeastern Algeria.
						<br /> The festival is dedicated to celebrating music
						from various genres and promoting cultural exchange
						among artists and audiences.
						<br /> The festival showcases a diverse range of musical
						performances, attracting both local and international
						artists.
						<br /> Algerian musicians, representing different music
						genres such as traditional Algerian music, Chaabi, Raï,
						Andalusian music, and modern Algerian pop, take the
						stage alongside renowned international musicians from
						around the world.
						<br /> The performances are held in the unique and
						historic setting of the Timgad ruins, which adds a
						distinctive ambiance to the festival.
					</p>
				</div>
				<div className="">
					<h1 className="text-4xl font-bold mb-4">Location</h1>
					<div className="w-[90vw] md:w-[300px] lg:w-[350px] h-[180px] md:h-[190px] lg:h-[220px] bg-black mb-6">
						<MapWrapper lat={28} lng={2} />
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
							<h2>25-05-2023</h2>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default Event;
