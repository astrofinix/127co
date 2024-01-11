<script>
  import EditTimesheetForm from "$lib/components/hr/edit/EditTimesheetForm.svelte";

  export let data;
  export let form;

  let log = data.data[0];
</script>

<hr />
<h1>
  Editing Timesheet ID: {log.Timesheet_ID} of Employee ID: {log.Employee_ID}
</h1>
<EditTimesheetForm {log} {form} />
<hr />
