module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				red: {
					600: "#FF0000",
				},
				/*blue: {
				600: '#38bdf8',
			},*/
			},
		},
	},
	darkMode: "class",
	plugins: [],
};
