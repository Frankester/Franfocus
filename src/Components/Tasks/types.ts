import { Task } from "../../types"

export interface TaskItemProps extends Task {
    addTask: ( newTask: Task ) => void,
    removeTask: (removeTask:Task) => void
}

export interface TaskUpdateFormProps extends TaskItemProps {
    handleOpen: () => void,
}

export interface TasksTypesHook {
    addTask: (newTask: Task) => void,
    removeTask: (removeTask?: Task) => void,
    handleClearFinished: () => void,
    handleClearAct: () => void,
    tasks: Task[]
}

export interface TaskTypesHookProps {
    addTask: (newTask: Task) => void, 
    initialTaskValues?: Task,
    removeTask?: (removeTask:Task) =>void ,
    handleOpen: () => void,
}

export interface TaskFormContentProps extends TaskTypesHookProps { 
    type:'update'|'add', 
}

export interface ButtonsContentFormProps extends TaskFormContentProps{
    handleDelete: () => void,
    active: boolean,
    handleUpdate: () => void,
    handleSave: ()  => void
}

export type TaskActionReducer = {
    type: 'CHANGE_NAME' | 'CHANGE_POMOS' | 'CHANGE_TOTAL_POMOS' | 'CHANGE_NOTE' | 'RESET_TASK'
        | 'CHANGE_ACTIVE',
    payload: any
}

export type TaskStateReducer = {
    task: Task,
    active: boolean
}
export interface TaskTypesHook extends TaskStateReducer{
        openNote: boolean,
        handleChangeName: (e: any) => void,
        handleChangeNote: (note: string) => void,
        handleNote: (value?: boolean) => void,
        handleSave: () => void,
        handleChangeTotalPomos: (totalPomos:number) => void,
        handleChangePomos: (pomos: number) => void,
        handleUpdate: () => void,
        handleDelete: () => void
}

export interface TaskHeadingProps {
    handleClearFinished: () => void,
    handleClearAct: () => void,
    removeTask: (removeTask?:Task) => void,
}