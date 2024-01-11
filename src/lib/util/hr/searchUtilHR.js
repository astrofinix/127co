export const searchKeywordsEmployee = (employee, eMap) => {
    let emap = eMap[employee.Employee_ReportsTo];
    return (
        `${employee.Employee_ID} 
        ${employee.Employee_FirstName} 
        ${employee.Employee_MiddleName? employee.Employee_MiddleName:''} 
        ${employee.Employee_LastName} 
        ${employee.Employee_FirstName} 
        ${employee.Employee_LastName} 
        ${employee.Employee_ReportsTo !== null? emap.Employee_FirstName+' '+emap.Employee_LastName:'N/A'}
        ${employee.Job_Position}
        `.replaceAll('\n','').replace(/\s+/g, ' ').trim()
    );
}

export const searchKeywordsJob = (job) => {
    return (
        `${job.Job_ID}
        ${job.Employee_ID}
        ${job.Job_Position}
        ${job.Job_Department}
        ${job.Employee_Status}
        ${job.Employee_Status.replace('-',' ')}
        ${job.Employee_Shift}
        `.replaceAll('\n','').replace(/\s+/g, ' ').trim()
    )
}

export const searchKeywordsHE = (HE) => {
    return `
        ${HE.HE_ID}
        ${HE.HE_Height}
        ${HE.HE_Weight}
        ${HE.HE_BloodType}
        ${HE.HE_EyeColor}
        ${HE.HE_DoctorName}
        ${HE.Employee_ID}
        ${HE.HE_Assessment}
    `.replaceAll('\n','').replace(/\s+/g, ' ').trim();
}

export const searchKeywordsTS = (TS) => {
    return `
        ${TS.Employee_FirstName}
        ${TS.Employee_MiddleName? TS.Employee_MiddleName:''}
        ${TS.Employee_LastName}
        ${TS.Timesheet_ID}
        ${TS.Employee_ID}
    `.replaceAll('\n','').replace(/\s+/g,' ').trim();
}