<script lang="ts">
	import Counter from "./Counter.svelte"
	import Config from "./Config.svelte"
	import '../app.postcss';

	let initialSmallBlind
	let roundDuration
	let key = {}
	let displayConfig = true

	function onMenuButton() {
		// User clicked menu button
		displayConfig = true
	}

	function reset() {
		// Generate a new key in order to generate a new Counter instance
		key = {}
		displayConfig = false
	}

	function cancel() {
		displayConfig=false
	}

</script>

{#if displayConfig}
	<Config bind:initialSmallBlind bind:roundDuration on:configured={reset} on:cancelled={cancel} />
{:else}
	{#key key}
		<Counter {initialSmallBlind} {roundDuration} on:displayMenu={onMenuButton} />
	{/key}
{/if}

