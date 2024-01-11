<script lang="ts">
  import { Search, Button } from "flowbite-svelte";
  import Table from "$lib/components/marketing/Table.svelte";
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";

  import type { PageServerData } from "./$types";

  export let data: NonNullable<PageServerData>;

  $: client = data["client"] as Array<Record<string, any>>;
  $: contract = data["contract"] as Array<Record<string, any>>;
</script>

<main class="w-full">
  <Breadcrumb
    items={[{ href: "/dashboard/marketing", text: "Marketing and Customer Acquisition" }]}
  />

  <!-- <Search class="mb-8">
    <Button class="bg-activeb">Search</Button>
  </Search>

  <div class="ml-9 mb-20">
    <span class="text-xl mb-40 text-center font-bold"
      >No exact match found.</span
    >
  </div>

  <Table table="Client" rows={client} />
  <Table table="Contract" rows={contract} /> -->

  <a
    href="/dashboard/marketing/Client"
    class="bg-buttonp rounded-lg z-4 mb-1 border-2 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5"> people </span>
    <div class="flex w-full flex-col h-full">
      <span>Client</span>
      <span class="text-subtext z-4">Centralizes client data for easy access and management.</span>
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>

  <a
    href="/dashboard/marketing/Contract"
    class="bg-buttonp rounded-lg z-4 mb-1 border-2 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5"> contract </span>
    <div class="flex w-full flex-col h-full">
      <span>Contract</span>
      <span class="text-subtext z-4"
        >Houses a complete record of contract agreements.</span
      >
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>

</main>
