<script>
	import HealthExamFields from '../form_fields/HealthExamFields.svelte';
	import { Input, Button } from 'flowbite-svelte';
	
	export let form;
	export let exam;
</script>

<form method="post" action="?/update">
	<Input type="hidden" name="id" hidden value={exam.HE_ID} />
	<HealthExamFields 
		isNew = {false} 
		exam = {form?.exam ?? exam}
		error={form?.error ?? {}} />
	<Button type="submit">Update Health Exam</Button>
</form>

<style>
</style>
