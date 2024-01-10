import type { RequestHandler } from "./$types";
import { json, error } from "@sveltejs/kit";
import {
  requestHeaders,
  membershipHeaders,
  cmPayoutHeaders,
  savingsHeaders,
  csTransactionHeaders,
  loansHeaders,
  clTransactionHeaders,
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

const commaSeparate = (data: string[]) => {
  return data.reduce((total, key, index) => {
    if (index == data.length - 1) {
      return (total += key);
    }
    return (total = total + key + ", ");
  }, "");
};

export const POST: RequestHandler = async ({ request }) => {
  const { table, data } = await request.json();

  if (!table) {
    return error(401, "The field table does not exist");
  }
  if (!data) {
    return error(401, "The field data does not exist");
  }

  const headers =
    table === "request"
      ? requestHeaders
      : table === "membership"
        ? membershipHeaders
        : table === "cm_payout"
          ? cmPayoutHeaders
          : table === "savingsaccounts"
            ? savingsHeaders
            : table === "cs_transaction"
              ? csTransactionHeaders
              : table === "loanrecords"
                ? loansHeaders
                : table === "cl_transaction"
                  ? clTransactionHeaders
                  : undefined;

  if (!headers) {
    return error(401, `Invalid table ${table}`);
  }

  const formData = JSON.parse(data);

  const { success, missingKey } = isDataValid(formData, headers);
  if (!success) {
    return error(401, `Missing key ${missingKey}`);
  }
  const headersSeparated = commaSeparate(headers);
  const values = commaSeparate(
    headers.map((key) => {
      if (formData[key] === "NULL") {
        return "NULL";
      }
      return `'${formData[key]}'`;
    }),
  );

  await db.execute(
    `INSERT INTO ${table} (${headersSeparated}) VALUES (${values});`,
  );
  return json({ success: true });
};
