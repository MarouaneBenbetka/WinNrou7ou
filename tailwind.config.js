/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				green: "#D5DD18",
				blue: "#069ADF",
				orange: "#F7AF00",
				dark: "#1D1D1B",
			},
		},
	},
	plugins: [require("daisyui")],
	daisyui: {
		darkTheme: "white",
	},
};
