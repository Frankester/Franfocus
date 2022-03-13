import { useState } from 'react'

export function useOpenClose(): [openClose: boolean, handleOpenClose: (value?: boolean) => void]{
    const [openClose, setOpenClose] = useState<boolean>(false)

    const handleOpenClose = (value?: boolean) => {
        if(value !== undefined){
            setOpenClose(value)    
        } else {
            setOpenClose(currenState => !currenState)
        }
    }

    return [openClose, handleOpenClose]

}