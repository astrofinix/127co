<script lang="ts">
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import Menu from "$lib/components/Menu.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  let query: string = "";
  let selected_leader: string = "";
  let filtered_teams = data.teams;
  let show_add = true;

  $: if (query || selected_leader) {
    filtered_teams = data.teams.filter(
      (team: any) =>
        team.Team_Name.toLowerCase().includes(query.toLowerCase()) &&
        (team.Team_Leader_Name.toLowerCase().includes(
          selected_leader.toLowerCase(),
        ) ||
          selected_leader === ""),
    );
    show_add = false;
  } else {
    filtered_teams = data.teams;
    show_add = true;
  }

  let team_leaders = [
    ...new Set(
      filtered_teams.map((team) =>
        JSON.stringify(team.Team_Leader_Name).replace(/"/g, ""),
      ),
    ),
  ];
</script>

<div class="container">
  <Breadcrumb items={[{ href: "/dashboard/teams", text: "Teams" }]} />
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
        name="Select Leader"
        items={team_leaders}
        bind:selected_item={selected_leader}
      />
    </div>
  </div>
  <div
    class="project grid lg:grid-cols-3 gap-5 sm:grid-cols-1 md:grid-cols-2 sm:w-full"
  >
    {#if show_add}
      <a
        href="/dashboard/teams/create"
        class="block sm:max-w-full md:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <span class="material-symbols-outlined">add</span>
        <div class="flex flex-col h-full">
          <span>Add a new Team</span>
        </div>
      </a>
    {/if}
    {#each filtered_teams as teams}
      <a
        href="/dashboard/teams/{teams.Team_ID}"
        class="block sm:max-w-full md:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
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
