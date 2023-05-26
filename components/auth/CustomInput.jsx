import { useField } from "formik";

const CustomInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);

	return (
		<div className="mb-4 w-full flex flex-col items-center">
			<input
				{...field}
				{...props}
				className={
					"w-[90%] md:w-[78%] border-b-2 text-dark  focus:outline-none  px-1 py-2 text-xl focus:border-orange placeholder:text-sm transition duration-300 " +
					(meta.touched && meta.error
						? " border-red-500"
						: " border-gray-400")
				}
			/>
			{meta.touched && meta.error && (
				<div className="text-red-500 text-sm mr-auto ml-12">
					{meta.error}
				</div>
			)}
		</div>
	);
};
export default CustomInput;
