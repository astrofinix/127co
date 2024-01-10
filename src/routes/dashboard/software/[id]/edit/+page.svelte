<script lang="ts">
  import { enhance, applyAction } from "$app/forms";
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";

  import type { PageServerData } from "./$types";

  export let data: PageServerData;

  let show = false;

  function multiple(event) {
    show = true;
  }

  function solo(event) {
    show = false;
  }
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
        text: `Edit ${data.software.Software_Name} ${data.software.Software_Version}`,
      },
    ]}
  />
  <form
    class="grid grid-cols-3 gap-4"
    method="POST"
    use:enhance={({ formData, cancel }) => {
      if (formData.get("platform") === "Desktop") {
        let platforms = formData.getAll("platforms");
        if (platforms.length === 0) {
          cancel();
          return;
        }
        formData.delete("platform");
        formData.append("platform", platforms.join(", "));
      }

      return async ({ result, update }) => {
        applyAction(result);
      };
    }}
  >
    <div class="flex items-center">
      <label class="text-sm text-gray-900 p-1 pl-2 pr-2" for="name">Name:</label
      >
      <input
        class="text-sm border-2 rounded-full border-gray-400 text-gray-700 p-1 pl-2 pr-2"
        type="text"
        id="name"
        name="name"
        value={data.software.Software_Name}
        required
      />
    </div>
    <div class="flex items-center">
      <label class="text-sm text-gray-900 p-1 pl-2 pr-2" for="name"
        >Version:</label
      >
      <input
        class="text-sm border-2 rounded-full border-gray-400 text-gray-700 p-1 pl-2 pr-2"
        type="text"
        id="version"
        name="version"
        value={data.software.Software_Version}
        required
      />
    </div>
    <div class="flex items-center">
      <label class="text-sm text-gray-900 p-1 pl-2 pr-2" for="type">Type:</label
      >
      <input
        class="text-sm border-2 rounded-full border-gray-400 text-gray-700 p-1 pl-2 pr-2 w-full"
        type="text"
        id="type"
        name="type"
        value={data.software.Software_Type}
        required
      />
    </div>
    <div class="flex items-center col-span-3">
      <label class="text-sm text-gray-900 p-1 pl-2 pr-2" for="os"
        >Operating System:</label
      >
      <label class="text-sm text-gray-900 p-1 pl-2 pr-2">
        <input
          type="radio"
          name="platform"
          value="Web-based"
          on:change={solo}
        />
        Web-based
      </label>
      <label class="text-sm text-gray-900 p-1 pl-2 pr-2">
        <input
          type="radio"
          name="platform"
          value="Cross-platform"
          on:change={solo}
        />
        Cross-platform
      </label>
      <label class="text-sm text-gray-900 p-1 pl-2 pr-2 flex items-center">
        <input
          type="radio"
          name="platform"
          value="Desktop"
          on:change={multiple}
          required
        />
        Desktop
        {#if show}
          <div id="platformChecklist">
            <label class="text-sm text-gray-900 p-1 pl-2 pr-2">
              <input type="checkbox" name="platforms" value="Windows" />
              Windows
            </label>

            <label class="text-sm text-gray-900 p-1 pl-2 pr-2">
              <input type="checkbox" name="platforms" value="macOS" />
              MacOS
            </label>

            <label class="text-sm text-gray-900 p-1 pl-2 pr-2">
              <input type="checkbox" name="platforms" value="Linux" />
              Linux
            </label>
          </div>
        {/if}
      </label>
    </div>
    <div class="flex items-center">
      <label class="text-sm text-gray-900 p-1 pl-2 pr-2" for="name">Size:</label
      >
      <input
        class="text-sm border-2 rounded-full border-gray-400 text-gray-700 p-1 pl-2 pr-2"
        type="number"
        min="0"
        id="size"
        name="size"
        value={data.software.Software_Size.split(" ")[0]}
        required
      />
      <select
        class="text-sm border-2 rounded-full border-gray-400 text-gray-700 p-1 pl-2 pr-2 ml-2"
        id="size_type"
        name="size_type"
        value={data.software.Software_Size.split(" ")[1]}
        required
      >
        <option value="KB">KB</option>
        <option value="MB">MB</option>
        <option value="GB">GB</option>
        <option value="TB">TB</option>
      </select>
    </div>
    <div class="flex items-center">
      <label class="text-sm text-gray-900 p-1 pl-2 pr-2" for="name"
        >Publisher:</label
      >
      <input
        class="text-sm border-2 rounded-full border-gray-400 text-gray-700 p-1 pl-2 pr-2 w-full"
        type="text"
        id="publisher"
        name="publisher"
        value={data.software.Software_Publisher}
        required
      />
    </div>
    <div class="flex items-center">
      <label class="text-sm text-gray-900 p-1 pl-2 pr-2" for="team"
        >License:</label
      >
      <select
        class="text-sm border-2 rounded-full border-gray-400 text-gray-700 p-1 pl-2 pr-2"
        id="license"
        name="license"
        required
      >
        <option value="Open Source">Open Source</option>
        <option value="Freeware">Freeware</option>
        <option value="Shareware">Shareware</option>
        <option value="Commercial">Commercial</option>
        <option value="Proprietary">Proprietary</option>
        <option value="Other">Other</option>
      </select>
    </div>
    <div class="flex justify-end col-span-2 p-2 space-x-2">
      <button
        type="submit"
        class={"flex text-sm my-0.5 mx-4 rounded-md items-center space-x-3 py-2 px-4 transition duration-200 hover:bg-phover hover:text-secondary focus:text-accent focus:bg-afocus"}
      >
        <span class="material-symbols-outlined">save</span>
        <span class="text-base">Save</span>
      </button>
      <a
        href="/dashboard/projects/{data.software.Software_Name}_{data.software
          .Software_Version}"
        class={"flex text-sm my-0.5 mx-4 rounded-md items-center space-x-3 py-2 px-4 transition duration-200 hover:bg-phover hover:text-secondary focus:text-accent focus:bg-afocus"}
      >
        <span class="material-symbols-outlined">cancel</span>
        <span class="text-base">Cancel</span>
      </a>
      <a
        href="/dashboard/projects/{data.software.Software_Name}_{data.software
          .Software_Version}/delete"
        class={"flex text-sm my-0.5 mx-4 rounded-md items-center space-x-3 py-2 px-4 transition duration-200 hover:bg-phover hover:text-secondary focus:text-accent focus:bg-afocus"}
      >
        <span class="material-symbols-outlined">delete</span>
        <span class="text-base">Delete</span>
      </a>
    </div>
  </form>
</div>
