import * as db from "$lib/util/hr/db/mysql";
import { isValidDateTime } from "$lib/util/hr/utilsHR";
import { fail } from "@sveltejs/kit";

var id;

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

export async function load({ params }) {
    id = params.timesheetID;
    try {
        let q = {
            fields: ['*'],
            alias: null,
            from: 'Timesheet',
            where: `Timesheet_ID = ${id}`,
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

async function update(formData) {
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

    let q = {
        fields: ['Timesheet_TimeIn', 'Timesheet_TimeOut'],
        from: 'Timesheet',
        where: `Timesheet_Id = ${id}`,
        values: [log.Timesheet_TimeIn, log.Timesheet_TimeOut]
    };
    db.update(q);
}

async function validateData(log) {
    let result = {
        pass: true,
        error: {}
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