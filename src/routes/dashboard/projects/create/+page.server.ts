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

  const [teams] = await db.execute<RowDataPacket[]>(`SELECT * FROM Team`);

  return {
    teams,
  };
};

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const [timeline_created] = await db.execute<ResultSetHeader[]>(
      `INSERT INTO Timeline (Timeline_StartDate, Timeline_ExpectedFinishDate, Timeline_FinishDate) VALUES ('${data.get(
        "start-date",
      )}', '${data.get("expected-finish-date")}', '${data.get(
        "finish-date",
      )}');`,
    );

    const [project_created] = await db.execute<ResultSetHeader[]>(
      `INSERT INTO Project (Project_Name, Project_Description, Project_Type, Project_Budget, Project_Status, Project_Timeline_ID, Project_Team_ID) VALUES ('${data.get(
        "name",
      )}', '${data.get("description")}', '${data.get("type")}', '${data.get(
        "budget",
      )}', '${data.get("status")}', '${timeline_created.insertId}', '${data.get(
        "team",
      )}');`,
    );

    throw redirect(302, `/dashboard/projects/${project_created.insertId}`);
  },
} satisfies Actions;
