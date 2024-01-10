import type { PageServerLoad, Actions } from "./$types";
import { redirect, error } from "@sveltejs/kit";
import db from "$lib/server/database";
import Tables from "$lib/tables";

export const load: PageServerLoad = async ({ cookies, params }) => {
  const auth = cookies.get("auth-token") || null;
  if (!auth) throw redirect(302, "/login");

  const tableName = params.table;
  const id = params.id;
  const table = Tables[tableName];
  if (!table) {
    return error(404, "Invalid table");
  }
  const data = await db.execute(`SELECT * FROM ${tableName} WHERE ${table.primaryKey}='${id}'`);

  return {
    table: tableName,
    // @ts-ignore
    data: data[0][0]
  };
};

export const actions: Actions = {
  edit: async ({cookies, request, params }) => {
    const form = await request.formData();
    const tableName = params.table;
    const id = params.id;

    const table = Tables[tableName];
    if (!table) {
      return error(401, "unknown error");
    }
    const { headers, primaryKey } = table;

    const values: Record<string, any> = {};
    for (const header of headers) {
      const value = form.get(header);
      if (!value) {
        return error(401, `missing key ${header}`);
      }
      values[header] = value; 
    }

    let zipped = headers.map(
      (header) => `${header} = '${values[header]}'`
    ).join(", ");


    await db.execute(`UPDATE ${tableName} SET ${zipped} WHERE ${primaryKey}=${id}`);
    return { success: true };
  }

} 

