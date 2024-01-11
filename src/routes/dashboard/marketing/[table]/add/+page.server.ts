import type { PageServerLoad, Actions } from "./$types";
import { redirect, error } from "@sveltejs/kit";
import db from "$lib/server/database";
import Tables from "$lib/tables";

export const load: PageServerLoad = async ({ cookies, params }) => {
  const id = cookies.get("auth-token") || null;
  if (!id) throw redirect(302, "/login");

  const table = Tables[params.table];
  if (!table) {
    return error(401, "unknown table");
  }

  const data = await db.execute(`SELECT * FROM ${params.table}`);
  return {
    data: data[0],
    table: params.table,
  };
};

export const actions: Actions = {
  add: async ({ cookies, request }) => {
    const form = await request.formData();
    const tableName = form.get("table");
    const table = Tables[form.get("table") as string];
    if (!table) {
      return error(401, "unknown error");
    }
    const { headers } = table;

    let values = [];
    for (const header of headers) {
      const value = form.get(header);
      if (!value) {
        return error(401, `missing key ${header}`);
      }
      values.push(`'${value}'`);
    }

    try {
      await db.execute(
        `INSERT INTO ${tableName} (${headers.join(", ")}) VALUES (${values})`,
      );
    } catch (e: any) {
      return { success: false, message: e.message };
    }
    return { success: true };
  },
};
