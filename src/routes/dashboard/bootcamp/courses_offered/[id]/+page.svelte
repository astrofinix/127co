<script lang="ts">
    import Breadcrumb from "$lib/components/Breadcrumb.svelte";
    import type { PageData } from "./$types";
  
    export let data: PageData;

</script>

<Breadcrumb
    items={[

      { href: "/dashboard/bootcamp", text: "Bootcamp" },
      { href: "/dashboard/bootcamp/courses_offered", text: "Courses Offered" },
      { href: `/dashboard/bootcamp/courses_offered/${data.Course.Course_ID}`, text: data.Course.Course_Name },
    ]}
  />