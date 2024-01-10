<script lang="ts">
  import DescriptiveLink from "$lib/components/DescriptiveLink.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  let links = data.links.filter((link) => link.href !== "/dashboard");
</script>

<div class="w-full flex flex-col space-y-4">
  {#each links as link}
    {#if link.href === "/dashboard/human_resources"}
      <div class="w-full">
        <a
          href="/dashboard/human_resources"
          class="text-2xl font-bold flex items-center pb-6"
        >
          {link.label}
        </a>
        <DescriptiveLink
          links={[
            {
              href: "/dashboard/human_resources/employee",
              label: "Employees",
              icon: "groups",
              description: "Show the list of current employees.",
            },
            {
              href: "/dashboard/human_resources/job",
              label: "Jobs",
              icon: "work",
              description: "Explore and manage job-related information.",
            },
            {
              href: "/dashboard/human_resources/shift",
              label: "Shifts",
              icon: "schedule",
              description: "View and manage employee work schedules.",
            },
            {
              href: "/dashboard/human_resources/timesheet",
              label: "Timesheets",
              icon: "punch_clock",
              description:
                "Track and manage employee working hours and attendance.",
            },
            {
              href: "/dashboard/human_resources/health-exam",
              label: "Health Exams",
              icon: "medical_information",
              description:
                "Track and manage employee health examination records.",
            },
          ]}
        />
      </div>
    {:else if link.href === "/dashboard/teams"}
      <div class="w-full">
        <a
          href="/dashboard/human_resources"
          class="text-2xl font-bold flex items-center pb-6"
        >
          Project Management
        </a>
        <DescriptiveLink
          links={[
            {
              href: "/dashboard/teams",
              label: "Teams",
              icon: "groups",
              description: "Show the list of current teams.",
            },
            {
              href: "/dashboard/projects",
              label: "Projects",
              icon: "work",
              description: "Explore and manage project-related information.",
            },
            {
              href: "/dashboard/software",
              label: "Software",
              icon: "code",
              description: "View and manage software-related information.",
            },
          ]}
        />
      </div>
    {/if}
  {/each}
</div>
