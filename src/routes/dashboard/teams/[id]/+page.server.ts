import db from "$lib/server/database";
import type { RowDataPacket } from "mysql2";

import type { PageServerLoad } from "./$types";
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

  if (teams.length === 0) throw redirect(302, "/dashboard/teams");

  const team = teams[0];

  const [[team_leader, team_members, team_projects, team_software]] =
    await db.query<RowDataPacket[][]>(
      `SELECT * FROM Employee WHERE Employee_ID = ${team["Team_Leader_ID"]};` +
        `SELECT * FROM Employee WHERE Employee_ReportsTo = ${team["Team_Leader_ID"]};` +
        `SELECT * FROM Project WHERE Project_Team_ID = ${params.id};` +
        `SELECT * FROM Team_Software WHERE Team_ID = ${params.id}`,
    );

  team["Team_Leader"] = team_leader[0];
  team["Team_Members"] = team_members;
  team["Team_Projects"] = team_projects;
  team["Team_Software"] = team_software;

  return {
    team,
  };
};
