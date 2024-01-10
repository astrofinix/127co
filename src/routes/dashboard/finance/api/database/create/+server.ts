import type { RequestHandler } from "./$types";
import { json, error } from "@sveltejs/kit";
import {
  salaryHeaders,
  budgetHeaders,
  expenseHeaders,
  ctransactionHeaders,
} from "$lib/headers";

import db from "$lib/server/database";

const isDataValid = (data: JSON, headers: string[]) => {
  for (const key in data) {
    if (!headers.includes(key)) {
      return { success: false, missingKey: key };
    }
  }
  return { success: true, missingKey: "" };
};

export const POST: RequestHandler = async ({ request }) => {
  const { table, data } = await request.json();

  if (!table) {
    return error(401, "The field table does not exist");
  }
  if (!data) {
    return error(401, "The field data does not exist");
  }

  let headers;
  switch (table) {
    case "salary":
      headers = salaryHeaders;
      break;
    case "budget":
      headers = budgetHeaders;
      break;
    case "expenditure":
      headers = expenseHeaders;
      break;
    case "contract_transaction":
      headers = ctransactionHeaders;
      break;
    default:
      return error(401, `Invalid table ${table}`);
  }

  const formData = JSON.parse(data);
  const { success, missingKey } = isDataValid(formData, headers);
  if (!success) {
    return error(401, `Missing key ${missingKey}`);
  }
  const headersSeparated = headers.join(" ,");
  const values = headers
    .map((key) => (formData[key] === "NULL" ? "NULL" : `'${formData[key]}'`))
    .join(" ,");

  await db.execute(
    `INSERT INTO ${table} (${headersSeparated}) VALUES (${values});`,
  );
  return json({ success: true });
};
