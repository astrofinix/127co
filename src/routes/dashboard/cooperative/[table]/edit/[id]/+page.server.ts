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
<<<<<<< HEAD
  const data = await db.execute(`SELECT * FROM ${tableName} WHERE ${table.primaryKey}='${id}'`);
=======
  const data = await db.execute(
    `SELECT * FROM ${tableName} WHERE ${table.primaryKey}='${id}'`,
  );
>>>>>>> 731add57a0a434c19f16bb96f374c43df791d33f

  return {
    table: tableName,
    // @ts-ignore
<<<<<<< HEAD
    data: data[0][0]
=======
    data: data[0][0],
>>>>>>> 731add57a0a434c19f16bb96f374c43df791d33f
  };
};

export const actions: Actions = {
<<<<<<< HEAD
  edit: async ({cookies, request, params }) => {
=======
  edit: async ({ cookies, request, params }) => {
>>>>>>> 731add57a0a434c19f16bb96f374c43df791d33f
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
<<<<<<< HEAD
      values[header] = value; 
    }

    let zipped = headers.map(
      (header) => `${header} = '${values[header]}'`
    ).join(", ");


    await db.execute(`UPDATE ${tableName} SET ${zipped} WHERE ${primaryKey}=${id}`);
    return { success: true };
  }

} 

=======
      values[header] = value;
    }

    let zipped = headers
      .map((header) => `${header} = '${values[header]}'`)
      .join(", ");

    await db.execute(
      `UPDATE ${tableName} SET ${zipped} WHERE ${primaryKey}=${id}`,
    );
    return { success: true };
  },
};
>>>>>>> 731add57a0a434c19f16bb96f374c43df791d33f
