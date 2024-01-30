import Image from "next/image";
import Router from "next/router";
const ErrorBoundaryUI = ({ error, resetErrorBoundary }) => {
	console.log(error);
	return (
		<div className=" bg-white flex flex-col items-center justify-center pb-10 min-h-screen">
			<div className="w-[650px] h-[260px] relative">
				<Image
					src={"/images/connection_error.png"}
					alt=""
					fill
					className="object-contain object-center"
				/>
			</div>

			<h1 className="text-dark text-[24px] max-w-[420px] text-center">
				Ooops! server connection failed
			</h1>
			<h3 className="text-gray-500 text-[18px]  text-center">
				Check your Internet connection and refresh the page .
			</h3>
			<button
				className="px-4 py-2 border border-dark rounded-md text-dark mt-4"
				onClick={() => {
					Router.reload();
				}}
			>
				Try again?
			</button>
		</div>
	);
};

export default ErrorBoundaryUI;
