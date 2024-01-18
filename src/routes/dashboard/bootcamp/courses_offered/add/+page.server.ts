import db from "$lib/server/database";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import type { PageServerLoad, Actions } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies, params }) => {
  // All Employees
  const [instructors] = await db.execute<RowDataPacket[]>(
    `SELECT 
      e.Employee_ID,
      CONCAT(e.Employee_FirstName, ' ', e.Employee_LastName, ', ', p.Employee_HighestLevelOfEducation, ', ', j.Employee_Status, ', ', j.Employee_Shift, ' Shift') AS names
    
    FROM Employee e
    INNER JOIN Job j ON e.Employee_ID = j.Employee_ID
    INNER JOIN PDS p ON e.Employee_ID = p.Employee_ID
    WHERE j.Job_Position = "Instructor"`,
  );

  const [courses] = await db.execute<RowDataPacket[]>(
    `SELECT Course_ID FROM Course_Offered`,
  );

  const employeeNames = instructors;
  const courseID = courses;

  return {
    employeeNames,
    courseID,
  };
};

export const actions = {
  default: async ({ request, params }) => {
    const data = await request.formData();
    console.log(data.get("employeeID"));
    console.log(data.get("courseID"));
    console.log(data.get("courseName"));
    console.log(data.get("courseInstructor"));
    console.log(data.get("courseSchedule"));
    console.log(data.get("courseDuration"));
    console.log(data.get("courseCapacity"));
    console.log(data.get("courseCategory"));

    const employeeID = data.get("employeeID");
    const courseID = data.get("courseID");
    const courseName = data.get("courseName");
    const courseInstructor = data.get("employeeID");
    const courseSchedule = data.get("courseSchedule");
    const courseDuration = data.get("courseDuration");
    const courseCapacity = data.get("courseCapacity");
    const courseCategory = data.get("courseCategory");

    const [course_add] = await db.execute<ResultSetHeader[]>(
      `INSERT INTO Course_Offered 
        (Course_ID, Employee_ID, Course_Name, Course_Category, Course_Duration, Course_Capacity, Course_Schedule)
        VALUES
            ("${courseID}", 
            "${employeeID}", 
            "${courseName}", 
            "${courseCategory}", 
            "${courseDuration}", 
            "${courseCapacity}", 
            "${courseSchedule}")`,
    );

    const [courses] = await db.execute<RowDataPacket[]>(
      `SELECT * FROM Course_Offered`,
    );
    console.log(courseID);
    console.log(courses);

    const [courses] = await db.execute<RowDataPacket[]>(
      `SELECT * FROM Course_Offered`
    );
    console.log(courseID)
    console.log(courses)

    const [instructor_add] = await db.execute<ResultSetHeader[]>(
      `INSERT INTO Instructor
        (Employee_ID, Course_ID)
        VALUES
            ("${employeeID}", "${courseID}")`,
    );

    // console.log(params.id);

    // const [enrollment] = await db.execute<RowDataPacket[]>(
    //   `SELECT * FROM Course_Enrolled WHERE Enrollment_ID = ${data.get("enrollmentID")}`,
    // );

    console.log(course_add);
    console.log(instructor_add);
    throw redirect(302, `/dashboard/bootcamp/courses_offered`);
  },
} satisfies Actions;
