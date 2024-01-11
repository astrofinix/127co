import * as db from "$lib/util/hr/db/mysql";
import { genRD, isValidDateTime } from "$lib/util/utilsHR";
import { fail } from "@sveltejs/kit";

export const actions = {
    insert: async ({ request }) => {
        try {
            const formData = await request.formData();

            let log = {
                Employee_ID: formData.get('employee-id'),
                Timesheet_TimeIn: formData.get('time-in'),
                Timesheet_TimeOut: formData.get('time-out')
            }

            const validation = await validateData(log);
            if (!validation.pass) {
                return fail(400, {
                    error: validation.error,
                    log
                });
            }

            const id = await generateID();

            addTimesheet(log, id);

            return {
                success: "Success IDK haha"
            };
        } catch (e) {
            console.error("Error occured", e.message);
        }
    }
}

async function generateID() {
    const idLength = 6;
    let id = genRD(idLength);

    let q = {
        fields: ['Timesheet_ID'],
        alias: null,
        from: 'Timesheet',
        where: null,
        groupBy: null,
        having: null,
        orderBy: null
    }

    let values = (await db.get(q)).data;
    let ids = values.map(item => item.Timesheet_ID);

    const lowest = 10 ** (idLength - 1)
    const highestAdded = 9 * (10 ** (idLength - 1))

    while (ids.includes(id)) {
        id = lowest + (id + 1) % highestAdded
    }

    return id;
}

async function validateData(log) {
    let result = {
        pass: true,
        error: {}
    }

    if (!log.Employee_ID) {
        result.pass = false;
        result.error['employee-id'] = "Missing Employee ID";
    } else if (!(await employeeIdExists(parseInt(log.Employee_ID)))) {
        result.pass = false;
        result.error['employee-id'] = "Invalid Employee ID";
    }

    if (!log.Timesheet_TimeIn) {
        result.pass = false;
        result.error['time-in'] = "Missing Time In";
    } else if (!isValidDateTime(log.Timesheet_TimeIn)) {
        result.pass = false;
        result.error['time-in'] = "Not a valid time";
    }

    if (log.Timesheet_TimeOut && !isValidDateTime(log.Timesheet_TimeOut)) {
        result.pass = false;
        result.error['time-out'] = "Not a valid time";
    }

    return result;
}

async function employeeIdExists(id) {
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
    if (ids.includes(id)) {
        return true;
    }
    else {
        return false;
    }
}

function addTimesheet(log, id) {
    var table = 'Timesheet';
    var fields = ['Timesheet_ID', 'Employee_ID', 'Timesheet_TimeIn', 'Timesheet_TimeOut'];
    var values = [id, log.Employee_ID, log.Timesheet_TimeIn, log.Timesheet_TimeOut];

    db.add({ table, fields, values });
}