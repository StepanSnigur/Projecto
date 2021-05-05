import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress, createStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => createStyles({
  preloaderContainer: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.secondary.dark
  }
}))

const Preloader = () => {
  const styles = useStyles()

  return (
    <div className={styles.preloaderContainer}>
      <CircularProgress />
    </div>
  )
}

export default Preloader
