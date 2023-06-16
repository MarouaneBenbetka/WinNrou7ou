import Footer from "@/components/shared/Footer";
import { team } from "@/data/data";
import { staggerContainer, textVariant } from "@/styles/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const About = () => {
	const nextSectionRef = useRef();
	return (
		<div className="h-screen bg-black">
			<motion.section
				className="relative  h-screen w-full bg-about bg-cover "
				variants={staggerContainer}
				initial="hidden"
				whileInView="show"
			>
				<div className="absolute inset-0  bg-black opacity-[.65] z-10"></div>
				<div className="relative  h-screen w-full flex flex-col items-center justify-center z-40">
					<motion.h1
						className="text-4xl md:text-6xl pb-2  font-bold relative before:content-['']  before:h-5 before:bg-green before:w-full before:absolute before:bottom-2 before:left-0 before:-z-10"
						variants={textVariant(0.4)}
					>
						About Us
					</motion.h1>
					<motion.p
						className="mx-5 md:mx-[20vw] text-center text-lg md:text-3xl mt-4"
						variants={textVariant(0.6)}
					>
						Get to Know Us and Our Commitment
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
				className="min-h-screen w-full pt-24 px-8"
			>
				<div className="flex flex-col md:flex-row justify-around items-center gap-4">
					<div>
						<h2 className="text-3xl mb-3 w-fit text-dark pb-2  font-bold relative before:content-['']  before:h-5 before:bg-green before:w-full before:absolute before:bottom-2 before:left-0 before:-z-10">
							WIN NRO7O
						</h2>
						<p className="text-dark max-w-[540px] text-justify">
							<strong>Win Nro7o</strong> is a web application
							dedicated to tourism in Algeria, developed in
							collaboration with the Algerian Ministry of Tourism
							and Handicrafts. It serves as a virtual gateway to
							the world of tourism in Algeria, where visitors can
							explore tourist destinations, navigate interactive
							digital maps, enjoy online tours of various sites
							and events with interactive content, and discover a
							host of other astonishing features.
							<br className="mb-4" />
							But that is not all ! From the moment you step onto
							the platform <strong>Win Nro7o</strong>, you will be
							accompanied throughout your journey by the
							wonderful, engaging, and helpful{" "}
							<strong>Fennal</strong>, your virtual guide. Come
							and meet him to embark on a unique and unforgettable
							experience with him.
						</p>
					</div>
					<div className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] relative">
						<Image
							src={"/images/mocup.png"}
							alt=""
							fill
							className="object-contain"
						/>
					</div>
				</div>
			</section>
			<section className="min-h-screen w-full pt-24 px-8">
				<div className="flex flex-col md:flex-row-reverse justify-around items-center gap-4">
					<div>
						<h2 className="text-3xl mb-3 w-fit text-dark pb-2  font-bold relative before:content-['']  before:h-5 before:bg-green before:w-full before:absolute before:bottom-2 before:left-0 before:-z-10">
							UtoTech
						</h2>
						<p className="text-dark max-w-[540px] text-justify">
							Behind <strong>Win Nro7o</strong>, there is the
							passionate and talented team of the company{" "}
							<strong>UtoTech</strong>, combining creativity and
							precision to create unique and intuitive user
							experiences. With extensive expertise in developing
							cutting-edge technological solutions since 2010, our
							company, comprised of skilled developers, designers,
							and experienced professionals, is dedicated to
							delivering innovative and high-performing products
							that cater to the specific needs of our clients.
							<br className="mb-4" />
							We take pride in our commitment to technical
							excellence, data security, and customer
							satisfaction, as we strive to transform their
							visions into digital reality .
						</p>
					</div>
					<div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] relative">
						<Image
							src={"/images/uto-tech.png"}
							alt=""
							fill
							className="object-contain"
						/>
					</div>
				</div>
			</section>
			<section className="min-h-screen w-full px-8 flex items-center justify-center flex-col">
				<h2 className="text-3xl mb-3 w-fit text-dark pb-2  font-bold relative before:content-['']  before:h-5 before:bg-green before:w-full before:absolute before:bottom-2 before:left-0 before:-z-10">
					Meet out team
				</h2>
				<p className="text-dark text-center md:px-24 text-sm md:text-lg">
					Behind every successful project, there is a dedicated and
					talented team. Allow us to introduce you to our exceptional
					development team, who work tirelessly to bring innovative
					ideas to life. With their expertise and passion for
					technology, they are committed to delivering high-quality
					solutions that exceed your expectations.
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-8 gap-14 mt-7">
					{team.map((member) => (
						<div
							key={member.id}
							className="text-dark flex items-center justify-center flex-col"
						>
							<div className="w-[180px] h-[180px] rounded-full overflow-hidden relative shadow-md">
								<Image
									src={"/images/team/" + member.image}
									alt={member.fullName}
									fill
									className="object-cover object-center"
								/>
							</div>
							<h2 className="text-center mt-2 text-lg font-medium">
								{member.fullName}
							</h2>
							<h3 className="text-gray-500">
								{member.profession}
							</h3>
						</div>
					))}
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default About;
