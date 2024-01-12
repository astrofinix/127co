<script lang="ts">
    import { alerts } from "$lib/store";
    import Alerts from "$lib/components/Alerts.svelte";
  </script>
  <Alerts data={$alerts} />
  <slot />