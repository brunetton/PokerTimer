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
		extend: {}
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
