<script lang="ts">
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import Menu from "$lib/components/Menu.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  let query: string = "";
  let filtered_software = data.software;
  let show_add = true;
  let selected_license: string = "";
  let selected_os: string = "";
  let selected_pub: string = "";
  let selected_type: string = "";

  $: if (
    query ||
    selected_os ||
    selected_pub ||
    selected_license ||
    selected_type
  ) {
    filtered_software = data.software.filter(
      (software: any) =>
        (software.Software_Name.toLowerCase().includes(query.toLowerCase()) ||
          software.Software_Version.toLowerCase().includes(
            query.toLowerCase(),
          ) ||
          software.Software_OS.toLowerCase().includes(query.toLowerCase()) ||
          software.Software_Publisher.toLowerCase().includes(
            query.toLowerCase(),
          ) ||
          software.Software_License.toLowerCase().includes(
            query.toLowerCase(),
          )) &&
        (software.Software_OS.toLowerCase().includes(
          selected_os.toLowerCase(),
        ) ||
          selected_os === "") &&
        (software.Software_Publisher.toLowerCase().includes(
          selected_pub.toLowerCase(),
        ) ||
          selected_pub === "") &&
        (software.Software_License.toLowerCase().includes(
          selected_license.toLowerCase(),
        ) ||
          selected_license === "") &&
        (software.Software_Type.toLowerCase().includes(
          selected_type.toLowerCase(),
        ) ||
          selected_type === ""),
    );
    show_add = false;
  } else {
    filtered_software = data.software;
    show_add = true;
  }
  let soft_licenses = [
    ...new Set(
      filtered_software.map((software) =>
        JSON.stringify(software.Software_License).replace(/"/g, ""),
      ),
    ),
  ];

  let soft_publishers = [
    ...new Set(
      filtered_software.map((software) =>
        JSON.stringify(software.Software_Publisher).replace(/"/g, ""),
      ),
    ),
  ];

  let soft_types = [
    ...new Set(
      filtered_software.map((software) =>
        JSON.stringify(software.Software_Type).replace(/"/g, ""),
      ),
    ),
  ];
</script>

<div class="container">
  <Breadcrumb
    items={[
      { href: "/dashboard/project_management", text: "Project Management" },
      { href: "/dashboard/project_management/software", text: "Software" },
    ]}
  />
  <div class="flex items-center justify-center">
    <div class="flex items-center">
      <input
        class="text-gray-700 block rounded-md px-4 py-2 text-sm mr-2"
        name="search"
        type="text"
        placeholder="Search"
        aria-label="Search"
        bind:value={query}
      />
      <Menu
        name="Select Type"
        items={soft_types}
        bind:selected_item={selected_type}
      />
      <Menu
        name="Select License"
        items={soft_licenses}
        bind:selected_item={selected_license}
      />
      <Menu
        name="Select OS"
        items={["Windows", "macOS", "Linux", "Cross-platform", "Web-based"]}
        bind:selected_item={selected_os}
      />
      <Menu
        name="Select Publisher"
        items={soft_publishers}
        bind:selected_item={selected_pub}
      />
    </div>
  </div>
  <div
    class="project grid lg:grid-cols-3 gap-5 sm:grid-cols-1 md:grid-cols-2 sm:w-full"
  >
    {#if show_add}
      <a
        href="/dashboard/project_management/software/create"
        class="block sm:max-w-full md:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <span class="material-symbols-outlined">add</span>
        <div class="flex flex-col h-full">
          <span>Add a new Software</span>
        </div></a
      >
    {/if}
    {#each filtered_software as software}
      <a
        href="/dashboard/project_management/software/{software.Software_Name}_{software.Software_Version}"
        class="block sm:max-w-full md:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <div class="flex items-center mb-2">
          <p
            class="text-lg font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {software.Software_Name}
            {software.Software_Version}
          </p>
          <p
            class="ml-2 text-xs border-2 rounded-full border-gray-400 text-gray-400 p-1 pl-2 pr-2"
          >
            {software.Software_License}
          </p>
        </div>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          {software.Software_Type}
        </p>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          {software.Software_OS}
        </p>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          {software.Software_Publisher}
        </p>
      </a>
    {/each}
  </div>
</div>
