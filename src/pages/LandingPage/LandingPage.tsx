import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { Button } from '@material-ui/core'

const useStyles = makeStyles({
  mainWrapper: {
    width: '1110px',
    margin: '0 auto',
    fontFamily: 'Manrope, sans-serif'
  },
  headerWrapper: {
    display: 'grid',
    gridTemplateColumns: '4fr 1.2fr',
    paddingTop: '100px'
  },
  mainTitleWrapper: {
    color: '#2e3038',
    paddingRight: '150px'
  },
  mainHeadlineAddition: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#7b8193',
    textTransform: 'uppercase'
  },
  mainHeadline: {
    fontSize: '46px',
    fontWeight: 700,
    margin: '0'
  },
  mainHeadlineDescription: {
    fontSize: '20px',
    fontWeight: 500,
    color: '#4d505e',
  },
  headerLink: {
    width: '100%',
    textDecoration: 'none',
  },
  headerButton: {
    background: '#2c86ff',
    transform: 'translateY(100%)',

    color: '#fff',
    '&:hover': {
      background: '#3855c9'
    }
  }
})

const LandingPage = () => {
  const styles = useStyles()

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.headerWrapper}>
        <div className={styles.mainTitleWrapper}>
          <h3 className={styles.mainHeadlineAddition}>Помощник, который всегда под рукой</h3>
          <h1 className={styles.mainHeadline}>Менеджер задач, который вам понравится</h1>
          <p className={styles.mainHeadlineDescription}>
            Все, что нужно для качественной и продуктивной работы есть в нашем таск-менеджере
          </p>
        </div>
        <Link to="/registration" className={styles.headerLink}>
          <Button
            style={{ minWidth: '100%', minHeight: '60px' }}
            className={styles.headerButton}
            variant="contained"
          >Начать работу</Button>
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
