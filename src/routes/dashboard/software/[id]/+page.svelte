<script lang="ts">
  import type { PageData } from "./$types";
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";

  export let data: PageData;
</script>

<div class="container">
  <Breadcrumb
    items={[
      { href: "/dashboard/software", text: "Software" },
      {
        href: `/dashboard/software/${data.software.Software_Name}_${data.software.Software_Version}`,
        text: `${data.software.Software_Name} ${data.software.Software_Version}`,
      },
    ]}
  />
  <div class="flex justify-between">
    <h1>
      {data.software.Software_Name}
      {data.software.Software_Version}
    </h1>
    <span class="flex space-x-2">
      <a
        href="/dashboard/software/{data.software.Software_Name}_{data.software
          .Software_Version}/edit"
        class={"inline-block flex text-sm my-0.5 mx-4 rounded-md items-center space-x-3 py-2 px-4 transition duration-200 hover:bg-phover hover:text-secondary focus:text-accent focus:bg-afocus"}
      >
        <span class="material-symbols-outlined">edit</span>
        <span class="text-base">Edit</span>
      </a>
      <a
        href="/dashboard/software/{data.software.Software_Name}_{data.software
          .Software_Version}/delete"
        class={"inline-block flex text-sm my-0.5 mx-4 rounded-md items-center space-x-3 py-2 px-4 transition duration-200 hover:bg-phover hover:text-secondary focus:text-accent focus:bg-afocus"}
      >
        <span class="material-symbols-outlined">delete</span>
        <span class="text-base">Delete</span>
      </a>
    </span>
  </div>
  <div class="paragraph-container">
    <div class="paragraph-label">Software Type:</div>
    <p>{data.software.Software_Type}</p>
  </div>
  <div class="paragraph-container">
    <div class="paragraph-label">Operating System:</div>
    <p>{data.software.Software_OS}</p>
  </div>

  <div class="paragraph-container">
    <div class="paragraph-label">Software Size:</div>
    <p>{data.software.Software_Size}</p>
  </div>

  <div class="paragraph-container">
    <div class="paragraph-label">Publisher:</div>
    <p>{data.software.Software_Publisher}</p>
  </div>

  <div class="paragraph-container">
    <div class="paragraph-label">License:</div>
    <p>{data.software.Software_License}</p>
  </div>
</div>

<style>
  .container {
    margin: 0 auto;
  }

  .paragraph-container {
    position: relative;
    border: 1px solid #ddd;
    border-radius: 8px;
    transition: box-shadow 0.3s;
    margin-bottom: 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }

  .paragraph-container:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .linked-paragraph {
    border: 1px solid #ddd;
    border-radius: 8px;
    transition: box-shadow 0.3s;
    margin-bottom: 10px;
    padding: 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }

  .linked-paragraph:hover {
    color: #8c8a21;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  h1 {
    font-size: 4em;
    margin-bottom: 10px;
    font-weight: bold;
  }

  p {
    font-size: 1.2em;
    display: flex;
    color: #555;
  }

  p-link {
    font-size: 1.2em;
    display: flex;
    color: #555;
  }
  .p-link:hover {
    color: #e0bf06;
  }

  .paragraph-label {
    font-weight: bold;
    color: #555;
  }

  .link-label {
    font-weight: bold;
    color: #555;
  }

  .link-label:hover {
    color: #e0bf06;
  }

  .edit-button {
    color: #8c8a21;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 12px;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.3s,
      visibility 0.3s;
  }

  .paragraph-container:hover .edit-button {
    opacity: 1;
    visibility: visible;
  }

  .linked-paragraph:hover .edit-button {
    opacity: 1;
    visibility: visible;
  }

  .edit-button:hover {
    background-color: #e0bf06;
  }
</style>
