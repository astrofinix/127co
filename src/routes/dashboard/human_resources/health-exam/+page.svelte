<script>
  import HealthExamsDisplay from "$lib/components/hr/displays/HealthExamsDisplay.svelte";
  import { Button } from "flowbite-svelte";
  import { TableSearch } from "flowbite-svelte";
  import { searchKeywordsHE } from "$lib/util/hr/searchUtilHR";
  import { formatDate2 } from "$lib/util/hr/utilsHR";

  export let data;
  let searchTerm = "";
  let searchByKeywords = true;
  let filter = "";
  let exactDate = true;
  let startDate = null;
  let endDate = null;
  const searchHE = data.data.map((he) => ({
    ...he,
    searchTerms: searchKeywordsHE(he),
  }));

  $: filteredItems = searchHE.filter((he) => {
    if (searchByKeywords) {
      return (
        he.searchTerms.toLowerCase().includes(searchTerm.toLowerCase()) &&
        he.HE_Assessment.toLowerCase().includes(filter)
      );
    } else {
      let he_date = new Date(formatDate2(he.HE_Date));
      let start = new Date(startDate);

      if (exactDate) {
        return (
          he.HE_Assessment.toLowerCase().includes(filter) &&
          he_date - start === 0
        );
      } else {
        let end = new Date(endDate);
        let startDiff = he_date - start;
        let endDiff = end - he_date;

        return (
          he.HE_Assessment.toLowerCase().includes(filter) &&
          startDiff >= 0 &&
          endDiff >= 0
        );
      }
    }
  });
</script>

<Button href="./health-exam/add">Add Health Exam</Button>

<br />

<label for="filter">Filter by assessment:</label>
<select name="filter" id="filter" bind:value={filter}>
  <option value="" selected>none</option>
  <option value="fit for work" selected>Fit For Work</option>
  <option value="not fit for work" selected>Not Fit For Work</option>
</select>

<br />
<input
  type="radio"
  name="search-by-keywords"
  id="keywords"
  value={true}
  bind:group={searchByKeywords}
/>
<label for="exact-date">Search by Keywords</label>

<input
  type="radio"
  name="search-by-keywords"
  id="range"
  value={false}
  bind:group={searchByKeywords}
/>
<label for="range">Search by Date</label>
{#if searchByKeywords}
  <div class="flex">
    <TableSearch
      placeholder="Search Keywords"
      hoverable={true}
      bind:inputValue={searchTerm}
    >
      <!-- <pre>{JSON.stringify(filteredItems,null,2)}</pre> -->
      <p>
        Returned {filteredItems.length}
        {filteredItems.length <= 1 ? "result" : "results"}
      </p>
      <HealthExamsDisplay exams={filteredItems} />
    </TableSearch>
  </div>
{:else}
  <div class="">
    <br />
    <input
      type="radio"
      name="exact-date"
      id="exact-date"
      value={true}
      checked="checked"
      bind:group={exactDate}
    />
    <label for="exact-date">Search by Exact Date</label>
    <input
      type="radio"
      name="exact-date"
      id="range"
      value={false}
      bind:group={exactDate}
    />
    <label for="range">Search by Range</label>
    <!-- Hello, di ko maayos yung layout nitong part na to haha -->
    <br />
    <label for="start-date">{exactDate ? "Exact Date: " : "Start Date: "}</label
    >
    <input
      type="date"
      name="start-date"
      id="start-date"
      bind:value={startDate}
    />
    {#if !exactDate}
      <label for="end-date">End Date: </label>
      <input
        type="date"
        name="end-date"
        id="end-date"
        min={startDate}
        bind:value={endDate}
      />
    {/if}
    <!-- <pre>{JSON.stringify(filteredItems,null,2)}</pre> -->
    <p>
      Returned {filteredItems.length}
      {filteredItems.length <= 1 ? "result" : "results"}
    </p>
    <HealthExamsDisplay exams={filteredItems} />
  </div>
{/if}
