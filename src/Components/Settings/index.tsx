import { Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { IconSettings } from "@tabler/icons";
import { useCallback  } from "react";

import NumberInputForm from "../NumberInputForm";
import { SettingsModalTypes, settingsNumberInputProps } from "./types";
import { useSettingsContext } from "../../Context/SettingsContext";
import useSettingsLocalStorage from "../../Hooks/useSettingsLocalStorage";

function Settings(){
    const { onOpen, isOpen, onClose } = useDisclosure()

    return (
        <>
            <Button 
                leftIcon={<IconSettings />}
                colorScheme='red'
                _hover={{}}
                _focus={{}}
                onClick={onOpen}
            >
                Settings
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <SettingsModal onClose={onClose} />
            </Modal>
        </>
    )
}

function SettingsModal({ onClose }: SettingsModalTypes){
    

    return(
        <ModalContent>
            <ModalHeader>
                <Stack 
                    direction='row' 
                    justifyContent='space-between'
                    paddingBottom='10px'
                    borderBottom='1px solid #f0eded'
                >
                    <Heading 
                        textTransform='uppercase'
                        color='#cbcbcb'
                        fontSize='large'
                    >
                        Timer setting
                    </Heading>
                    <ModalCloseButton color='#cbcbcb' _focus={{}} />
                </Stack>
            </ModalHeader>

            <SettingsModalBody onClose={onClose} />

            
        </ModalContent>
    )
}

function SettingsModalBody({ onClose }: SettingsModalTypes){
    const [state, dispatch] = useSettingsLocalStorage({ type: 'settings'})
    const {longBreak, longBreakInterval, pomoSession, shortBreak } = state

    const {handleSettings} = useSettingsContext()


    const handleChange = useCallback(() => {
        handleSettings({longBreak, longBreakInterval, pomoSession, shortBreak})
        onClose()
    },[longBreak, longBreakInterval, pomoSession, shortBreak])


    return (
        <>
            <ModalBody>
                <Text fontWeight='bold'>Time (minutes)</Text>
                <Stack 
                    direction='row' 
                    justifyContent='space-between' 
                    spacing={10}
                    paddingBottom='5'
                    borderBottom='1px solid #f0eded'
                > 
                    <SettingsNumberInput 
                        title='Pomodoros' 
                        value={pomoSession}
                        type='UPDATE_POMO_SESSION'
                        update={dispatch}
                    />
                    <SettingsNumberInput 
                        title='Short Break' 
                        value={shortBreak}
                        type='UPDATE_SHORT_BREAK'
                        update={dispatch}
                    />
                    <SettingsNumberInput 
                        title='Long Break' 
                        value={longBreak}
                        type='UPDATE_LONG_BREAK'
                        update={dispatch}
                    />
                </Stack>
                <Stack 
                    direction='row' 
                    alignItems='center' 
                    justifyContent='space-between'
                    spacing='0'
                >
                    <Text fontWeight='bold'>Long Break interval</Text>
                    <SettingsNumberInput 
                        width='20%'
                        value={ longBreakInterval}
                        type='UPDATE_LONG_BREAK_INTERVAL'
                        update={dispatch}
                    />
                </Stack>
            </ModalBody>
            
            <ModalFooter bgColor='#efefef' borderBottomRadius='lg' >
                <Button 
                    onClick={handleChange} 
                    textTransform='uppercase'
                    colorScheme='grey' 
                    bgColor='#222222'
                    marginLeft='10px' 
                    _focus={{}} 
                    _hover={{ bgColor: '#000' }}
                >
                    ok
                </Button>
            </ModalFooter>
        </>
    )
}

function SettingsNumberInput(
    { width = '100%', title='', value, update, type }:settingsNumberInputProps
){

    const handleChange = (val:number) => {
        if(update && type){
            update({type, payload: val})
        }
    }

    return(
        <Stack direction='column' spacing={title.length !== 0 ? 0 : 3} width={width}>
            <Text color='#cbcbcb' fontSize='sm' fontWeight='bold'>{title}</Text>
            <NumberInputForm  
                value={value? value: 1}
                handleChange={handleChange}
                min={1}
                width={'100%'}
            />
        </Stack>
    )
}

export default Settings