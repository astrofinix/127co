<script>
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Button,
  } from "flowbite-svelte";
  export let jobs;
</script>

<Table striped={true} hoverable={true} class="text-center">
  <TableHead>
    <TableHeadCell>Job ID</TableHeadCell>
    <TableHeadCell>Employee ID</TableHeadCell>
    <TableHeadCell>Employee Name</TableHeadCell>
    <TableHeadCell>Position</TableHeadCell>
    <TableHeadCell>Department</TableHeadCell>
    <TableHeadCell>Status</TableHeadCell>
    <TableHeadCell>Shift</TableHeadCell>
    <TableHeadCell>
      <span class="sr-only">Edit</span>
      <span class="sr-only">Delete</span>
    </TableHeadCell>
  </TableHead>
  <TableBody class="divide-y">
    {#each jobs as job}
      <TableBodyRow>
        <TableBodyCell>{job.Job_ID}</TableBodyCell>
        <TableBodyCell>{job.Employee_ID}</TableBodyCell>
        <TableBodyCell
          >{job.Employee_FirstName + " " + job.Employee_LastName}</TableBodyCell
        >
        <TableBodyCell>{job.Job_Position}</TableBodyCell>
        <TableBodyCell>{job.Job_Department}</TableBodyCell>
        <TableBodyCell>{job.Employee_Status}</TableBodyCell>
        <TableBodyCell>{job.Employee_Shift}</TableBodyCell>
        <TableBodyCell class="flex gap-3">
          <form method="POST" action="./job/{job.Job_ID}/edit?/edit">
            <input type="hidden" name="id" hidden value={job.Job_ID} />
            <Button pill type="submit">Edit</Button>
          </form>
          <form method="POST" action="?/delete">
            <input type="hidden" name="id" hidden value={job.Job_ID} />
            <Button pill type="submit">Delete</Button>
          </form>
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>
