import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { getUserState } from '../../common/user/selectors'
import AddIcon from '@material-ui/icons/Add'

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
    marginTop: '12px',
    textAlign: 'center',
    lineHeight: '60px'
  }
})

const Sidebar = () => {
  const styles = useStyles()
  const userState = useSelector(getUserState)

  if (!userState.id) return null

  const handleAddNewTable = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.sidebarItemsWrapper}>
        {userState.registeredInBoards.map(boardLink => <Link
          key={boardLink.id}
          to={`/board/${boardLink.id}`}
          className={styles.sidebarItem}
          style={{
            background: boardLink.background
          }}
          title={boardLink.name}
        />)}
        <Link to="/" onClick={handleAddNewTable} className={styles.sidebarItem}>
          <AddIcon style={{ color: '#fff' }} />
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
