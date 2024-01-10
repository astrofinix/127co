<script lang="ts">
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

<div>
  <Breadcrumb
    items={[
      { href: "/dashboard/software", text: "Software" },
      {
        href: `/dashboard/software/${data.software.Software_Name}_${data.software.Software_Version}`,
        text:
          data.software.Software_Name + " " + data.software.Software_Version,
      },
      {
        href: `/dashboard/software/${data.software.Software_Name}_${data.software.Software_Version}/edit`,
        text: `Delete ${data.software.Software_Name} ${data.software.Software_Version}`,
      },
    ]}
  />

  <div class="container">
    <p class="mb-4">Are you sure you want to delete this software?</p>
    <form method="POST">
      <button type="submit">Yes</button>
      <a
        href="/dashboard/software/{data.software.Software_Name}_{data.software
          .Software_Version}">No</a
      >
    </form>
  </div>
</div>
