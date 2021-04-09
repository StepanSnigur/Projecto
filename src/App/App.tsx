import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRouter from './Router'
import ErrorManager from '../features/ErrorManager'
import ProgressBar from '../features/ProgressBar'

const App = () => {
  return (
    <Router>
      <ErrorManager />
      <AppRouter />
      <ProgressBar />
    </Router>
  )
}

export default App;
