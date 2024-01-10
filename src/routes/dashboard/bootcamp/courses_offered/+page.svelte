<script lang="ts">
    import Breadcrumb from "$lib/components/Breadcrumb.svelte";
    import type { PageServerData } from "./$types";
    export let data: PageServerData
  
    // Function to handle clicking on a course box//
    function handleCourseClick(id) {
      // For now, just log the clicked course's ID
      window.location.href = `/dashboard/bootcamp/courses_offered/${id}`
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
          <div class="flex items-center mb-2">
            <p class="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              {course.Course_Name}
            </p>
            <p class="ml-2 text-xs border-2 rounded-full border-gray-400 text-gray-400 p-1 pl-2 pr-2">
              Instructor: {course.Employee_FirstName}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>
  
