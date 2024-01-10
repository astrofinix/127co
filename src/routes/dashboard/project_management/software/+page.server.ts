import db from "$lib/server/database";
import type { RowDataPacket } from "mysql2";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies }) => {
  const id = cookies.get("auth-token") || null;
  if (!id) throw redirect(302, "/login");

  const role = cookies.get("role");

  const [software] = await db.execute<RowDataPacket[]>(
    `SELECT * FROM Software`,
  );

  return {
    software,
  };
};
