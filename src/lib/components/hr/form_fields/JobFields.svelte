<script>
	import { formatDateForForm } from '$lib/util/hr/utilsHR.js';
	import { departmentOptions, statusOptions } from '$lib/util/hr/selectOptions.js';
	import { Input, Label, Select } from 'flowbite-svelte';
	export let job, error;

	export let isNew = true;

	let employeeID = job?.Employee_ID ?? '';
	let position = job?.Job_Position ?? '';
	let department = job?.Job_Department ?? '';
	let status = job?.Employee_Status ?? '';
	let shift = job?.Employee_Shift ?? '';
	let date = job?.Job_AcquisitionDate ? formatDateForForm(job.Job_AcquisitionDate) : '';
</script>
<div class="p-5 grid gap-3 mb-5 md:grid-cols-3">
	<div>
		<Label for="employee-id" class="mb-2">Employee ID</Label>
		<Input type="text" name="employee-id" id="employee-id" pattern="[0-9]*" title="Please enter only digits" value={employeeID} disabled={!isNew} />
		
		{#if error['employee-id']}
			<span style="color:red;">{error['employee-id']}</span>
		{/if}
	</div>
	<div>
		<Label for="job-position" class="mb-2">Job</Label>
		<Input type="text" name="job-position" id="job-position" value={position} />
		{#if error['job-position']}
			<span style="color:red;">{error['job-position']}</span>
		{/if}
	</div>
	<div>
		<Label for="department" class="mb-2">Department</Label>
		<Select name="department" id="department" value={department} >
			{#each departmentOptions as opt}
				<option value={opt}>{opt}</option>
			{/each}
		</Select>
		{#if error['job-department']}
			<span style="color:red;">{error['job-department']}</span>
		{/if}
	</div>
	<div>
		<Label for="status" class="mb-2">Status</Label>
		<Select name="status" id="status" value={status}>
			{#each statusOptions as opt}
				<option value={opt}>{opt}</option>
			{/each}
		</Select>
		{#if error['employee-status']}
			<span style="color:red;">{error['employee-status']}</span>
		{/if}
	</div>
	<div>
		<Label for="shift" class="mb-2">Shift</Label>
		<Select name="shift" id="shift" value={shift}>
			<option value="Day">Day</option>
			<option value="Night">Night</option>
		</Select>
		{#if error['employee-shift']}
			<span style="color:red;">{error['employee-shift']}</span>
		{/if}
	</div>
	<div>
		<Label for="acquisition-date" class="mb-2">Job Acquisition Date</Label>
		<Input type="date" name="acquisition-date" id="acquisition-date" value={date} required />
		{#if error['job-acquisition-date']}
			<span style="color:red;">{error['job-acquisition-date']}</span>
		{/if}
	</div>
</div>

<style>
</style>
