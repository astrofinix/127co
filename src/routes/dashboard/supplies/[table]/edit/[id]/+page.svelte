<script lang="ts">
  import type { PageServerData } from "./$types";
  import type { ActionResult } from "@sveltejs/kit";

  import { applyAction, deserialize } from "$app/forms";
  import { invalidateAll } from "$app/navigation";

  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import { Label, Input, Helper } from "flowbite-svelte";
  import Tables from "$lib/tables";
  import Alerts from "$lib/components/Alerts.svelte";

  import { onMount } from "svelte";

  export let data: NonNullable<PageServerData>;
  $: table = data["table"];
  // @ts-ignore
  $: rows = data["data"];

  // @ts-ignore
  $: ({ headers, name } = Tables[table]);
  let alerts: Array<{message: string, type: "fail" | "success"}>= [];
  let formData: Record<string, any> = {};

  onMount(() => {
    for (const header of headers) {
      formData[header] = rows[header];
    }
  });

  // @ts-ignore
	async function handleSubmit(event) {
		const data = new FormData(event.currentTarget);
		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: data
		});
		const result: ActionResult = deserialize(await response.text());
    console.log(result)
		if (result.type === 'success') {
			await invalidateAll();
		}
    alerts = [
      ...alerts,
      // @ts-ignore
      { message: result.data.message, type: result.data.success ? "success" : "fail"}
    ]
		applyAction(result);
	}
</script>

<main class="w-full">
  <Alerts data={alerts} />
  <Breadcrumb
    items={[
      { href: "/dashboard/supplies", text: "Supplies and Inventory" },
      { href: `/dashboard/supplies/${table}`, text: name },
      { href: `/dashboard/supplies/${table}/edit`, text: "Edit an Entry" },
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

  <form method="POST" action="?/edit" on:submit|preventDefault={handleSubmit}>
    {#each headers as header (header)}
      <input type="hidden" name={header} bind:value={formData[header]} />
    {/each}
    <button
      type="submit"
      class="mt-4 bg-accent hover:bg-primary-600 text-white px-4 py-2 rounded"
    >
      Edit an Entry
    </button>
    <form></form>
  </form>
</main>
