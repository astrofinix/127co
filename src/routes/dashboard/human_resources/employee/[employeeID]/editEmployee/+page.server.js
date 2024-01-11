import * as db from "$lib/util/hr/db/mysql";
import { hasNoNumbers } from "$lib/util/utilsHR";
import { fail } from "@sveltejs/kit";

var id;

export async function load({ params }) {
    id = params.employeeID;
    try {
        let q = {
            fields: ['*'],
            alias: null,
            from: 'employee',
            where: `employee_id = ${id}`,
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
    edit: () => { },
    update: async ({ request }) => {
        try {
            const formData = await request.formData();
            return await update(formData);
        } catch (e) {
            console.error("Error occured", e.message);
        }
    }
}

async function update(formData) {
    let employee = {
        Employee_FirstName: formData.get('first-name'),
        Employee_MiddleName: formData.get('middle-name'),
        Employee_LastName: formData.get('last-name'),
        Employee_DateOfHire: formData.get('date-of-hire'),
        Employee_ReportsTo: formData.get('reports-to').length > 0 ? formData.get('reports-to') : 'NULL'
    }

    const validation = await validateData(employee);
    if (!validation.pass) {
        return fail(400, {
            error: validation.error,
            employee
        });
    }

    let q = {
        fields: ['Employee_FirstName', 'Employee_MiddleName', 'Employee_lastName', 'Employee_DateOfHire', 'Employee_ReportsTo'],
        from: 'Employee',
        where: `Employee.Employee_Id = ${id}`,
        values: [employee.Employee_FirstName, employee.Employee_MiddleName, employee.Employee_LastName, employee.Employee_DateOfHire, employee.Employee_ReportsTo]
    };
    db.update(q);
}

async function validateData(employee) {
    let result = {
        pass: true,
        error: {}
    }

    if (!employee.Employee_FirstName) {
        result.pass = false;
        result.error['first-name'] = "Missing First Name\n";
    } else if (!hasNoNumbers(employee.Employee_FirstName)) {
        result.pass = false;
        result.error['first-name'] = "Invalid First Name\n";
    }

    if (employee.Employee_MiddleName && !hasNoNumbers(employee.Employee_MiddleName)) {
        result.pass = false;
        result.error['middle-name'] = "Invalid Middle Name\n";
    }

    if (!employee.Employee_LastName) {
        result.pass = false;
        result.error['last-name'] = "Missing Last Name\n";
    } else if (!hasNoNumbers(employee.Employee_LastName)) {
        result.pass = false;
        result.error['last-name'] = "Invalid Last Name\n";
    }

    if (!employee.Employee_DateOfHire) {
        result.pass = false;
        result.error['date-of-hire'] = "Missing Date of Hire";
    }

    if (employee.Employee_ReportsTo && employee.Employee_ReportsTo != 'NULL' && !(await employeeIDExists(employee.Employee_ReportsTo))) {
        result.pass = false;
        result.error['reports-to'] = "Invalid ID";
    }

    return result;
}

async function employeeIDExists(employeeID) {
    let q = {
        fields: ['Employee_ID'],
        alias: null,
        from: 'Employee',
        where: null,
        groupBy: null,
        having: null,
        orderBy: null
    }

    let values = (await db.get(q)).data;
    let ids = values.map(item => item.Employee_ID);
    if (ids.includes(parseInt(employeeID))) {
        return true;
    }
    else {
        return false;
    }
}