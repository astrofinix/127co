import db from "$lib/server/database";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import type { PageServerLoad, Actions } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies, params }) => {
  const course_ID = params.id;


  // Fetch enrolled students data with names
  const [courses] = await db.execute<RowDataPacket[]>(
    `SELECT * 
    FROM Course_Offered co
    INNER JOIN Course_Enrolled ce ON co.Course_ID = ce.Course_ID
    WHERE co.Course_ID = '${course_ID}'`
  );

  // Employee name
  const course = courses[0];

  return {
    course
  };
};

export const actions = { 
  default: async ({ request, params }) => {
    const data = await request.formData();

    const [course_deleted] = await db.execute<ResultSetHeader[]>(
     `DELETE FROM Course_Offered WHERE Course_ID = '${params.id}'`
      );

    const [enrollment_deleted] = await db.execute<ResultSetHeader[]>(
      `DELETE FROM Course_Enrolled WHERE Course_ID = '${params.id}'`
       );
    
    
    console.log(course_deleted);
    console.log(enrollment_deleted);
    console.log(data.get("course_ID" + " " + data.get("course_ID")));
    throw redirect(302, `/dashboard/bootcamp/courses_offered`);  
  }

} satisfies Actions;


