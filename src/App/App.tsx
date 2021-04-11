import React from 'react'
import { Router } from 'react-router-dom'
import history from './history'
import AppRouter from './Router'
import ErrorManager from '../features/ErrorManager'
import ProgressBar from '../features/ProgressBar'

const App = () => {
  return (
    <Router history={history}>
      <ErrorManager />
      <AppRouter />
      <ProgressBar />
    </Router>
  )
}

export default App;
