import * as db from "$lib/util/hr/db/mysql";
import { genRD } from "$lib/util/hr/utilsHR";
import { departmentOptions, statusOptions } from '$lib/util/hr/selectOptions.js';
import { fail } from "@sveltejs/kit";

export const actions = {
    insert: async ({ request }) => {
        try {
            const formData = await request.formData();

            let job = {
                Employee_ID: formData.get('employee-id') ?? '',
                Job_Position: formData.get('job-position') ?? '',
                Job_Department: formData.get('department') ?? '',
                Employee_Status: formData.get('status') ?? '',
                Employee_Shift: formData.get('shift') ?? '',
                Job_AcquisitionDate: formData.get('acquisition-date') ?? ''
            }

            const validation = await validateData(job);
            if (!validation.pass) {
                return fail(400, {
                    error: validation.error,
                    job
                });
            }

            const id = await generateJobID();

            var table = 'Job';
            var fields = ['Job_ID', 'Employee_ID', 'Job_Position', 'Job_Department', 'Employee_Status', 'Employee_Shift', 'Job_AcquisitionDate'];
            var values = [id, job.Employee_ID, job.Job_Position, job.Job_Department, job.Employee_Status, job.Employee_Shift, job.Job_AcquisitionDate]

            db.add({ table, fields, values });

            return {
                success: "Success IDK haha"
            };

        } catch (e) {
            console.error("Error occured", e.message);
        }
    }
}

async function generateJobID() {
    const idLength = 8
    let id = genRD(idLength);

    let q = {
        fields: ['Job_ID'],
        alias: null,
        from: 'Job',
        where: null,
        groupBy: null,
        having: null,
        orderBy: null
    }

    let values = (await db.get(q)).data;
    let ids = values.map(item => item.Job_ID);

    const lowest = 10 ** (idLength - 1)
    const highestAdded = 9 * (10 ** (idLength - 1))

    while (ids.includes(id)) {
        id = lowest + (id + 1) % highestAdded
    }

    return id;
}

async function validateData(job) {
    let result = {
        pass: true,
        error: {}
    }

    if (!(await employeeIDExists(job.Employee_ID))) {
        job.Employee_ID = "";
        result.pass = false;
        result.error['employee-id'] = "Invalid Employee ID\n";
    }

    if (!job.Job_Position) {
        result.pass = false;
        result.error['job-position'] = "Missing Job Position\n";
    }

    if (!job.Job_Department) {
        result.pass = false;
        result.error['job-department'] = "Missing Job Department";
    } else if (!departmentOptions.includes(job.Job_Department)) {
        result.pass = false;
        result.error['job-department'] = "Invalid Input";
    }

    if (!job.Employee_Status) {
        result.pass = false;
        result.error['employee-status'] = "Missing Employee Status";
    } else if (!statusOptions.includes(job.Employee_Status)) {
        result.pass = false;
        result.error['employee-status'] = "Invalid Input";
    }

    if (!job.Employee_Shift) {
        result.pass = false;
        result.error['employee-shift'] = "Missing Employee Shift\n";
    } else if (!(await shiftIDExists(job.Employee_Shift))) {
        job.Employee_Shift = "";
        result.pass = false;
        result.error['employee-shift'] = "Invalid Employee Shift\n";
    }

    if (!job.Job_AcquisitionDate) {
        result.pass = false;
        result.error['job-acquisition-date'] = "Missing Job Acquisition Date\n";
    }

    return result
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

async function shiftIDExists(shiftID) {
    let q = {
        fields: ['Shift_ID'],
        alias: null,
        from: 'Shift',
        where: null,
        groupBy: null,
        having: null,
        orderBy: null
    }

    let values = (await db.get(q)).data;
    let ids = values.map(item => item.Shift_ID);
    if (ids.includes(shiftID)) {
        return true;
    }
    else {
        return false;
    }
}