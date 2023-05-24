import { useField } from "formik";

const CustomInput2 = ({ label, ...props }) => {
	const [field, meta] = useField(props);

	return (
		<div className="mb-4 w-full flex flex-col items-center">
			<input
				{...field}
				{...props}
				className={
					"block md:w-[500px] border-b-2 bg-transparent   focus:outline-none text-white px-1 py-2 text-xl focus:border-white  placeholder:text-white placeholder:opacity-70 placeholder:text-sm transition duration-300" +
					(meta.touched && meta.error
						? " border-red-500"
						: " border-white border-opacity-50")
				}
			/>
			{meta.touched && meta.error && (
				<div className="text-red-500 text-sm mr-auto font-semibold">
					{meta.error}
				</div>
			)}
		</div>
	);
};
export default CustomInput2;
