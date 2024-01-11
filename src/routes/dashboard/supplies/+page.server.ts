import db from "$lib/server/database";
import type { Actions } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import Tables from "$lib/tables";

export async function load() {
  const transactions = await db.execute("SELECT * FROM ITEM_TRANSACTION");
  const suppliers = await db.execute("SELECT * FROM SUPPLIER");
  const items = await db.execute("SELECT * FROM ITEM");

  const statistics: Record<string, number> = {
    "Loaned": 0,
    "Available": 0,
    "Being Repaired": 0,
    "Being Upgraded": 0,
    "Needing Repair": 0,
    "Needing Upgrade": 0,
  };

  for (const item of items[0]) {
    switch (item.Item_Status) {
      case "Available":
        statistics["Available"] += 1;
        break;
      case "CurrentlyLoaned":
        statistics["Loaned"] += 1;
        break;
      case "CurrentlyInRepair":
        statistics["Being Repaired"] += 1;
        break;
      case "CurrentlyInUpgrade":
        statistics["Being Upgraded"] += 1;
        break;
      case "NeedsRepair":
        statistics["Needing Repair"] += 1;
        break;
      case "NeedsUpgrade":
        statistics["Needing Upgrade"] += 1;
        break;
    }
  }

  return {
    transactions: transactions[0],
    suppliers: suppliers[0],
    items: items[0],
    statistics,
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
  search: async ({cookies, request}) => {
    const data = await request.formData();
    const query = data.get("query");
    const table = data.get("table");
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
