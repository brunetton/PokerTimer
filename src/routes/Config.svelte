<script lang="ts">
    import { initialSmallBlind, roundDuration } from "../store"
</script>

<div>
	<p>Initial SB: <input type=number bind:value={$initialSmallBlind} min=1 max=500><input type=range bind:value={$initialSmallBlind} min=1 max=500></p>
	<p>Round duration (in seconds): <input type=number bind:value={$roundDuration} min=1 max=500><input type=range bind:value={$roundDuration} min=1 max=500></p>
</div>

