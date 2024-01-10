import type { RequestHandler } from "./$types";

import { json, error } from "@sveltejs/kit";
import db from "$lib/server/database";

export const POST: RequestHandler = async ({ request }) => {
  const { table, id } = await request.json();

  let primaryKey;
  switch (table) {
    case "item_transaction":
      primaryKey = "transaction_id";
      break;
    case "supplier":
      primaryKey = "supplier_id";
      break;
    case "item":
      primaryKey = "item_id";
      break;
    default:
      return error(401, `Invalid ${table} passed`);
  }

  await db.execute(`DELETE FROM ${table} WHERE ${primaryKey}=${id}`);

  return json({ success: true });
};
