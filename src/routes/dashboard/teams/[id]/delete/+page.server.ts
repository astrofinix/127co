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

  if (teams.length === 0) throw redirect(302, "/dashboard/teams");

  return {
    team: teams[0],
  };
};

export const actions = {
  default: async ({ params }) => {
    const [deleted] = await db.execute<ResultSetHeader[]>(
      `DELETE FROM Team WHERE Team_ID = ${params.id}`,
    );
  },
} satisfies Actions;
