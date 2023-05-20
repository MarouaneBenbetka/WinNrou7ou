import HeroBg from "@/components/hero/HeroBg";
import { useDispatch, useSelector } from "react-redux";
import { heroData } from "@/data/data";
import Search from "@/components/hero/Search";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Suggestions from "@/components/suggestions/Suggestions";
import { uiActions } from "@/store/ui-slice";
import { motion } from "framer-motion";
import { staggerContainer, textVariant } from "../styles/motion";
import Image from "next/image";

const MapWrapper = dynamic(() => import("@/components/map/InteractiveMap"), {
	ssr: false,
});

export default function Home() {
	const { lang, mapView } = useSelector((state) => ({
		lang: state.ui.language,
		mapView: state.ui.mapView,
	}));
	const dispatch = useDispatch();
	const [mapLocked, setMapLocked] = useState(false);
	const searchBarRef = useRef();
	const mapRef = useRef();

	useEffect(() => {
		if (mapView) {
			mapRef.current.scrollIntoView({ behavior: "smooth" });
		} else {
			setMapLocked(false);
			dispatch(uiActions.disableScroll());
		}
	}, [mapView]);

	const toggleLockMap = () => {
		setMapLocked((prev) => !prev);
		dispatch(uiActions.toggleScroll());
	};
	const searchHandler = (query) => {
		console.log(query);
		mapRef.current.scrollIntoView({ behavior: "smooth" });
	};
	const filterHandler = (query) => {
		console.log(query);
		mapRef.current.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<motion.section
			variants={staggerContainer}
			initial="hidden"
			whileInView="show"
		>
			<HeroBg />
			<div className="snap-start h-screen pt-20 flex items-center justify-center flex-col text-white relative z-30">
				<motion.h1
					className="text-4xl md:text-6xl pb-2  font-semibold"
					variants={textVariant(0.3)}
				>
					{heroData["title1"][lang]}
				</motion.h1>
				<motion.h2
					className="text-4xl relative z-1 md:text-6xl font-semibold before:content-[''] before:h-5 before:bg-blue before:w-full before:absolute before:bottom-0 before:left-0 before:-z-10"
					variants={textVariant(0.3)}
				>
					{heroData["title2"][lang]}
				</motion.h2>
				<motion.p
					className="mx-5 md:mx-[20vw] text-center text-lg md:text-xl mt-6"
					variants={textVariant(0.5)}
				>
					{heroData["summary"][lang]}
				</motion.p>
				<Search
					ref={searchBarRef}
					onSearch={searchHandler}
					onFilter={filterHandler}
					stickTop={mapView}
				/>
			</div>
			<div
				ref={mapRef}
				className="snap-start h-screen relative flex flex-col items-center"
			>
				{mapView && (
					<>
						<div className="fixed  bottom-2 top-auto md:top-2 md:bottom-auto right-14 md:right-2 z-50 flex flex-col-reverse md:flex-col  justify-center items-center">
							<input
								type="checkbox"
								className="toggle  bg-opacity-20 border-opacity-20  checked:bg-orange checked:border-orange"
								onClick={toggleLockMap}
								checked={mapLocked}
							/>
							<h3
								className={
									mapLocked
										? "text-orange font-semibold"
										: "text-gray-600 font-semibold"
								}
							>
								lock map
							</h3>
						</div>
						<Suggestions />
					</>
				)}
				<MapWrapper lat={28} lng={2} lock={mapLocked} />
			</div>
		</motion.section>
	);
}
