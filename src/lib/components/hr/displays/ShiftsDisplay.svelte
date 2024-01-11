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
	export let schedules;
</script>

<Table striped={true}>
	<TableHead>
		<TableBodyCell>Shift</TableBodyCell>
		<TableBodyCell>Start</TableBodyCell>
		<TableBodyCell>End</TableBodyCell>
		<TableHeadCell>
			<span class="sr-only">Edit</span>
		</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each schedules as schedule}
			<TableBodyRow>
				<TableBodyCell>{schedule.Shift_ID}</TableBodyCell>
				<TableBodyCell>{schedule.Shift_StartTime}</TableBodyCell>
				<TableBodyCell>{schedule.Shift_EndTime}</TableBodyCell>
				<TableBodyCell>
					<form method="POST" action="./shift/{schedule.Shift_ID}/edit?/edit">
						<Button type="submit">Edit</Button>
					</form>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
