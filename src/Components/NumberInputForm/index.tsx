import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'

type NumberInputProps = { 
    value: number, 
    handleChange: (totalPomos:number) => void, 
    color?:string, 
    min?:number, 
    width?:string,
}

function NumberInputForm({ value, handleChange, color='', min=1, width='20%' }: NumberInputProps){

    return(
        <NumberInput variant='unstyled' 
            min={min} 
            bgColor='#efefef' 
            padding='10px' 
            borderRadius='md'
            maxW={width}
            color={color}
            defaultValue='1'
            value={value}
            onChange={(value:string) => handleChange(Number(value))}
        >
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    )
}

export default NumberInputForm