<script>
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Button
	} from 'flowbite-svelte';
	export let jobs;
</script>

<Table striped={true}>
	<TableHead>
		<TableHeadCell>Employee ID</TableHeadCell>
		<TableHeadCell>Position</TableHeadCell>
		<TableHeadCell>Department</TableHeadCell>
		<TableHeadCell>Status</TableHeadCell>
		<TableHeadCell>Shift</TableHeadCell>
		<TableHeadCell>
			<span class="sr-only">Edit</span>
		</TableHeadCell>
		<TableHeadCell>
			<span class="sr-only">Delete</span>
		</TableHeadCell>
	</TableHead>
	<TableBody class="divide-y">
		{#each jobs as job}
			<TableBodyRow>
				<TableBodyCell>{job.Employee_ID}</TableBodyCell>
				<TableBodyCell>{job.Job_Position}</TableBodyCell>
				<TableBodyCell>{job.Job_Department}</TableBodyCell>
				<TableBodyCell>{job.Employee_Status}</TableBodyCell>
				<TableBodyCell>{job.Employee_Shift}</TableBodyCell>
				<TableBodyCell>
					<form method="POST" action="./job/{job.Job_ID}/edit?/edit">
						<input type="hidden" name="id" hidden value={job.Job_ID} />
						<Button type="submit">Edit</Button>
					</form>
				</TableBodyCell>
				<TableBodyCell>
					<form method="POST" action="?/delete">
						<input type="hidden" name="id" hidden value={job.Job_ID} />
						<Button type="submit">Delete</Button>
					</form>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>

<style>
</style>
