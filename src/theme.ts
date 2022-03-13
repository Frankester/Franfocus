import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    styles: {
      global: {
        'html, body': {
          backgroundColor: '#d95550',
          fontFamily: 'sans-serif',

        },
      },
    },
    colors:{
      red: {
        500: '#dd6662',
        600: '#bc5753',
        700: '#bc5753',
      },
      white: {
        500: '#fff',
        600: '#fff',
        700: '#fff',
      },
      grey:{
        500: "#dfdfdf",
        600: "#dfdfdf",
        700: "#dfdfdf",
      }
    },
    fontSizes: {
      lg: '1.4em'
    },
    components:{
      Button:{
        variants: {
          dashed: {
            border: '2px dashed #eecccb',
            bgColor: '#c74e49',
            padding: '30px 0'
          }
        }
      }
    }
  
  })
  
  export  { 
    theme
  } 
  

  /*
  
  const theme = extendTheme({
  components: {
    Button: {
      // 1. We can update the base styles
      baseStyle: {
        fontWeight: 'bold', // Normally, it is "semibold"
      },
      // 2. We can add a new button size or extend existing
      sizes: {
        xl: {
          h: '56px',
          fontSize: 'lg',
          px: '32px',
        },
      },
      // 3. We can add a new visual variant
      variants: {
        'with-shadow': {
          bg: 'red.400',
          boxShadow: '0 0 2px 2px #efdfde',
        },
        // 4. We can override existing variants
        solid: (props) => ({
          bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
        }),
      },
    },
  },
})
  
  */