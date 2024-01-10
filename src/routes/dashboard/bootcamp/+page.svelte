<script>
    import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  </script>
  
  <main class="w-full">
    <Breadcrumb
      items={[{ href: "/dashboard/bootcamp", text: "Bootcamp" }]}
    />
    <!-- Employees -->
    <a
      href="/dashboard/bootcamp/courses_offered"
      class="bg-buttonp rounded-lg z-4 mb-1 border-2 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
    >
      <span class="text-3xl material-symbols-outlined mr-5"> groups </span> 
      <!-- CHANGE ICON -->
      <div class="flex w-full flex-col h-full">
        <span>Courses Offered</span>
        <span class="text-subtext z-4">Show the list of courses offered.</span>
      </div>
      <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
        navigate_next
      </span>
    </a>

  </main>