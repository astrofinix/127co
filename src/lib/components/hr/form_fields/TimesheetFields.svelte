<script>
	import { formatDateTimeForForm } from '$lib/util/hr/utilsHR.js';
	import { Input, Label } from 'flowbite-svelte';
	export let isNew, log, error;

	// Default values
	let employeeID = log?.Employee_ID ?? '';
	let timeIn = log?.Timesheet_TimeIn ? formatDateTimeForForm(log.Timesheet_TimeIn) : '';
	let timeOut = log?.Timesheet_TimeOut ? formatDateTimeForForm(log.Timesheet_TimeOut) : '';
</script>

<div class="p-5 grid gap-3 mb-4 md:grid-cols-3">
	<div>
		<Label for="employee-id" class="mb-2">Employee ID:</Label>
		<Input type="text" name="employee-id" id="employee-id" value={employeeID} disabled={!isNew} />

		{#if error['employee-id']}
			<span style="color:red;">{error['employee-id']}</span>
		{/if}
	</div>
	<div>
		<Label for="time-in" class="mb-2">Time In:</Label>
		<Input type="datetime-local" name="time-in" id="time-in" value={timeIn} required />

		{#if error['time-in']}
			<span style="color:red;">{error['time-in']}</span>
		{/if}
	</div>
	<div>
		<Label for="time-out" class="mb-2">Time Out:</Label>
		<Input type="datetime-local" name="time-out" id="time-out" value={timeOut} />

		{#if error['time-out']}
			<span style="color:red;">{error['time-out']}</span>
		{/if}
	</div>
</div>

<style>
</style>
