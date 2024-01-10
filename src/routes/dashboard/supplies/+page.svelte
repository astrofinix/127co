<script lang="ts">
  import { Search, Button } from "flowbite-svelte";
  import Table from "$lib/components/supplies/Table.svelte";
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";

  import type { PageServerData } from "./$types";

  export let data: NonNullable<PageServerData>;

  $: items = data["items"] as Array<Record<string, any>>;
  $: suppliers = data["suppliers"] as Array<Record<string, any>>;
  $: transactions = data["transactions"] as Array<Record<string, any>>;
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

  <Table table="Item" rows={items} />
  <Table table="Supplier" rows={suppliers} />
  <Table table="Item_Transaction" rows={transactions} />

  <a
    href="/dashboard/supplies/Item"
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
    href="/dashboard/supplies/Item_Transaction"
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
    href="/dashboard/supplies/Supplier"
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
