import db from "$lib/server/database";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

import type { PageServerLoad, Actions } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies, params }) => {
  const id = cookies.get("auth-token") || null;
  if (!id) throw redirect(302, "/login");

  const role = cookies.get("role");
  if (!["CEO", "Project Manager", "Application Developer"].includes(role!))
    throw redirect(302, "/dashboard");

  const [softwares] = await db.execute<RowDataPacket[]>(
    `SELECT * FROM Software WHERE Software_Name = '${
      params.id.split("_")[0]
    }' AND Software_Version = '${params.id.split("_")[1]}';`,
  );

  const [all_softwares] = await db.execute<RowDataPacket[]>(
    `SELECT * FROM Software`,
  );

  return {
    software: softwares[0],
    softwares: all_softwares,
  };
};

export const actions = {
  default: async ({ request, params }) => {
    const data = await request.formData();

    const [software_edited] = await db.execute<ResultSetHeader[]>(
      `UPDATE Software SET Software_Name = '${data.get(
        "name",
      )}', Software_Version = '${data.get(
        "version",
      )}', Software_Type = '${data.get("type")}', Software_OS = '${data.get(
        "platform",
      )}', Software_Size = '${data.get("size")} ${data.get(
        "size_type",
      )}', Software_Publisher = '${data.get(
        "publisher",
      )}', Software_License = '${data.get("license")}' WHERE Software_Name = '${
        params.id.split("_")[0]
      }' AND Software_Version = '${params.id.split("_")[1]}';`,
    );

    throw redirect(
      302,
      `/dashboard/software/${data.get("name")}_${data.get("version")}`,
    );
  },
} satisfies Actions;
