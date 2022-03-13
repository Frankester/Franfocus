import { Stack, Container, Button, Text, ModalHeader } from '@chakra-ui/react'
import { memo } from 'react'

import { Mode } from '../../constants'
import { useTimer } from './hook'
import { HeadingTimerProps, ButtonTimerProps } from './types'

const Modes = ['Pomodoro', 'Short Break','Long Break']


function Timer(){
    const { handles, values } = useTimer()
    const { mode, minutes, seconds, isPlay, countPomos } = values
    const { handleStart, handleStop, 
            handleResetPomodoro, 
            handleResetShortBreak, 
            handleResetLongBreak,
        } = handles
    
    
    return(
        <>
            <Stack direction='column' alignItems='center' bgColor='#dd6662' borderRadius='md' marginTop='30px'>
                <Container textAlign='center' padding='20px 0' >
                    <HeadingTimer 
                        mode={mode}
                        handleResetPomodoro={handleResetPomodoro}
                        handleResetLongBreak={handleResetLongBreak}
                        handleResetShortBreak={handleResetShortBreak}
                    />

                    <Text fontSize='9xl' fontWeight='bold' color='white'>
                        {minutes >= 10 ? minutes :`0${minutes}` }:{seconds >= 10 ? seconds: `0${seconds}`}    
                    </Text>

                    <ButtonTimer isPlay={isPlay} handleStart={handleStart} handleStop={handleStop} />

                </Container>
            </Stack>
            <Text color='#f0bbb9' textAlign='center' marginTop='4'>#{countPomos+1}</Text>
        </>
    )
}


const HeadingTimer = memo(
function HeadingTimer({ mode, handleResetPomodoro, handleResetLongBreak, handleResetShortBreak }: HeadingTimerProps){
    return (
        <Stack direction='row' justifyContent='center'>
            {
                Modes.map((type, index) => (
                    <Button 
                        key={index}
                        colorScheme='red' 
                        _focus={{ }} 
                        bgColor={ mode === type ? '#bc5753' : ''} 
                        onClick={ 
                            type === Mode.pomoSession ? handleResetPomodoro  
                            : type === Mode.shortBreak ? handleResetShortBreak
                            : type === Mode.longBreak ? handleResetLongBreak : () =>{} 
                        }
                    >
                        {type}
                    </Button>
                ))
            }
        </Stack>
    )
})

const ButtonTimer = memo(
    function ButtonTimer({ isPlay, handleStart, handleStop }: ButtonTimerProps){

        return(
            <Button  
                color='#d95550'
                colorScheme='white'
                size='lg' 
                textTransform='uppercase'
                borderBottom={ isPlay ? 'none' : '5px solid #ebebeb'}
                padding='25px 60px'
                _focus={{ }}
                onClick={ isPlay ? handleStop : handleStart}
            >
               {isPlay ? 'STOP' : 'START'}    
            </Button>
        )
    }
)

export default Timer