<script lang="ts">
	import {Timer} from "easytimer.js"
	import { createEventDispatcher } from 'svelte';
	import FaArrowLeft from 'svelte-icons/fa/FaArrowLeft.svelte'
	import FaArrowRight from 'svelte-icons/fa/FaArrowRight.svelte'
	import FaEllipsisV from 'svelte-icons/fa/FaEllipsisV.svelte'
	import MdRefresh from 'svelte-icons/md/MdRefresh.svelte'

	export let initialSmallBlind = 1
	export let roundDuration = 1  // in minutes

	const dispatch = createEventDispatcher();
	const InitialFormattedTime = `${roundDuration}:00`
	const roundDurationSeconds = roundDuration * 60
	var formattedTime = InitialFormattedTime
	var started = false
	var paused = true
	var round = 1
	var pieAngle = 0
	var smallBlind = initialSmallBlind
	let innerWidth

	const timer = new Timer()

	timer.addEventListener("targetAchieved", (e) => {
		nextRound()
	})

	function formatTime(minutes, seconds) {
		const padInt = (n: Number) => String(n).padStart(2, "0");
		return `${padInt(minutes)}:${padInt(seconds)}`
	}

	timer.addEventListener("secondsUpdated", function (e) {
		formattedTime = formatTime(timer.getTimeValues().minutes, timer.getTimeValues().seconds)
		pieAngle = (roundDurationSeconds - timer.getTotalTimeValues().seconds) / roundDurationSeconds
	})

	function nextRound() {
		round += 1
		timer.reset()
		smallBlind += 1
		pieAngle = 0
		formattedTime = InitialFormattedTime
	}

	function prevRound() {
		if (round <= 1) return
		round = Math.max(1, round - 1)
		timer.reset()
		smallBlind += 1
		pieAngle = 0
		formattedTime = InitialFormattedTime
	}

	function start() {
		timer.start({ precision: "seconds", countdown: true, startValues: { minutes: roundDuration } })
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
		formattedTime = InitialFormattedTime
		pieAngle = 0
		round = 1
	}

	function displayMenu() {
		dispatch("displayMenu")
	}

	function computeBigFontSize(smallBlind, innerWidth) {
		const bigBlind = smallBlind * 2
		if (innerWidth < 650) {
			if (bigBlind >= 1000) return "30vmin"
			if (bigBlind >= 100) return "35vmin"
			return "40vmin"
		} else {
			// big screens
			return "150pt"
		}
	}

	const blurRatio = "0.8px"

	$: grayscaleFilter = paused ? "grayscale(100%)" : ""
	$: bigFontSize = computeBigFontSize(smallBlind, innerWidth)
</script>

<svelte:window bind:innerWidth={innerWidth} />

<div
	class="relative bg-svg-cards-white bg-repeat h-screen"
	style="filter:
		blur({blurRatio}) {grayscaleFilter};
		-webkit-filter: blur({blurRatio}) {grayscaleFilter};
	"
/>

<div
	class="absolute top-0 flex flex-col justify-evenly h-screen w-screen text-center font-itim text-gray-50 overflow-y-hidden"
	style="background:
		conic-gradient(#000a {pieAngle}turn, #fff0 {pieAngle + (pieAngle && 0.001)}turn);
		transform-style: preserve-3d;
	)"
>
	<!-- Top buttons -->
	<div class="absolute top-0 w-full flex justify-between">
		<button on:click={reset} class="w-16 rounded-full bg-red-500 bg-opacity-70 border-2 border-opacity-90 shadow-lg m-2 p-0.5 hover:text-yellow-200">
			<MdRefresh />
		</button>
		<button on:click={displayMenu} class="h-16 w-16 rounded-full border-2 border-opacity-90 bg-coolBlue bg-opacity-70 shadow-lg m-2 p-3 hover:text-yellow-200">
			<FaEllipsisV />
		</button>
	</div>

	<!-- Main -->
	<div class="text-shadow" style="font-size: {bigFontSize};">{smallBlind}</div>
	<div class="flex justify-around items-center">
		<button on:click={prevRound} class="w-12"><FaArrowLeft /></button>
		<div on:click={toggle} class="rounded-full p-2 px-8 bg-opacity-80 shadow-md" style="background: #08BC6Daa">
			<p class="text-3xl">Round {round}</p>
			<p class="text-4xl font-bold mt-2">{formattedTime}</p>
		</div>
		<button on:click={nextRound} class="w-12"><FaArrowRight /></button>
	</div>
	<div class="text-shadow" style="font-size: {bigFontSize};">{smallBlind * 2}</div>
</div>
