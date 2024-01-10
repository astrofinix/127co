<script lang="ts">
  import Table from "$lib/components/cooperative/Table.svelte";
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import type { PageServerData } from "./$types";
  import Tables from "$lib/tables";
  import Alert from "$lib/components/Alert.svelte";


  export let data: NonNullable<PageServerData>;

  $: rows = data["data"] as Array<Record<string, any>>;
  const table = data["table"] as string;
  $: department = "cooperative";
  const { name } = Tables[table];
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
  <Table {table} {rows} />

  <Alert />


</main>
