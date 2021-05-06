import React from 'react'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../App/store'
import LoopIcon from '@material-ui/icons/Loop'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  spinner: {
    position: 'absolute',
    bottom: '20px',
    animation: '$spin 1s linear infinite'
  },
  '@keyframes spin': {
    'from': {
      transform: 'rotate(360deg)'
    },
    'to': {
      transform: 'rotate(0deg)'
    }
  }
})

const SidebarSpinner = () => {
  const isLoading = useSelector((state: AppStateType) => state.sidebarSpinner)
  const styles = useStyles()

  return isLoading ? <LoopIcon className={styles.spinner} /> : null
}

export default SidebarSpinner
