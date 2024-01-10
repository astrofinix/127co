import db from "$lib/server/database";

export async function load() {
    const contract = await db.execute("SELECT * FROM CONTRACT");

  return {
    contract: contract[0],
  };
}