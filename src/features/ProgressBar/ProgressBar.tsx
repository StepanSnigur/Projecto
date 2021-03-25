import React from 'react'
import { useSelector } from 'react-redux'
import { getProgressBarState } from './selectors'
import { LinearProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  progressBar: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%'
  }
})

const ProgressBar = () => {
  const progressBarState = useSelector(getProgressBarState)
  const styles = useStyles()
  return progressBarState.isLoading ? <LinearProgress className={styles.progressBar} /> : null
}

export default ProgressBar
