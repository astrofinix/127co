<script>
	import HealthExamFields from '../form_fields/HealthExamFields.svelte';
	import { Button } from 'flowbite-svelte';

	export let form;
</script>

<form method="post" action="?/insert">
	<HealthExamFields
		isNew = {true}	
		exam={form?.exam ?? null}
		error={form?.error ?? {}} />
	<Button type="submit">Add New Health Exam</Button>
</form>
