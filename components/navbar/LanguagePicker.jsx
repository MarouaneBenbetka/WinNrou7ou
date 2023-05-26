import { languages } from "@/data/data";
import { useRef, useState } from "react";
import { MdOutlineLanguage } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "@/store/ui-slice";

const LanguagePicker = () => {
	const dropDownRef = useRef();
	const [isFocused, setIsFocused] = useState(false);
	const dispatch = useDispatch();
	const lang = useSelector((state) => state.ui.language);

	const handleBlur = () => {
		if (isFocused) {
			dropDownRef.current.blur();
			setIsFocused(false);
		} else {
			setIsFocused(true);
		}
	};
	const switchLanguage = (lang) => {
		dispatch(uiActions.setLanguage(lang));
	};
	return (
		<div className="dropdown dropdown-end ">
			<label
				tabIndex={0}
				className="btn bg-transparent border-none  hover:bg-opacity-20"
				onClick={handleBlur}
				ref={dropDownRef}
				onBlur={handleBlur}
			>
				<MdOutlineLanguage size={34} color="#D5DD18" />
			</label>
			<ul
				tabIndex={0}
				className="dropdown-content menu p-2 shadow  rounded-box w-[160px] bg-dark backdrop-filter backdrop-blur-lg bg-opacity-70 "
			>
				{languages.map((item) => (
					<li
						key={item.id}
						className="rounded hover:bg-gray-700 focus:bg-gray-700"
						onClick={() => {
							switchLanguage(item.lanEnglish);
						}}
					>
						<p>
							<span className="text-2xl ">{item.flag}</span>
							{item["lan" + lang]}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default LanguagePicker;
