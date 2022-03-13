import { Button } from "@chakra-ui/react"
import { IconCirclePlus } from "@tabler/icons"
import { memo } from 'react'


import TaskFormContent from "./TaskFormContent"
import { useOpenClose } from "../../Hooks/useOpenClose"
import { Task } from "../../types"


function TaskForm( { addTask }: {addTask: (newTask: Task) => void } ){
    const [openClose, handleOpen] = useOpenClose()

    return(
        <>

        {
            openClose ?
                <TaskFormContent 
                    type="add"
                    handleOpen={handleOpen}
                    addTask={addTask}
                />
            : 
            <ButtonAddTask  handleOpen={handleOpen} />
        }
  
        </>
    )
}


function ButtonAddTask({ handleOpen }: { handleOpen: (value?:boolean) => void}){

    return (
        <Button 
            variant='dashed' 
            leftIcon={<IconCirclePlus/>}
            color='#eecccb'
            _hover={{ bgColor: '#c34c48', color: '#f3dbda', borderColor: '#f3dbda'}}
            _focus={{ }}
            onClick={() => handleOpen()}
        >
            Add Task    
        </Button>
    )
}



export {TaskForm}