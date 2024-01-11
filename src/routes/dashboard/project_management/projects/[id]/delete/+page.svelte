<script lang="ts">
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<div>
  <Breadcrumb
    items={[
      { href: "/dashboard/project_management", text: "Project Management" },
      { href: "/dashboard/project_management/projects", text: "Projects" },
      {
        href: `/dashboard/projects/${data.project.Project_ID}`,
        text: data.project.Project_Name,
      },
      {
        href: `/dashboard/projects/${data.project.Project_ID}/delete`,
        text: `Delete ${data.project.Project_Name}`,
      },
    ]}
  />

  <div class="container">
    <p class="mb-4">Are you sure you want to delete this project?</p>
    <form method="POST">
      <button type="submit">Yes</button>
      <a href="/dashboard/project_management/projects/{data.project.Project_ID}"
        >Cancel</a
      >
    </form>
  </div>
</div>
