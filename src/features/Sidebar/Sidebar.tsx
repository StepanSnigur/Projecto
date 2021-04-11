import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  sidebarWrapper: {
    width: '60px',
    position: 'absolute',
    height: '100%',
    background: '#23324b'
  },
  sidebarItemsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  sidebarItem: {
    width: '48px',
    height: '48px',
    borderRadius: '10px',
    background: '#2c86ff', // 2c86ff
    cursor: 'pointer',
    marginTop: '12px'
  }
})

const Sidebar = () => {
  const styles = useStyles()

  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.sidebarItemsWrapper}>
        <Link to="/" className={styles.sidebarItem} />
        <Link to="/" className={styles.sidebarItem} />
      </div>
    </div>
  )
}

export default Sidebar
