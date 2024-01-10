import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { itemTransactionHeaders, itemHeaders, supplierHeaders } from "$lib/headers"

export const load: PageServerLoad = async ({ cookies, params }) => {
  const id = cookies.get("auth-token") || null;
  if (!id) throw redirect(302, "/login");

  const table = params.table;

  let headers;
  switch (table) {
    case "item":
      headers = itemHeaders;
      break;
    case "item_transaction":
      headers = itemTransactionHeaders;
      break;
    case "supplier":
      headers = supplierHeaders;
      break;
    default:
      throw redirect(302, "/dashboard");
  }

  return {
    table: table,
    headers
  };
};
