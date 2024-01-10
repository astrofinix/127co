<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="container">
  <div class="project grid grid-cols-3 gap-5">
    {#each data.teams as teams}
      <a
        href="/dashboard/teams/{teams.Team_ID}"
        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <div class="flex items-center mb-2">
          <p
            class="text-lg font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {teams.Team_Name}
          </p>
          <p
            class="ml-2 text-xs border-2 rounded-full border-gray-400 text-gray-400 p-1 pl-2 pr-2"
          >
            {teams.Team_Members.length} Members
          </p>
        </div>
        <p class="font-normal text-gray-700 dark:text-gray-400">
          Led by {teams.Team_Leader.Employee_FirstName}
          {teams.Team_Leader.Employee_MiddleName
            ? teams.Team_Leader.Employee_MiddleName
            : ""}
          {teams.Team_Leader.Employee_LastName}
        </p>
      </a>
    {/each}
  </div>
</div>
