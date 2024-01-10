<script>
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
</script>

<main class="w-full">
  <Breadcrumb
    items={[
      { href: "/dashboard/project_management", text: "Project Management" },
    ]}
  />
  <!-- Teams -->
  <a
    href="/dashboard/project_management/teams"
    class="bg-buttonp rounded-lg z-4 mb-1 border-2 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5"> groups </span>
    <div class="flex w-full flex-col h-full">
      <span>Teams</span>
      <span class="text-subtext z-4">Show the list of current teams.</span>
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>
  <!-- Projects -->
  <a
    href="/dashboard/project_management/projects"
    class="bg-buttonp rounded-lg z-4 mb-1 border-2 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5"> work </span>
    <div class="flex w-full flex-col h-full">
      <span>Projects</span>
      <span class="text-subtext z-4"
        >Explore and manage project-related information.</span
      >
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>
  <!-- Software -->
  <a
    href="/dashboard/project_management/software"
    class="bg-buttonp rounded-lg z-4 mb-1 border-2 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5"> code </span>
    <div class="flex w-full flex-col h-full">
      <span> Software </span>
      <span class="text-subtext z-4"
        >View and manage software-related information.</span
      >
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>
</main>
