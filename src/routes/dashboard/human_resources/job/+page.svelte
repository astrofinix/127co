<script>
  import JobsDisplay from "$lib/components/hr/displays/JobsDisplay.svelte";
  import { Button } from "flowbite-svelte";
  import { TableSearch } from "flowbite-svelte";
  import { searchKeywordsJob } from "$lib/util/hr/searchUtilHR";

  export let data;

  let searchTerm = "";

  const searchJobs = data.data.map((job) => ({
    ...job,
    searchTerms: searchKeywordsJob(job),
  }));

  $: filteredItems = searchJobs.filter((job) => {
    return job.searchTerms.toLowerCase().includes(searchTerm.toLowerCase());
  });
</script>

<Button href="./job/add">Add Job</Button>
<div class="flex">
  <TableSearch
    placeholder="Search Keywords"
    hoverable={true}
    bind:inputValue={searchTerm}
  >
    <p>
      Returned {filteredItems.length}
      {filteredItems.length <= 1 ? "result" : "results"}
    </p>
    <!-- <pre>{JSON.stringify(searchJobs,null,2)}</pre> -->
    <JobsDisplay jobs={filteredItems} />
  </TableSearch>
</div>
