import { Stack, Text, Button, List, ListItem, Container, Menu, MenuButton, IconButton, MenuList, MenuItem } from '@chakra-ui/react'
import { IconDotsVertical, IconCircleCheck, IconTrash, IconCheck } from '@tabler/icons'
import { memo } from 'react'

import { useTasks } from './hook'
import { TaskHeadingProps, TaskItemProps, TaskUpdateFormProps } from './types'
import { TaskForm } from './TaskForm'
import TaskFormContent from './TaskFormContent'
import { useOpenClose } from '../../Hooks/useOpenClose'
import { useTasksContext } from '../../Context/TasksContext'


function Tasks(){ 
    const { tasks, addTask, removeTask, handleClearFinished, handleClearAct } = useTasks()

    return(
        <>
            <TaskTitle />
            <Stack direction='column' marginTop='10px' spacing='20px'>
                <TasksHeading 
                    handleClearFinished={handleClearFinished} 
                    handleClearAct={handleClearAct} 
                    removeTask={removeTask}
                />

                <List spacing='10px'>
                    {
                        tasks.map(task => 
                            <TaskItem 
                                key={task.id} 
                                name={task.name} 
                                pomos={task.pomos}
                                totalPomos={task.totalPomos}
                                id={task.id}
                                itsDone={task.itsDone}
                                addTask={addTask}
                                note={task.note}
                                removeTask={removeTask}
                            />

                        )
                    }
                </List>

                <TaskForm addTask={addTask}  />
            </Stack>
        </>
    )
}

const TaskTitle = memo(
    function TaskTitle(){
        const { select } = useTasksContext()


        return(
                <Text 
                    textAlign='center' 
                    color='#fff' 
                    fontSize='xl' 
                    paddingBottom='10px'
                >
                    { select.name ? select.name : 'Time to Focus!' }
                </Text>
        )
    }
)

const TasksHeading = memo(
    function TasksHeading(
        { handleClearFinished, handleClearAct, removeTask }:TaskHeadingProps 
    ){

        return(
            <Stack 
                direction='row' 
                paddingBottom='7px' 
                borderBottom='2px solid #f0bbb9' 
                justifyContent='space-between'
                alignItems='center'
                spacing={0}
            >
                <Text color='white' fontSize='xl' fontWeight='bold'>Tasks</Text>
   
                <Menu offset={[-183,6]}>
                    {
                        ({isOpen}) => (
                            <>
                                <MenuButton 
                                    bgColor='#e17773' 
                                    _focus={{ }}
                                    _hover={{ }}
                                    _active={{ }}
                                    isActive={isOpen} 
                                    as={IconButton} 
                                    icon={<IconDotsVertical color='white' />} 
                                />
                                <MenuList  >
                                    <MenuItem onClick={handleClearFinished}>
                                        <IconTrash width='32'/>Clear finished tasks
                                    </MenuItem>
                                    <MenuItem onClick={handleClearAct}>
                                        <IconCheck width='32'/>Clear act pomodoros
                                    </MenuItem>
                                    <MenuItem onClick={() => removeTask()}>
                                        <IconTrash width='32'/>Clear all tasks
                                    </MenuItem>
                                </MenuList>
                            </>
                        )
                    }
                </Menu>
            </Stack>
        )
    }
)

function TaskItem(
    { id, name, itsDone, pomos, totalPomos, note='' , addTask, removeTask }: TaskItemProps
){

const [updateTask, handleOpenClose] = useOpenClose()
const { select, handleSelect } = useTasksContext()

const isSelected: boolean = select.name !== '' && select.id === id  

const stopPropagation = (e: React.MouseEvent<HTMLElement>, callback = () =>{})=> {
    e.stopPropagation()
    callback()
}

const handleChangeDone = () => {
    addTask({ id, name, itsDone: !itsDone, pomos, totalPomos, note })       
}

const handleSelectTask = () => {
    handleSelect({ id, name, itsDone, pomos, totalPomos, note })
}


return(
    <>
        {
            updateTask ?
            <TaskUpdateForm 
                name={name}
                id={id}
                itsDone={itsDone}
                pomos={pomos}
                totalPomos={totalPomos}
                note={note}
                handleOpen={handleOpenClose}
                addTask={addTask}
                removeTask={removeTask}
             />
            : 
            <ListItem 
                width='full' 
                bgColor='#ffffff' 
                padding='15px 10px' 
                borderRadius='base'
                borderLeft={ isSelected ? '6px solid #000' : '6px solid transparent' }   
                _hover={
                    isSelected 
                    ? { borderLeft: '6px solid #000'} 
                    : { borderLeft: '6px solid #ccc'}
                }
                onClick={e => stopPropagation(e,handleSelectTask)}
            >
                <Stack direction='row' justifyContent='space-between' >
                    <Stack direction='row' alignItems='center' spacing={0}>
                        <Button 
                            variant='unstyled' 
                            _focus={{}} 
                            color={itsDone ? '#f00' : '#ccc'}
                            _hover={itsDone ? { color: '#e89996'} : { color: '#bbb'}}
                            onClick={(e) => stopPropagation(e,handleChangeDone)}
                        >
                            <IconCircleCheck  width='32' height='32' />
                        </Button>
                        <Text 
                            fontWeight='bold' 
                            textDecor={itsDone ? 'line-through' : 'none' } 
                            color={itsDone ? '#bbb' : '#000'}
                        >
                            { name }
                        </Text>
                    </Stack>
                    <Stack direction='row' alignItems='center' spacing='18px'>
                        <Stack direction='row' spacing='2px' alignItems='center'>
                            <Text color='#bbb' fontWeight='bold' fontSize='larger'>{ pomos }</Text>
                            <Text color='#bbb' fontWeight='bold' fontSize='sm'>/ { totalPomos }</Text>
                        </Stack>
                        <Button 
                            maxWidth='min-content' 
                            padding='0' 
                            colorScheme='grey'
                            border='1px solid #dfdfdf'
                            bgColor='#fff'
                            color='#bbb'
                            _focus={{}}
                            onClick={e => stopPropagation(e,handleOpenClose)}
                        >
                            <IconDotsVertical  />
                        </Button>
                    </Stack>

                    
                </Stack>

                {
                    note !== ''
                    ? <Container>
                        <Stack 
                            direction='row' 
                            bgColor='#fcf8de' 
                            borderRadius='md' 
                            marginTop='3' 
                            padding='10px'
                            _hover={{cursor: 'text'}}
                            onClick={stopPropagation}
                        >
                            <Text>{ note }</Text>
                        </Stack>
                    </Container> 
                    : null
                }
                
            </ListItem>
             
        }
    </>
)
}


function TaskUpdateForm(
    { name, totalPomos , note, id, pomos, itsDone, handleOpen, addTask, removeTask }
    : TaskUpdateFormProps
    ){
    
    const taskValues= { name, totalPomos , note, id, pomos, itsDone }
    
    return(
            <TaskFormContent
                addTask={addTask}
                handleOpen={handleOpen}
                type='update'
                initialTaskValues={taskValues} 
                removeTask={removeTask}
            />
    )
}



export default Tasks