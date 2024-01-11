<script>
	import { formatDateTimeForForm } from '$lib/util/hr/utilsHR.js';
	import { bloodTypeOptions } from '$lib/util/hr/selectOptions.js';
	import { Input, Label, Select } from 'flowbite-svelte';
	export let isNew, exam, error;

	let employeeID = exam?.Employee_ID ?? '';
	let datetime = exam?.HE_Date ? formatDateTimeForForm(exam.HE_Date) : '';
	let height = exam?.HE_Height ?? '';
	let weight = exam?.HE_Weight ?? '';
	let bloodType = exam?.HE_BloodType ?? '';
	let eyeColor = exam?.HE_EyeColor ?? '';
	let doctorName = exam?.HE_DoctorName ?? '';
	let assessment = exam?.HE_Assessment ?? '';
	
</script>

<div class="p-5 grid gap-3 mb-5 md:grid-cols-2">
	<div>
		<Label for="employee-id" class="mb-2">Employee ID</Label>
		<Input type="text" name="employee-id" id="employee-id" value={employeeID} disabled={!isNew} />

		{#if error['employee-id']}
			<span style="color:red;">{error['employee-id']}</span>
		{/if}
	</div>

	<div>
		<Label for="date-time" class="mb-2">Date and Time</Label>
		<Input type="datetime-local" name="date-time" id="date-time" value={datetime} required />

		{#if error['date-time']}
			<span style="color:red;">{error['date-time']}</span>
		{/if}
	</div>
	<!--pattern from: https://stackoverflow.com/a/46203928-->
	<div>
		<Label for="height" class="mb-2">Height</Label>
		<Input
			type="number"
			name="height"
			id="height"
			pattern="^\d*(\.\d{(0, 2)})?$"
			step="0.01"
			value={height}
			required
		/>

		{#if error['height']}
			<span style="color:red;">{error['height']}</span>
		{/if}
	</div>
	<div>
		<Label for="weight" class="mb-2">Weight</Label>
		<Input
			type="number"
			name="weight"
			id="weight"
			pattern="^\d*(\.\d{(0, 2)})?$"
			step="0.01"
			value={weight}
			required
		/>

		{#if error['weight']}
			<span style="color:red;">{error['weight']}</span>
		{/if}
	</div>
	<div>
		<Label for="blood-type" class="mb-2">Blood Type</Label>
		<Select name="blood-type" id="blood-type" value={bloodType} required>
			{#each bloodTypeOptions as opt}
				<option value={opt}>{opt}</option>
			{/each}
		</Select>

		{#if error['blood-type']}
			<span style="color:red;">{error['blood-type']}</span>
		{/if}
	</div>
	<div>
		<Label for="eye-color" class="mb-2">Eye Color</Label>
		<Input type="text" name="eye-color" id="eye-color" value={eyeColor} required />

		{#if error['eye-color']}
			<span style="color:red;">{error['eye-color']}</span>
		{/if}
	</div>
	<div>
		<Label for="doctor-name" class="mb-2">Doctor Name</Label>
		<Input type="text" name="doctor-name" id="doctor-name" value={doctorName} required />

		{#if error['doctor-name']}
			<span style="color:red;">{error['doctor-name']}</span>
		{/if}
	</div>
	<div>
		<Label for="assessment" class="mb-2">Assessment</Label>
		<Input type="text" name="assessment" id="assessment" value={assessment} required />

		{#if error['assessment']}
			<span style="color:red;">{error['assessment']}</span>
		{/if}
	</div>
</div>

<style>
</style>
