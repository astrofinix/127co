import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import db from "$lib/server/database";

export const load: PageServerLoad = async ({ cookies, params }) => {
  const id = cookies.get("auth-token") || null;
  if (!id) throw redirect(302, "/login");

  const table = params.table;
<<<<<<< HEAD
=======
  console.log("DITO YON" + table)
>>>>>>> 1d99c967236541bae72b4a6cab2bc7ff81d69a8d


  return {
    table: table,
  };
};
