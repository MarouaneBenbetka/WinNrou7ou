import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import SignInForm from "./SignInForm";

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
		<AnimatePresence mode="wait">
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
						className="bg-white  mx-auto   rounded-3xl  z-[400]"
						variants={modalVariant}
						initial="hidden"
						animate="show"
						exit={"hidden"}
					>
						<SignInForm />
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};

export default Modal;
