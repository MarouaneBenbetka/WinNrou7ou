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
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
			},
			backgroundImage: {
				events: "url('/images/events.png')",
			},
		},
		screens: {
			x2: "580px",
			x3: "1008px",
			x4: "1290px",
			sm: "640px",

			md: "768px",

			lg: "1024px",

			xl: "1280px",
		},
	},
	plugins: [require("daisyui")],
	daisyui: {
		darkTheme: "white",
	},
};
