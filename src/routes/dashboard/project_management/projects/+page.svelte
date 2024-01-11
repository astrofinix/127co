<script lang="ts">
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import Menu from "$lib/components/Menu.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;

  let filtered_proj = data.projects;
  let show_add = true;
  let query: string = "";
  let selected_type: string = "";
  let selected_status: string = "";

  $: if (query || selected_type || selected_status) {
    filtered_proj = data.projects.filter(
      (project: any) =>
        (project.Project_Name.toLowerCase().includes(query.toLowerCase()) ||
          project.Project_Description.toLowerCase().includes(
            query.toLowerCase(),
          ) ||
          project.Project_Type.toLowerCase().includes(query.toLowerCase()) ||
          project.Project_Status.toLowerCase().includes(query.toLowerCase())) &&
        (project.Project_Type.toLowerCase().includes(
          selected_type.toLowerCase(),
        ) ||
          selected_type === "") &&
        (project.Project_Status.toLowerCase().includes(
          selected_status.toLowerCase(),
        ) ||
          selected_status === ""),
    );
    show_add = false;
  } else {
    filtered_proj = data.projects;
    show_add = true;
  }
</script>

<div class="container">
  <Breadcrumb
    items={[
      { href: "/dashboard/project_management", text: "Project Management" },
      { href: "/dashboard/project_management/projects", text: "Projects" },
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
        name="Select Status"
        items={[
          "In Development",
          "For Deployment",
          "For Monitoring",
          "For Presentation",
          "Done",
          "Terminated",
        ]}
        bind:selected_item={selected_status}
      />
      <Menu
        name="Select Type"
        items={["Mobile Application", "Web Application", "Standalone Systems"]}
        bind:selected_item={selected_type}
      />
    </div>
  </div>
  <div
    class="project grid lg:grid-cols-3 gap-5 sm:grid-cols-1 md:grid-cols-2 sm:w-full"
  >
    {#if show_add}
      <a
        href="/dashboard/project_management/projects/create"
        class="block sm:max-w-full md:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <span class="material-symbols-outlined">add</span>
        <div class="flex flex-col h-full">
          <span>Add a new Project</span>
        </div>
      </a>
    {/if}
    {#each filtered_proj as project}
      <a
        href="/dashboard/project_management/projects/{project.Project_ID}"
        class="block sm:max-w-full md:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <div class="relative flex items-center mb-2 group">
          <p
            class="text-lg font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {project.Project_Name}
          </p>
          <p
            class="ml-2 text-xs border-2 rounded-full border-gray-400 text-gray-400 p-1 pl-2 pr-2"
          >
            {project.Project_Type}
          </p>
        </div>
        <span class="flex items-center">
          <span
            class="h-3 w-3 rounded-full mr-2 {project.Project_Status === 'Done'
              ? 'bg-green-500'
              : project.Project_Status === 'Terminated'
                ? 'bg-red-500'
                : 'bg-yellow-500'}"
          ></span>
          <span class="text-sm text-gray-700 dark:text-gray-400"
            >{project.Project_Status}</span
          >
        </span>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          {project.Project_Description}
        </p>
      </a>
    {/each}
  </div>
</div>
