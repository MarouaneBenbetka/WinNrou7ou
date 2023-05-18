import { FiSearch } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";
import { useSpring, animated } from "react-spring";
import { useState } from "react";
import Selector from "./Selector";
import Dropdown from "./Dropdown";
import { wilayas } from "@/data/data";

export default function Search() {
	const [showFilters, setShowFilters] = useState(false);
	const [searchedText, setSearchedText] = useState("");
	const [filterData, setFilterData] = useState({
		typeAnnonce: "",
		wilaya: "",
		commune: "",
		dateDebut: "",
		dateFin: "",
	});
	const [openedList, setOpenedLists] = useState({
		type: false,
		wilaya: false,
	});

	const changeTypeHandler = (type) => {
		setFilterData((prev) => ({ ...prev, typeAnnonce: type }));
		// console.log(type);
	};
	const changeWilayaHandler = (wilaya) => {
		setFilterData((prev) => ({
			...prev,
			wilaya: wilaya,
			commune: "",
		}));
		// console.log(wilaya);
	};
	const openTypeList = (state) => {
		state
			? setOpenedLists({
					wilaya: false,
					commune: false,
					type: true,
			  })
			: setOpenedLists((prev) => ({ ...prev, type: state }));
	};
	const openWilayaList = (state) => {
		state
			? setOpenedLists({
					wilaya: true,
					commune: false,
					type: false,
			  })
			: setOpenedLists((prev) => ({ ...prev, wilaya: state }));
	};

	// animation for the filters bar
	const openAnimation = useSpring({
		from: { maxHeight: "0" },
		to: { maxHeight: showFilters ? "1000px" : "0" },
		config: { duration: "300" },
	});

	return (
		<div
			className={
				showFilters
					? "mt-10  px-6 py-3 bg-dark backdrop-filter backdrop-blur-lg bg-opacity-10 rounded-3xl  "
					: "mt-10 "
			}
		>
			<div className="flex items-center">
				<div className="w-full relative flex flex-col  justify-center mr-4 ">
					<button
						type="submit"
						className="absolute right-3"
						onClick={(e) => {}}
					>
						<FiSearch size="30px" color="#069ADF" />
					</button>
					<div className="my-4">
						<input
							type="text"
							name="search"
							placeholder="Explorer l'algerie ... "
							className="text-dark w-[40vw] pl-6 pr-12 py-3 bg-white2 placeholder-gray-500 rounded-xl border-white ring-2 ring-gray-200 focus:outline-blue focus:outline-none  "
							onChange={(e) => setSearchedText(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									setShowFilters(false);
								}
							}}
						/>
					</div>
				</div>
				<div
					className="cursor-pointer"
					onClick={() => setShowFilters(!showFilters)}
				>
					<VscSettings
						size="34px"
						className="rotate-90 hover:scale-[1.06]"
						color="#069ADF"
					/>
				</div>
			</div>

			{/* filter bar */}

			<animated.div
				className={
					"relative  z-10 " + (!showFilters && "overflow-hidden")
				}
				style={openAnimation}
			>
				<form
					onSubmit={(e) => {
						// onFilter(e, filterData);
						setOpenedLists("");
					}}
				>
					<div className=" mt-2 mb-4 flex gap-x-2 gap-y-[6px] justify-center items-end flex-wrap relative z-10 overflow-visible">
						<Selector
							label="Type"
							onChangeValue={changeTypeHandler}
							open={openedList.type}
							onOpened={openTypeList}
						/>

						<Dropdown
							items={wilayas}
							label="Wilaya"
							onChangeValue={changeWilayaHandler}
							open={openedList.wilaya}
							onOpened={openWilayaList}
							value={filterData.wilaya}
						/>

						<button className=" px-4 py-2 h-fit text-white bg-purple rounded-[10px] font-semibold border-2 border-purple  hover:bg-white2 hover:text-purple  transition">
							Filtrer
						</button>
					</div>
				</form>
			</animated.div>
		</div>
	);
}
