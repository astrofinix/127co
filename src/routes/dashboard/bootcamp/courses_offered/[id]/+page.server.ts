import db from "$lib/server/database";
import type { RowDataPacket } from "mysql2";

import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, params }) => {
  const [Courses] = await db.execute<RowDataPacket[]>(
    `SELECT * FROM Course_Offered WHERE Course_ID = "${params.id}"`,
  );

  if (Courses.length === 0) throw redirect(302, "/dashboard/bootcamp");

  const Course = Courses[0];

  return {
    Course,
  };
};
