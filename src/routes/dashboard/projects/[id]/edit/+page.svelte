<script lang="ts">
    import Breadcrumb from "$lib/components/Breadcrumb.svelte";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>

<div>
    <Breadcrumb items={[
        { href: "/dashboard/projects", text: "Projects" },
        { href: `/dashboard/projects/${data.project.Project_ID}`, text: data.project.Project_Name },
        { href: `/dashboard/projects/${data.project.Project_ID}/edit`, text: `Edit ${data.project.Project_Name}` },
    ]} />
    <form>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" value="{data.project.Project_Name}">
        <label for="description">Description:</label>
        <input type="text" id="description" name="description" value="{data.project.Project_Description}">
        <label for="team">Assigned Team:</label>
        <select id="team" name="team">
            {#each data.teams as team}
                <option value="{team.Team_ID}">{team.Team_Name}</option>
            {/each}
        </select>
        <label for="start-date">Date Started:</label>
        <input type="date" id="start-date" name="start-date" value="{data.timeline.Timeline_StartDate}">
        <label for="expected-finish-date">Estimated Date of Completion:</label>
        <input type="date" id="expected-finish-date" name="expected-finish-date" value="{data.timeline.Timeline_ExpectedFinishDate}">
        <label for="finish-date">Date Completed:</label>
        <input type="date" id="finish-date" name="finish-date" value="{data.timeline.Timeline_FinishDate}">
        <label for="status">Status:</label>
        <select id="status" name="status">
            <option value="In Development">In Development</option>
            <option value="For Deployment">For Deployment</option>
            <option value="For Monitoring">For Monitoring</option>
            <option value="For Presentation">For Presentation</option>
            <option value="Done">Done</option>
            <option value="Terminated">Terminated</option>
        </select>
        <label for="type">Type:</label>
        <select id="type" name="type">
            <option value="Mobile Application">Mobile Application</option>
            <option value="Web Application">Web Application</option>
            <option value="Standalone System">Standalone System</option>
        </select>
        <button type="submit"> Save </button>
        <a href="/dashboard/projects/{data.project.Project_ID}"> Cancel </a>
        <a href="/dashboard/projects/{data.project.Project_ID}/delete"> Delete </a>
    </form>
</div>