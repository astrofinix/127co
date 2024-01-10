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

  const [[team_leader, team_members, team_projects, team_software]] =
    await db.query<RowDataPacket[][]>(
      `SELECT * FROM Employee WHERE Employee_ID = ${team["Team_Leader_ID"]};` +
        `SELECT * FROM Employee WHERE Employee_ReportsTo = ${team["Team_Leader_ID"]};` +
        `SELECT * FROM Project WHERE Project_Team_ID = ${params.id};` +
        `SELECT * FROM Team_Software WHERE Team_ID = ${params.id}`,
    );

  const [[other_projects, other_software]] = await db.query<RowDataPacket[][]>(
    `SELECT * FROM Project WHERE Project_Team_ID != ${params.id};` +
      `SELECT * FROM Software WHERE Software_Name not in (SELECT Software_Name FROM Team_Software WHERE Team_ID = ${params.id}) AND Software_Version not in (SELECT Software_Version FROM Team_Software WHERE Team_ID = ${params.id})`,
  );

  team["Team_Leader"] = team_leader[0];
  team["Team_Members"] = team_members;
  team["Team_Projects"] = team_projects;
  team["Team_Software"] = team_software;
  team["Other_Projects"] = other_projects;
  team["Other_Software"] = other_software;

  return {
    team,
  };
};

export const actions = {
  add_member: async ({ request, params }) => {},
  add_project: async ({ request, params }) => {
    const data = await request.formData();

    const [project_added] = await db.execute<ResultSetHeader[]>(
      `UPDATE Project SET Project_Team_ID = ${
        params.id
      } WHERE Project_ID = ${data.get("project")}`,
    );
  },
  add_software: async ({ request, params }) => {
    const data = await request.formData();
    const software = String(data.get("software")).split("_");

    const [software_added] = await db.execute<ResultSetHeader[]>(
      `INSERT INTO Team_Software (Team_ID, Software_Name, Software_Version) VALUES (${params.id}, '${software[0]}', '${software[1]}')`,
    );
  },
  remove_software: async ({ request, params }) => {
    const data = await request.formData();
    const software = String(data.get("software")).split("_");

    const [software_removed] = await db.execute<ResultSetHeader[]>(
      `DELETE FROM Team_Software WHERE Team_ID = ${params.id} AND Software_Name = '${software[0]}' AND Software_Version = '${software[1]}'`,
    );
  },
} satisfies Actions;
