import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

const useStyles = makeStyles({
  headerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 30px',
    background: '#23324b', // 23324b
    color: '#afbcc5' // #afbcc5 f6f1f1
  },
  logo: {
    fontSize: '24px',
    margin: 0,
    padding: 0
  },
  logoBtn: {
    textDecoration: 'none',
    border: 'none',
    background: 'inherit',
    color: '#afbcc5'
  },
  headerLink: {
    textDecoration: 'none'
  },
  headerButton: {
    background: '#2c86ff', // 3855c9 7f4bec 2c86ff
    color: '#fff',
    '&:hover': {
      background: '#3855c9'
    }
  }
})

const Header = () => {
  const styles = useStyles()

  return <div className={styles.headerWrapper}>
    <Link to="/" className={styles.logoBtn}>
      <h3 className={styles.logo}>Projecto</h3>
    </Link>
    <Link to="/login" className={styles.headerLink}>
      <Button className={styles.headerButton} variant="contained">Войти</Button>
    </Link>
  </div>
}

export default Header
