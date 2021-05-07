<script lang="ts">
	import Timer from "easytimer.js"
	import Fa from "svelte-fa/src/fa.svelte"
	import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
	import { faArrowRight } from "@fortawesome/free-solid-svg-icons"

	export let initialSmallBlind = 1
	export let roundDuration = 6

	var formattedTime = "00:00:00"
	var started = false
	var paused = true
	var round = 1
	var pieAngle = 0.7
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

	const blurRatio = "0.8px"

	$: grayscaleFilter = paused ? "grayscale(100%)" : ""
</script>

<div
	class="relative bg-svg-cards-white bg-repeat h-screen"
	style="filter:
		blur({blurRatio}) {grayscaleFilter};
		-webkit-filter: blur({blurRatio}) {grayscaleFilter};
	"
/>

<div
	class="absolute top-0 flex flex-col justify-evenly h-screen w-screen text-center font-itim text-gray-50"
	style="background:
		conic-gradient(#000a {pieAngle}turn, #fff0 {pieAngle + (pieAngle && 0.001)}turn);
		transform-style: preserve-3d;
	)"
>
	<div class="absolute top-0 w-full flex justify-between">
		<button on:click={toggle} class="text-xl">Reset</button>
		<button on:click={toggle} class="text-xl">Menu</button>
	</div>


	<div class="text-13xl text-shadow">{smallBlind}</div>
	<div class="flex justify-around items-center">
		<div class="text-6xl">
			<Fa icon={faArrowLeft} class="text-5xl" />
		</div>
		<div on:click={toggle} class="rounded-full p-2 px-8 bg-opacity-80 shadow-md" style="background: #08BC6Daa">
			<p class="text-3xl">Round {round}</p>
			<p class="text-4xl font-bold mt-2">{formattedTime}</p>
		</div>
		<div class="text-6xl">
			<Fa icon={faArrowRight} class="text-5xl" />
		</div>
	</div>
	<div class="text-13xl text-shadow">{smallBlind * 2}</div>
</div>
