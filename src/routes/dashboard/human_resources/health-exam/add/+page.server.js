import * as db from "$lib/util/hr/db/mysql";
import { genRD, isNumber, hasNoNumbers, isValidDateTime } from "$lib/util/utilsHR";
import { bloodTypeOptions } from '$lib/util/hr/selectOptions.js';
import { fail } from "@sveltejs/kit";

export const actions = {
    insert: async ({ request }) => {
        try {
            const formData = await request.formData();

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

            const id = await generateID();

            addHealthExam(exam, id);

            return {
                success: "Success IDK haha"
            };

        } catch (e) {
            console.error("Error occured", e.message);
        }
    }
}

async function validateData(exam) {
    let result = {
        pass: true,
        error: {}
    }

    if (!exam.Employee_ID) {
        result.pass = false;
        result.error['employee-id'] = "Missing Employee ID";
    } else if (!(await employeeIdExists(parseInt(exam.Employee_ID)))) {
        result.pass = false;
        result.error['employee-id'] = "Invalid Employee ID";
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

async function generateID() {
    const idLength = 8;
    let id = genRD(idLength);

    let q = {
        fields: ['HE_ID'],
        alias: null,
        from: 'HealthExam',
        where: null,
        groupBy: null,
        having: null,
        orderBy: null
    }

    let values = (await db.get(q)).data;
    let ids = values.map(item => item.HE_ID);

    const lowest = 10 ** (idLength - 1)
    const highestAdded = 9 * (10 ** (idLength - 1))

    while (ids.includes(id)) {
        id = lowest + (id + 1) % highestAdded
    }

    return id;
}

function addHealthExam(exam, id) {
    var table = 'Health_Exam';
    var fields = ['HE_ID', 'Employee_ID', 'HE_Date', 'HE_Height', 'HE_Weight', 'HE_BloodType', 'HE_EyeColor', 'HE_DoctorName', 'HE_Assessment'];
    var values = [id, exam.Employee_ID, exam.HE_Date, exam.HE_Height, exam.HE_Weight, exam.HE_BloodType, exam.HE_EyeColor, exam.HE_DoctorName, exam.HE_Assessment];

    db.add({ table, fields, values });
}