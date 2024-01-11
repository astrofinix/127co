<script>
  import EditShiftForm from "$lib/components/hr/edit/EditShiftForm.svelte";
  export let data, form;

  let shift = data.data[0];
</script>

<h1>Editing Shift: {shift.Shift_ID}</h1>
<div class="flex">
  <EditShiftForm {shift} {form} />
</div>
