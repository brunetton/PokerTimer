<script lang="ts">
	import Counter from "./Counter.svelte"
	import Config from "./Config.svelte"

	let initialSmallBlind
	let roundDuration
	let key = {}

	function reset() {
		// Generate a new key in order to generate a new Counter instance
		key = {}
	}
</script>

<!-- <Config bind:initialSmallBlind bind:roundDuration on:configured={reset} /> -->

<!-- <Counter initialSmallBlind={30} roundDuration={300} /> -->

{#key key}
	<Counter {initialSmallBlind} {roundDuration} />
{/key}
