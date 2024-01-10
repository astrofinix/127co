<script lang="ts">
  import Table from "$lib/components/Table.svelte";
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";

  import type { PageServerData } from "./$types";

  export let data: NonNullable<PageServerData>;

  const rows = data["data"];
  const table = data["table"];
  const headers = data["headers"];
  const primaryKey = data["primaryKey"];

  const handleEdit = async (id: number) => {};

  const handleDelete = async (id: number) => {
    await fetch("/dashboard/supplies/api/database/delete", {
      method: "POST",
      body: JSON.stringify({
        id,
        table: table,
      }),
    });
  };
</script>

<main class="w-full">
  <Breadcrumb
    items={[
      { href: "/dashboard/supplies", text: "Supplies and Inventory" },
      { href: `/dashboard/supplies/${table}`, text: "Items" },
    ]}
  />
  <a
    href={`/dashboard/supplies/${table}/add`}
    class="bg-buttonp rounded-lg z-4 border-2 w-40 border-outline p-3 mb-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-2"> add </span>
    <div class="flex flex-col h-full">
      <span>Add an Entry</span>
    </div>
  </a>
  <Table
    {primaryKey}
    {handleDelete}
    {handleEdit}
    {headers}
    {rows}
  />
</main>
