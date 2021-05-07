var fs = require("fs")

const { tailwindExtractor } = require("tailwindcss/lib/lib/purgeUnusedStyles")

try {
	var svg_content = fs.readFileSync("src/background-s.svg", "utf8")
} catch (e) {
	console.log("Error:", e.stack)
}

module.exports = {
	mode: "aot",
	purge: {
		content: ["./src/**/*.{html,js,svelte,ts}"],
		options: {
			defaultExtractor: (content) => [
				// If this stops working, please open an issue at https://github.com/svelte-add/tailwindcss/issues rather than bothering Tailwind Labs about it
				...tailwindExtractor(content),
				// Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
				...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(([_match, group, ..._rest]) => group)
			]
		},
		safelist: [/^svelte-[\d\w]+$/]
	},
	theme: {
		extend: {
			fontSize: {
				"10xl": ["10rem", { lineHeight: "1" }],
				"11xl": ["11rem", { lineHeight: "1" }],
				"12xl": ["12rem", { lineHeight: "1" }],
				"13xl": ["13rem", { lineHeight: "1" }],
				"14xl": ["14rem", { lineHeight: "1" }]
			},
			fontFamily: {
				itim: ["Itim"]
			},
			colors: {
				coolBlue: "#2196f3",
				coolGreen: "#08BC6D"
			},
			minWidth: {
				2: "0.5rem",
				2.5: "0.625rem",
				3: "0.75rem",
				3.5: "0.875rem",
				4: "1rem",
				5: "1.25rem",
				6: "1.5rem",
				7: "1.75rem",
				8: "2rem",
				9: "2.25rem",
				10: "2.5rem",
				11: "2.75rem",
				12: "3rem",
				14: "3.5rem",
				16: "4rem",
				20: "5rem",
				24: "6rem",
				28: "7rem",
				32: "8rem",
				36: "9rem",
				40: "10rem",
				44: "11rem",
				48: "12rem",
				52: "13rem",
				56: "14rem",
				60: "15rem",
				64: "16rem",
				72: "18rem",
				80: "20rem",
				96: "24rem",
				"1/2": "50%",
				"1/3": "33.333333%",
				"2/3": "66.666667%",
				"1/4": "25%",
				"2/4": "50%",
				"3/4": "75%",
				"1/5": "20%",
				"2/5": "40%",
				"3/5": "60%",
				"4/5": "80%",
				"1/6": "16.666667%",
				"2/6": "33.333333%",
				"3/6": "50%",
				"4/6": "66.666667%",
				"5/6": "83.333333%",
				"1/12": "8.333333%",
				"2/12": "16.666667%",
				"3/12": "25%",
				"4/12": "33.333333%",
				"5/12": "41.666667%",
				"6/12": "50%",
				"7/12": "58.333333%",
				"8/12": "66.666667%",
				"9/12": "75%",
				"10/12": "83.333333%",
				"11/12": "91.666667%",
				full: "100%",
				auto: "auto",
				px: "1px"
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: [
		require("tailwindcss-bg-svg")({
			icons: {
				cards: svg_content
			}
		})
	]
}
