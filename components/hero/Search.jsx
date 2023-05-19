import { FiSearch } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";
import { useSpring, animated } from "react-spring";
import React, { useState } from "react";
import Selector from "./Selector";
import Dropdown from "./Dropdown";
import { wilayas } from "@/data/data";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";

const Search = ({ onSearch, onFilter, stickTop }, ref) => {
	const [showFilters, setShowFilters] = useState(false);
	const [searchedText, setSearchedText] = useState("");
	const [filterData, setFilterData] = useState({
		typeAnnonce: "",
		wilaya: "",
	});
	const [openedList, setOpenedLists] = useState({
		type: false,
		wilaya: false,
	});
	const [collapsedBar, setCollapsedBar] = useState(false);

	const changeTypeHandler = (type) => {
		setFilterData((prev) => ({ ...prev, typeAnnonce: type }));
		// console.log(type);
	};
	const changeWilayaHandler = (wilaya) => {
		setFilterData((prev) => ({
			...prev,
			wilaya: wilaya,
		}));
		// console.log(wilaya);
	};

	const toggleCollapseHanlder = () => {
		setCollapsedBar((prev) => !prev);
	};

	const openTypeList = (state) => {
		state
			? setOpenedLists({
					wilaya: false,
					type: true,
			  })
			: setOpenedLists((prev) => ({ ...prev, type: state }));
	};
	const openWilayaList = (state) => {
		state
			? setOpenedLists({
					wilaya: true,
					type: false,
			  })
			: setOpenedLists((prev) => ({ ...prev, wilaya: state }));
	};

	// animation for the filters bar
	const openAnimation = useSpring({
		from: { maxHeight: "0" },
		to: { maxHeight: showFilters ? "200px" : "0" },
		config: { duration: "250" },
	});

	return (
		//     /	top: 0;
		// background-color: #d5dd18dd;
		// width: 80vw;
		// margin-top: 0;
		// border-radius: 0;
		// border-bottom-left-radius: 80px;
		// border-bottom-right-radius: 80px;
		<div
			ref={ref}
			className={` ${
				showFilters && !stickTop
					? " px-6 py-3 bg-dark backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-3xl  "
					: ""
			} ${
				stickTop
					? `${
							!collapsedBar && "stickyAnimation"
					  } w-[100vw] md:w-[80vw] mt-0 rounded-b-[30px] md:rounded-b-[80px] bg-green fixed top-0 `
					: "mt-10"
			}`}
		>
			<div className="flex items-center justify-center">
				<div
					className={`${
						stickTop
							? "w-[65vw]  lg:w-[50vw]"
							: "w-[70vw] md:w-[60vw] lg:w-[40vw]"
					}   md:w-[60vw] lg:w-[40vw] relative flex flex-col  justify-center mr-4 `}
				>
					{stickTop && (
						<div
							className={`floatAnimation ${
								collapsedBar
									? "fixed -top-1 left-0 md:left-[70px]"
									: "absolute -left-8 md:-left-24 rounded-3xl"
							} cursor-pointer rounded-b-xl  bg-green`}
							onClick={toggleCollapseHanlder}
						>
							<MdOutlineKeyboardDoubleArrowUp
								color="#fff"
								size={38}
								className={
									(collapsedBar ? "rotate-180" : "rotate-0") +
									" transition-all ease-in-out duration-500"
								}
							/>
						</div>
					)}
					{(!stickTop || !collapsedBar) && (
						<>
							<button
								type="submit"
								className="absolute right-3"
								onClick={(e) => {
									e.preventDefault();
									onSearch(searchedText);
								}}
							>
								<FiSearch size="30px" color="#069ADF" />
							</button>
							<div className="my-4 pl-3 md:pl-0">
								<input
									type="text"
									name="search"
									placeholder="Explorer l'algerie ... "
									className="text-dark w-full pl-6 pr-12 py-3 bg-white2 placeholder-gray-500 rounded-xl border-white ring-2 ring-gray-200 focus:outline-blue focus:outline-none  "
									onChange={(e) =>
										setSearchedText(e.target.value)
									}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											setShowFilters(false);
										}
									}}
								/>
							</div>
						</>
					)}
				</div>
				{(!stickTop || !collapsedBar) && (
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
				)}
			</div>

			{/* filter bar */}
			{(!stickTop || !collapsedBar) && (
				<animated.div
					className={
						"relative  z-10 " + (!showFilters && "overflow-hidden")
					}
					style={openAnimation}
				>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							onFilter(filterData);
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

							<button className=" px-4 py-2 h-fit text-white bg-blue bg-opacity-70 rounded-[10px] font-semibold border-2 border-blue border-opacity-70  hover:bg-dark hover:text-white  transition">
								Filtrer
							</button>
						</div>
					</form>
				</animated.div>
			)}
		</div>
	);
};

export default React.forwardRef(Search);
