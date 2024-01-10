<script lang="ts">
  import { Search, Button } from "flowbite-svelte";
  import Table from "$lib/components/marketing/Table.svelte";
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";

  import type { PageServerData } from "./$types";
  import { clientHeaders } from "$lib/headers";

  export let data: NonNullable<PageServerData>;

  const client = data["client"];

  // const handleDelete = async (id: number, table: string) => {
  //     await fetch("/dashboard/supplies/api/database/delete", {
  //     method: "POST",
  //     body: JSON.stringify({ id, table }),
  //     });
  // };

  // const handleEdit = (id: number, table: string) => {};
</script>

<main class="w-full">
  <Breadcrumb
    items={[
      {
        href: "/dashboard/marketing",
        text: "Marketing and Customer Acquisition",
      },
      { href: `/dashboard/marketing/client`, text: "Client" },
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

  <Table primaryKey="Client_ID" headers={clientHeaders} rows={client} />
</main>
