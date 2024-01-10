<script lang="ts">
  import { Alert, Button } from "flowbite-svelte";
  import { CheckCircleSolid, CloseCircleSolid } from "flowbite-svelte-icons";

  export let data: Array<{message: string, type: "fail" | "success"}>;
</script>

{#if data.length != 0}
  <div class="fixed z-50 right-10 top-10 w-1/3">
    <div class="flex flex-col gap-2">
      {#each data as alert}
        {#if alert.type == "fail"}
        <Alert dismissable color="red">
          <CloseCircleSolid slot="icon" class="w-4 h-4" />
          {alert.message}
        </Alert>
        {:else}
        <Alert dismissable color="green">
          <CheckCircleSolid slot="icon" class="w-4 h-4" />
          {alert.message}
        </Alert>
        {/if}
      {/each}
    </div>
 </div>
{/if}