<script lang="ts">
  import { Search, Button, Dropdown, DropdownItem } from 'flowbite-svelte';
  import { SearchOutline, ChevronDownSolid } from 'flowbite-svelte-icons';
  import { enhance } from '$app/forms';
  import Alerts from "$lib/components/Alerts.svelte";

  import type { ActionResult } from "@sveltejs/kit";

  import { applyAction, deserialize } from "$app/forms";
  import { invalidateAll } from "$app/navigation";
  
  import Table from "$lib/components/cooperative/Table.svelte";
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import type { PageServerData } from "./$types";
  import Tables from "$lib/tables";

  export let data: NonNullable<PageServerData>;

  $: rows = data["data"] as Array<Record<string, any>>;
  const table = data["table"] as string;
  $: department = "cooperative";
  const { name } = Tables[table];

  let query: string;

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
      console.log(rows)
    }
    applyAction(result);

  }
</script>
<main class="w-full">

  <Breadcrumb
    items={[
      { href: "/dashboard/cooperative", text: "Cooperative" },
      { href: `/dashboard/cooperative/${table}`, text: name },
    ]}
  />
  <a
    href={`/dashboard/cooperative/${table}/add`}
    class="bg-buttonp rounded-lg z-4 border-2 w-40 border-outline p-3 mb-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-2"> add </span>
    <div class="flex flex-col h-full">
      <span>Add an Entry</span>
    </div>
  </a>

  <form class="flex mb-5" method="POST" on:submit|preventDefault={handleSubmit} action="?/search">
    <div class="relative">
    </div>
    <Search size="md" class="rounded-none py-2.5" bind:value={query} />
    <Button class="!p-2.5 rounded-s-none" type="submit">
      <SearchOutline class="w-5 h-5" />
    </Button>
    <input type="hidden" name="query" bind:value={query}/>
  </form>

  <Table {table} {rows} />

</main>
