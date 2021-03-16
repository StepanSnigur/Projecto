import React from 'react'
import AppRouter from './Router'
import ErrorManager from '../features/ErrorManager'

const App = () => {
  return (
    <>
      <ErrorManager />
      <AppRouter />
    </>
  )
}

export default App;
