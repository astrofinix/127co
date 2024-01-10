<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="container">
  <h1>{data.team.Team_Name}</h1>
  <p>
    Led by {data.team.Team_Leader.Employee_FirstName}
    {data.team.Team_Leader.Employee_MiddleName
      ? data.team.Team_Leader.Employee_MiddleName
      : ""}
    {data.team.Team_Leader.Employee_LastName}
  </p>
  <h2>Members:</h2>
  <ul>
    {#each data.team.Team_Members as member}
      <li>
        {member.Employee_FirstName}
        {member.Employee_MiddleName ? member.Employee_MiddleName : ""}
        {member.Employee_LastName}
      </li>
    {/each}
  </ul>
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
