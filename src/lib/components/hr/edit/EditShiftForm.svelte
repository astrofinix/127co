<script>
	import ShiftFields from '../form_fields/ShiftFields.svelte';
	import { Input, Button } from 'flowbite-svelte';
	export let shift, form;
</script>

<form method="post" action="?/update">
	<Input type="hidden" name="id" hidden value={shift.Shift_ID} />
	<ShiftFields 
		shift = {form?.shift ?? shift} 
		error = {form?.error ?? {}} />
	<Button type="submit">Update Shift</Button>
</form>

<style>
</style>
