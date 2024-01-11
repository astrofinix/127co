<script lang="ts">
  import type { PageServerData } from "./$types";
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import type { ActionResult } from "@sveltejs/kit";
  import { applyAction, deserialize } from "$app/forms";

  export let data: PageServerData;

  let show = false; // member
  let show2 = false; // project
  let show3 = false; // software

  function showAdd() {
    show = !show;
  }
  async function cancelAdd() {
    show = !show;
  }

  function showAdd2() {
    show2 = !show2;
  }
  function cancelAdd2() {
    show2 = !show2;
  }

  function showAdd3() {
    show3 = !show3;
  }
  function cancelAdd3() {
    show3 = !show3;
  }
</script>

<div class="container">
  <Breadcrumb
    items={[
      { href: "/dashboard/project_management", text: "Project Management" },
      { href: "/dashboard/project_management/teams", text: "Teams" },
      {
        href: `/dashboard/project_management/teams/${data.team.Team_ID}`,
        text: data.team.Team_Name,
      },
    ]}
  />

  <div class="flex justify-between">
    <h1>{data.team.Team_Name}</h1>
    <span class="flex space-x-2">
      <a
        href="/dashboard/project_management/teams/{data.team.Team_ID}/edit"
        class={"inline-block flex text-sm my-0.5 mx-4 rounded-md items-center space-x-3 py-2 px-4 transition duration-200 hover:bg-phover hover:text-secondary focus:text-accent focus:bg-afocus"}
      >
        <span class="material-symbols-outlined">edit</span>
        <span class="text-base">Edit</span>
      </a>
      <a
        href="/dashboard/project_management/teams/{data.team.Team_ID}/delete"
        class={"inline-block flex text-sm my-0.5 mx-4 rounded-md items-center space-x-3 py-2 px-4 transition duration-200 hover:bg-phover hover:text-secondary focus:text-accent focus:bg-afocus"}
      >
        <span class="material-symbols-outlined">delete</span>
        <span class="text-base">Delete</span>
      </a>
    </span>
  </div>

  <p class="leader">
    Led by {data.team.Team_Leader.Employee_FirstName}
    {data.team.Team_Leader.Employee_MiddleName
      ? data.team.Team_Leader.Employee_MiddleName
      : ""}
    {data.team.Team_Leader.Employee_LastName}
  </p>
  <div class="project grid grid-cols-3 gap-9">
    <div class="all">
      <div
        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h2>Members:</h2>
        <hr />
        <ul>
          {#each data.team.Team_Members as member}
            <li class="flex justify-between">
              <a
                href="/dashboard/human_resources/employee/{member.Employee_ID}"
              >{member.Employee_FirstName}
                {member.Employee_MiddleName ? member.Employee_MiddleName : ""}
                {member.Employee_LastName}</a>
              <form action="?/remove_member" method="POST">
                <input
                  type="hidden"
                  name="member"
                  value={member.Employee_ID}
                />
                <button
                  class={"flex text-sm my-0.5 rounded-md items-center space-x-3 py-2 px-4 transition duration-200 hover:bg-phover hover:text-secondary focus:text-accent focus:bg-afocus"}
                >
                  <span class="material-symbols-outlined">remove</span>
                </button>
              </form>
            </li>
          {/each}
        </ul>
        <div class="flex justify-center">
          {#if show}
            <form class="flex gap-2" action="?/add_member" method="POST">
              <select
                class="text-sm border-2 rounded-full border-gray-400 text-gray-700 pl-2"
                id="member"
                name="member"
                value=""
                required
              >
                <option value="" disabled selected hidden
                  >Select Member</option
                >
                {#each data.team.Other_Members as omember}
                  <option
                    value={omember.Employee_ID}
                    >{omember.Employee_FirstName}
                    {omember.Employee_MiddleName
                      ? omember.Employee_MiddleName
                      : ""}
                    {omember.Employee_LastName}</option
                  >
                {/each}
              </select>
              <button
                class={"flex text-sm my-0.5 rounded-md items-center space-x-3 py-2 px-4 transition duration-200 hover:bg-phover hover:text-secondary focus:text-accent focus:bg-afocus"}
              >
                <span class="material-symbols-outlined">add</span>
              </button>
              <button
                on:click={cancelAdd}
                class={"flex text-sm my-0.5 rounded-md items-center space-x-3 py-2 px-4 transition duration-200 hover:bg-phover hover:text-secondary focus:text-accent focus:bg-afocus"}
              >
                <span class="material-symbols-outlined">cancel</span>
              </button>
            </form>
          {:else}
            <button
              on:click={showAdd}
              class={"flex text-sm my-0.5 rounded-md items-center space-x-3 py-2 px-4 transition duration-200 hover:bg-phover hover:text-secondary focus:text-accent focus:bg-afocus m-2"}
            >
              <span class="material-symbols-outlined">add</span>
              <span class="text-base">Add Member</span>
            </button>
          {/if}
        </div>
      </div>
    </div>
    <div class="all">
      <div
        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h2>Projects:</h2>
        <hr />
        <ul>
          {#each data.team.Team_Projects as project}
            <li class="flex justify-between">
              <a
                href="/dashboard/project_management/projects/{project.Project_ID}"
              >{project.Project_Name}</a>
              <form action="?/remove_project" method="POST">
                <input
                  type="hidden"
                  name="project"
                  value={project.Project_ID}
                />
                <button
                  class={"flex text-sm my-0.5 rounded-md items-center space-x-3 py-2 px-4 transition duration-200 hover:bg-phover hover:text-secondary focus:text-accent focus:bg-afocus"}
                >
                  <span class="material-symbols-outlined">remove</span>
                </button>
              </form>
            </li>
          {/each}
        </ul>
        <div class="flex justify-center">
          {#if show2}
            <form class="flex gap-2" action="?/add_project" method="POST">
              <select
                class="text-sm border-2 rounded-full border-gray-400 text-gray-700 pl-2"
                id="project"
                name="project"
                value=""
                required
              >
                <option value="" disabled selected hidden
                  >Select Project</option
                >
                {#each data.team.Other_Projects as oproj}
                  <option
                    value={oproj.Project_ID}
                    >{oproj.Project_Name}</option
                  >
                {/each}
              </select>
              <button
                class={"flex text-sm my-0.5 rounded-md items-center space-x-3 py-2 px-4 transition duration-200 hover:bg-phover hover:text-secondary focus:text-accent focus:bg-afocus"}
              >
                <span class="material-symbols-outlined">add</span>
              </button>
              <button
                on:click={cancelAdd2}
                class={"flex text-sm my-0.5 rounded-md items-center space-x-3 py-2 px-4 transition duration-200 hover:bg-phover hover:text-secondary focus:text-accent focus:bg-afocus"}
              >
                <span class="material-symbols-outlined">cancel</span>
              </button>
            </form>
          {:else}
            <button
              on:click={showAdd2}
              class={"flex text-sm my-0.5 rounded-md items-center space-x-3 py-2 px-4 transition duration-200 hover:bg-phover hover:text-secondary focus:text-accent focus:bg-afocus m-2"}
            >
              <span class="material-symbols-outlined">add</span>
              <span class="text-base">Add Project</span>
            </button>
          {/if}
        </div>
      </div>
    </div>
    <div class="all">
      <div
        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h2>Software:</h2>
        <hr />
        <ul>
          {#each data.team.Team_Software as software}
            <li class="flex justify-between">
              <a
                href="/dashboard/project_management/software/{software.Software_Name}_{software.Software_Version}"
                >{software.Software_Name} {software.Software_Version}</a
              >
              <form action="?/remove_software" method="POST">
                <input
                  type="hidden"
                  name="software"
                  value={software.Software_Name +
                    "_" +
                    software.Software_Version}
                />
                <button
                  class={"flex text-sm my-0.5 rounded-md items-center space-x-3 py-2 px-4 transition duration-200 hover:bg-phover hover:text-secondary focus:text-accent focus:bg-afocus"}
                >
                  <span class="material-symbols-outlined">remove</span>
                </button>
              </form>
            </li>
          {/each}
        </ul>
        <div class="flex justify-center">
          {#if show3}
            <form class="flex gap-2" action="?/add_software" method="POST">
              <select
                class="text-sm border-2 rounded-full border-gray-400 text-gray-700 pl-2"
                id="software"
                name="software"
                value=""
                required
              >
                <option value="" disabled selected hidden
                  >Select Software</option
                >
                {#each data.team.Other_Software as osoft}
                  <option
                    value={osoft.Software_Name + "_" + osoft.Software_Version}
                    >{osoft.Software_Name} {osoft.Software_Version}</option
                  >
                {/each}
              </select>
              <button
                class={"flex text-sm my-0.5 rounded-md items-center space-x-3 py-2 px-4 transition duration-200 hover:bg-phover hover:text-secondary focus:text-accent focus:bg-afocus"}
              >
                <span class="material-symbols-outlined">add</span>
              </button>
              <button
                on:click={cancelAdd3}
                class={"flex text-sm my-0.5 rounded-md items-center space-x-3 py-2 px-4 transition duration-200 hover:bg-phover hover:text-secondary focus:text-accent focus:bg-afocus"}
              >
                <span class="material-symbols-outlined">cancel</span>
              </button>
            </form>
          {:else}
            <button
              on:click={showAdd3}
              class={"flex text-sm my-0.5 rounded-md items-center space-x-3 py-2 px-4 transition duration-200 hover:bg-phover hover:text-secondary focus:text-accent focus:bg-afocus m-2"}
            >
              <span class="material-symbols-outlined">add</span>
              <span class="text-base">Add Software</span>
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .team {
    font-size: 4em;
    font-weight: bold;
  }

  .leader {
    margin-top: 30px;
    margin-bottom: 40px;
    font-size: 23px;
  }

  .mains {
    display: flex;
    /* justify-content: center; */
    /* flex-wrap: wrap;  */
  }

  hr {
    width: 10rem;
    margin: 10px auto;
  }

  h1 {
    font-size: 4em;
    font-weight: bold;
  }

  h2 {
    text-align: center;
    font-size: 20px;
  }

  .mem {
    /* display: flex;
    justify-content: center;
    flex-wrap: wrap; */
  }

  .each {
    margin: 25px;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  li {
    text-align: center;
    font-size: 20px;
    margin: 7px;
  }

  .soft {
    display: flex;
    justify-content: center;
  }

  .soft h2 {
    margin-top: 5px;
    margin-left: 80px;
    margin-right: 30px;
  }

  .all .soft a {
    display: flex;
    margin-left: 15px;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.3s,
      visibility 0.3s;
  }

  .all:hover a {
    opacity: 1;
    visibility: visible;
  }

  .projectname {
    text-align: center;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  button:hover, button:focus {
    background-color: transparent;
  }
</style>
