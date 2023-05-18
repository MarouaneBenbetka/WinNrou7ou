import Image from "next/image";
import Head from "next/head";
import HeroBg from "@/components/hero/HeroBg";
import Navbar from "@/components/shared/Navbar";
import { useSelector } from "react-redux";
import { heroData } from "@/data/data";

export default function Home() {
	const lang = useSelector((state) => state.ui.language);

	return (
		<section className={"relative font-poppins"}>
			<HeroBg />
			<div className="text-white relative z-30  flex justify-center items-center flex-col">
				<div className="min-h-screen flex items-center justify-center flex-col">
					<h1 className="text-4xl md:text-6xl pb-2  font-semibold">
						{heroData["title1"][lang]}
					</h1>
					<h2 className="text-4xl relative z-1 md:text-6xl font-semibold before:content-[''] before:h-5 before:bg-blue before:w-full before:absolute before:bottom-0 before:left-0 before:-z-10">
						{heroData["title2"][lang]}
					</h2>
					<p className="mx-5 md:mx-[20vw] text-center text-lg md:text-xl mt-6">
						{heroData["summary"][lang]}
					</p>
				</div>

				<p className="h-[1000px]"></p>
			</div>
		</section>
	);
}
