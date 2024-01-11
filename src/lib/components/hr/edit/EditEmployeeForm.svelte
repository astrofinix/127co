<script>
	import EmployeeFields from '$lib/components/hr/form_fields/EmployeeFields.svelte';
	import { Input, Button } from 'flowbite-svelte';
	export let employee, form;

</script>

<form method="post" action="?/update">
	<Input type="hidden" name="id" hidden value={employee.Employee_Id} />
	<EmployeeFields 
		employee = {form?.employee ?? employee} 
		error = {form?.error ?? {}} />
	<Button type="submit">Update Employee</Button>
</form>

<style>
</style>
