import Image from "next/image";
import Head from "next/head";
import HeroBg from "@/components/hero/HeroBg";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
	return (
		<section className={"relative font-poppins"}>
			<HeroBg />
			<div className="text-white relative z-30  flex justify-center items-center flex-col">
				<div className="min-h-screen flex items-center justify-center flex-col">
					<h1 className="text-6xl pb-6  font-semibold">
						Explore Algeria,
					</h1>
					<h2 className="relative z-1 text-6xl font-semibold before:content-[''] before:h-5 before:bg-blue before:w-full before:absolute before:bottom-0 before:left-0 before:-z-10">
						live the adventure
					</h2>
					<p className="mx-[20vw] text-center text-xl mt-6">
						Immerse yourself in the magic of Algeria with WIN, an
						immersive tourism website, designed to ignite your
						wanderlust and provide a gateway to unforgettable
						experiences
					</p>
				</div>

				<p className="h-[1000px]"></p>
			</div>
		</section>
	);
}
