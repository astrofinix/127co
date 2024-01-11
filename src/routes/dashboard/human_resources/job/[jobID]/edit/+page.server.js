import * as db from "$lib/util/hr/db/mysql";
import { departmentOptions, statusOptions } from '$lib/util/hr/selectOptions.js';
import { fail } from "@sveltejs/kit";

var id;

export const actions = {
    edit: () => { },
    update: async ({ request }) => {
        const formData = await request.formData();
        try {
            return await update(formData);
        } catch (e) {
            console.error("Error occured", e.message);
        }
    }
}

export async function load({ params }) {
    id = params.jobID;
    try {
        let q = {
            fields: ['*'],
            alias: null,
            from: 'job',
            where: `job_id = ${id}`,
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
    let job = {
        Employee_ID: formData.get('employee-id'),
        Job_Position: formData.get('job-position'),
        Job_Department: formData.get('department'),
        Employee_Status: formData.get('status'),
        Employee_Shift: formData.get('shift'),
        Job_AcquisitionDate: formData.get('acquisition-date')
    }

    const validation = await validateData(job);
    if (!validation.pass) {
        return fail(400, {
            error: validation.error,
            job
        });
    }

    editJob(job);
}

async function validateData(job) {
    let result = {
        pass: true,
        error: {}
    }

    if (!job.Job_Position) {
        result.pass = false;
        result.error['job-position'] = "Missing Job Position";
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
        result.error['employee-shift'] = "Invalid Employee Shift";
    }

    if (!job.Job_AcquisitionDate) {
        result.pass = false;
        result.error['job-acquisition-date'] = "Missing Job Acquisition Date";
    }

    return result;
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

function editJob(job) {
    let q = {
        fields: ['Job_AcquisitionDate', 'Job_Position', 'Job_Department', 'Employee_Status', 'Employee_Shift'],
        from: 'Job',
        where: `Job.Job_Id = ${id}`,
        values: [job.Job_AcquisitionDate, job.Job_Position, job.Job_Department, job.Employee_Status, job.Employee_Shift]
    };
    db.update(q);
}