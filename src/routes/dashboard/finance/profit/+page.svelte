<script lang="ts">
  import { Search, Button } from "flowbite-svelte";
  import Table from "$lib/components/Table.svelte";
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";

  import type { PageServerData } from "./$types";
  import {
    salaryHeaders,
    budgetHeaders,
    expenseHeaders,
    ctransactionHeaders,
  } from "$lib/headers";

  export let data: NonNullable<PageServerData>;

  let rows = data["data"];
  let table = data["table"];

  const headers =
    table === "salary"
      ? salaryHeaders
      : table === "budget"
        ? budgetHeaders
        : table === "expenditure"
          ? expenseHeaders
          : table === "contract_transaction"
            ? ctransactionHeaders
            : undefined;

  const primaryKey =
    table === "salary"
      ? salaryHeaders[0]
      : table === "budget"
        ? budgetHeaders[0]
        : table === "expenditure"
          ? expenseHeaders[0]
          : table === "contract_transaction"
            ? ctransactionHeaders[0]
            : undefined;

  const pageTitle =
    table === "salary"
      ? "Salary"
      : table === "budget"
        ? "Budget"
        : table === "expenditure"
          ? "Expenditure"
          : table === "contract_transaction"
            ? "Contract Transactions"
            : undefined;

  const handleEdit = async (id: number) => {
    await fetch("/finance/api/database/edit", {
      method: "POST",
      body: JSON.stringify({
        id,
        table,
      }),
    });
  };

  const handleDelete = async (id: number) => {
    await fetch("/finance/api/database/delete", {
      method: "POST",
      body: JSON.stringify({
        id,
        table,
      }),
    });
  };
</script>

<main class="w-full">
  <Breadcrumb
    items={[
      { href: "/dashboard/finance", text: "Finance" },
      { href: `/dashboard/finance/${table}`, text: pageTitle },
    ]}
  />

  <Search class="mb-8">
    <Button class="bg-activeb">Search</Button>
  </Search>

  <div class="ml-9 mb-20">
    <span class="text-xl mb-40 text-center font-bold"
      >No exact match found.</span
    >
  </div>

  <a
    href="/dashboard/finance/{table}/add"
    class="bg-buttonp rounded-lg z-4 border-2 w-40 border-outline p-3 mb-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-2"> add </span>
    <div class="flex flex-col h-full">
      <span>Add an Entry</span>
    </div>
  </a>
  <Table {primaryKey} {headers} {rows} {handleEdit} {handleDelete} />
</main>
