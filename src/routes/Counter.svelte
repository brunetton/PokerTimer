<script lang="ts">
	import Timer from "easytimer.js"

	export let initialSmallBlind = 1
	export let roundDuration = 6

	var formattedTime = "00:00:00"
	var started = false
	var paused = true
	var round = 1
	var pieAngle = .7
	var smallBlind = initialSmallBlind

	const timer = new Timer()

	timer.addEventListener("targetAchieved", (e) => {
		nextRound()
	})

	timer.addEventListener("secondsUpdated", function (e) {
		formattedTime = timer.getTimeValues().toString()
		pieAngle = (roundDuration - timer.getTotalTimeValues().seconds) / roundDuration
	})

	function nextRound() {
		round += 1
		timer.reset()
		smallBlind += 1
		pieAngle = 0
		formattedTime = timer.getTimeValues().toString()
	}

	function start() {
		timer.start({ precision: "seconds", countdown: true, startValues: { seconds: roundDuration } })
		started = true
	}

	function toggle() {
		if (paused) {
			if (!started) {
				// First time init
				start()
			} else {
				timer.start()
			}
			paused = false
		} else {
			timer.pause()
			paused = true
		}
	}

	function reset() {
		paused = true
		started = false
		timer.reset()
		timer.stop()
		smallBlind = initialSmallBlind
		formattedTime = "00:00:00"
		pieAngle = 0
		round = 1
	}

	$: pieColor = paused ? "#555" : "#0ac"

	let blurRatio = "0.8px"

</script>


<div class="relative bg-svg-cards-white bg-repeat h-screen" style="filter: blur({blurRatio}); -webkit-filter: blur({blurRatio});">
</div>

<div class="absolute top-0">
	<div class="h-screen w-screen text-center pt-10 text-gray-50" style="background:
		conic-gradient(#000a {pieAngle}turn, #fff0 {pieAngle + (pieAngle && 0.001)}turn);
		transform-style: preserve-3d;
	)">
		<button on:click={reset} style="font-size: 1.2em; padding: 0.3em;"> Reset </button>
		<div class="text-lg">
			<p>Round {round}</p>
			<p>{formattedTime}</p>
			<div>
				sb: {smallBlind} - bb: {smallBlind * 2}
			</div>
		</div>

		<button on:click={toggle} class="text-md p-2 margin-top: 3em">
			{#if paused}
				Start
			{:else}
				Pause
			{/if}
		</button>
	</div>
</div>