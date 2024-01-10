<script>
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import DescriptiveLink from "$lib/components/DescriptiveLink.svelte";
</script>

<main class="w-full">
  <Breadcrumb
    items={[
      { href: "/dashboard/project_management", text: "Project Management" },
    ]}
  />
  <DescriptiveLink
    links={[
      {
        href: "/dashboard/project_management/teams",
        label: "Teams",
        icon: "groups",
        description: "Show the list of current teams.",
      },
      {
        href: "/dashboard/project_management/projects",
        label: "Projects",
        icon: "work",
        description: "Explore and manage project-related information.",
      },
      {
        href: "/dashboard/project_management/software",
        label: "Software",
        icon: "code",
        description: "View and manage software-related information.",
      },
    ]}
  />
</main>
