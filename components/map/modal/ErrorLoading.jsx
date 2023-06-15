import Image from "next/image";

const ErrorLoading = ({ closeModal }) => {
	return (
		<div className="flex flex-col items-center justify-center  mt-20">
			<div className="w-[120px] h-[160px] relative">
				<Image
					alt="no data"
					src={"/images/no_data.png"}
					fill
					className="object-contain"
				/>
			</div>
			<p className="font-semibold text-xl text-dark text-center mt-5">
				Unable to fetch data.
			</p>
			<h3 className="text-gray-500 text-md  text-center mx-6 mt-1">
				Check your Internet connection
			</h3>
			<button
				className="border hover:border-gray-700 rounded-md  px-6  py-2 mt-5  hover:text-gray-700 transition-all border-blue text-blue "
				onClick={() => {
					console.log("hi");
					closeModal();
				}}
			>
				Exit
			</button>
		</div>
	);
};

export default ErrorLoading;
