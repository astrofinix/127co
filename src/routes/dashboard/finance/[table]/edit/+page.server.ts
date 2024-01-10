import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import {
  salaryHeaders,
  budgetHeaders,
  expenseHeaders,
  ctransactionHeaders,
} from "$lib/headers";

export const load: PageServerLoad = async ({ cookies, params }) => {
  const id = cookies.get("auth-token") || null;
  if (!id) throw redirect(302, "/login");

  const table = params.table;

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
      throw redirect(302, "/dashboard");
  }

  return {
    table: table,
    headers,
  };
};
