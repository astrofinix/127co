<script lang="ts">
  import type { PageData } from "./$types";
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";

  export let data: PageData;
</script>

<div class="container">
  <Breadcrumb items={[
    { href: "/dashboard/teams", text: "Teams" },
    { href: `/dashboard/teams/${data.team.Team_Name}`, text: data.team.Team_Name},
  ]} />
  <div class="absolute top-0 right-0 mt-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    <span class="material-symbols-outlined"> edit </span>
    <span class="material-symbols-outlined"> delete </span>
  </div>
  <h1 class = "team">{data.team.Team_Name}</h1>
  <p class = "leader">
    Led by {data.team.Team_Leader.Employee_FirstName}
    {data.team.Team_Leader.Employee_MiddleName
      ? data.team.Team_Leader.Employee_MiddleName
      : ""}
    {data.team.Team_Leader.Employee_LastName}
  </p>
    <div class="project grid grid-cols-3 gap-9">
      <div class = "all">
      <div
      class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div class = "soft">
          <h2 class = "members">Members:</h2>
            <a href="/dashboard/teams/add" class="block max-w-sm p-3 bg-white border border-gray-200 rounded-lg  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 material-symbols-outlined">edit</a>
          </div>
        <hr>
        <ul class = "mem">
          {#each data.team.Team_Members as member}
            <div class = "each">
              <li>
                {member.Employee_FirstName}
                {member.Employee_MiddleName ? member.Employee_MiddleName : ""}
                {member.Employee_LastName}
              </li>
            </div>
          {/each}
        </ul>
      </div>
      </div>
      <div class = "all">  
      <div
      class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div class = "soft">  
          <h2>Projects:</h2>
            <a href="/dashboard/teams/add" class="block max-w-sm p-3 bg-white border border-gray-200 rounded-lg  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 material-symbols-outlined">edit</a>
        </div>
        <hr>
        <ul class = "projectname">
            {#each data.team.Team_Projects as project}
              <li><a href="/dashboard/projects/{project.Project_ID}">{project.Project_Name}</a></li>
            {/each}
        </ul>
      </div>
      </div>
      <div class = "all">
      <div
      class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <div class = "soft">
            <h2>Software:</h2>
              <a href="/dashboard/teams/add" class="block max-w-sm p-3 bg-white border border-gray-200 rounded-lg  hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 material-symbols-outlined">edit</a>
          </div>
          <hr>
          <ul>
            {#each data.team.Team_Software as software}
              <li>{software.Software_Name} {software.Software_Version}</li>
            {/each}
          </ul>
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
    transition: all .3s ease;
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
    transition: opacity 0.3s, visibility 0.3s;
  }

  .all:hover a{
    opacity: 1;
    visibility: visible;
  }


  .projectname {
    text-align: center;
  }

</style>