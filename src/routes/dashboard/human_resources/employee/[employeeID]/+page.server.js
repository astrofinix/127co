import { mysqlconnFn } from "$lib/util/hr/db/mysql";

export async function load({ params }) {
    let mysqlconn = await mysqlconnFn();
    const id = params.employeeID;
    try {
        let results = await mysqlconn
            .query(`SELECT employee.Employee_FirstName, employee.Employee_LastName, PDS.* FROM employee NATURAL JOIN PDS where employee.Employee_ID = "${id}"`)
            .then(function ([rows, fields]) {
                return rows;
            });

        return {
            data: results
        }
    } catch (error) {
        console.error('Got an Error!!!');
        console.log(error);
        return error;
    }
}