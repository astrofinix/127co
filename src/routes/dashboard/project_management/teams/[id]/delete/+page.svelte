<script lang="ts">
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<div>
  <Breadcrumb
    items={[
      { href: "/dashboard/project_management", text: "Project Management" },
      { href: "/dashboard/project_management/teams", text: "Team" },
      {
        href: `/dashboard/project_management/teams/${data.team.Team_ID}`,
        text: data.team.Team_Name,
      },
      {
        href: `/dashboard/project_management/teams/${data.team.Team_ID}/delete`,
        text: `Delete ${data.team.Team_Name}`,
      },
    ]}
  />

  <div class="container">
    <p class="mb-4">Are you sure you want to delete this team?</p>
    <form method="POST">
      <button type="submit">Yes</button>
      <a href="/dashboard/project_management/teams/{data.team.Team_ID}">No</a>
    </form>
  </div>
</div>
