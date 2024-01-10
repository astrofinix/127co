<script lang="ts">
    import Breadcrumb from "$lib/components/Breadcrumb.svelte";
    import { Label, Input, Helper } from "flowbite-svelte";
    import { requestHeaders as headers } from "$lib/headers";
    import type { PageServerData } from "./$types";

  
    let formData: Record<string, any> = {};

    export let data: NonNullable<PageServerData>;
  
    const table = data["table"];

  
    const handleSubmit = async () => {
      await fetch("/dashboard/cooperative/api/database/create", {
        method: "POST",
        body: JSON.stringify({
          data: JSON.stringify(formData),
          table: table,
        }),
      });
    };

  </script>
  


  <main class="w-full">
    <Breadcrumb
      items={[
        { href: "/dashboard/cooperative", text: "Cooperative" },
        { href: `/dashboard/cooperative/request/`, text: table },
        { href: `/dashboard/cooperative/request/add`, text: "Add an Entry" },
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
      <Helper class="mt-2 hidden" color="red" id="error-char">
        <span class="font-medium">Please enter characters only (A-Z, a-z)</span>
      </Helper>
      <Helper class="mt-2 hidden" color="red" id="error-num">
        <span class="font-medium">Please enter numbers only (0-9)</span>
      </Helper>
      <Helper class="mt-2 hidden" color="red" id="error-date">
        <span class="font-medium">Please enter in date format only (2023-02-01 09:00:00)</span>
      </Helper>
    {/each}
  
    <button
      on:click={handleSubmit}
      class="mt-4 bg-accent hover:bg-primary-600 text-white px-4 py-2 rounded"
    >
      Add an Entry
    </button>
  </main>
  