<script>
  import { formatDate } from "$lib/util/hr/utilsHR.js";
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Button,
  } from "flowbite-svelte";
  export let data, eMap;
</script>

<div class="overflow-x-auto">
  <Table striped={true} hoverable={true}>
    <TableHead>
      <TableHeadCell>Employee ID</TableHeadCell>
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell>Position</TableHeadCell>
      <TableHeadCell>Date of Hire</TableHeadCell>
      <TableHeadCell>Reports To</TableHeadCell>
      <TableHeadCell>
        <span class="sr-only">Edit</span>
      </TableHeadCell>
      <TableHeadCell>
        <span class="sr-only">Delete</span>
      </TableHeadCell>
    </TableHead>
    <TableBody class="divide-y">
      {#each data as employee}
        <TableBodyRow>
          <TableBodyCell>{employee.Employee_ID}</TableBodyCell>
          <TableBodyCell>
            <a href="/employee/{employee.Employee_ID}">
              {employee.Employee_FirstName}
              {employee.Employee_MiddleName ? employee.Employee_MiddleName : ""}
              {employee.Employee_LastName}
            </a>
          </TableBodyCell>
          <TableBodyCell>
            {#if employee.Job_Position === "Unassigned"}
              <p>{employee.Job_Position.toUpperCase()}</p>
              <form method="post" action={"./job/add?/insert"}>
                <input
                  type="hidden"
                  name="employee-id"
                  value={employee.Employee_ID}
                />
                <Button type="submit">Add Job</Button>
              </form>
            {:else}
              {employee.Job_Position}
            {/if}
          </TableBodyCell>
          <TableBodyCell
            >{formatDate(employee.Employee_DateOfHire)}</TableBodyCell
          >
          <TableBodyCell>
            {#if employee.Employee_ReportsTo != null}
              {eMap[employee.Employee_ReportsTo].Employee_FirstName}
              {eMap[employee.Employee_ReportsTo].Employee_LastName}
            {:else}
              N/A
            {/if}
          </TableBodyCell>
          <TableBodyCell>
            <form
              method="POST"
              action={`./employee/${employee.Employee_ID}/editEmployee?/edit`}
            >
              <Button type="submit">Edit</Button>
            </form>
          </TableBodyCell>
          <TableBodyCell>
            <form method="POST" action="?/delete">
              <input
                type="hidden"
                name="id"
                hidden
                value={employee.Employee_ID}
              />
              <Button type="submit">Delete</Button>
            </form>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</div>
