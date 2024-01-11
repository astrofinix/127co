<script>
	import { formatDateForForm } from '$lib/util/hr/utilsHR.js';
	import { Input, Label } from 'flowbite-svelte';
	export let employee, error;

	// Default Values
	let firstName = employee?.Employee_FirstName ?? '';
	let middleName = employee?.Employee_MiddleName ?? '';
	let lastName = employee?.Employee_LastName ?? '';
	let dateOfHire = employee?.Employee_DateOfHire ? formatDateForForm(employee.Employee_DateOfHire) : '';
	let reportsTo =  employee?.Employee_ReportsTo ?? '';
</script>

<div class="p-5 grid gap-3 mb-5 md:grid-cols-3">
	<div>
		<Label for="first-name" class="mb-2">First Name</Label>
		<Input type="text" name="first-name" id="first-name" value={firstName} required />

		{#if error['first-name']}
			<span style="color:red;">{error['first-name']}</span>
		{/if}
	</div>
	<div>
		<Label for="middle-name" class="mb-2">Middle Name</Label>
		<Input type="text" name="middle-name" id="middle-name" value={middleName} />

		{#if error['middle-name']}
			<span style="color:red;">{error['middle-name']}</span>
		{/if}
	</div>
	<div>
		<Label for="last-name" class="mb-2">Last Name</Label>
		<Input type="text" name="last-name" id="last-name" value={lastName} required />

		{#if error['last-name']}
			<span style="color:red;">{error['last-name']}</span>
		{/if}
	</div>
	<div>
		<Label for="date-of-hire" class="mb-2">Date of Hire</Label>
		<Input type="date" name="date-of-hire" id="date-of-hire" value={dateOfHire} required />

		{#if error['date-of-hire']}
			<span style="color:red;">{error['date-of-hire']}</span>
		{/if}
	</div>
	<div>
		<Label for="reports-to" class="mb-2">Senpai:</Label>
		<Input type="text" name="reports-to" id="reports-to" value={reportsTo} />

		{#if error['reports-to']}
			<span style="color:red;">{error['reports-to']}</span>
		{/if}
	</div>
</div>

<style>
</style>
