import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";

const backdropVariant = {
	show: { opacity: 1 },
	hidden: { opacity: 0 },
};

const modalVariant = {
	hidden: { y: "-100vh", opacity: 0, scale: 0 },
	show: {
		y: 0,
		opacity: 1,
		scale: 1,
		transition: { delay: 0.2, type: "spring" },
	},
};

const Modal = ({ showModal, setShowModal }) => {
	return (
		<AnimatePresence mode="wait" onExitComplete={() => setShowModal(false)}>
			{showModal && (
				<div className="fixed top-0 left-0 z-[100] h-screen w-screen flex justify-center items-center">
					<motion.div
						className="-z-10 fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 "
						variants={backdropVariant}
						initial="hidden"
						animate="show"
						exit={"hidden"}
						onClick={() => {
							setShowModal(false);
						}}
					></motion.div>
					<motion.div
						className="bg-white w-[75vw] md:w-[490px] h-[480px] mx-auto  p-8 rounded-3xl text-center z-[400] relative flex flex-col justify-start items-center pt-16"
						variants={modalVariant}
						initial="hidden"
						animate="show"
						exit={"hidden"}
					>
						<div className="absolute top-0 left-0 hidden md:block md:w-[180px] h-[90px]">
							<Image
								src={"/images/modal-top.png"}
								fill
								alt=""
								className="object-cover"
							/>
						</div>

						<div className="absolute hidden md:block bottom-0 right-0 w-[150px] h-[80px]">
							<Image
								src={"/images/modal-bottom.png"}
								fill
								alt=""
								className="object-cover"
							/>
						</div>

						<Image
							src={"/images/logo_name.png"}
							alt=""
							width={60}
							height={50}
						/>
						<input
							type="text"
							className="w-[74%] border-b-2 border-gray-500 focus:outline-none text-dark px-1 py-2 text-xl focus:border-orange placeholder:text-sm transition duration-300 mb-4"
							placeholder="Email"
						/>
						<input
							type="text"
							className="w-[74%] border-b-2 border-gray-500 focus:outline-none text-dark px-1 py-2 text-xl focus:border-orange placeholder:text-sm transition duration-300"
							placeholder="Password"
						/>
						<button className="bg-orange rounded-xl  py-2 px-4 text-lg font-semibold text-white mt-7 hover:scale-[1.05] transition  ">
							login
						</button>
						<p className="text-xs text-gray-500 mt-2">
							No account?{" "}
							<Link href={"/signup"} className="text-orange">
								Register
							</Link>{" "}
						</p>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};

export default Modal;
