<script>
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
</script>

<main class="w-full">
  <Breadcrumb
    items={[{ href: "/dashboard/human_resources", text: "Human Resources" }]}
  />
  <!-- Employees -->
  <a
    href="/dashboard/human_resources/employee"
    class="bg-buttonp rounded-lg z-4 mb-1 border-2 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5"> groups </span>
    <div class="flex w-full flex-col h-full">
      <span>Employees</span>
      <span class="text-subtext z-4">Show the list of current employees.</span>
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>
  <!-- Jobs -->
  <a
    href="/dashboard/human_resources/job"
    class="bg-buttonp rounded-lg z-4 mb-1 border-2 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5"> work </span>
    <div class="flex w-full flex-col h-full">
      <span>Jobs</span>
      <span class="text-subtext z-4"
        >Explore and manage job-related information.</span
      >
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>
  <!-- Shifts -->
  <a
    href="/dashboard/human_resources/shift"
    class="bg-buttonp rounded-lg z-4 mb-1 border-2 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5"> schedule </span>
    <div class="flex w-full flex-col h-full">
      <span>Shifts</span>
      <span class="text-subtext z-4"
        >View and manage employee work schedules.</span
      >
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>
  <!-- Timesheets -->
  <a
    href="/dashboard/human_resources/timesheet"
    class="bg-buttonp rounded-lg z-4 mb-1 border-2 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5"> punch_clock </span>
    <div class="flex w-full flex-col h-full">
      <span>Timesheets</span>
      <span class="text-subtext z-4"
        >Track and manage employee working hours and attendance.</span
      >
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>
  <!-- Health Exams -->
  <a
    href="/dashboard/human_resources/health-exam"
    class="bg-buttonp rounded-lg z-4 mb-1 border-2 border-outline p-4 flex items-center hover:bg-buttonphover active:bg-buttonpactive"
  >
    <span class="text-3xl material-symbols-outlined mr-5">
      medical_information
    </span>
    <div class="flex w-full flex-col h-full">
      <span>Health Exams</span>
      <span class="text-subtext z-4"
        >Track and manage employee health examination records.</span
      >
    </div>
    <span class="relative z-4 right-100 bottom-0 material-symbols-outlined">
      navigate_next
    </span>
  </a>
</main>
