import React from 'react'
import { Router } from 'react-router-dom'
import history from './history'
import AppRouter from './Router'
import ErrorManager from '../features/ErrorManager'
import ProgressBar from '../features/ProgressBar'
import { ThemeProvider } from '@material-ui/core/styles'
import mainTheme from '../common/themes/mainTheme'

const App = () => {
  return (
    <Router history={history}>
      <ThemeProvider theme={mainTheme}>
        <ErrorManager />
        <AppRouter />
        <ProgressBar />
      </ThemeProvider>
    </Router>
  )
}

export default App;
