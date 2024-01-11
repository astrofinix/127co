import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import {
  clientHeaders,
  contractHeaders
} from "$lib/headers";

export const load: PageServerLoad = async ({ cookies, params }) => {
  const id = cookies.get("auth-token") || null;
  if (!id) throw redirect(302, "/login");

  const table = params.table;

  let headers;
  switch (table) {
    case "client":
      headers = clientHeaders;
      break;
    case "contract":
      headers = contractHeaders;
      break;
    default:
      throw redirect(302, "/dashboard");
  }

  return {
    table: table,
    headers,
  };
};
