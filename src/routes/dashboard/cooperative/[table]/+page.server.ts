import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import db from "$lib/server/database";

export const load: PageServerLoad = async ({ cookies, params }) => {
  const id = cookies.get("auth-token") || null;
  if (!id) throw redirect(302, "/login");

  const table = params.table;
  const validTables = [
    "request",
    "membership",
    "cm_payout",
    "savingsaccounts",
    "cs_transaction",
    "loanrecords",
    "cl_transaction",
  ];

  if (!validTables.includes(table)) {
    console.log(table);
    throw redirect(302, "/dashboard");
  }

  const data = await db.execute(`SELECT * FROM ${params.table}`);
  return {
    data: data[0],
    table: table,
  };
};
