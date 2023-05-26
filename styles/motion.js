export const staggerContainer = (staggerChildren, delayChildren) => ({
	hidden: {},
	show: {
		transition: {
			staggerChildren,
			delayChildren,
		},
	},
});
export const textVariant = (delay) => ({
	hidden: {
		y: 50,
		opacity: 0,
	},
	show: {
		y: 0,
		opacity: 1,
		transition: {
			type: "spring",
			duration: 1.25,
			delay,
		},
	},
});

export const zoomVariant = (delay) => ({
	hidden: {
		scale: 0.5,
		opacity: 0,
	},
	show: {
		scale: 1,
		opacity: 1,
		transition: {
			type: "spring",
			duration: 1.5,
			delay,
			stiffness: 110,
		},
	},
});
