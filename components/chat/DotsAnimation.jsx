import React from "react";
import { motion } from "framer-motion";

const loadingCircle = {
	display: "block",
	width: "0.5rem",
	height: "0.5rem",
	backgroundColor: "black",
	borderRadius: "0.25rem",
	opacity: 0.6,
};

const loadingContainerVariants = {
	start: {
		transition: {
			staggerChildren: 0.2,
		},
	},
	end: {
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const loadingCircleVariants = {
	start: {
		y: "-50%",
	},
	end: {
		y: "20%",
	},
};

const loadingCircleTransition = {
	duration: 0.5,
	repeat: Infinity,
	repeatType: "reverse",
	ease: "easeInOut",
};

export default function DotsAnimation() {
	return (
		<motion.div
			variants={loadingContainerVariants}
			initial="start"
			animate="end"
			className="flex gap-1 my-auto items-center justify-center"
		>
			<motion.span
				style={loadingCircle}
				variants={loadingCircleVariants}
				transition={loadingCircleTransition}
			/>
			<motion.span
				style={loadingCircle}
				variants={loadingCircleVariants}
				transition={loadingCircleTransition}
			/>
			<motion.span
				style={loadingCircle}
				variants={loadingCircleVariants}
				transition={loadingCircleTransition}
			/>
		</motion.div>
	);
}
