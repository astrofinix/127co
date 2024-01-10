import db from "$lib/server/database";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

import type { PageServerLoad, Actions } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies, params }) => {
  const id = cookies.get("auth-token") || null;
  if (!id) throw redirect(302, "/login");

  const role = cookies.get("role");
  if (!["CEO", "Project Manager", "Application Developer"].includes(role!))
    throw redirect(302, "/dashboard");

  const [[leaders, members, softwares]] = await db.query<RowDataPacket[][]>(
    `SELECT * FROM Employee INNER JOIN Job ON Employee.Employee_ID = Job.Employee_ID WHERE Job.Job_Position = 'Project Manager';` +
    `SELECT * FROM Employee INNER JOIN Job ON Employee.Employee_ID = Job.Employee_ID WHERE Job.Job_Position = 'Application Developer';` +
    `SELECT * FROM Software;`,
  );
  return {
    leaders,
    members,
    softwares,
  };
};

export const actions = {
  default: async ({ request, params }) => {
    const data = await request.formData();

    const [team_created] = await db.execute<ResultSetHeader[]>(
      `INSERT INTO Team (Team_Name, Team_Leader_ID) VALUES ('${data.get(
        "name",
      )}', ${data.get("leader")})`,
    );

    throw redirect(
      302,
      `/dashboard/project_management/teams/${team_created.insertId}`,
    );
  },
} satisfies Actions;
