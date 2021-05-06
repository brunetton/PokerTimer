<script lang="ts">
	import { initialSmallBlind, roundDuration } from "../store"
	import Timer from "easytimer.js"

	var formattedTime = "00:00:00"
	var started = false
	var paused = true
	var round = 1
	var pieAngle = 0
	var smallBlind = $initialSmallBlind

	const timer = new Timer()

	timer.addEventListener("targetAchieved", (e) => {
		nextRound()
	})

	timer.addEventListener("secondsUpdated", function (e) {
		formattedTime = timer.getTimeValues().toString()
		pieAngle = ($roundDuration - timer.getTotalTimeValues().seconds) / $roundDuration
	})

	function nextRound() {
		round += 1
		timer.reset()
		smallBlind += 1
		pieAngle = 0
		formattedTime = timer.getTimeValues().toString()
	}

	function start() {
		timer.start({ precision: "seconds", countdown: true, startValues: { seconds: $roundDuration } })
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
		timer.reset()
		timer.stop()
		smallBlind = $initialSmallBlind
		formattedTime = "00:00:00"
		pieAngle = 0
		round = 1
	}

	$: bgColor = paused ? "#555" : "#0ac"

</script>


<button on:click={reset} style="font-size: 1.2em; padding: 0.3em;"> Reset </button>


<div
style="color: #333333; margin: 2em; padding: 0.5em; padding-bottom: 3em; text-align: center;
background: conic-gradient(
    ) {bgColor};
}"
background:
	conic-gradient(#333 {pieAngle}turn, {pieColor} {pieAngle + 0.001}turn);
	transform-style: preserve-3d;
)
>
<div style="font-size: 2em; color: #ddd">
	<p>Round {round}</p>
	<p>{formattedTime}</p>
	<div>
		sb: {smallBlind} - bb: {smallBlind * 2}
	</div>
</div>

<button on:click={toggle} style="font-size: 1.2em; padding: 0.3em; margin-top: 3em">
	{#if paused}
	Start
	{:else}
	Pause
	{/if}
</button>
</div>
