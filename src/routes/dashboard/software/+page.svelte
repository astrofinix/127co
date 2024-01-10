<script lang="ts">
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  let query: string = "";
  let filtered_software = data.software;
  let show_add = true;

  $: if (query) {
    filtered_software = data.software.filter((software: any) =>
      software.Software_Name.toLowerCase().includes(query.toLowerCase())
    );
    show_add = false;
  } else {
    filtered_software = data.software;
    show_add = true;
  }
</script>

<div class="container">
  <Breadcrumb items={[{ href: "/dashboard/software", text: "Software" }]} />
  <div class="flex items-center justify-center">
    <div class="flex items-center py-2">
      <input
        name="search"
        type="text"
        placeholder="Search"
        aria-label="Search"
        bind:value={query}
      />
      <button
        type="submit"
      >
        Search
      </button>
    </div>
  </div>
  <div class="project grid grid-cols-3 gap-5">
    {#if show_add}
      <a href="/dashboard/software/add" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 material-symbols-outlined">add</a>
    {/if}
    {#each filtered_software as software}
      <a
        href="/dashboard/software/{software.Software_Name}{software.Software_Version}"
        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <div class="flex items-center mb-2">
          <p
            class="text-lg font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {software.Software_Name}
          </p>
          <p
            class="ml-2 text-xs border-2 rounded-full border-gray-400 text-gray-400 p-1 pl-2 pr-2"
          >
            {software.Software_Version}
          </p>
        </div>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          {software.Software_OS}
        </p>
      </a>
    {/each}
  </div>
</div>
