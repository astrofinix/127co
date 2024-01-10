import type { RequestHandler } from "./$types";

import { json, error } from "@sveltejs/kit";
import db from "$lib/server/database";

export const POST: RequestHandler = async ({ request }) => {
  const { table, id } = await request.json();

  console.log(`DELETED ${id} from ${table}`);

  const primaryKey =
    table === "Request"
      ? "Request_ID"
      : table === "Membership"
        ? "Member_ID"
        : table === "CM_Payout"
          ? "CMTransaction_ID"
          : table === "SavingsAccounts"
            ? "Savings_ID"
            : table === "CS_Transaction"
              ? "CSTransaction_ID"
              : table === "LoanRecords"
                ? "Loan_ID"
                : table === "CL_Transaction"
                  ? "CLTransaction_ID"
                  : undefined;

  if (!primaryKey) {
    return error(401, `Invalid ${table} passed`);
  }

  await db.query(`DELETE FROM ${table} WHERE ${primaryKey}=${id};`);
  return json({ success: true });
};
