<script lang="ts">
  import Table from "$lib/components/supplies/Table.svelte";
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import type { PageServerData } from "./$types";
  import Tables from "$lib/tables";

  export let data: NonNullable<PageServerData>;

<<<<<<< HEAD
  const rows = data["data"] as Array<Record<string, any>>;
  const table = data["table"] as string;
  const department = "supplies";
  const {name} = Tables[table]
=======
  $: rows = data["data"] as Array<Record<string, any>>;
  $: table = data["table"] as string;
>>>>>>> 731add57a0a434c19f16bb96f374c43df791d33f

  // @ts-ignore
  $: ({ name } = Tables[table]);
</script>

<main class="w-full">
  <Breadcrumb
    items={[
      { href: "/dashboard/supplies", text: "Supplies and Inventory" },
<<<<<<< HEAD
      { href: `/dashboard/supplies/${table}`, text: name }
=======
      { href: `/dashboard/supplies/${table}`, text: name },
>>>>>>> 731add57a0a434c19f16bb96f374c43df791d33f
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
  <Table {table} {rows} />
</main>
