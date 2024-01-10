<script>
    let courseList = [
      { id: 1, name: 'Course A', instructor: 'Instructor A' },
      { id: 2, name: 'Course B', instructor: 'Instructor B' },
      // Add more courses as needed..
    ];
  
    // Function to handle clicking on a course box//
    function handleCourseClick(id) {
      // For now, just log the clicked course's ID
      console.log(`Clicked on course with ID: ${id}`);
      // You can add further functionality here, such as navigation or displaying details
    }
  </script>
  
  <div class="container">
    <!-- Course listing -->
    <div class="project grid grid-cols-3 gap-5">
      <!-- Iterate through courseList and create clickable boxes -->
      {#each courseList as course}
        <div
          on:click={() => handleCourseClick(course.id)}
          class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <div class="flex items-center mb-2">
            <p class="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              {course.name}
            </p>
            <p class="ml-2 text-xs border-2 rounded-full border-gray-400 text-gray-400 p-1 pl-2 pr-2">
              Instructor: {course.instructor}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>
  