import * as db from "$lib/util/hr/db/mysql";

export async function load() {
    /**
    Source: 
        WITH: 
            https://www.geeksforgeeks.org/sql-with-clause/
        PARTITION: 
            https://www.geeksforgeeks.org/mysql-partition-by-clause/
        COALESCE: 
            https://www.w3schools.com/sql/func_sqlserver_coalesce.asp
    
        Query Part A: 
            WITH RankedJobs AS (SELECT Employee_ID, Job_Position, ROW_Number() OVER (PARTITION BY Employee_ID ORDER BY Job_AcquisitionDate DESC) as RowNum FROM Job)  
    
        Query Part B: 
            SELECT Employee.*, COALESCE(RankedJobs.Job_Position, "Unassigned") AS Job_Position FROM Employee LEFT JOIN RankedJobs ON Employee.Employee_ID = RankedJobs.Employee_ID AND RankedJobs.RowNum = 1;
    
        NOTE:
            COALESCE() is used here as something to substitue for the null values in the column. If the Job_Position of an employee is not null, it will return the value of Job_Position; otherwise, it will return "Unassigned".
    */
    try {

        let q = {
            with: 'WITH RankedJobs AS (SELECT Employee_ID, Job_Position, ROW_Number() OVER (PARTITION BY Employee_ID ORDER BY Job_AcquisitionDate DESC) as RowNum FROM Job)',
            fields: ['Employee.*', 'COALESCE(RankedJobs.Job_Position, "Unassigned") AS Job_Position'],
            alias: null,
            from: 'Employee LEFT JOIN RankedJobs ON Employee.Employee_ID = RankedJobs.Employee_ID AND RankedJobs.ROwNum = 1',
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

export const actions = {
    delete: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');
        queryDelete(id);
    }
}

//delete is a reserved word so I'm using an alternative function name : (
function queryDelete(id) {
    let q = {
        from: 'Employee',
        where: `Employee.Employee_Id = ${id}`
    };
    db.del(q);
}