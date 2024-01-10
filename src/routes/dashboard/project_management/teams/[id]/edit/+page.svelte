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
        href: `/dashboard/project_management/teams/${data.team.Team_ID}/edit`,
        text: `Edit ${data.team.Team_Name}`,
      },
    ]}
  />
  <form class="grid grid-cols-3 gap-4" method="POST">
    <div class="flex items-center">
      <label class="text-sm text-gray-900 p-1 pl-2 pr-2" for="name">Name:</label
      >
      <input
        class="text-sm border-2 rounded-full border-gray-400 text-gray-700 p-1 pl-2 pr-2"
        type="text"
        id="name"
        name="name"
        value={data.team.Team_Name}
      />
    </div>
    <div class="flex items-center">
      <label class="text-sm text-gray-900 p-1 pl-2 pr-2" for="type"
        >Team Leader:</label
      >
      <select
        class="text-sm border-2 rounded-full border-gray-400 text-gray-700 p-1 pl-2 pr-2"
        id="leader"
        name="leader"
        value={data.team.Team_Leader_ID}
      >
        {#each data.leaders as user}
          <option value={user.Employee_ID}
            >{user.Employee_FirstName}
            {user.Employee_MiddleName ? user.Employee_MiddleName : ""}
            {user.Employee_LastName}</option
          >
        {/each}
      </select>
    </div>
    <div class="flex justify-end col-span-2 p-2 space-x-2">
      <button
        type="submit"
        class={"flex text-sm my-0.5 mx-4 rounded-md items-center space-x-3 py-2 px-4 transition duration-200 hover:bg-phover hover:text-secondary focus:text-accent focus:bg-afocus"}
      >
        <span class="material-symbols-outlined">save</span>
        <span class="text-base">Save</span>
      </button>
      <a
        href="/dashboard/project_management/teams/{data.team.Team_ID}"
        class={"flex text-sm my-0.5 mx-4 rounded-md items-center space-x-3 py-2 px-4 transition duration-200 hover:bg-phover hover:text-secondary focus:text-accent focus:bg-afocus"}
      >
        <span class="material-symbols-outlined">cancel</span>
        <span class="text-base">Cancel</span>
      </a>
      <a
        href="/dashboard/project_management/teams/{data.team.Team_ID}/delete"
        class={"flex text-sm my-0.5 mx-4 rounded-md items-center space-x-3 py-2 px-4 transition duration-200 hover:bg-phover hover:text-secondary focus:text-accent focus:bg-afocus"}
      >
        <span class="material-symbols-outlined">delete</span>
        <span class="text-base">Delete</span>
      </a>
    </div>
  </form>
</div>
