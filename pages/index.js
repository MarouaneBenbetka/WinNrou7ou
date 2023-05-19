import HeroBg from "@/components/hero/HeroBg";
import { useSelector } from "react-redux";
import { heroData } from "@/data/data";
import Search from "@/components/hero/Search";
import InteractiveMap from "@/components/map/InteractiveMap";
import { useRef } from "react";

export default function Home() {
	const { lang, mapView } = useSelector((state) => ({
		lang: state.ui.language,
		mapView: state.ui.mapView,
	}));

	const searchBarRef = useRef();

	const searchHandler = (query) => {
		console.log(query);
	};
	const filterHandler = (query) => {
		console.log(query);
	};

	return (
		<section className={"relative font-poppins"}>
			<HeroBg />
			<div className="min-h-screen pt-20 flex items-center justify-center flex-col text-white relative z-30  ">
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
			<InteractiveMap />
		</section>
	);
}
