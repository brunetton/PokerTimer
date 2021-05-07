<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let initialSmallBlind = 1
    export let roundDuration = 20

    function submit() {
        dispatch("configured")
    }

</script>

<div
  class="absolute top-0 bg-repeat h-screen w-screen"
  style='
      background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22103.043%22%20height%3D%22122.715%22%20viewBox%3D%220%200%2027.263%2032.468%22%3E%3Cpath%20fill%3D%22%232196f3%22%20d%3D%22M-2.301-3.086H31.22v38.293H-2.301z%22%2F%3E%3Cpath%20overflow%3D%22visible%22%20display%3D%22block%22%20color%3D%22%23000%22%20style%3D%22marker%3Anone%22%20d%3D%22M6.508%207.172c-2.145-1.024-5.3.198-4.553%202.955.727%202.686%203.869%202.097%204.955.461-.453%203.101-1.25%203.584-1.726%204.257h5.065c-.513-.72-1.445-1.156-1.992-4.299%201.095%201.633%204.386%202.199%205.103-.45.705-2.604-2.474-4.087-4.588-2.908%202.027-1.361%202.755-5.832-1.084-5.832-3.878%200-3.23%204.558-1.18%205.816z%22%20fill%3D%22%2358b0f6%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M16.541%2022.268c-4.452%204.549-.087%207.848%203.433%205.677-.665%202.37-1.03%202.556-1.434%203.18h3.8c-.487-.63-1-.81-1.519-3.167%203.594%202.065%207.382-1.536%203.394-5.69-2.608-2.28-3.62-4.364-3.837-4.66-.207.247-1.43%202.421-3.837%204.66z%22%20fill%3D%22%2358b0f6%22%2F%3E%3Cpath%20fill%3D%22%2358b0f6%22%20d%3D%22M7.577%2031.104a4.544%204.544%200%2001-.12-.362c-.337-1.12-.963-2.254-2.012-3.644-.394-.522-.765-.984-1.769-2.204-1.161-1.412-1.494-1.864-1.83-2.488a5.281%205.281%200%2001-.472-1.286c-.067-.357-.068-.94-.002-1.243.27-1.235%201.367-2.166%202.678-2.275%201.502-.124%202.78.635%203.452%202.05l.15.316.112-.25c.168-.37.33-.621.602-.934.694-.797%201.52-1.188%202.515-1.19.445%200%20.7.037%201.08.157.569.18.996.46%201.377.902.992%201.15.875%202.718-.348%204.638-.285.448-.8%201.11-1.507%201.941-.815.957-1.213%201.443-1.62%201.98-.978%201.285-1.635%202.452-1.996%203.546a3.203%203.203%200%2001-.129.345c-.036.054-.131.055-.16.001z%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20fill%3D%22%2358b0f6%22%20d%3D%22M20.36%201.323c-1.411%202.349-3%204.608-4.614%206.778%201.69%202.17%203.304%204.429%204.614%206.777%201.36-2.393%202.848-4.675%204.614-6.777a57.555%2057.555%200%2001-4.614-6.778z%22%2F%3E%3C%2Fsvg%3E");
      background-repeat: true;
'
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

    <button class="bg-coolGreen bg-opacity-80 border-2 shadow-lg px-8 py-3 text-lg font-semibold tracking-wider text-white rounded-xl hover:bg-opacity-100">OK</button>
  </form>
</div>

