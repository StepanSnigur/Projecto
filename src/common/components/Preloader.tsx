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
  },
  noBackground: {
    background: 'inherit'
  }
}))

interface IPreloader {
  haveBackground?: boolean
}

const Preloader: React.FC<IPreloader> = ({ haveBackground = true }) => {
  const styles = useStyles()

  return (
    <div className={`${styles.preloaderContainer} ${!haveBackground ? styles.noBackground : ''}`}>
      <CircularProgress />
    </div>
  )
}

export default Preloader
