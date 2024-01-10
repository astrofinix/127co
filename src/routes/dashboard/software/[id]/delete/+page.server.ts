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

  const [softwares] = await db.execute<RowDataPacket[]>(
    `SELECT * FROM Software WHERE Software_Name = '${params.id.split("_")[0]}' AND Software_Version = '${params.id.split("_")[1]}';`,
  );

  if (softwares.length === 0) throw redirect(302, "/dashboard/software");

  const software = softwares[0];

  return {
    software,
  };
};

export const actions = {
  default: async ({ params }) => {
    const [deleted] = await db.execute<ResultSetHeader[]>(
      `DELETE FROM Software WHERE Software_Name = '${params.id.split("_")[0]}' AND Software_Version = '${params.id.split("_")[1]}';`,
    );
  },
} satisfies Actions;
