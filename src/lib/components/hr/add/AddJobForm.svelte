<script>
	import JobFields from '../form_fields/JobFields.svelte';
	import { Button } from 'flowbite-svelte';

	export let form;
</script>

<form method="post" action="?/insert">
	<JobFields 
		isNew={true} 
		job={form?.job ?? null} 
		error={form?.error ?? {}} />
	<Button type="submit">Add New Job</Button>
</form>
