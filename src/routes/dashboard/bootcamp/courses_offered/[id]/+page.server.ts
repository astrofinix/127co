import db from "$lib/server/database";
import type { RowDataPacket } from "mysql2";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies, params }) => {
  const courseID = params.id;

  // Fetch course details
  const [courseResult] = await db.execute<RowDataPacket[]>(
    `SELECT Course_Offered.*, Employee.Employee_FirstName, Employee.Employee_LastName
     FROM Course_Offered
     INNER JOIN Instructor ON Course_Offered.Course_ID = Instructor.Course_ID
     INNER JOIN Employee ON Instructor.Employee_Id = Employee.Employee_Id
     WHERE Course_Offered.Course_ID = "${courseID}"`,
  );

  if (courseResult.length === 0) throw redirect(302, "/dashboard/bootcamp");

  const course = courseResult[0];

  // Fetch enrolled students data with names
  const [enrollmentResult] = await db.execute<RowDataPacket[]>(
    `SELECT
       ce.Enrollment_ID,
       ce.Employee_ID,
       ce.Start_Date,
       ce.End_Date,
       ce.Grade,
       CONCAT(e.Employee_LastName, ', ', e.Employee_FirstName) AS Name
     FROM Course_Enrolled ce
     INNER JOIN Course_Offered co ON ce.Course_ID = co.Course_ID
     INNER JOIN Employee e ON ce.Employee_ID = e.Employee_ID
     WHERE co.Course_ID = "${courseID}"`,
  );

  const [slots] = await db.execute<RowDataPacket[]>(
    `SELECT
    co.Course_Capacity - COUNT(*) AS slots
    FROM Course_Enrolled ce
    INNER JOIN Course_Offered co ON ce.Course_ID = co.Course_ID
    WHERE co.Course_ID = "${courseID}"`,
  );

  // Employee names
  const enrollments = enrollmentResult || [];
  const remainingSlots = slots[0];

  
  return {
    course,
    Enrollments: enrollments,
    remainingSlots,
  };
};
