import React from 'react'
import { useSelector } from 'react-redux'
import { getError } from './selectors'
import { makeStyles, createStyles } from '@material-ui/core/styles' 
import { Fade } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

const useStyles = makeStyles(() => createStyles({
  container: {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: '30px'
  }
}))

const ErrorManager = () => {
  const error = useSelector(getError)
  const styles = useStyles()

  // if (!error.length) return null

  return (
    <Fade in={!!error}>
      <div className={styles.container}>
        <Alert severity="error">{error}</Alert>
      </div>
    </Fade>
  )
}

export default ErrorManager
