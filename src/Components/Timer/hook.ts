import { useReducer, useEffect, useCallback } from 'react'

import { Mode } from '../../constants'
import { useSettingsContext } from '../../Context/SettingsContext'
import { useTasksContext } from '../../Context/TasksContext'
import { ActionTimer, StateType } from './types'

import alarmSound from '../../assets/alarm-digital.mp3'

const reducer =  (state: StateType, action: ActionTimer) => {
    switch(action.type){
        case 'SET_TIME_ACTION': 
                return {...state, 
                    minutes: action.payload.minutes, 
                    seconds: action.payload.seconds
                }
        case 'RESET_TIME_ACTION': 
            return {...state, 
                    minutes: action.payload.minutes, 
                    seconds: 0, 
                    mode: action.payload.mode
                }

        case 'CHANGE_PLAY_ACTION': return {...state, isPlay: !state.isPlay}
        case 'SET_ID_ACTION': return {...state, id: action.payload}
        case 'TOGGLE_FINISH_COUNT': return {...state, isFinish: !state.isFinish }

        case 'INC_POMOS' : return {...state, countPomos: state.countPomos +1 }
        case 'RESET_POMOS' : return {...state, countPomos: 0}

        default: return state
    }
}


function useTimer(){
    const { settings } = useSettingsContext()
    const [state, dispatch] = useReducer(reducer, 
        {
            minutes:settings.pomoSession, 
            seconds: 0, 
            isPlay: false, 
            id: undefined, 
            mode: Mode.pomoSession ,
            countPomos: 0, 
            isFinish: false
        }
)
    const {minutes, seconds, isPlay, id, mode, countPomos, isFinish}: StateType = state
    const { select, handleSelect } = useTasksContext() 
    

    useEffect(() => {
        if(!isPlay){
            if(mode === Mode.pomoSession && minutes !== settings.pomoSession){
                dispatch({
                    type:'SET_TIME_ACTION', 
                    payload: {minutes: settings.pomoSession, seconds: 0}
                })
            } else if( mode === Mode.shortBreak && minutes !== settings.shortBreak){
                dispatch({
                    type:'SET_TIME_ACTION', 
                    payload: {minutes: settings.shortBreak, seconds: 0}
                })
            } else if(mode === Mode.longBreak && minutes !== settings.longBreak){
                dispatch({
                    type:'SET_TIME_ACTION', 
                    payload: {minutes: settings.longBreak, seconds: 0}
                })
            }
        }
    }, [settings])


    useEffect(() => {
        return() => clearInterval(id)
    },[])

    useEffect(() => {
        if(isFinish === true){
            dispatch({type: 'TOGGLE_FINISH_COUNT'})
            
            const audio = new Audio(alarmSound)

            audio.play()

            if(mode === Mode.pomoSession && 
                (countPomos+1) % settings.longBreakInterval !== 0){
                
                dispatch({type:'INC_POMOS'})

                if(select.id !== 0){
                   handleSelect({...select, pomos: select.pomos+1})
                }

                dispatch({ type: 'RESET_TIME_ACTION', 
                     payload: {minutes: settings.shortBreak, mode:Mode.shortBreak } })

            } else if (mode === Mode.pomoSession && 
                (countPomos+1) % settings.longBreakInterval === 0){
                
                dispatch({type:'INC_POMOS'})

                 if(select.id !== 0){
                    handleSelect({...select, pomos: select.pomos+1})
                 }

                 dispatch({ type: 'RESET_TIME_ACTION', 
                     payload: {minutes: settings.longBreak, mode:Mode.longBreak } })

            } else if ( mode === Mode.shortBreak || mode === Mode.longBreak  ){
                
                dispatch({ type: 'RESET_TIME_ACTION', 
                 payload: {minutes:settings.pomoSession, mode:Mode.pomoSession } })
            }
        }
    }, [isFinish])

    const handleStart = useCallback(() => {
        const timer = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
            0,
            minutes,
            seconds
         )

         dispatch({type: 'CHANGE_PLAY_ACTION'})

         const idInterval = setInterval(
            () => {
               const counter = timer.getTime()
               timer.setTime(counter - 1000)
               const min = timer.getMinutes()
               const sec = timer.getSeconds()

               dispatch({
                   type: 'SET_TIME_ACTION', 
                   payload:{minutes: min, seconds: sec}
                })

               if(timer.getMinutes() === 0 && timer.getSeconds() === 0){
                   clearInterval(idInterval)
                   dispatch({type: 'CHANGE_PLAY_ACTION'})
                   dispatch({ type: 'TOGGLE_FINISH_COUNT' })
               }
            },
            1000
        )
        dispatch({ type: 'SET_ID_ACTION', payload: idInterval })

    }, [countPomos, mode, minutes])

    const handleStop = useCallback(() => {
        clearInterval(id)
        dispatch({type: 'CHANGE_PLAY_ACTION'})
    },[id])

    

    const handleResetPomodoro = useCallback(() => {
        if(!isPlay){
            dispatch({
                type:'RESET_TIME_ACTION',
                payload: { minutes: settings.pomoSession , mode: Mode.pomoSession }
            })
        }
    }, [isPlay,settings])

    const handleResetShortBreak = useCallback(() => {
        if(!isPlay){
            dispatch({
                type:'RESET_TIME_ACTION',
                payload: { minutes: settings.shortBreak , mode: Mode.shortBreak }
            })
        }
    }, [isPlay,settings])

    const handleResetLongBreak = useCallback(() => {
        if(!isPlay){
            dispatch({
                type:'RESET_TIME_ACTION',
                payload: { minutes: settings.longBreak , mode: Mode.longBreak }
            })
        }
    }, [isPlay,settings])
    

    return { 
            handles: { 
                handleStart, 
                handleStop, 
                handleResetPomodoro, 
                handleResetShortBreak, 
                handleResetLongBreak,
            }, 
            values: { minutes, seconds, mode, isPlay, countPomos }
        }
}

export { useTimer }