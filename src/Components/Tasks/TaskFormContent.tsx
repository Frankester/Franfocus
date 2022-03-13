import { Button, Container, Grid, Input, Stack, Text, Textarea } from "@chakra-ui/react"

import { TaskFormContentProps, ButtonsContentFormProps } from "./types"
import NumberInputForm from "../NumberInputForm"
import { useTask } from "./hook"


function TaskFormContent(
        { type, addTask, initialTaskValues, handleOpen, removeTask }:TaskFormContentProps
    ){

    const values = useTask({addTask, initialTaskValues, removeTask, handleOpen})
    const { task } = values

    return(
        <Stack direction='column' spacing={0} >
            <Container paddingY='8'  bgColor='#fff' borderTopRadius='md'>
                <Input 
                    type='text'
                    placeholder='What are you working on?' 
                    variant='unstyled' 
                    fontSize='2xl'
                    fontWeight='bold'
                    _placeholder={{fontStyle:'italic', color:'#dddddd'}}
                    marginBottom='6'
                    value={task.name}
                    onChange={values.handleChangeName}
                    name='hola'
                    autoFocus 
                />

                <Text fontWeight='bold'>
                        {type === 'update'? ' Act / Est Pomodoros': 'Est Pomodoros' }
                </Text>

                <Stack direction='row' spacing={3} alignItems='center'>
                    {
                        type === 'update' ?
                        <>
                            <NumberInputForm 
                                value={task.pomos} 
                                handleChange={values.handleChangePomos}
                                color='rgb(187, 187, 187)'
                                min={0}
                            />
                            <Text color='rgb(187, 187, 187)'>/</Text>
                            <NumberInputForm 
                                value={task.totalPomos} 
                                handleChange={values.handleChangeTotalPomos}
                            />
                        </>
                        : 
                        <NumberInputForm 
                            value={task.totalPomos} 
                            handleChange={values.handleChangeTotalPomos}
                    />
                    }
                </Stack>
                

                {
                    (task.note !== '' )
                        || (values.openNote === true )
                    ? <Textarea 
                        marginTop='6' 
                        placeholder='Some notes...' 
                        value={task.note} 
                        onChange={(e) => values.handleChangeNote(e.target.value)}
                    />
                    : <Button 
                        variant='link' 
                        textDecoration='underline'
                        marginTop='6'    
                        fontSize='sm'
                        _focus={{ }}
                        onClick={() => values.handleNote()}
                    >+ Add Note</Button>
                }
                
            </Container>
            
            <Buttons 
                active={values.active}
                type={type}
                addTask={addTask}
                handleDelete={values.handleDelete}
                handleUpdate={values.handleUpdate}
                handleOpen={handleOpen}
                handleSave={values.handleSave}
            />
            
        </Stack>
    )
}

function Buttons(
        { type, handleDelete, handleOpen, active, handleUpdate, handleSave }
        : ButtonsContentFormProps
    ){
    
    return(
        <Container 
            bgColor='#efefef' 
            borderBottomRadius='md' 
            paddingY='3'                       
        >
            <Grid 
                templateColumns='min-content repeat(2,1fr) repeat(2,min-content)'
            >
                {
                    type==='update' ? 
                    <Button
                        variant='unstyled' 
                        _focus={{}} 
                        color='#b2b2b2'
                        onClick={handleDelete}
                        textAlign='left'
                    >
                        Delete
                    </Button>
                    : null
                }
                <Button 
                    variant='unstyled' 
                    _focus={{}} 
                    color='#b2b2b2'
                    onClick={() => handleOpen()}
                    gridArea='1 / 4 / 2 / 5'
                >
                    Cancel
                </Button>
                <Button 
                    colorScheme='grey' 
                    bgColor={active ? '#b2b2b2' : '#222222'}
                    marginLeft='10px' 
                    _focus={{}} 
                    _hover={active ? { bgColor:'#b2b2b2' }: { bgColor: '#000' }}
                    gridArea='1 / 5 / 2 / 6'
                    onClick={ active ? () => {}: type==='update' ? handleUpdate: handleSave }
                >
                    Save
                </Button>
            </Grid>
            
        </Container>
    )
}

export default TaskFormContent