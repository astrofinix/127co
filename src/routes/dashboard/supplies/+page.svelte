<script lang="ts">
  import { Search, Button } from "flowbite-svelte";
  import Table from "$lib/components/Table.svelte";
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";

  import type { PageServerData } from "./$types";
  import {
    itemHeaders,
    supplierHeaders,
    itemTransactionHeaders,
  } from "$lib/headers";

  export let data: NonNullable<PageServerData>;

  const items = data["items"];
  const suppliers = data["suppliers"];
  const transactions = data["transactions"];

  const handleDelete = async (id: number, table: string) => {
    await fetch("/dashboard/supplies/api/database/delete", {
      method: "POST",
      body: JSON.stringify({ id, table }),
    });
  };

  const handleEdit = (id: number, table: string) => {};
</script>

<main class="w-full">
  <Breadcrumb
    items={[{ href: "/dashboard/supplies", text: "Supplies and Inventory" }]}
  />

  <Search class="mb-8">
    <Button class="bg-activeb">Search</Button>
  </Search>

  <div class="ml-9 mb-20">
    <span class="text-xl mb-40 text-center font-bold"
      >No exact match found.</span
    >
  </div>

  <Table
    handleEdit={(id) => handleEdit(id, "item")}
    handleDelete={(id) => handleDelete(id, "item")}
    primaryKey="Item_Id"
    headers={itemHeaders}
    rows={items}
  />
  <Table
    handleEdit={(id) => handleEdit(id, "supplier")}
    handleDelete={(id) => handleDelete(id, "supplier")}
    primaryKey="Supplier_Id"
    headers={supplierHeaders}
    rows={suppliers}
  />
  <Table
    handleEdit={(id) => handleEdit(id, "item_transaction")}
    handleDelete={(id) => handleDelete(id, "item_transaction")}
    primaryKey="Transaction_Id"
    headers={itemTransactionHeaders}
    rows={transactions}
  />

  <a
    href="/dashboard/supplies/item"
    class="bg-buttonp rounded-lg z-4 mb-1 border-2 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5"> devices </span>
    <div class="flex w-full flex-col h-full">
      <span>Items</span>
      <span class="text-subtext z-4">Assess current item information.</span>
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>

  <a
    href="/dashboard/supplies/item_transaction"
    class="bg-buttonp rounded-lg z-4 mb-1 border-2 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5"> contract </span>
    <div class="flex w-full flex-col h-full">
      <span>Transactions</span>
      <span class="text-subtext z-4"
        >Track all transactions of all inventory items.</span
      >
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>

  <a
    href="/dashboard/supplies/supplier"
    class="bg-buttonp rounded-lg z-4 border-2 mb-1 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5"> warehouse </span>
    <div class="flex w-full flex-col h-full">
      <span>Supplier</span>
      <span class="text-subtext z-4"
        >Know more about supplier contact information.</span
      >
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>
</main>
