<script lang="ts">
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import { Label, Input, Helper } from "flowbite-svelte";
  import type { PageServerData } from "./$types";
  import Tables from "$lib/tables";
<<<<<<< HEAD

  export let data: NonNullable<PageServerData>;
  const table = data["table"];

  // @ts-ignore
  const { headers, name } = Tables[table];

  let formData: Record<string, any> = {};

=======

  export let data: NonNullable<PageServerData>;
  const table = data["table"];

  // @ts-ignore
  const { headers, name } = Tables[table];

  let formData: Record<string, any> = {};
>>>>>>> 731add57a0a434c19f16bb96f374c43df791d33f
</script>

<main class="w-full">
  <Breadcrumb
    items={[
      { href: "/dashboard/cooperative", text: "Cooperative" },
      { href: `/dashboard/cooperative/${table}`, text: name },
      { href: `/dashboard/cooperative/${table}/add`, text: "Add an Entry" },
    ]}
  />
  {#each headers as header (header)}
    <div class="mb-3 w-96">
      <Label for={header} class="block mb-2">{header}</Label>
      <Input
        type="text"
        id={header}
        bind:value={formData[header]}
        class="w-full p-2 border border-gray-300 rounded"
      />
    </div>
    <Helper class="mt-2 hidden" color="red" id="error-date"
      ><span class="font-medium"
        >Please enter in date format only (2023-02-01 09:00:00)</span
      ></Helper
    >
    <Helper class="mt-2 hidden" color="red" id="error-char"
      ><span class="font-medium">Please enter characters only (A-Z, a-z)</span
      ></Helper
    >
    <Helper class="mt-2 hidden" color="red" id="error-num"
      ><span class="font-medium">Please enter numbers only (0-9)</span></Helper
    >
  {/each}

  <form method="POST" action="?/add">
<<<<<<< HEAD
    <input type="hidden" name="table" value={table}/>
    {#each headers as header (header)}
      <input type="hidden" name={header} bind:value={formData[header]}/>
=======
    <input type="hidden" name="table" value={table} />
    {#each headers as header (header)}
      <input type="hidden" name={header} bind:value={formData[header]} />
>>>>>>> 731add57a0a434c19f16bb96f374c43df791d33f
    {/each}
    <button
      type="submit"
      class="mt-4 bg-accent hover:bg-primary-600 text-white px-4 py-2 rounded"
    >
      Add an Entry
    </button>
  </form>
</main>
