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

  const [projects] = await db.execute<RowDataPacket[]>(
    `SELECT * FROM Project WHERE Project_ID = ${params.id}`,
  );

  if (projects.length === 0)
    throw redirect(302, "/dashboard/project_management/projects");

  const project = projects[0];

  const [[timelines, teams]] = await db.query<RowDataPacket[][]>(
    `SELECT * FROM Timeline WHERE Timeline_ID = ${project["Project_Timeline_ID"]};` +
      `SELECT * FROM Team WHERE Team_ID = ${project["Project_Team_ID"]};`,
  );

  const [all_teams] = await db.execute<RowDataPacket[]>(`SELECT * FROM Team;`);

  return {
    project,
    timeline: timelines[0],
    team: teams[0],
    teams: all_teams,
  };
};

export const actions = {
  default: async ({ request, params }) => {
    const data = await request.formData();

    const [project_edited] = await db.execute<ResultSetHeader[]>(
      `UPDATE Project SET Project_Name = '${data.get(
        "name",
      )}', Project_Type = '${data.get("type")}', Project_Team_ID = ${data.get(
        "team",
      )}, Project_Description = '${data.get(
        "description",
      )}', Project_Status = '${data.get(
        "status",
      )}', Project_Budget = '${data.get("budget")}' WHERE Project_ID = ${
        params.id
      }`,
    );

    const [project] = await db.execute<RowDataPacket[]>(
      `SELECT * FROM Project WHERE Project_ID = ${params.id}`,
    );
    const timeline_id = project[0]["Project_Timeline_ID"];

    const [timeline_edited] = await db.execute<ResultSetHeader[]>(
      `UPDATE Timeline SET Timeline_StartDate = '${data.get(
        "start-date",
      )}', Timeline_ExpectedFinishDate = '${data.get(
        "expected-finish-date",
      )}', Timeline_FinishDate = '${data.get(
        "finish-date",
      )}' WHERE Timeline_ID = ${timeline_id}`,
    );

    throw redirect(302, `/dashboard/project_management/projects/${params.id}`);
  },
} satisfies Actions;
