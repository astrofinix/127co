<script lang="ts">
  import type { ActionResult } from "@sveltejs/kit";

import { enhance, applyAction, deserialize } from "$app/forms";
import { invalidateAll } from "$app/navigation";

import Tables from "$lib/tables";

import { alerts } from "$lib/store";

export let rows: Array<Record<string, any>> = [];
export let table: string;

// @ts-ignore
$: ({ headers, primaryKey, department } = Tables[table]);

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
  $alerts = [
    ...$alerts,
    // @ts-ignore
    {
      message: result.data.message,
      type: result.data.success ? "success" : "fail",
    },
  ];
  applyAction(result);
}
</script>

<div class="flex mt-4 mb-4 flex-col">
  <div class="-m-1.5 overflow-x-auto">
    <div class="p-1.5 min-w-full inline-block align-middle">
      <div class="overflow-hidden border-outline">
        <table
          class="min-w-full divide-y bg-tablebg dark:divide-gray-700 border-outline"
        >
          <thead>
            <tr>
              {#each headers as header (header)}
                <th
                  scope="col"
                  class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >{header}</th
                >
              {/each}
              <th
                scope="col"
                class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                >Actions</th
              >
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            {#each rows as row (row)}
              <tr class="hover:bg-tableh dark:hover:bg-gray-700">
                {#each Object.values(row) as value (value)}
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"
                    >{value}</td
                  >
                {/each}
                <td
                  class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium"
                >
                  <form method="POST" action="?/delete" on:submit|preventDefault={handleSubmit}>
                    <input
                      type="hidden"
                      name="table"
                      id={row[primaryKey]}
                      bind:value={table}
                    />
                    <input
                      type="hidden"
                      name="id"
                      id={row[primaryKey]}
                      bind:value={row[primaryKey]}
                    />
                    <a
                      href={`/dashboard/${department}/${table}/edit/${row[primaryKey]}`}
                      class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      >Edit</a
                    >
                    <button
                      type="submit"
                      formaction="?/delete"
                      class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-active hover:text-hactive disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      >Delete</button
                    >
                  </form>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
