import type { RequestHandler } from "./$types";

import { json, error } from "@sveltejs/kit";
import db from "$lib/server/database";

export const POST: RequestHandler = async ({ request }) => {
  const { table, id } = await request.json();

  let primaryKey;
  switch (table) {
    case "salary":
      primaryKey = "salary_id";
      break;
    case "budget":
      primaryKey = "budget_id";
      break;
    case "expenditure":
      primaryKey = "expense_id";
      break;
    case "contract_transaction":
      primaryKey = "CT_id";
      break;
    default:
      return error(401, `Invalid ${table} passed`);
  }

  await db.execute(`DELETE FROM ${table} WHERE ${primaryKey}=${id}`);

  return json({ success: true });
};
