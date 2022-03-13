export interface Task{
    name: string,
    itsDone: boolean,
    pomos: number,
    totalPomos: number,
    id: number,
    note?: string
}

export type TaskContextType = {
    select: Task, 
    handleSelect: (taskSelected: Task) => void,    
}

export interface stateSettingsTypes {
    pomoSession: number,
    shortBreak: number,
    longBreak: number,
    longBreakInterval: number   
}

export type SettingsContextType = {
    settings: stateSettingsTypes,
    handleSettings: (newSettings: stateSettingsTypes) => void
}