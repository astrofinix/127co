import type { PageServerLoad, Actions } from "./$types";
import { redirect, error } from "@sveltejs/kit";

import db from "$lib/server/database";
import Tables from "$lib/tables";

export const load: PageServerLoad = async ({ cookies, params }) => {
  const id = cookies.get("auth-token") || null;
  if (!id) throw redirect(302, "/login");

  const table = params.table;

  const data = await db.execute(`SELECT * FROM ${params.table}`);
  return {
    data: data[0],
    table: table,
  };
};

export const actions: Actions = {
  delete: async ({ cookies, request }) => {
    const data = await request.formData();
    const id = data.get("id");
    const tableName = data.get("table") as string;
    const table = Tables[tableName];

    if (!table) {
      return error(404, { message: "invalid table" });
    }

    try {
      await db.execute(
        `DELETE FROM ${tableName} WHERE ${table.primaryKey}='${id}'`,
      );
    } catch (e: any) {
      return { success: false, message: e.message };
    }

    return { success: true, message: "Success: Entry has been deleted from the database" };
  },

  search: async ({cookies, request, params}) => {
    const data = await request.formData();
    const query = data.get("query");
    const table = params.table
    const sql = `SELECT * FROM ${table} WHERE (${query})`;

    let results;
    try {
      results = await db.execute(sql);
    } catch (e) {
      return { success: true, rows: [] }
    }
  
    return { success: true, rows: results[0] }
  }
};
