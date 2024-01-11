<script lang="ts">
  import Table from "$lib/components/finance/Table.svelte";
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import type { PageServerData } from "./$types";
  import Tables from "$lib/tables";

  export let data: NonNullable<PageServerData>;

  $: rows = data["data"] as Array<Record<string, any>>;
  $: table = data["table"] as string;
  $: ({ name } = Tables[table]);
</script>

<main class="w-full">
  <Breadcrumb
    items={[
      { href: "/dashboard/finance", text: "Finance" },
      { href: `/dashboard/finance/${table}`, text: name },
    ]}
  />
  <a
    href={`/dashboard/finance/${table}/add`}
    class="bg-buttonp rounded-lg z-4 border-2 w-40 border-outline p-3 mb-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-2"> add </span>
    <div class="flex flex-col h-full">
      <span>Add an Entry</span>
    </div>
  </a>
  <Table {table} {rows} />
</main>