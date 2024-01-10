<script lang="ts">
    import { fly } from 'svelte/transition';

    export let name: string;
    export let items: Array<string>;
    export let selected_item: string;
    
    let hold = name;
    let visible = false;

    function toggleDropdown() {
        visible = !visible;
    }

    function select(item: string) {
        selected_item = item;
        name = item
        toggleDropdown();
    }

    function reset() {
        selected_item = "";
        name = hold;
        toggleDropdown();
    }
</script>

<div class="relative inline-block text-left m-2">
    <div>
      <button type="button" class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 {name === hold ? 'text-gray-500' : 'text-gray-900'}" id="menu-button" aria-expanded="true" aria-haspopup="true" on:click={toggleDropdown}>
        {name}
        <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
        {#if visible}
            <div in:fly={{y: -10, duration: 100}} out:fly={{y: 10, duration: 75}} class="py-1" role="none">
                {#each items as item, index}
                    <span class="text-gray-700 block px-4 py-2 text-sm bg-white hover:bg-gray-100" role="menuitem" tabindex="-1" id="menu-item-{index}" on:click={() => select(item)}>{item}</span>
                {/each}
                <span class="text-gray-500 block px-4 py-2 text-sm bg-white hover:bg-gray-100" role="menuitem" tabindex="-1" on:click={() => reset()}>No Filter</span>
            </div>
        {/if}
    </div>
  </div>