<script>
  import EditEmployeeForm from "$lib/components/hr/edit/EditEmployeeForm.svelte";

  export let form;
  export let data;

  let employee = data.data[0];
</script>

<hr />
<h1>Editing Employee ID: {employee.Employee_ID}</h1>
<EditEmployeeForm {employee} {form} />
<hr />
