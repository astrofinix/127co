import * as db from "$lib/util/hr/db/mysql";
import { isNumber, hasNoNumbers, isValidDateTime } from "$lib/util/utilsHR";
import { bloodTypeOptions } from '$lib/util/hr/selectOptions.js';
import { fail } from "@sveltejs/kit";

var id;

export async function load({ params }) {
    id = params.healthExamID;
    try {
        let q = {
            fields: ['*'],
            alias: null,
            from: 'Health_Exam',
            where: `HE_ID = ${id}`,
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
    let exam = {
        Employee_ID: formData.get('employee-id'),
        HE_Date: formData.get('date-time'),
        HE_Height: formData.get('height'),
        HE_Weight: formData.get('weight'),
        HE_BloodType: formData.get('blood-type'),
        HE_EyeColor: formData.get('eye-color'),
        HE_DoctorName: formData.get('doctor-name'),
        HE_Assessment: formData.get('assessment')
    }

    const validation = await validateData(exam);
    if (!validation.pass) {
        return fail(400, {
            error: validation.error,
            exam
        });
    }

    let q = {
        fields: ['HE_Date', 'HE_Height', 'HE_Weight', 'HE_BloodType', 'HE_EyeColor', 'HE_DoctorName', 'HE_Assessment'],
        from: 'Health_Exam',
        where: `HE_ID = ${id}`,
        values: [exam.HE_Date, exam.HE_Height, exam.HE_Weight, exam.HE_BloodType, exam.HE_EyeColor, exam.HE_DoctorName, exam.HE_Assessment]
    };
    db.update(q);
}

async function validateData(exam) {
    let result = {
        pass: true,
        error: {}
    }

    if (!exam.HE_Date) {
        result.pass = false;
        result.error['date-time'] = "Missing date and/or time";
    } else if (!isValidDateTime(exam.HE_Date)) {
        result.pass = false;
        result.error['date-time'] = "Not a valid date and/or time";
    }

    if (!exam.HE_Height) {
        result.pass = false;
        result.error['height'] = "Missing height";
    } else if (!isNumber(exam.HE_Height)) {
        result.pass = false;
        result.error['height'] = "Invalid height";
    }

    if (!exam.HE_Weight) {
        result.pass = false;
        result.error['weight'] = "Missing weight";
    } else if (!isNumber(exam.HE_Weight)) {
        result.pass = false;
        result.error['weight'] = "Invalid weight";
    }

    if (!exam.HE_BloodType) {
        result.pass = false;
        result.error['blood-type'] = "Missing Blood Type";
    } else if (!bloodTypeOptions.includes(exam.HE_BloodType)) {
        result.pass = false;
        result.error['blood-type'] = "Invalid Input";
    }

    if (!exam.HE_DoctorName) {
        result.pass = false;
        result.error['doctor-name'] = "Missing doctor name";
    } else if (!hasNoNumbers(exam.HE_DoctorName)) {
        result.pass = false;
        result.error['doctor-name'] = "Invalid name";
    }

    if (!exam.HE_Assessment) {
        result.pass = false;
        result.error['assessment'] = "Missing assessment";
    }

    return result;
}