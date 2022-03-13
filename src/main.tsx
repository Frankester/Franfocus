
import ReactDOM from 'react-dom'
import App from './Components/App'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import {theme} from './theme'



ReactDOM.render(
  <ChakraProvider theme={extendTheme(theme)}>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
)
