
export interface actionSettingsTypes{
    type: 'UPDATE_POMO_SESSION' | 'UPDATE_SHORT_BREAK' | 'UPDATE_LONG_BREAK' 
            | 'UPDATE_LONG_BREAK_INTERVAL' | 'UPDATE_ALL',
    payload: any
}

export type settingsNumberInputProps = {
     width?:string, 
     title?:string, 
     value?: number, 
     update?: React.Dispatch<actionSettingsTypes>,
     type?:'UPDATE_POMO_SESSION' | 'UPDATE_SHORT_BREAK' | 'UPDATE_LONG_BREAK' 
     | 'UPDATE_LONG_BREAK_INTERVAL',
}

export type SettingsModalTypes = { 
    onClose: () => void
}