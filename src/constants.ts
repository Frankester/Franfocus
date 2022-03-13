//default settings
const POMO_SESSION_MIN: number = 30
const SHORT_BREAK_MIN: number = 15
const LONG_BREAK_MIN: number = 20
const LONG_BREAK_INTERVAL: number = 4

enum Mode {
    pomoSession = 'Pomodoro', 
    shortBreak = 'Short Break',
    longBreak = 'Long Break'
}


export {
    POMO_SESSION_MIN,
    SHORT_BREAK_MIN,
    LONG_BREAK_MIN,
    Mode,
    LONG_BREAK_INTERVAL,
}