import * as db from "$lib/util/hr/db/mysql";

export async function load({ params }) {
    const id = params.employeeID;
    try {
        let q = {
            fields: ['Employee.*', 'employee.Employee_LastName', 'PDS.*'],
            alias: null,
            from: 'employee NATURAL JOIN PDS',
            where: `employee.Employee_ID = "${id}"`,
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