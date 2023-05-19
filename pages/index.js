import HeroBg from "@/components/hero/HeroBg";
import { useSelector } from "react-redux";
import { heroData } from "@/data/data";
import Search from "@/components/hero/Search";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { uiActions } from "@/store/ui-slice";
import { useDispatch } from "react-redux";

const MapWrapper = dynamic(() => import("@/components/map/InteractiveMap"), {
	ssr: false,
});

export default function Home() {
	const { lang, mapView } = useSelector((state) => ({
		lang: state.ui.language,
		mapView: state.ui.mapView,
	}));
	const scrollContainerRef = useRef();
	const searchBarRef = useRef();

	const searchHandler = (query) => {
		console.log(query);
	};
	const filterHandler = (query) => {
		console.log(query);
	};

	const ui = useSelector((state) => state.ui);
	const dispatcher = useDispatch();

	const handleScroll = () => {
		dispatcher(
			uiActions.scrollChanged(scrollContainerRef.current.scrollTop)
		);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		// Function to update window height when resized
		dispatcher(uiActions.onResize(window.innerHeight));

		function handleResize() {
			dispatcher(uiActions.onResize(window.innerHeight));
		}

		// Event listener for window resize
		window.addEventListener("resize", handleResize);

		// Clean up the event listener
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<section
			className="snap-y  relative font-poppins max-h-screen overflow-y-auto"
			onScroll={handleScroll}
			ref={scrollContainerRef}
		>
			<div className="snap-start h-screen pt-20 flex items-center justify-center flex-col text-white relative z-30">
				<h1 className="text-4xl md:text-6xl pb-2  font-semibold">
					{heroData["title1"][lang]}
				</h1>
				<h2 className="text-4xl relative z-1 md:text-6xl font-semibold before:content-[''] before:h-5 before:bg-blue before:w-full before:absolute before:bottom-0 before:left-0 before:-z-10">
					{heroData["title2"][lang]}
				</h2>
				<p className="mx-5 md:mx-[20vw] text-center text-lg md:text-xl mt-6">
					{heroData["summary"][lang]}
				</p>
				<Search
					ref={searchBarRef}
					onSearch={searchHandler}
					onFilter={filterHandler}
					stickTop={mapView}
				/>
			</div>
			<div className="snap-start h-screen">
				<MapWrapper lat={28} lng={2} />
			</div>
			<HeroBg />
		</section>
	);
}
