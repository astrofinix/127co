<script lang="ts">
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>


<!-- confirm delete -->

<div class="container">
    <h1 class="text-3xl font-bold mb-4">Delete Project</h1>
    <p class="mb-4">Are you sure you want to delete this project?</p>
    <form method="POST">
        <button type="submit">Yes</button>
        <a href="/dashboard/projects/{data.project.Project_ID}">Cancel</a>
    </form>
</div>