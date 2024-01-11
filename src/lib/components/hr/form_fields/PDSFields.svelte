<script>
	import { formatDateForForm } from '$lib/util/hr/utilsHR.js';
	import { Input, Label, Select } from 'flowbite-svelte';
	import { sexOptions, civilStatusOptions, highestLevelOfEducationOptions } from '$lib/util/hr/selectOptions.js';
	export let pds, error;

	let address = pds?.Employee_Address ?? '';
	let contactNumber = pds?.Employee_ContactNumber ?? '';
	let sex = pds?.Employee_Sex ?? '';
	let dateOfBirth = pds?.Employee_DateOfBirth ? formatDateForForm(pds.Employee_DateOfBirth) : '';
	let placeOfBirth = pds?.Employee_PlaceOfBirth ?? '';
	let citizenship = pds?.Employee_Citizenship ?? '';
	let civilStatus = pds?.Employee_CivilStatus ?? '';
	let highestLevelOfEducation = pds?.Employee_HighestLevelOfEducation ?? '';
	let school = pds?.Employee_School ?? '';
	let yearGraduated = pds?.Employee_YearGraduated ?? '';
	let sssID = pds?.Employee_SSSID ?? '';
	let pagibigID = pds?.Employee_PagIBIGID ?? '';
	let philHealthID = pds?.Employee_PhilHealthID ?? '';
	let emergencyContactName = pds?.Emergency_ContactName ?? '';
	let emergencyContactRelationship = pds?.Emergency_ContactRelationship ?? '';
	let emergencyContactNumber = pds?.Emergency_ContactNumber ?? '';
</script>

<div class="p-5 grid gap-3 mb-5 md:grid-cols-3">
	<div class="col-span-2">
		<Label for="address" class="mb-2">Address</Label>
		<Input type="text" name="address" id="address" value={address} />
		{#if error['address']}
			<span style="color:red;">{error['address']}</span>
		{/if}
	</div>
	<div>
		<Label for="contact-number" class="mb-2">Contact Number</Label>
		<Input type="text" name="contact-number" id="contact-number" value={contactNumber} />

		{#if error['contact-number']}
			<span style="color:red;">{error['contact-number']}</span>
		{/if}
	</div>
	<div>
		<Label for="sex" class="mb-2">Sex</Label>
		<Select id="sex" name="sex" value={sex}>
			{#each sexOptions as opt}
				<option value={opt}>{opt}</option>
			{/each}
		</Select>

		{#if error['sex']}
			<span style="color:red;">{error['sex']}</span>
		{/if}
	</div>
	<div>
		<Label for="date-of-birth" class="mb-2">Date of Birth</Label>
		<Input type="date" name="date-of-birth" id="date-of-birth" value={dateOfBirth} />

		{#if error['date-of-birth']}
			<span style="color:red;">{error['date-of-birth']}</span>
		{/if}
	</div>
	<div>
		<Label for="place-of-birth" class="mb-2">Place of Birth</Label>
		<Input type="text" name="place-of-birth" id="place-of-birth" value={placeOfBirth} />

		{#if error['place-of-birth']}
			<span style="color:red;">{error['place-of-birth']}</span>
		{/if}
	</div>
	<div>
		<Label for="citizenship" class="mb-2">Citizenship</Label>
		<Input type="text" name="citizenship" id="citizenship" value={citizenship} />

		{#if error['citizenship']}
			<span style="color:red;">{error['citizenship']}</span>
		{/if}
	</div>
	<div>
		<Label for="civil-status" class="mb-2">Civil Status</Label>
		<Select id="civil-status" name="civil-status" value={civilStatus}>
			{#each civilStatusOptions as opt}
				<option value={opt}>{opt}</option>
			{/each}
		</Select>

		{#if error['civil-status']}
			<span style="color:red;">{error['civil-status']}</span>
		{/if}
	</div>
	<div>
		<Label for="highest-level-of-education" class="mb-2">Highest Level of Education</Label>
		<Select name="highest-level-of-education" id="highest-level-of-education" value={highestLevelOfEducation}>
			{#each highestLevelOfEducationOptions as opt}
				<option value={opt}>{opt}</option>
			{/each}
		</Select>

		{#if error['highest-level-of-education']}
			<span style="color:red;">{error['highest-level-of-education']}</span>
		{/if}
	</div>
	<div class="col-span-2">
		<Label for="school" class="mb-2">School</Label>
		<Input type="text" name="school" id="school" value={school} />

		{#if error['school']}
			<span style="color:red;">{error['school']}</span>
		{/if}
	</div>
	<div>
		<Label for="year-graduated" class="mb-2">Year Graduated</Label>
		<Input
			type="number"
			min="1970"
			max="2099"
			step="1"
			name="year-graduated"
			id="year-graduated"
			value={yearGraduated}
		/>

		{#if error['year-graduated']}
			<span style="color:red;">{error['year-graduated']}</span>
		{/if}
	</div>
	<div>
		<Label for="sss-id" class="mb-2">SSS ID</Label>
		<Input type="text" name="sss-id" id="sss-id" value={sssID} />

		{#if error['sss-id']}
			<span style="color:red;">{error['sss-id']}</span>
		{/if}
	</div>
	<div>
		<Label for="pagibig-id" class="mb-2">PagIBIG ID</Label>
		<Input type="text" name="pagibig-id" id="pagibig-id" value={pagibigID} />

		{#if error['pagibig-id']}
			<span style="color:red;">{error['pagibig-id']}</span>
		{/if}
	</div>
	<div>
		<Label for="philhealth-id" class="mb-2">PhilHealth ID</Label>
		<Input type="text" name="philhealth-id" id="philhealth-id" value={philHealthID} />

		{#if error['philhealth-id']}
			<span style="color:red;">{error['philhealth-id']}</span>
		{/if}
	</div>
	<div>
		<Label for="emergency-contact-name" class="mb-2">Emergency Contact Person</Label>
		<Input
			type="text"
			name="emergency-contact-name"
			id="emergency-contact-name"
			value={emergencyContactName}
		/>

		{#if error['emergency-contact-name']}
			<span style="color:red;">{error['emergency-contact-name']}</span>
		{/if}
	</div>
	<div>
		<Label for="emergency-contact-relationship" class="mb-2">Emergency Contact Relationship</Label>
		<Input
			type="text"
			name="emergency-contact-relationship"
			id="emergency-contact-relationship"
			value={emergencyContactRelationship}
		/>

		{#if error['emergency-contact-relationship']}
			<span style="color:red;">{error['emergency-contact-relationship']}</span>
		{/if}
	</div>
	<div>
		<Label for="emergency-contact-number" class="mb-2">Emergency Contact Number</Label>
		<Input
			type="text"
			name="emergency-contact-number"
			id="emergency-contact-number"
			value={emergencyContactNumber}
		/>

		{#if error['emergency-contact-number']}
			<span style="color:red;">{error['emergency-contact-number']}</span>
		{/if}
	</div>
</div>

<style>
</style>
