import { FiSearch } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";
import { useSpring, animated } from "react-spring";
import React, { useState } from "react";
import Selector from "./Selector";
import Dropdown from "./Dropdown";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { motion } from "framer-motion";
import { zoomVariant } from "@/styles/motion";
import { MoonLoader } from "react-spinners";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Search = ({ onSearch, onFilter, stickTop, wilayas, types }, ref) => {
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
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

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

	const searchHandler = async (query) => {
		setLoading(true);
		setError(false);
		try {
			await onSearch(query);
			setLoading(false);
		} catch (e) {
			console.log(e);
			setLoading(false);
			setError(true);
			setErrorMessage(e.message);
		}
	};
	const filterHandler = async (query) => {
		setLoading(true);
		setError(false);
		try {
			await onFilter(query);
			setLoading(false);
		} catch (e) {
			console.log(e);
			setLoading(false);
			setError(true);
			setErrorMessage(e.message);
		}
	};

	return (
		<motion.div
			ref={ref}
			className={` ${
				showFilters && !stickTop
					? " px-6 py-3 bg-dark backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-3xl  "
					: ""
			} ${
				stickTop
					? `${
							!collapsedBar && "slideDownAnimation"
					  } w-[100vw] md:w-[80vw] mt-0 rounded-b-[30px] md:rounded-b-[80px] bg-green fixed top-0 `
					: "mt-10"
			}`}
			variants={zoomVariant(0.9)}
			initial="hidden"
			animate="show"
		>
			<div className="flex items-center justify-center">
				<div
					className={`${
						stickTop
							? "w-[65vw]  lg:w-[50vw]"
							: "w-[70vw] md:w-[60vw] lg:w-[40vw]"
					}   md:w-[54vw] lg:w-[40vw] relative flex flex-col  justify-center mr-4 `}
				>
					{stickTop && (
						<div
							className={`floatAnimation ${
								collapsedBar
									? "fixed -top-1 left-0 md:left-[70px]"
									: "absolute  -left-11 lg:-left-24 rounded-3xl"
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
								className="absolute right-3 z-10 top-6"
								onClick={(e) => {
									e.preventDefault();
									searchHandler(searchedText);
								}}
								disabled={loading}
							>
								{loading ? (
									<div className=" flex">
										<MoonLoader size={26} color="#069ADF" />
									</div>
								) : (
									<FiSearch size="30px" color="#069ADF" />
								)}
							</button>
							<div
								className={
									"mt-4 pl-3 md:pl-0 relative" +
									(error ? " mb-9" : " mb-4")
								}
							>
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
											searchHandler(searchedText);
										}
									}}
								/>
								{error && (
									<div className="flex items-center gap-2 text-red-600 absolute top-[54px] left-4 font-medium">
										<AiOutlineCloseCircle
											className="text-red-600 cursor-pointer"
											size={20}
											onClick={() => setError(false)}
										/>
										<p>{errorMessage}</p>
									</div>
								)}
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
							filterHandler(filterData);
							setOpenedLists("");
						}}
					>
						<div className=" mt-2 mb-4 flex gap-x-2 gap-y-[6px] justify-center items-end flex-wrap relative z-10 overflow-visible">
							<Selector
								label="Type"
								onChangeValue={changeTypeHandler}
								open={openedList.type}
								onOpened={openTypeList}
								items={types}
							/>

							<Selector
								label="Wilaya"
								onChangeValue={changeWilayaHandler}
								open={openedList.wilaya}
								onOpened={openWilayaList}
								items={wilayas}
							/>

							<button
								className=" px-4 py-2 h-fit text-white bg-blue bg-opacity-70 rounded-[10px] font-semibold border-2 border-blue border-opacity-70  hover:bg-dark hover:text-white  transition"
								disabled={loading}
							>
								Filtrer
							</button>
						</div>
					</form>
				</animated.div>
			)}
		</motion.div>
	);
};

export default React.forwardRef(Search);
