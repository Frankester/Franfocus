import { useEffect, useState, useCallback, useReducer } from 'react'

import { TaskActionReducer, TaskStateReducer, TaskTypesHookProps, TaskTypesHook, TasksTypesHook } from './types'
import { useOpenClose } from '../../Hooks/useOpenClose'
import { Task } from '../../types'
import { useTasksContext } from '../../Context/TasksContext'

const TASKS_KEY = 'tasks'
type stateVals = [tasks: Task[], setTasks: React.Dispatch<React.SetStateAction<Task[]>>] 

function useLocalStorage(): stateVals{
    const [ tasks, setTasks] = useState<Task[]>([])
    
    useEffect(() => {
        const tasksString = localStorage.getItem(TASKS_KEY)
        if( tasksString && Array.isArray(JSON.parse(tasksString))){
            setTasks(JSON.parse(tasksString))
        }
    },[])

    useEffect(() => {
        localStorage.setItem(TASKS_KEY,JSON.stringify(tasks))
    }, [tasks])

    return [ tasks, setTasks ]
}



const reducer = (state: TaskStateReducer, action:TaskActionReducer) => {

    switch(action.type){
        case 'CHANGE_NAME': 

            const name: string = action.payload
            const active: boolean = name.length === 0 ? true : false
            return ({ task:{...state.task, name},active })

        case 'CHANGE_NOTE':

            const note: string = action.payload
            return ({ task:{...state.task, note},active: state.active })

        case 'CHANGE_POMOS':

            const pomos: number = action.payload
            return ({ task:{...state.task, pomos},active: state.active })

        case 'CHANGE_TOTAL_POMOS':

            const totalPomos: number = action.payload
            return ({ task:{...state.task, totalPomos},active: state.active })

        case 'RESET_TASK': 
            return({...action.payload})
        case 'CHANGE_ACTIVE': 
            return ({ task: state.task, active: action.payload })
        default: 
            return state
    }
}

function useTask({ addTask, removeTask, initialTaskValues, handleOpen }: TaskTypesHookProps ): TaskTypesHook{
    const initialTask: TaskStateReducer = {
        task:  initialTaskValues ? initialTaskValues
            :{
                id: new Date().getTime(),
                itsDone: false,
                name: '',
                pomos: 0,
                totalPomos: 1,
                note: ''
            },
        active: true
    }

    const [state, dispatch] = useReducer(reducer, initialTask)
    const [openClose, handleOpenClose] = useOpenClose()

    const handleChangeName = useCallback((e: any) => {
        dispatch({ type: 'CHANGE_NAME', payload: e.target.value})
    },[])
    const handleChangePomos = useCallback((pomos: number) => {
        dispatch({ type: 'CHANGE_POMOS', payload:pomos })
    },[])
    const handleChangeTotalPomos = useCallback((totalPomos:number) => {
        dispatch({ type: 'CHANGE_TOTAL_POMOS', payload:totalPomos })
    },[])
    const handleChangeNote = useCallback((note: string) => {
        dispatch({type: 'CHANGE_NOTE', payload: note})
    },[])

    const handleSave = useCallback(() => {
        addTask(state.task)
        dispatch({ type:'RESET_TASK', payload:initialTask }) // resetTask
        handleOpenClose(false)
    },[state])

    const handleUpdate = useCallback(()=>{
        handleSave()
        handleOpen()
    },[handleSave, handleOpen])

    const handleDelete = useCallback(() => {
        if(removeTask){
            removeTask(state.task)
        }
    },[removeTask, state])


    useEffect(() =>{

        if(initialTaskValues && initialTaskValues.name.length === 0){
           dispatch({ type: 'CHANGE_ACTIVE', payload: true})
        } else if(state.task.name.length === 0) {
            dispatch({ type: 'CHANGE_ACTIVE', payload: true})
        } else {
            dispatch({ type: 'CHANGE_ACTIVE', payload: false})
        }
           
    }, [state.task])


return {
        task: state.task,
        active: state.active,
        openNote: openClose,
        handleChangeName,
        handleChangeNote,
        handleNote: handleOpenClose,
        handleSave,
        handleChangeTotalPomos,
        handleChangePomos,
        handleUpdate,
        handleDelete
    }
}

function useTasks(): TasksTypesHook {
    const [ tasks, setTasks] = useLocalStorage()
    const { select } = useTasksContext()

    
    const sortArray = useCallback(( array: Task[] ): Task[] => {
        if(array.length !== 0){
            return [...array].sort((previous, current) => previous.id - current.id)
        }
        return array
    },[])

    const addTask = useCallback(( newTask: Task ) => {
        
        const currentTask = tasks.find(task => task.id === newTask.id )
        if(currentTask) {
            const withoutNewTask = tasks.filter(task => task.id !== newTask.id)
            setTasks( sortArray([...withoutNewTask, newTask]))
        } else {
            setTasks( currentTasks => sortArray([...currentTasks, newTask]))
        }
    },[tasks])

    const removeTask = useCallback(( removeTask?: Task) => {
        if(removeTask){
            const newTasks = tasks.filter(task => task.id !== removeTask.id)
            setTasks( sortArray(newTasks) )
        } else {
            setTasks([])
        }
    },[tasks])

    const handleClearFinished = useCallback(() => {
        setTasks((currentTasks: Task[]) => {
            const newTasks = currentTasks.filter(task => !task.itsDone)
            return newTasks
        })
    },[tasks])

    const handleClearAct = useCallback(() => {
        setTasks((currentTasks: Task[]) => {
            const newTasks = currentTasks.map(task => {
                return task.pomos !== 0 ?  {...task, pomos:0} : task
            })
            return newTasks
        })       
    },[tasks])

    
    useEffect(() => {
        if(select.id !== 0){
            addTask(select)
        }
    },[select])
    
    return {
        addTask,
        removeTask,
        handleClearFinished,
        handleClearAct,
        tasks,
    }
}

export {
    useLocalStorage, 
    useTask,
    useTasks
}