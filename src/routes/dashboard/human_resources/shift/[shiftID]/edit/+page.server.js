import * as db from "$lib/util/hr/db/mysql";
import { fail } from "@sveltejs/kit";
import { isValidTime } from "$lib/util/hr/utilsHR";

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
    id = params.shiftID;
    try {
        let q = {
            fields: ['*'],
            alias: null,
            from: 'Shift',
            where: `Shift_ID = '${id}'`,
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
    let shift = {
        Shift_StartTime: formData.get('start'),
        Shift_EndTime: formData.get('end')
    }

    const validation = await validateData(shift);
    if (!validation.pass) {
        return fail(400, {
            error: validation.error,
            shift
        });
    }

    let q = {
        fields: ['Shift_StartTime', 'Shift_EndTime'],
        from: 'Shift',
        where: `Shift_ID = '${id}'`,
        values: [shift.Shift_StartTime, shift.Shift_EndTime]
    };
    db.update(q);
}

async function validateData(shift) {
    let result = {
        pass: true,
        error: {}
    }

    if (!shift.Shift_StartTime) {
        result.pass = false;
        result.error['start'] = "Missing Start Time";
    } else if (!isValidTime(shift.Shift_StartTime)) {
        result.pass = false;
        result.error['start'] = "Invalid Time";
    }

    if (!shift.Shift_EndTime) {
        result.pass = false;
        result.error['end'] = "end";
    } else if (!isValidTime(shift.Shift_EndTime)) {
        result.pass = false;
        result.error['end'] = "Invalid Time";
    }

    return result;
}