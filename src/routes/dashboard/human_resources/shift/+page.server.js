import * as db from "$lib/util/hr/db/mysql";

export async function load() {
    try {
        let q = {
            fields: ['*'],
            alias: null,
            from: 'shift',
            where: null,
            groupBy: null,
            having: null,
            orderBy: null
        }

        return db.get(q);
    } catch (error) {
        console.error('Got an Error!!!');
        console.log(error);
        return error;
    }
}