import { useRef, useState } from "react";
import { navLinks } from "../../data/data";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import { useSelector } from "react-redux";
import LanguagePicker from "../navbar/LanguagePicker";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoMdNotificationsOutline } from "react-icons/io";
import Image from "next/image";

const Navbar = ({ setShowModal }) => {
	const [navMobile, setNavMobile] = useState(false);
	const [lang, navBarColor] = useSelector((state) => [
		state.ui.language,
		state.ui.navBarColor,
	]);
	const [isAuth, setIsAuth] = useState(false);
	const { pathname } = useRouter();

	const openAnimation = useSpring({
		from: { maxHeight: "0px" },
		to: { maxHeight: navMobile ? "1000px" : "0px" },
		config: { duration: "200" },
	});

	return (
		pathname !== "/signup" && (
			<div
				className={`snap-start z-50  top-0 w-screen ${
					pathname === "/" ? "absolute" : "fixed"
				} ${
					navMobile || navBarColor === "blur"
						? " bg-[#0B1723] backdrop-filter backdrop-blur-xl bg-opacity-40 "
						: " bg-transparent"
				} md:transition md:ease-in-out md:duration-200`}
			>
				<div className="flex justify-between items-center   sm:px-8  py-4 md:px-4 lg:px-8 relative">
					<div className="ml-4">
						<h1>logo</h1>
					</div>
					<ul
						className={
							"hidden md:flex items-center gap-2 " +
							(lang === "Arabic"
								? " flex-row-reverse"
								: "flex-row")
						}
					>
						{navLinks.map((navLink, index) => (
							<li
								key={index}
								className="relative md:px-3 lg:px-5 nav-link cursor-pointer"
							>
								<Link
									href={navLink.id}
									className={" text-[18px] "}
								>
									{navLink["title" + lang]}
								</Link>
							</li>
						))}
					</ul>

					<div className="hidden mr-3 md:flex items-center gap-4">
						{pathname === "/" && <LanguagePicker />}

						{isAuth ? (
							<button
								className="px-4 py-2 hover:text-green hover:bg-transparent  rounded-[10px] font-bold border-2 border-green bg-green text-dark transition"
								onClick={() => {
									setShowModal(true);
								}}
							>
								{lang === "Arabic" ? "تسجيل الدخول" : "login"}
							</button>
						) : (
							<Link
								className="flex items-center gap-2 cursor-pointer"
								href="/user"
							>
								<IoMdNotificationsOutline size={26} />
								<div className="w-[48px] h-[48px]  rounded-full overflow-hidden relative border-2 border-blue">
									<Image
										src={
											"https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
										}
										alt=""
										fill
									/>
								</div>
							</Link>
						)}
					</div>

					{/* mobile nav bar */}
					<div className="block md:hidden  cursor-pointer ">
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
								"fixed flex flex-col z-20 justify-start items-center gap-4 bg-[#0B1723] backdrop-filter backdrop-blur-xl bg-opacity-40    px-8   text-center top-[62px] left-0 w-screen h-[calc(100vh-64px)]  overflow-hidden"
							}
						>
							<div className="flex flex-col items-center justify-center pt-20">
								<ul className="flex flex-col  w-screen ">
									{navLinks.map((navLink, index) => (
										<Link key={index} href={navLink.id}>
											<li
												className="relative w-screen text-[18px] p-4  focus:bg-zinc-900 hover:bg-zinc-900  rounded-lg focus:underline"
												onClick={() => {
													setNavMobile(false);
												}}
											>
												{navLink["title" + lang]}
											</li>
										</Link>
									))}
								</ul>
								<div className="flex gap-4 items-center ">
									<LanguagePicker />
									<button
										className="mt-2 px-4 py-2 text-green  rounded-[10px] font-semibold border-2 border-green hover:bg-green hover:text-dark transition "
										onClick={() => {
											setNavMobile(false);
											setShowModal(true);
										}}
									>
										Login
									</button>
								</div>
							</div>
						</animated.div>
					</div>
				</div>
			</div>
		)
	);
};

export default Navbar;
