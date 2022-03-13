import  { Container, Stack, Heading } from "@chakra-ui/react"
import { IconCircleCheck } from '@tabler/icons'

import TasksProvider from "../../Context/TasksContext"
import SettingsProvider from '../../Context/SettingsContext'
import Settings from "../Settings"
import Tasks from "../Tasks"
import Timer from "../Timer"

function App(){

    return(
        <Container>
            <SettingsProvider>
                <>
                    <AppHeading />            
                    <Container marginBottom={20}>
                        <TasksProvider>
                            <>
                                <Timer />
                                <Tasks />            
                            </>
                        </TasksProvider>
                    </Container>    
                </>
            </SettingsProvider>
        </Container>
    )
}


function AppHeading(){

    return(
            <Stack 
                direction='row' 
                justifyContent='space-between' 
                alignItems='center' 
                borderBottom='1px solid #c34c48'
            >
                <Stack 
                    direction='row' 
                    margin='10px 0' 
                    padding='10px 0' 
                    color='#fff' 
                    spacing={1} 
                >
                    <IconCircleCheck  width='30' height='30' />
                    <Heading fontSize='2xl'>Franfocus</Heading> 
                </Stack>

                <Settings />
            </Stack>
    )
}




export default App