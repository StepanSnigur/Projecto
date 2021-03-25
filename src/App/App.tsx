import React from 'react'
import AppRouter from './Router'
import ErrorManager from '../features/ErrorManager'
import ProgressBar from '../features/ProgressBar'

const App = () => {
  return (
    <>
      <ErrorManager />
      <AppRouter />
      <ProgressBar />
    </>
  )
}

export default App;
