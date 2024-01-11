<script>
	import TimesheetFields from '../form_fields/TimesheetFields.svelte';
	import { Input, Button } from 'flowbite-svelte';
	
	export let form;
	export let log;
</script>

<form method="post" action="?/update">
	<Input type="hidden" name="id" hidden value={log.Timesheet_ID} />
	<TimesheetFields 
		isNew = {false}
		log = {form?.log ?? log} 
		error = {form?.error ?? {}}/>
	<Button type="submit">Update Timesheet</Button>
</form>

<style>
</style>
