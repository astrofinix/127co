<script>
	import TimesheetFields from '../form_fields/TimesheetFields.svelte';
	import { Button } from 'flowbite-svelte';

	export let form;
</script>

<form method="post" action="?/insert">
	<TimesheetFields 
		isNew = {true},
		log={form?.log ?? null} 
		error={form?.error ?? {}}/>
	<Button type="submit">Add New Timesheet</Button>
</form>
