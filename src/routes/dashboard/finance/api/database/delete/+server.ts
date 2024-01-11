import type { RequestHandler } from "./$types";

import { json, error } from "@sveltejs/kit";
import db from "$lib/server/database";

export const POST: RequestHandler = async ({ request }) => {
  const { table, id } = await request.json();
  console.log(`DELETED ${id} from ${table}`);

  let primaryKey;
  switch (table) {
    case "Salary":
      primaryKey = "Salary_Id";
      break;
    case "budget":
      primaryKey = "Budget_Id";
      break;
    case "expenditure":
      primaryKey = "Expense_Id";
      break;
    case "Contract_Transaction":
      primaryKey = "CT_Id";
      break;
    default:
      return error(401, `Invalid ${table} passed`);
  }

  await db.execute(`DELETE FROM ${table} WHERE ${primaryKey}=${id}`);

  return json({ success: true });
};
