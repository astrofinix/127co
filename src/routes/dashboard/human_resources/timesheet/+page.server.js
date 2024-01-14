import * as db from "$lib/util/hr/db/mysql";

export async function load() {
  try {
    let q = {
      fields: [
        "*",
        "Employee.Employee_FirstName",
        "Employee.Employee_LastName",
      ],
      alias: null,
      from: "Timesheet NATURAL JOIN Employee",
      where: null,
      groupBy: null,
      having: null,
      orderBy: null,
    };
    return db.get(q);
  } catch (error) {
    console.error("Got an Error!!!");
    console.log(error);
    return error;
  }
}

export const actions = {
  delete: async ({ request }) => {
    try {
      const formData = await request.formData();
      const id = formData.get("id");
      queryDelete(id);
    } catch (e) {
      console.error("Error occured", e.message);
    }
  },
};

function queryDelete(id) {
  let q = {
    from: "Timesheet",
    where: `Timesheet_ID = ${id}`,
  };
  db.del(q);
}
