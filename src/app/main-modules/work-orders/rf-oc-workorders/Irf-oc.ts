
export interface IWoValues {
    id: number;
    label: string,
    value: string
}

export interface IWo_Sector_grid {
    "grouplist": string,
    "status": string,
    "taskcompletion": string,
    "taskcategory": string,
    "name": string,
    "duedate": string,
    "priority": string,
    "assignedtoname": string,
    "assignedby": string,
    "lastmodified": string,
    "progressby": string,
    "progressbar": number,
    "taskid": string
}

export interface ISector_Grid {
    "grouplist": string,
    "status": string,
    "taskcompletion": string,
    "taskcategory": string,
    "name": string,
    "duedate": string,
    "priority": string,
    "assignedtoname": string,
    "assignedby": string,
    "lastmodified": string,
    "progressby": string,
    "progressbar": number,
    "taskid": string
}

export interface IExec_Task {
    "date": string,
    "reasonForReassign": string,
    "remarks": string
}

export interface IExec_Site {
    "siteParameter": string,
    "currentValue": string
}

export interface IExec_Impl {
    "sector": string,
    "band": string,
    "newAzimuthValue": string
}
export interface IExec_Impl_Ian {
    "sector": string,
    "band": string,
    "newAzimuthValue": string
}

export interface IExec_Task_Closure_Remark {
    "value": string,
    "name": string
}

export interface ILabelValue {
    "label": string,
    "value": string
}