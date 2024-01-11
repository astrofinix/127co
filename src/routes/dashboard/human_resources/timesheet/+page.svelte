<script>
  import TimeSheetDisplay from "$lib/components/hr/displays/TimeSheetsDisplay.svelte";
  import { Button } from "flowbite-svelte";
  import { TableSearch } from "flowbite-svelte";
  import { searchKeywordsTS } from "$lib/util/hr/searchUtilHR";
  import { formatDate2 } from "$lib/util/hr/utilsHR";

  export let data;

  let searchTerm = "";
  let searchByKeyword = true;
  let filterTimeIn = true;
  let dateSearch = null;
  const searchTS = data.data.map((ts) => ({
    ...ts,
    searchTerms: searchKeywordsTS(ts),
  }));

  $: filteredItems = searchTS.filter((ts) => {
    if (searchByKeyword) {
      return ts.searchTerms.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      if (filterTimeIn) {
        return (
          new Date(formatDate2(ts.Timesheet_TimeIn)) - new Date(dateSearch) ===
          0
        );
      } else {
        return (
          new Date(formatDate2(ts.Timesheet_TimeOut)) - new Date(dateSearch) ===
          0
        );
      }
    }
  });
</script>

<Button href="./timesheet/add">Add Timesheet</Button>

<br />
<input
  type="radio"
  name="searchByKeyword"
  id="keyword"
  value={true}
  bind:group={searchByKeyword}
/>
<label for="keyword">Search by Keyword</label>

<input
  type="radio"
  name="searchByKeyword"
  id="date"
  value={false}
  bind:group={searchByKeyword}
/>
<label for="date">Search by Date</label>
{#if searchByKeyword}
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
      <TimeSheetDisplay logs={filteredItems} />
    </TableSearch>
  </div>
{:else}
  <div class="">
    <label for="date-search">Search: </label>
    <input
      type="date"
      name="date-search"
      id="date-search"
      bind:value={dateSearch}
    />
    <select name="filter" id="filter" bind:value={filterTimeIn}>
      <option value={true}>TIME IN</option>
      <option value={false}>TIME OUT</option>
    </select>
    <p>
      Returned {filteredItems.length}
      {filteredItems.length <= 1 ? "result" : "results"}
    </p>
    <TimeSheetDisplay logs={filteredItems} />
  </div>
{/if}
