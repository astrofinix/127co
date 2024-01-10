import db from "$lib/server/database";

export async function load() {
  const client = await db.execute("SELECT * FROM CLIENT");

  return {
    client: client[0],
  };
}
