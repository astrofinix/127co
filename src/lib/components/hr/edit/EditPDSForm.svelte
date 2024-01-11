<script>
	import PDSFields from '../form_fields/PDSFields.svelte';
	import { Input, Button } from 'flowbite-svelte';
	export let pds;
	export let form;
</script>

<form method="post" action="?/update">
	<Input type="hidden" name="id" hidden value={pds != null ? pds.Employee_Id : ''} />
	<PDSFields 
		pds = {form?.pds ?? pds}
		error = {form?.error ?? {}}
		/>
	<Button type="submit">Update Information</Button>
</form>

<style>
</style>
