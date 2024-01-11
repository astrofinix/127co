import db from "$lib/server/database";
import type { Actions } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import Tables from "$lib/tables";

export async function load() {
  const transactions = await db.execute("SELECT * FROM ITEM_TRANSACTION");
  const suppliers = await db.execute("SELECT * FROM SUPPLIER");
  const items = await db.execute("SELECT * FROM ITEM");

  return {
    transactions: transactions[0],
    suppliers: suppliers[0],
    items: items[0],
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
