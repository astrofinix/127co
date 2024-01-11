<script>
  import EditPDSForm from "$lib/components/hr/edit/EditPDSForm.svelte";

  export let form;
  export let data;

  let pds = data.data[0];
</script>

<hr />
<h1>Editing Employee ID: {pds.Employee_ID}</h1>
<EditPDSForm {pds} {form} />
<hr />
