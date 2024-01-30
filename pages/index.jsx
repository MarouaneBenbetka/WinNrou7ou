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
import { useErrorBoundary } from "react-error-boundary";
import { instance } from "@/utils/services/url";
import { getSession } from "next-auth/react";

const MapWrapper = dynamic(() => import("@/components/map/InteractiveMap"), {
	ssr: false,
});

export default function Home({ markers, wilayas, types, status }) {
	const { showBoundary } = useErrorBoundary();
	const { lang, mapView } = useSelector((state) => ({
		lang: state.ui.language,
		mapView: state.ui.mapView,
	}));
	const dispatch = useDispatch();
	const [mapLocked, setMapLocked] = useState(false);
	const searchBarRef = useRef();
	const mapRef = useRef();
	const heroRef = useRef();
	const [highlightedMarkers, setHighlightedMarkers] = useState([]);
	const [lastSearch, setLastSearch] = useState("");

	useEffect(() => {
		if (status != "ok") showBoundary(status);
	}, [status, showBoundary]);

	useEffect(() => {
		if (mapView) {
			mapRef.current.scrollIntoView({ behavior: "smooth" });
		} else {
			heroRef.current.scrollIntoView({ behavior: "smooth" });
			setMapLocked(false);
			dispatch(uiActions.disableScroll());
		}
	}, [mapView, dispatch]);

	const toggleLockMap = () => {
		setMapLocked((prev) => !prev);
		dispatch(uiActions.toggleScroll());
	};
	const searchHandler = async (query) => {
		if (!mapView) mapRef.current.scrollIntoView({ behavior: "smooth" });

		try {
			const res = await instance.get(`/api/monuments?q=${query}`);

			if (res.data.monuments.length === 0)
				throw Error("no result found , try another query");
			else setLastSearch(query);
			setHighlightedMarkers(res.data.monuments);
		} catch (e) {
			throw Error(e.message);
		}
	};
	const filterHandler = async (query) => {
		if (!mapView) mapRef.current.scrollIntoView({ behavior: "smooth" });
		console.log(query);
		if (query === "") setHighlightedMarkers([]);
		else {
			try {
				const res = await instance.get(
					`/api/monuments?q=${lastSearch}&wilaya=${
						query.wilaya
					}&types=${query.typeAnnonce
						.replaceAll(" ", "+")
						.replaceAll("&", "+")}`
				);
				if (res.data.monuments.length === 0)
					throw Error("no result found , try another query");

				setHighlightedMarkers(res.data.monuments);
			} catch (e) {
				throw Error(e.message);
			}
		}
	};

	return (
		<section>
			<HeroBg />
			<motion.div
				className="snap-start h-screen pt-20 flex items-center justify-center flex-col text-white relative z-30"
				variants={staggerContainer}
				initial="hidden"
				whileInView="show"
				ref={heroRef}
			>
				<motion.h1
					className="text-4xl md:text-6xl pb-2  font-semibold"
					variants={textVariant(0.4)}
					initial="hidden"
					animate="show"
				>
					{heroData["title1"][lang]}
				</motion.h1>
				<motion.h2
					className="text-4xl relative z-1 md:text-6xl font-semibold before:content-[''] before:h-5 before:bg-blue before:w-full before:absolute before:bottom-0 before:left-0 before:-z-10"
					variants={textVariant(0.4)}
					initial="hidden"
					animate="show"
				>
					{heroData["title2"][lang]}
				</motion.h2>
				<motion.p
					className="mx-5 md:mx-[20vw] text-center text-lg md:text-xl mt-6"
					variants={textVariant(0.6)}
					initial="hidden"
					animate="show"
				>
					{heroData["summary"][lang]}
				</motion.p>
				<Search
					ref={searchBarRef}
					onSearch={searchHandler}
					onFilter={filterHandler}
					stickTop={mapView}
					types={types}
					wilayas={wilayas}
				/>
			</motion.div>
			<div
				ref={mapRef}
				className="snap-start h-screen relative flex flex-col items-center"
			>
				{mapView && (
					<>
						<div className="fixed  bottom-2 top-auto md:top-2 md:bottom-auto right-28 md:right-2 z-50 flex flex-col-reverse md:flex-col  justify-center items-center">
							<input
								type="checkbox"
								className="toggle  bg-opacity-20 border-opacity-20  checked:bg-orange checked:border-orange"
								onClick={toggleLockMap}
								checked={mapLocked}
								readOnly
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
						<Suggestions
							id={lastSearch}
							moveToSuggestion={(e) => setHighlightedMarkers([e])}
						/>
					</>
				)}
				<MapWrapper
					lat={34.254999624124345}
					lng={3.291259381451609}
					lock={mapLocked}
					markers={markers}
					highlightedMarkers={highlightedMarkers}
				/>
			</div>
		</section>
	);
}

export async function getServerSideProps({ req }) {
	try {
		const session = await getSession({ req });

		if (session?.user?.type == "ADMIN") {
			return {
				redirect: {
					destination: "/dashboard/monuments",
					permanent: false,
				},
			};
		}
	} catch {
		console.log("error in checking auth");
	}

	try {
		const res = await instance.get("/api/monuments");
		const res1 = await instance.get("/api/wilayas");
		const res2 = await instance.get("/api/types");

		return {
			props: {
				markers: res?.data.monuments,
				wilayas: res1?.data.wilayas,
				types: res2?.data.types,
				status: "ok",
			},
		};
	} catch (e) {
		console.log(e);
		console.log(e.message);
		return {
			props: {
				markers: null,
				wilayas: null,
				types: null,
				status: "error",
			},
		};
	}
}
