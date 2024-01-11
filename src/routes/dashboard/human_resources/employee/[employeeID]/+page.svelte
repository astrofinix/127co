<script>
  import PDSDisplay from "$lib/components/hr/displays/PDSDisplay.svelte";
  export let data;
</script>

<PDSDisplay employee={data.data[0]} />
