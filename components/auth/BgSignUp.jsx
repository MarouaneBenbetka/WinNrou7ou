import Image from "next/image";

const BgSignUp = () => {
	return (
		<>
			<div className="absolute top-0 left-0 hidden md:block md:w-[300px] h-[120px] z-30">
				<Image
					src={"/images/modal-top.png"}
					fill
					alt=""
					className="object-cover"
				/>
			</div>
			<div className="absolute hidden md:block bottom-0 right-0 w-[240px] h-[150px] z-30">
				<Image
					src={"/images/modal-bottom.png"}
					fill
					alt=""
					className="object-cover"
				/>
			</div>
			<div className="absolute hidden md:block top-0 left-0 w-full h-[85vh] z-10">
				<Image
					src={"/images/signup-bg-shapes.png"}
					fill
					alt=""
					className="object-fill"
				/>
			</div>
		</>
	);
};

export default BgSignUp;
