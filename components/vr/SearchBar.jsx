import { wilayas } from "@/data/data";
import { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";

const SearchBar = ({ setWilaya, openModal }) => {
	const [inputValue, setInputValue] = useState("");
	const dropdownRef = useRef();
	const blurInput = () => {
		dropdownRef.current.blur();
	};
	return (
		<div className="relative dropdown ">
			<div className="w-[70vw] md:w-[40vw] relative">
				<input
					className="btn bg-white hover:bg-white hover:border-orange w-full text-dark px-4 py-3 border-2 border-orange focus:outline-none rounded-2xl"
					type="text"
					placeholder="type name of the city ..."
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<BsSearch
					size={28}
					className="text-orange absolute right-3 top-3"
				/>
			</div>
			<ul
				tabIndex={0}
				className="p-2   dropdown-content menu bg-base-100 rounded-box w-full text-dark  border border-gray-400 mt-3 max-h-[200px] overflow-y-scroll"
				ref={dropdownRef}
			>
				{wilayas.map((wilaya) => {
					if (
						wilaya.key
							.toLowerCase()
							.includes(inputValue.toLowerCase())
					)
						return (
							<li
								key={wilaya.key}
								className="border rounded-lg border-gray-200"
								onClick={() => {
									setInputValue(wilaya.key);
									blurInput();
									setWilaya(wilaya.key);
									openModal();
								}}
							>
								<p>{wilaya.value}</p>
							</li>
						);
				})}
			</ul>
		</div>
	);
};

export default SearchBar;
