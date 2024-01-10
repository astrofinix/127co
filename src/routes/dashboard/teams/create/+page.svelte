<script lang="ts">
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import type { PageServerLoad } from "./$types";

  export let data: PageServerLoad;
</script>

<div>
  <Breadcrumb
    items={[
      { href: "/dashboard/teams", text: "Team" },
      {
        href: `/dashboard/teams/create`,
        text: `Create Team`,
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
        placeholder="Team Name"
        required
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
        placeholder="Select Team Leader"
        required
      >
        <option value="" disabled selected hidden>Select Team Leader</option>
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
        href="/dashboard/teams"
        class={"flex text-sm my-0.5 mx-4 rounded-md items-center space-x-3 py-2 px-4 transition duration-200 hover:bg-phover hover:text-secondary focus:text-accent focus:bg-afocus"}
      >
        <span class="material-symbols-outlined">cancel</span>
        <span class="text-base">Cancel</span>
      </a>
    </div>
  </form>
</div>
