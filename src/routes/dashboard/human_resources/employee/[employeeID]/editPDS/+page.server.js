import * as db from "$lib/util/hr/db/mysql";
import { fail } from "@sveltejs/kit";
import { hasNoNumbers, isValidPhoneNumber, isValidDate, isValidYear } from "$lib/util/utilsHR";
import { sexOptions, civilStatusOptions, highestLevelOfEducationOptions } from '$lib/util/hr/selectOptions.js';

var id;

export async function load({ params }) {
    id = params.employeeID;
    try {
        let q = {
            fields: ['*'],
            alias: null,
            from: 'pds',
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
    let pds = {
        Employee_Address: formData.get('address'),
        Employee_ContactNumber: formData.get('contact-number'),
        Employee_DateOfBirth: formData.get('date-of-birth'),
        Employee_PlaceOfBirth: formData.get('place-of-birth'),
        Employee_Sex: formData.get('sex') ?? '',
        Employee_CivilStatus: formData.get('civil-status') ?? '',
        Employee_Citizenship: formData.get('citizenship'),
        Employee_HighestLevelOfEducation: formData.get('highest-level-of-education') ?? '',
        Employee_School: formData.get('school'),
        Employee_YearGraduated: formData.get('year-graduated'),
        Employee_PhilHealthID: formData.get('philhealth-id'),
        Employee_SSSID: formData.get('sss-id'),
        Employee_PagIBIGID: formData.get('pagibig-id'),
        Emergency_ContactName: formData.get('emergency-contact-name'),
        Emergency_ContactRelationship: formData.get('emergency-contact-relationship'),
        Emergency_ContactNumber: formData.get('emergency-contact-number')
    }

    const validation = await validateData(pds);
    if (!validation.pass) {
        return fail(400, {
            error: validation.error,
            pds
        });
    }

    let q = {
        fields: ['Employee_Address', 'Employee_ContactNumber', 'Employee_DateOfBirth', 'Employee_PlaceOfBirth', 'Employee_Sex', 'Employee_CivilStatus', 'Employee_Citizenship', 'Employee_HighestLevelOfEducation', 'Employee_School', 'Employee_YearGraduated', 'Employee_PhilHealthID', 'Employee_SSSID', 'Employee_PagIBIGID', 'Emergency_ContactName', 'Emergency_ContactRelationship', 'Emergency_ContactNumber'],
        from: 'PDS',
        where: `Employee_Id = ${id}`,
        values: [pds.Employee_Address, pds.Employee_ContactNumber, pds.Employee_DateOfBirth, pds.Employee_PlaceOfBirth, pds.Employee_Sex, pds.Employee_CivilStatus, pds.Employee_Citizenship, pds.Employee_HighestLevelOfEducation, pds.Employee_School, pds.Employee_YearGraduated, pds.Employee_PhilHealthID, pds.Employee_SSSID, pds.Employee_PagIBIGID, pds.Emergency_ContactName, pds.Emergency_ContactRelationship, pds.Emergency_ContactNumber]
    };
    db.update(q);
}

async function validateData(pds) {
    let result = {
        pass: true,
        error: {}
    }

    if (pds.Employee_ContactNumber && !isValidPhoneNumber(pds.Employee_ContactNumber)) {
        result.pass = false;
        result.error['contact-number'] = "Invalid Phone Number Format";
    }

    if (pds.Employee_DateOfBirth && !isValidDate(pds.Employee_DateOfBirth)) {
        result.pass = false;
        result.error['date-of-hire'] = "Invalid Date";
    }

    if (pds.Employee_YearGraduated && !isValidYear(pds.Employee_YearGraduated)) {
        result.pass = false;
        result.error['year-graduated'] = "Invalid Year";
    }

    if (pds.Emergency_ContactName && !hasNoNumbers(pds.Emergency_ContactName)) {
        result.pass = false;
        result.error['emergency-contact-name'] = "Invalid Name";
    }

    if (pds.Emergency_ContactNumber && !isValidPhoneNumber(pds.Emergency_ContactNumber)) {
        result.pass = false;
        result.error['emergency-contact-number'] = "Invalid Phone Number";
    }

    if (pds.Employee_Sex && !sexOptions.includes(pds.Employee_Sex)) {
        result.pass = false;
        result.error['sex'] = "Invalid Input";
    }

    if (pds.Employee_CivilStatus && !civilStatusOptions.includes(pds.Employee_CivilStatus)) {
        result.pass = false;
        result.error['civil-status'] = "Invalid Input";
    }

    if (pds.Employee_HighestLevelOfEducation && !highestLevelOfEducationOptions.includes(pds.Employee_HighestLevelOfEducation)) {
        result.pass = false;
        result.error['highest-level-of-education'] = "Invalid Input";
    }

    return result;
}