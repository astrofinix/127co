import db from "$lib/server/database";

export async function load() {
  const salary = await db.execute("SELECT * FROM SALARY");
  const budget = await db.execute("SELECT * FROM BUDGET");
  const expense = await db.execute("SELECT * FROM EXPENDITURE");
  const ctransaction = await db.execute("SELECT * FROM CONTRACT_TRANSACTION");

  return {
    salary: salary[0],
    budget: budget[0],
    expense: expense[0],
    ctransaction: ctransaction[0],
  };
}
