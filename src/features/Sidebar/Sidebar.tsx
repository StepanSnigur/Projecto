import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { openAddNewTableWindow } from '../AddNewTable/actions'
import { getUserId } from '../../common/user/selectors'
import { getPinnedBoards } from './selectors'
import AddIcon from '@material-ui/icons/Add'
import BoardLink from '../../common/components/BoardLink'

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
  const dispatch = useDispatch()
  const pinnedBoards = useSelector(getPinnedBoards)
  const userId = useSelector(getUserId)

  if (!userId) return null

  const handleAddNewTable = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(openAddNewTableWindow(true))
  }

  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.sidebarItemsWrapper}>
        {pinnedBoards.map((boardLink, i) => <BoardLink
          key={boardLink.id}
          idx={i}
          linkData={boardLink}
        />)}
        <Link to="/" onClick={handleAddNewTable} className={styles.sidebarItem}>
          <AddIcon style={{ color: '#fff' }} />
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
