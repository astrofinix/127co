<script lang="ts">
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="container">
  <Breadcrumb items={[
    { href: "/dashboard/projects", text: "Projects" },
    { href: `/dashboard/projects/${data.project.Project_ID}`, text: data.project.Project_Name },
  ]} />
  <h1>{data.project.Project_Name}</h1>
  
  <a href="/dashboard/projects/{data.project.Project_ID}/edit">Edit</a>
  <a href="/dashboard/projects/{data.project.Project_ID}/delete">Delete</a>

  <div class="paragraph-container">
    <div class="paragraph-label">Description:</div>
    <p>{data.project.Project_Description}</p>
  </div>

  <div class="paragraph-container">
    <div class="paragraph-label"><a class="link-label" href="/dashboard/teams/{data.project.Project_Team_ID}">Assigned Team:</a></div>
    <p><a class="p-link" href="/dashboard/teams/{data.project.Project_Team_ID}">{data.team.Team_Name}</a></p>
  </div>
  

  <div class="paragraph-container">
    <div class="paragraph-label">Date Started:</div>
    <p>{data.timeline.Timeline_StartDate}</p>
  </div>

  <div class="paragraph-container">
    <div class="paragraph-label">Estimated Date of Completion:</div>
    <p>{data.timeline.Timeline_ExpectedFinishDate}</p>
  </div>

  {#if data.project.Project_Status !== "Terminated"}
    <div class="paragraph-container">
      <div class="paragraph-label">Date Completed:</div>
      <p>{data.timeline.Timeline_FinishDate}</p>

    </div>
  {/if}

  <div class="paragraph-container">
    <div class="paragraph-label">Budget:</div>
    <p>{data.project.Project_Budget}</p>
  </div>

  <div class="paragraph-container">
    <div class="paragraph-label">Status:</div>
    <p>{data.project.Project_Status}</p>
  </div>
</div>

<style>
.container {
    margin: 0 auto;
  }

.paragraph-container{
 position: relative;
    border: 1px solid #ddd;
    border-radius: 8px;
    transition: box-shadow 0.3s;
    margin-bottom: 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
}

.paragraph-container:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

.linked-paragraph {
  border: 1px solid #ddd; 
    border-radius: 8px;
    transition: box-shadow 0.3s;
    margin-bottom: 10px;
    padding: 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }

  .linked-paragraph:hover {
    color: #8c8a21;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    
  }

  h1 {
    
    font-size: 4em;
    margin-bottom: 10px;
    font-weight: bold;
  }

  p {
    font-size: 1.2em;
    display: flex;
    color: #555;
  }

  p-link{
     font-size: 1.2em;
    display: flex;
    color: #555;
  }
    .p-link:hover{
    color: #e0bf06;
  }

    .paragraph-label {
    font-weight: bold;
    color: #555;
    }

    .link-label {
    font-weight: bold;
    color: #555;
    }

    .link-label:hover{
    color: #e0bf06;
    }

    .edit-button {
     color: #8c8a21;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 12px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
  }

  .paragraph-container:hover .edit-button {
    opacity: 1;
    visibility: visible;
  }

  .linked-paragraph:hover .edit-button {
    opacity: 1;
    visibility: visible;
  }

  .edit-button:hover {
    background-color: #e0bf06;
  }

</style>