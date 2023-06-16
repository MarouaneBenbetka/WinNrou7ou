import Image from "next/image";

const NoData = ({ closeModal }) => {
	return (
		<div className="flex flex-col items-center justify-center  mt-20">
			<div className="w-[100px] h-[120px] relative">
				<Image
					alt="no data"
					src={"/images/no_data.png"}
					fill
					className="object-contain"
				/>
			</div>
			<p className="font-semibold text-xl text-dark text-center mt-5">
				Sorry, no data available at the moment.
			</p>
			<h3 className="text-gray-500 text-md  text-center mx-6 mt-1">
				We&apos;re working on adding it soon. Stay tuned!
			</h3>
			<button
				className="border hover:border-gray-700 rounded-md  px-6  py-2 mt-5  hover:text-gray-700 transition-all border-blue text-blue "
				onClick={() => {
					closeModal();
				}}
			>
				Exit
			</button>
		</div>
	);
};

export default NoData;
