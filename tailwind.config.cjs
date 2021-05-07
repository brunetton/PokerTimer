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
				coolBlue: "#2196f3"
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
