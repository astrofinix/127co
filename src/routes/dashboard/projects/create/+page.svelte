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
          href: `/dashboard/projects/create`,
          text: `Create Project`,
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
          placeholder="Project Name"
          required
        />
      </div>
      <div class="flex items-center">
        <label class="text-sm text-gray-900 p-1 pl-2 pr-2" for="type">Type:</label
        >
        <select
          class="text-sm border-2 rounded-full border-gray-400 text-gray-700 p-1 pl-2 pr-2"
          id="type"
          name="type"
          required
        >
          <option value="" disabled selected hidden>Select Type</option>
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
          value=""
          required
        >
          <option value="" disabled selected hidden>Select Team</option>
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
          placeholder="Project Description"
          required
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
          required
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
          required
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
          required
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
          value=""
          required
        >
          <option value="" disabled selected hidden>Select Status</option>
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
          required
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
          href="/dashboard/projects"
          class={"flex text-sm my-0.5 mx-4 rounded-md items-center space-x-3 py-2 px-4 transition duration-200 hover:bg-phover hover:text-secondary focus:text-accent focus:bg-afocus"}
        >
          <span class="material-symbols-outlined">cancel</span>
          <span class="text-base">Cancel</span>
        </a>
      </div>
    </form>
  </div>
  