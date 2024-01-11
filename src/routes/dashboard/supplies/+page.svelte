<script lang="ts">
  import { Search, Button, Dropdown, DropdownItem } from 'flowbite-svelte';
  import { SearchOutline, ChevronDownSolid } from 'flowbite-svelte-icons';

  import type { ActionResult } from "@sveltejs/kit";

  import { applyAction, deserialize } from "$app/forms";
  import { invalidateAll } from "$app/navigation";

  import Table from "$lib/components/supplies/Table.svelte";
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import type { PageServerData } from './$types';
  import Statistics from '$lib/components/supplies/Statistics.svelte';

  export let data: PageServerData;

  const tables = [
    "Item",
    "Item_Transaction",
    "Supplier",
  ]

  let transactions = data.transactions;
  let suppliers = data.suppliers;
  let items = data.items;
  let statistics = data.statistics;

  let selectTable = 'Item'
  let query: string;
  let rows: Array<Record<string, any>> = items;

  // @ts-ignore
  async function handleSubmit(event) {
    const data = new FormData(event.currentTarget);
    const response = await fetch(event.currentTarget.action, {
      method: "POST",
      body: data,
    });
    const result: ActionResult = deserialize(await response.text());
    if (result.type === "success") {
      await invalidateAll();
    }
    // @ts-ignore
    if (result.data.success) {
      // @ts-ignore
      rows = result.data.rows;
    }
    applyAction(result);
  }

</script>

<main class="w-full">
  <Breadcrumb
    items={[{ href: "/dashboard/supplies", text: "Supplies and Inventory" }]}
  />


  <Statistics data={statistics}/>

  <form class="flex mb-5" method="POST" on:submit|preventDefault={handleSubmit} action="?/search">
    <div class="relative">
      <Button class="rounded-e-none whitespace-nowrap border border-e-0 border-primary-700">
        {selectTable}
        <ChevronDownSolid class="w-2.5 h-2.5 ms-2.5" />
      </Button>
      <Dropdown containerClass="w-40">
        {#each tables as label}
          <DropdownItem
            on:click={() => { 
              selectTable = label; 
              switch (selectTable) {
                case "Item":
                  rows = items;
                  break;
                case "Item_Transaction":
                  rows = transactions;
                  break;
                case "Supplier":
                  rows = suppliers;
                  break;
              }
            }}
            class={selectTable === label ? 'underline' : ''}>
            {label}
          </DropdownItem>
        {/each}
      </Dropdown>
    </div>
    <Search size="md" class="rounded-none py-2.5" bind:value={query} />
    <Button class="!p-2.5 rounded-s-none" type="submit">
      <SearchOutline class="w-5 h-5" />
    </Button>
    <input type="hidden" name="query" bind:value={query}/>
    <input type="hidden" name="table" bind:value={selectTable}/>
  </form>

  {#if rows.length > 0}
    <Table rows={rows} table={selectTable}/>
  {:else}
    <div class="ml-9 mb-20">
      <span class="text-xl mb-40 text-center font-bold"
        >No exact match found.</span
      >
    </div>
  {/if}


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
