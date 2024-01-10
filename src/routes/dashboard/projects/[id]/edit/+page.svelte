<script lang="ts">
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<div>
  <Breadcrumb
    items={[
      { href: "/dashboard/projects", text: "Projects" },
      {
        href: `/dashboard/projects/${data.project.Project_ID}`,
        text: data.project.Project_Name,
      },
      {
        href: `/dashboard/projects/${data.project.Project_ID}/edit`,
        text: `Edit ${data.project.Project_Name}`,
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
        value={data.project.Project_Name}
      />
    </div>
    <div class="flex items-center">
      <label class="text-sm text-gray-900 p-1 pl-2 pr-2" for="type">Type:</label
      >
      <select
        class="text-sm border-2 rounded-full border-gray-400 text-gray-700 p-1 pl-2 pr-2"
        id="type"
        name="type"
      >
        <option value="Mobile Application">Mobile Application</option>
        <option value="Web Application">Web Application</option>
        <option value="Standalone System">Standalone System</option>
      </select>
    </div>
    <div class="flex items-center">
      <label class="text-sm text-gray-900 p-1 pl-2 pr-2" for="team"
        >Assigned Team:</label
      >
      <select
        class="text-sm border-2 rounded-full border-gray-400 text-gray-700 p-1 pl-2 pr-2"
        id="team"
        name="team"
      >
        {#each data.teams as team}
          <option value={team.Team_ID}>{team.Team_Name}</option>
        {/each}
      </select>
    </div>
    <div class="flex items-center col-span-3 row-span-2">
      <label class="text-sm text-gray-900 p-1 pl-2 pr-2" for="description"
        >Description:</label
      >
      <input
        class="text-sm border-2 rounded-full border-gray-400 text-gray-700 p-1 pl-2 pr-2 w-full min-h-7"
        type="textarea"
        id="description"
        name="description"
        value={data.project.Project_Description}
      />
    </div>
    <div class="flex items-center">
      <label class="text-sm text-gray-900 p-1 pl-2 pr-2" for="start-date"
        >Date Started:</label
      >
      <input
        class="text-sm border-2 rounded-full border-gray-400 text-gray-700 p-1 pl-2 pr-2"
        type="date"
        id="start-date"
        name="start-date"
        value={data.timeline.Timeline_StartDate.toISOString().split("T")[0]}
      />
    </div>
    <div class="flex items-center">
      <label
        class="text-sm text-gray-900 p-1 pl-2 pr-2"
        for="expected-finish-date">Est. Date of Completion:</label
      >
      <input
        class="text-sm border-2 rounded-full border-gray-400 text-gray-700 p-1 pl-2 pr-2"
        type="date"
        id="expected-finish-date"
        name="expected-finish-date"
        value={data.timeline.Timeline_ExpectedFinishDate.toISOString().split(
          "T",
        )[0]}
      />
    </div>

    <div class="flex items-center">
      <label class="text-sm text-gray-900 p-1 pl-2 pr-2" for="finish-date"
        >Date Completed:</label
      >
      <input
        class="text-sm border-2 rounded-full border-gray-400 text-gray-700 p-1 pl-2 pr-2"
        type="date"
        id="finish-date"
        name="finish-date"
        value={data.timeline.Timeline_FinishDate.toISOString().split("T")[0]}
      />
    </div>
    <div class="flex items-center">
      <label class="text-sm text-gray-900 p-1 pl-2 pr-2" for="status"
        >Status:</label
      >
      <select
        class="text-sm border-2 rounded-full border-gray-400 text-gray-700 p-1 pl-2 pr-2"
        id="status"
        name="status"
      >
        <option value="In Development">In Development</option>
        <option value="For Deployment">For Deployment</option>
        <option value="For Monitoring">For Monitoring</option>
        <option value="For Presentation">For Presentation</option>
        <option value="Done">Done</option>
        <option value="Terminated">Terminated</option>
      </select>
    </div>
    <div class="flex items-center">
      <label class="text-sm text-gray-900 p-1 pl-2 pr-2" for="name">Budget:</label
      >
      <input
        class="text-sm border-2 rounded-full border-gray-400 text-gray-700 p-1 pl-2 pr-2"
        type="number"
        id="budget"
        name="budget"
        value={data.project.Project_Budget}
      />
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
        href="/dashboard/projects/{data.project.Project_ID}"
        class={"flex text-sm my-0.5 mx-4 rounded-md items-center space-x-3 py-2 px-4 transition duration-200 hover:bg-phover hover:text-secondary focus:text-accent focus:bg-afocus"}
      >
        <span class="material-symbols-outlined">cancel</span>
        <span class="text-base">Cancel</span>
      </a>
      <a
        href="/dashboard/projects/{data.project.Project_ID}/delete"
        class={"flex text-sm my-0.5 mx-4 rounded-md items-center space-x-3 py-2 px-4 transition duration-200 hover:bg-phover hover:text-secondary focus:text-accent focus:bg-afocus"}
      >
        <span class="material-symbols-outlined">delete</span>
        <span class="text-base">Delete</span>
      </a>
    </div>
  </form>
</div>
