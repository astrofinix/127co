<script>
  import EditJobForm from "$lib/components/hr/edit/EditJobForm.svelte";

  export let form;
  export let data;

  let job = data.data[0];
</script>

<hr />
<EditJobForm {job} {form} />
<hr />
