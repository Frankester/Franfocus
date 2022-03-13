import { Mode } from "../../constants"

 export interface ActionTimer {
    type: 'SET_TIME_ACTION' | 'CHANGE_PLAY_ACTION' | 'SET_ID_ACTION' | 
         'INC_POMOS' | 'RESET_POMOS' | 'RESET_TIME_ACTION' | 'TOGGLE_FINISH_COUNT' ,
    payload?: any
}

export interface StateType {
    minutes: number, 
    seconds: number,
    isPlay: boolean,
    id: number,
    mode: Mode,
    countPomos: number,
    isFinish: boolean
}

export interface HeadingTimerProps {
    mode: Mode,
    handleResetPomodoro: () => void,
    handleResetLongBreak: () => void,
    handleResetShortBreak: () => void,
}

export interface ButtonTimerProps {
    isPlay: boolean,
    handleStart: () => void,
    handleStop: () => void
}
