
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import db from "$lib/server/database";
import { itemTransactionHeaders, itemHeaders, supplierHeaders } from "$lib/headers"

export const load: PageServerLoad = async ({ cookies, params }) => {
  const id = cookies.get("auth-token") || null;
  if (!id) throw redirect(302, "/login");

  const table = params.table;

  let headers;
  let primaryKey;

  switch (table) {
    case "item":
      headers = itemHeaders;
      primaryKey = "Item_Id";
      break;
    case "item_transaction":
      headers = itemTransactionHeaders;
      primaryKey = "Transaction_Id";
      break;
    case "supplier":
      headers = supplierHeaders;
      primaryKey = "Supplier_Id";
      break;
    default:
      throw redirect(302, "/dashboard");
  }

  const data = await db.execute(`SELECT * FROM ${params.table}`);
  return {
    data: data[0],
    table: table,
    headers: headers,
    primaryKey: primaryKey
  };
};
