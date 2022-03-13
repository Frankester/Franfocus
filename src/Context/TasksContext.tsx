import { createContext, useContext, useState } from 'react'

import { Task, TaskContextType } from '../types'

const defaultTask: Task = {
    name: '', id: 0, itsDone: false, pomos: 0, totalPomos: 0, note: '' 
}
const defaultValueContext: TaskContextType = {
    select: defaultTask,
    handleSelect: ( taskSelected: Task ) => {},
}

const TasksContext = createContext<TaskContextType>(defaultValueContext)

function TasksProvider({ children }: { children: JSX.Element}){
    const [select, setSelect] = useState<Task>(defaultTask)

    const handleChange = ( taskSelected: Task ) => {
        setSelect(taskSelected)
    }
    

    return(
        <TasksContext.Provider value={{select, handleSelect: handleChange}}>
            {children}
        </TasksContext.Provider>
    )
}

export default TasksProvider

function useTasksContext(): TaskContextType {
    const {select, handleSelect} = useContext(TasksContext)

    return {select, handleSelect}
}

export {
    useTasksContext
}

