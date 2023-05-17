import Image from "next/image";
import Head from "next/head";
import HeroBg from "@/components/hero/HeroBg";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
	return (
		<section className={"relative bg-black"}>
			<Head>
				<title>WinNrou7ou e-tourisme</title>
			</Head>

			<Navbar />
			<HeroBg />
			<div className="content">
				<h1>Welcome</h1>
				<p>To my site.</p>
			</div>
		</section>
	);
}
