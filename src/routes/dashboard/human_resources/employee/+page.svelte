<script>
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import EmployeesDisplay from "$lib/components/hr/displays/EmployeesDisplay.svelte";
  import { searchKeywordsEmployee } from "$lib/util/hr/searchUtilHR";
  import { Button, TableSearch } from "flowbite-svelte";
  import { Section } from "flowbite-svelte-blocks";
  export let data;

  let eMap = {};
  data.data.forEach((e) => {
    eMap[e.Employee_ID] = e;
  });

  const searchEmployee = data.data.map((employee) => ({
    ...employee,
    searchTerms: searchKeywordsEmployee(employee, eMap),
  }));
  let searchTerm = "";

  $: filteredItems = searchEmployee.filter((employee) => {
    return employee.searchTerms
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });
</script>

<main class="w-full">
  <Breadcrumb
    items={[
      { href: "/dashboard/human_resources", text: "Human Resources" },
      { href: "/dashboard/human_resources/employee", text: "Employees" },
    ]}
  />
  <Section classSection="p-3 sm:p-5">
    <TableSearch
      placeHolder="Search keywords"
      hoverable={true}
      bind:inputValue={searchTerm}
    >
      <div slot="header" class="flex justify-between items-center">
        <p>
          Returned {filteredItems.length}
          {filteredItems.length <= 1 ? "result" : "results"}
        </p>
        <Button href="./employee/add" class="mt-2 mb-2">Add Employee</Button>
      </div>
      <EmployeesDisplay data={filteredItems} {eMap} />
    </TableSearch>
  </Section>
</main>
