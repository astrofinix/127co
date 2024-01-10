import db from "$lib/server/database";
import type { RowDataPacket } from "mysql2";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {


  const [Courses] = await db.execute<RowDataPacket[]>(
    `SELECT * FROM Course_Offered INNER JOIN Instructor on course_offered.course_Id = instructor.course_Id INNER JOIN Employee on Instructor.Employee_Id = Employee.Employee_Id`,
  );


  return {
    Courses
  };
};

export const actions = {
  search: async ({ request }) => {},
} satisfies Actions;
