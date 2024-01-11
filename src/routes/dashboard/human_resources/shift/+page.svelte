<script>
  import ShiftsDisplay from "$lib/components/hr/displays/ShiftsDisplay.svelte";

  export let data;
</script>

<div class="flex">
  <ShiftsDisplay schedules={data.data} />
</div>
