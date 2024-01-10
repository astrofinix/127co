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
      <div class="main-container">
        <h2 class = "members">Members:</h2>
        <hr>
        <ul class = "mem">
          {#each data.team.Team_Members as member}
            <div class = "each">
              <!-- <img src=""> -->
              <li>
                {member.Employee_FirstName}
                {member.Employee_MiddleName ? member.Employee_MiddleName : ""}
                {member.Employee_LastName}
              </li>
            </div>
          {/each}
        </ul>
      </div>
  <h2>Projects:</h2>
  <ul>
    {#each data.team.Team_Projects as project}
      <li>{project.Project_Name}</li>
    {/each}
  </ul>
  <h2>Software:</h2>
  <ul>
    {#each data.team.Team_Software as software}
      <li>{software.Software_Name}</li>
    {/each}
  </ul>
</div>

<style>
  .container {
    
  }

  .team {
    font-size: 30px;
  }

  .leader {
    margin-top: 40px;
  }

  .main-container {
    background: #fff;
    border-radius: 15px;
    margin: 3rem;
    padding: 20px;
    box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.4);
  }

  hr {
    width: 10rem;
    margin: 10px auto;
  }

  .members {
    text-align: center;
    font-size: 20px;
  }

  .mem {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .each {
    margin: 25px;
    transition: all .3s ease;
    cursor: pointer;
  }

  .each li {
    text-align: center;
    font-size: 20px;
    margin: 7px;
  }
</style>