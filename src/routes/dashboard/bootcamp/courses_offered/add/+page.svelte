<script lang="ts">
    import Breadcrumb from "$lib/components/Breadcrumb.svelte";
    import type { PageServerData } from "./$types";
    import Menu from "$lib/components/Menu.svelte";
    export let data: PageServerData;
    const { employeeNames, courseID } = data;
    let names = employeeNames.map((employeeNames) => employeeNames.names)
    let courseIDMap = courseID.map((courseID) => courseID.Course_ID)
    

    let courseName: string;
    let selectedName:string;
    let newcourseID: string;
    let courseSched1: string;
    let courseSched2: string;  
    let courseSched3: string;
    let courseSchedule: string;
    let courseDuration;
    let courseDur;



    function getEmployeeID(selectedName: string): string {
        const employee = employeeNames.find((employeeNames) => employeeNames.names === selectedName);
        return employee ? employee.Employee_ID : '';
    }

    function generateCourseID(courseName: string): string {
        let newCourseID = '';
        if (courseName) {
            let baseID = courseName.substring(0, 3).toUpperCase();
            let num = 100;
            newCourseID = `${baseID}${num}`;
            while (courseIDMap.includes(newCourseID)) {
                num++;
                newCourseID = `${baseID}${num}`;
            }
        }
        return newCourseID;
    }


    $: {newcourseID = generateCourseID(courseName);}
    $: courseSched2Formatted = new Date(`1970-01-01T${courseSched2}:00`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    $: courseSched3Formatted = new Date(`1970-01-01T${courseSched3}:00`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    $: courseSchedule = courseSched1 + " " + courseSched2Formatted + " - " + courseSched3Formatted;
    $: courseDuration = courseDur + (courseDur === 1 ? " month" : " months") + " (6 hours/week)";
    
</script>


<main class="w-full">
    <Breadcrumb items={[
        { href: "/dashboard/bootcamp", text: "Bootcamp" },
        { href: "/dashboard/bootcamp/courses_offered", text: "Courses Offered" },
        { href: `/dashboard/bootcamp/courses_offered/add`, text: "Add Course"}
    ]}/>

    <h3>Add new course to the bootcamp</h3>
    <form method="POST" class="mt-6">
        <label for="newcourseID">
            Course ID:
        </label>
        <br>
        <input 
            class="text-sm border-2 rounded-full border-gray-400 p-1 pl-2 pr-2"
            type="text" 
            name="newcourseID" 
            id="newcourseID"
            bind:value={newcourseID}
            required 
            disabled
            
        >
        <input type="hidden" name="courseID" id="courseID" value={newcourseID}>
        <br>
        <label for="courseName">
            Course Name:
        </label>
        <br>
        <input 
            class="text-sm border-2 rounded-full border-gray-400 p-1 pl-2 pr-2"
            type="text" 
            name="courseName" 
            id="courseName" 
            placeholder="Enter course name" 
            bind:value={courseName}
            minlength="4"
            required 
            
        >
        <br>
        <label for="courseCategory">
            Course Category:
        </label>
        <br>
        <select 
            class="text-sm border-2 rounded-full border-gray-400 p-1 pl-2 pr-2"
            name="courseCategory" 
            id="courseCategory" 
            required 
        >
            <option value="">Select a category</option>
            <option value="Soft Skills">Soft Skills</option>
            <option value="Technical Skills">Technical Skills</option>
        </select>
        <br>
        <label for="courseSchedule">
            Course Schedule (Weekly Schedule and Time slot):
        </label>
        <br>
        <select 
            class="text-sm border-2 rounded-full border-gray-400 p-1 pl-2 pr-2"
            name="courseSched1" 
            id="courseSched1" 
            bind:value={courseSched1}
            required 
        >
            <option value="">Select a weekly schedule</option>
            <option value="TThSat">TThSat</option>
            <option value="MWF">MWF</option>
        </select>
        from
        <input 
            class="text-sm border-2 rounded-full border-gray-400 p-1 pl-2 pr-2"
            type="time" 
            name="courseSched2" 
            id="courseSched2" 
            bind:value={courseSched2}
            required 
        />
        to
        <input 
            class="text-sm border-2 rounded-full border-gray-400 p-1 pl-2 pr-2"
            type="time" 
            name="courseSched3" 
            id="courseSched3" 
            bind:value={courseSched3}
            required 
        />
        <input type="hidden" name="courseSchedule" id="courseSchedule" value={courseSchedule}>

        <br>
        <label for="courseInstructor">
            Course Instructor:
        </label>
        <br>
        <select
            class="text-sm border-2 rounded-full border-gray-400 p-1 pl-2 pr-2 w-1/2"
            id="courseInstructor"
            name="courseInstructor"
            bind:value={selectedName}
            
            style="margin-bottom: 10px;"
        >
            <option value="">Select an employee</option>
            {#each names as name}
            <option value={name}>{name}</option>
            {/each}
         </select>
         <input id="employeeID" name="employeeID"
         class="hidden"
         value={getEmployeeID(selectedName)}> 
        <br>
        <label for="courseDur">
            Course Duration (months): 
            <br>
            <input 
            class="text-sm border-2 rounded-full border-gray-400 p-1 pl-2 pr-2"
            type="number" 
            name="courseDur" 
            id="courseDur" 
            bind:value={courseDur}
            min="1"
            
            placeholder="Enter how many months" 
            required 
        >
        <input type="hidden" name="courseDuration" id="courseDuration" value={courseDuration}>
        <br>
        <label for="courseSlots">
            Course Capacity:
        </label>
        <br>
        <input 
            class="text-sm border-2 rounded-full border-gray-400 p-1 pl-2 pr-2"
            type="number" 
            name="courseCapacity" 
            id="courseCapacity" 
            min="1"
            placeholder="Enter course slots" 
            required 
        >
        <br>
        <button type="submit">
            Add Course
        </button>
    </form>
</main>