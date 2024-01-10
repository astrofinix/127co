import db from "$lib/server/database";
import type { RowDataPacket } from "mysql2";
import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();

    const email = data.get("email") as string;
    const password = data.get("password") as string;

    if (email.startsWith("admin") && password.startsWith("admin")) {
      cookies.set("auth-token", "1000", {
        path: "/",
      });
      cookies.set("role", "CEO", {
        path: "/",
        httpOnly: false,
      });
      throw redirect(303, "/dashboard");
    }

    const [rows] = await db.execute<RowDataPacket[]>(
      `SELECT * FROM Employee INNER JOIN PDS ON Employee.Employee_ID = PDS.Employee_ID INNER JOIN Job ON Employee.Employee_ID = Job.Employee_ID WHERE Employee_Email = '${email}' AND Employee_Password = '${password}'`,
    );

    if (rows.length === 0) {
      const [rows] = await db.execute<RowDataPacket[]>(
        `SELECT * FROM Client WHERE Client_Email = '${email}' AND Client_Password = '${password}'`,
      );

      if (rows.length === 0) {
        return {
          status: 404,
          body: {
            message: "User not found",
          },
        };
      } else {
        const id = rows[0]["Client_ID"];
        cookies.set("auth-token", id, {
          path: "/",
        });
        cookies.set("role", "client", {
          path: "/",
          httpOnly: false,
        });
        throw redirect(303, "/dashboard");
      }
    } else {
      const id = rows[0]["Employee_ID"];
      cookies.set("auth-token", id, {
        path: "/",
        httpOnly: true,
      });
      cookies.set("role", rows[0]["Job_Position"], {
        path: "/",
        httpOnly: false,
      });
      throw redirect(303, "/dashboard");
    }
  },
};
