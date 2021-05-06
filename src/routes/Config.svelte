<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let initialSmallBlind = 1
    export let roundDuration = 300

    function submit() {
        dispatch("configured")
    }

</script>

<div>
    <form on:submit|preventDefault={submit} >
        <p>Initial SB: <input type=number bind:value={initialSmallBlind} min=1 max=500><input type=range bind:value={initialSmallBlind} min=1 max=500></p>
        <p>Round duration (in seconds): <input type=number bind:value={roundDuration} min=1 max=500><input type=range bind:value={roundDuration} min=1 max=500></p>
        <button>OK</button>
    </form>
</div>

