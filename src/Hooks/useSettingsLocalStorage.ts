import { useEffect, useReducer } from 'react'


import { actionSettingsTypes } from '../Components/Settings/types'
import { LONG_BREAK_INTERVAL, LONG_BREAK_MIN, POMO_SESSION_MIN, SHORT_BREAK_MIN } from '../constants'
import { stateSettingsTypes } from '../types'

const SETTINGS_KEY = 'settings_user'

const reducer = (state: stateSettingsTypes, action: actionSettingsTypes) => {
    switch(action.type){
        case 'UPDATE_ALL': 
            return action.payload
        case 'UPDATE_POMO_SESSION': 
            return {...state, pomoSession: action.payload}
        case 'UPDATE_SHORT_BREAK': 
            return {...state, shortBreak: action.payload}
        case 'UPDATE_LONG_BREAK': 
            return {...state, longBreak: action.payload}
        case 'UPDATE_LONG_BREAK_INTERVAL': 
            return {...state, longBreakInterval: action.payload}

        default: return state
    }
}

type useSettingsLocalStoragePorps = {
    type: 'context' | 'settings'
}

type useSettingsLocalStorageVals = [
    state: stateSettingsTypes, 
    dispatch: React.Dispatch<actionSettingsTypes>]

function useSettingsLocalStorage({ type }:useSettingsLocalStoragePorps ): useSettingsLocalStorageVals{
    const initialValues: stateSettingsTypes = {
        pomoSession: POMO_SESSION_MIN,
        shortBreak: SHORT_BREAK_MIN,
        longBreak: LONG_BREAK_MIN,
        longBreakInterval: LONG_BREAK_INTERVAL
    }
    const [state, dispatch] = useReducer(reducer, initialValues)
    
    useEffect(() => {
        const settingsString = localStorage.getItem(SETTINGS_KEY)
        if( settingsString ){
            dispatch({type: 'UPDATE_ALL', payload:JSON.parse(settingsString) })
        }
    },[])

    useEffect(() => {
        if(type === 'settings'){
            localStorage.setItem(SETTINGS_KEY,JSON.stringify(state))
        }
    }, [state])

    return [state, dispatch]
    
}

export default useSettingsLocalStorage