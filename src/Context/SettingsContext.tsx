import { createContext, useContext } from "react";

import useSettingsLocalStorage from "../Hooks/useSettingsLocalStorage";
import { SettingsContextType, stateSettingsTypes } from "../types";



const defaultSettingsContext: SettingsContextType = {
    settings: {longBreak:0, shortBreak: 0, pomoSession: 0, longBreakInterval: 0},
    handleSettings: (newSettings: stateSettingsTypes) => {}
}

const SettingsContext = createContext<SettingsContextType>(defaultSettingsContext)

function SettingsProvider({ children }: { children: JSX.Element }){
    
    const [settings, setSettings] = useSettingsLocalStorage({ type: 'context' })

    const handleSettings = (newSettings: stateSettingsTypes) => {
        setSettings({ type: 'UPDATE_ALL', payload: newSettings })
    }

    


    return(
        <SettingsContext.Provider value={{ settings, handleSettings }}>
            { children }
        </SettingsContext.Provider>
    )
}

export default SettingsProvider

function useSettingsContext(){
    const settings = useContext(SettingsContext)
    return settings
}

export {
    useSettingsContext
}