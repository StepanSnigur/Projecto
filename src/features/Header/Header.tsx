import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const useStyles = makeStyles({
  headerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 30px',
    background: '#23324b',
    color: '#afbcc5' // #afbcc5 f6f1f1
  },
  logo: {
    fontSize: '24px',
    margin: 0,
    padding: 0
  },
  headerButton: {
    background: '#3855c9', // 3855c9 7f4bec
    color: '#fff',
    '&:hover': {
      background: '#23324b'
    }
  }
})

const Header = () => {
  const styles = useStyles()

  return <div className={styles.headerWrapper}>
    <h3 className={styles.logo}>Projecto</h3>
    <Button className={styles.headerButton} variant="contained">Войти</Button>
  </div>
}

export default Header
