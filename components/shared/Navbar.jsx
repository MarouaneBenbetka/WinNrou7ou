import { useRef, useState } from "react";
import { navLinks } from "../../data/data";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import { useSelector } from "react-redux";
import LanguagePicker from "../navbar/LanguagePicker";

const Navbar = () => {
	const [navMobile, setNavMobile] = useState(false);
	const ui = useSelector((state) => state.ui);
	const lang = useSelector((state) => state.ui.language);

	const openAnimation = useSpring({
		from: { maxHeight: "0px" },
		to: { maxHeight: navMobile ? "1000px" : "0px" },
		config: { duration: "200" },
	});

	return (
		<div
			className={`z-50  top-0 w-screen fixed ${
				navMobile || ui.navBarColor === "blur"
					? " bg-dark backdrop-filter backdrop-blur-lg bg-opacity-70 "
					: " bg-transparent"
			} md:transition md:ease-in-out md:duration-200`}
		>
			<div className="flex justify-between items-center   sm:px-8  py-4 md:px-4 lg:px-8">
				<div className="ml-4">
					<h1>logo</h1>
				</div>
				<ul
					className={
						"hidden md:flex items-center gap-2 " +
						(lang === "Arabic" ? " flex-row-reverse" : "flex-row")
					}
				>
					{navLinks.map((navLink, index) => (
						<li
							key={index}
							className="relative md:px-3 lg:px-5 nav-link cursor-pointer"
						>
							<a
								href={index === 0 ? "#" : `#${navLink.id}`}
								className={" text-[18px] s"}
							>
								{navLink["title" + lang]}
							</a>
						</li>
					))}
				</ul>

				<div className="hidden mr-3 md:flex items-center gap-4">
					<LanguagePicker />

					<button className="px-4 py-2 hover:text-green hover:bg-transparent  rounded-[10px] font-bold border-2 border-green bg-green text-dark transition">
						{lang === "Arabic" ? "تسجيل الدخول" : "login"}
					</button>
				</div>

				<div className="block md:hidden relative cursor-pointer ">
					{navMobile ? (
						<FaTimes
							className="text-3xl mr-4"
							onClick={() => setNavMobile(!navMobile)}
						/>
					) : (
						<FaBars
							className="text-3xl mr-4"
							onClick={() => setNavMobile(!navMobile)}
						/>
					)}

					<animated.div
						style={openAnimation}
						className={
							"absolute flex flex-col z-20 justify-start items-center gap-4 bg-dark backdrop-filter backdrop-blur-lg bg-opacity-70  rounded-lg px-8   text-center top-10 right-0 w-screen h-screen overflow-hidden"
						}
					>
						<ul className="flex flex-col  ">
							{navLinks.map((navLink, index) => (
								<li
									key={index}
									className="relative w-screen  focus:bg-zinc-900 hover:bg-zinc-900 p-4 rounded-lg focus:underline"
									onClick={() => {
										setNavMobile(false);
									}}
								>
									<a
										href={
											index === 0 ? "#" : `#${navLink.id}`
										}
										className="w-full text-[20px]"
									>
										{navLink.title}
									</a>
								</li>
							))}
						</ul>
						<div className="flex flex-col gap-4">
							<button className="mt-2 px-4 py-2 text-green  rounded-[10px] font-semibold border-2 border-green hover:bg-green hover:text-dark transition ">
								Login
							</button>
						</div>
					</animated.div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
