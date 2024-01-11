<script>
	import { formatDateTime } from '$lib/util/hr/utilsHR.js';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Button
	} from 'flowbite-svelte';
	export let exams;
</script>

<div class="overflow-x-auto">
	<Table striped={true}>
		<TableHead>
			<TableHeadCell>Heath Exam ID</TableHeadCell>
			<TableHeadCell>Employee ID</TableHeadCell>
			<TableHeadCell>Date and Time</TableHeadCell>
			<TableHeadCell>Height</TableHeadCell>
			<TableHeadCell>Weight</TableHeadCell>
			<TableHeadCell>Blood Type</TableHeadCell>
			<TableHeadCell>Eye Color</TableHeadCell>
			<TableHeadCell>Doctor Name</TableHeadCell>
			<TableHeadCell>Assessment</TableHeadCell>
			<TableHeadCell>
				<span class="sr-only">Edit</span>
			</TableHeadCell>
			<TableHeadCell>
				<span class="sr-only">Delete</span>
			</TableHeadCell>
		</TableHead>
		<TableBody class="divide-y">
			{#each exams as exam}
				<TableBodyRow>
					<TableBodyCell>{exam.HE_ID}</TableBodyCell>
					<TableBodyCell>{exam.Employee_ID}</TableBodyCell>
					<TableBodyCell>{formatDateTime(exam.HE_Date)}</TableBodyCell>
					<TableBodyCell>{exam.HE_Height}</TableBodyCell>
					<TableBodyCell>{exam.HE_Weight}</TableBodyCell>
					<TableBodyCell>{exam.HE_BloodType}</TableBodyCell>
					<TableBodyCell>{exam.HE_EyeColor}</TableBodyCell>
					<TableBodyCell>{exam.HE_DoctorName}</TableBodyCell>
					<TableBodyCell>{exam.HE_Assessment}</TableBodyCell>
					<TableBodyCell>
						<form method="POST" action="./health-exam/{exam.HE_ID}/edit?/edit">
							<Button type="submit">Edit</Button>
						</form>
					</TableBodyCell>
					<TableBodyCell>
						<form method="POST" action="?/delete">
							<input type="hidden" name="id" hidden value={exam.HE_ID} />
							<Button type="submit">Delete</Button>
						</form>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
</div>

<style>
</style>
