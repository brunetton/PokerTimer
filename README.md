# Start

`npm run dev -- --port 3333`

# Troubleshooting

Why doesn't this works in Firefox < v83 ?

This project uses [conic-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/conic-gradient()) css feature, that is [**disabled by default**](https://developer.mozilla.org/en-US/docs/Web/CSS/conic-gradient()#browser_compatibility) in "older" versions of Firefox.
To enable it:

- open `about:config` in the browser
- search for `layout.css.conic-gradient.enabled` and set it to `true`
