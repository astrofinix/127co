<script>
	import JobFields from '../form_fields/JobFields.svelte';
	import { Input, Button } from 'flowbite-svelte';
	
	export let form;
	export let job;
</script>

<form method="post" action="?/update">
	<Input type="hidden" name="id" hidden value={job.Job_Id} />
	<JobFields 
		isNew={false} 
		job={form?.job ?? job}
		error={form?.error ?? {}}/>
	<Button type="submit">Update Job</Button>
</form>

<style>
</style>
