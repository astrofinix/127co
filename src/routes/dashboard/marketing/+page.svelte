<script lang="ts">
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
</script>

<main class="w-full">
  <Breadcrumb
    items={[
      {
        href: "/dashboard/marketing",
        text: "Marketing and Customer Acquisition",
      },
    ]}
  />

  <a
    href="/dashboard/marketing/client"
    class="bg-buttonp rounded-lg z-4 mb-1 border-2 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5"> people </span>
    <div class="flex w-full flex-col h-full">
      <span>Client</span>
      <span class="text-subtext z-4">Track all client information.</span>
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>

  <a
    href="/dashboard/marketing/contract"
    class="bg-buttonp rounded-lg z-4 mb-1 border-2 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5"> contract </span>
    <div class="flex w-full flex-col h-full">
      <span>Contract</span>
      <span class="text-subtext z-4">Track all contract information.</span>
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>
</main>
