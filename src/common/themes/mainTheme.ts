import { createMuiTheme } from '@material-ui/core/styles'

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#65717f',
    },
    secondary: {
      main: 'rgba(255, 255, 255, 0.7)',
      dark: '#141d26'
    },
    background: {
      paper: '#1f2c3c'
    },
    text: {
      primary: '#c9d1d7'
    },
    action: {
      hover: '#161d2e'
    }
  }
})

export default mainTheme
