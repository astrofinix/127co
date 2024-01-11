<script>
	import { Input, Label } from 'flowbite-svelte';
	export let shift, error;
</script>

<div class="p-5 grid gap-3 mb-5 md:grid-cols-3">
	<div>
		<Label for="shift" class="mb-2">Shift</Label>
		<Input type="text" name="shift" id="shift" value={shift.Shift_ID} disabled />
	</div>
	<div>
		<Label for="start" class="mb-2">Time In:</Label>
		<Input type="time" name="start" id="start" value={shift.Shift_StartTime} required />

		{#if error['start']}
			<span style="color:red;">{error['start']}</span>
		{/if}
	</div>
	<div>
		<Label for="end" class="mb-2">Time Out:</Label>
		<Input type="time" name="end" id="end" value={shift.Shift_EndTime} required />

		{#if error['end']}
			<span style="color:red;">{error['end']}</span>
		{/if}
	</div>
</div>

<style>
</style>
