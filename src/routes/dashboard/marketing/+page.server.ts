import db from "$lib/server/database";
import type { Actions } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import Tables from "$lib/tables";

export async function load() {
  const client = await db.execute("SELECT * FROM CLIENT");
  const contract = await db.execute("SELECT * FROM CONTRACT");

  return {
    client: client[0],
    contract: contract[0],
  };
}

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
        `DELETE FROM ${tableName} WHERE ${table.primaryKey}=${id}`,
      );
    } catch (e: any) {
      return { success: false, message: e.message };
    }

    return { success: true, message: "Successfully deleted entry. " };
  },
};
