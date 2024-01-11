<script lang="ts">
  import Breadcrumb from "$lib/components/Breadcrumb.svelte";
  import type { PageServerData } from "./$types";
  export let data: PageServerData;

  // Function to handle clicking on a course box//
  function handleCourseClick(id) {
    // For now, just log the clicked course's ID
    window.location.href = `/dashboard/bootcamp/courses_offered/${id}`;
    // You can add further functionality here, such as navigation or displaying details
  }
</script>

<div class="container">
  <Breadcrumb
    items={[
      { href: "/dashboard/bootcamp", text: "Bootcamp" },
      { href: "/dashboard/bootcamp/courses_offered", text: "Courses Offered" },
    ]}
  />
  <!-- Course listing -->
  <div class="project grid grid-cols-3 gap-5">
    <!-- Iterate through courseList and create clickable boxes -->
    {#each data.Courses as course}
      <div
        on:click={() => handleCourseClick(course.Course_ID)}
        class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <div class="mb-4">
          <p class="text-sm font-semibold text-gray-500 dark:text-white">
            {course.Course_Category}
          </p>
          <p class="text-sm text-gray-900 dark:text-white">
            {course.Course_ID}
          </p>
          <p class="text-lg font-bold text-gray-900 dark:text-white mt-2">
            {course.Course_Name}
          </p>
          <div class="mt-2 space-y-1">
            <div class="flex items-center">
              <span class="text-xs font-semibold text-gray-600 dark:text-gray-300 mr-1">Instructor:</span>
              <span class="text-xs">{course.Employee_FirstName}</span>
            </div>
            <div class="flex items-center">
              <span class="text-xs font-semibold text-gray-600 dark:text-gray-300 mr-1">Capacity:</span>
              <span class="text-xs">{course.Course_Capacity}</span>
            </div>
            <div class="flex items-center">
              <span class="text-xs font-semibold text-gray-600 dark:text-gray-300 mr-1">Schedule:</span>
              <span class="text-xs">{course.Course_Schedule}</span>
            </div>
            <div class="flex items-center">
              <span class="text-xs font-semibold text-gray-600 dark:text-gray-300 mr-1">Duration:</span>
              <span class="text-xs">{course.Course_Duration}</span>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
