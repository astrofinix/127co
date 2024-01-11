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

  const [teams] = await db.execute<RowDataPacket[]>(
    `SELECT * FROM Team WHERE Team_ID = ${params.id}`,
  );

  if (teams.length === 0)
    throw redirect(302, "/dashboard/project_management/teams");

  const team = teams[0];

  const [
    [team_leader, team_members, team_software, leaders, members, softwares],
  ] = await db.query<RowDataPacket[][]>(
    `SELECT * FROM Employee WHERE Employee_ID = ${team["Team_Leader_ID"]};` +
      `SELECT * FROM Employee WHERE Employee_Reportsto = ${team["Team_Leader_ID"]};` +
      `SELECT * FROM Team_Software WHERE Team_ID = ${params.id};` +
      `SELECT * FROM Employee INNER JOIN Job ON Employee.Employee_ID = Job.Employee_ID WHERE Job.Job_Position = 'Project Manager';` +
      `SELECT * FROM Employee INNER JOIN Job ON Employee.Employee_ID = Job.Employee_ID WHERE Job.Job_Position = 'Application Developer';` +
      `SELECT * FROM Software;`,
  );
  return {
    team,
    team_leader: team_leader[0],
    team_members,
    team_software,
    leaders,
    members,
    softwares,
  };
};

export const actions = {
  default: async ({ request, params }) => {
    const data = await request.formData();

    const [team_edited] = await db.execute<ResultSetHeader[]>(
      `UPDATE Team SET Team_Name = '${data.get(
        "name",
      )}', Team_Leader_ID = ${data.get("leader")} WHERE Team_ID = ${params.id}`,
    );

    throw redirect(302, `/dashboard/project_management/teams/${params.id}`);
  },
} satisfies Actions;
