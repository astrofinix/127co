import db from "$lib/server/database";
import type { ResultSetHeader } from "mysql2";

import type { PageServerLoad, Actions } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies, params }) => {
  const id = cookies.get("auth-token") || null;
  if (!id) throw redirect(302, "/login");

  const role = cookies.get("role");
  if (!["CEO", "Project Manager", "Application Developer"].includes(role!))
    throw redirect(302, "/dashboard");

  return {};
};

export const actions = {
  default: async ({ request, params }) => {
    const data = await request.formData();

    const [software_created] = await db.execute<ResultSetHeader[]>(
      `INSERT INTO Software VALUES ('${data.get("name")}', '${data.get(
        "version",
      )}', '${data.get("type")}', '${data.get("platform")}', '${data.get(
        "size",
      )} ${data.get("size_type")}', '${data.get("publisher")}', '${data.get(
        "license",
      )}');`,
    );

    throw redirect(
      302,
      `/dashboard/project_management/software/${data.get("name")}_${data.get("version")}`,
    );
  },
} satisfies Actions;
