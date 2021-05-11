<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let initialSmallBlind = 1
    export let roundDuration = 20

    function submit() {
        dispatch("configured")
    }

    function cancelClicked() {
        dispatch("cancelled")
    }

</script>

<div
  class="absolute bg-svg-cards-white top-0 bg-repeat h-screen w-screen"
>
  <form on:submit|preventDefault="{submit}" class="h-3/4 text-center text-gray-50 flex flex-col justify-evenly items-center">
    <div class="min-w-80 bg-gray-700 bg-opacity-75 rounded-xl space-y-6 py-3 pb-7">
      <p class="text-xl">Initial SB</p>
      <input type="number" bind:value="{initialSmallBlind}" min="1" max="500" class="w-14 text-black"/>
      <input type="range" bind:value="{initialSmallBlind}" min="1" max="500" class="ml-4"/>
    </div>

    <div class="min-w-80 bg-gray-700 bg-opacity-75 rounded-xl space-y-7 py-3">
      <p class="text-xl">Round duration</p>
      <p><input type="number" bind:value="{roundDuration}" min="1" max="59" class="w-10 text-black"/>
      <span class="">mn</span></p>
      <input type="range" bind:value="{roundDuration}" min="1" max="59" />
    </div>

    <div class="space-x-7">
        <button on:click={cancelClicked} class="bg-gray-600 bg-opacity-80 border-2 shadow-lg px-8 py-3 text-lg font-semibold tracking-wider text-white rounded-xl hover:bg-opacity-100 hover:text-yellow-200">Cancel</button>
        <button class="bg-coolGreen bg-opacity-80 border-2 shadow-lg px-8 py-3 text-lg font-semibold tracking-wider text-white rounded-xl hover:bg-opacity-100 hover:text-yellow-200">OK</button>
    </div>
  </form>
</div>

