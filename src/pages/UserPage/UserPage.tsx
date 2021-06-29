import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getUserId } from '../../common/user/selectors'
import { getUserBoards } from '../../features/Sidebar/selectors'
import BoardLink from '../../common/components/BoardLink'
import { makeStyles } from '@material-ui/core/styles'
import ContextMenu from '../../common/components/ContextMenu'
import {
  initDeleteBoard,
  initPinBoard,
  initDeleteBoardFromUser
} from '../../features/Sidebar/sidebarSlice'
import { ROLES } from '../../common/constants'
import AddIcon from '@material-ui/icons/Add'
import { openAddNewTableWindow } from '../../features/AddNewTable/addNewTableSlice'

const useStyles = makeStyles({
  linksWrapper: {
    display: 'grid',
    justifyContent: 'center',
    gridAutoRows: '102px',
    gridTemplateColumns: 'repeat(5, 202px)',
    gridRowGap: '20px',
    gridColumnGap: '20px',
    paddingTop: '30px'
  },
  addBoardButton: {
    borderRadius: '10px',
    background: '#2c86ff',
    cursor: 'pointer',
    textAlign: 'center',
    border: 'none'
  }
})
interface IContextMenuCoords {
  x: null | number,
  y: null | number,
  executionData?: any
}

const UserPage = () => {
  const dispatch = useDispatch()
  const userId = useSelector(getUserId)
  const userBoards = useSelector(getUserBoards)
  const styles = useStyles()
  const [contextMenuState, setContextMenuState] = useState<IContextMenuCoords>({
    x: null,
    y: null,
    executionData: {}
  })

  const openContextMenu = (executionData: any) => (e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenuState({
      x: e.pageX,
      y: e.pageY,
      executionData
    })
  }
  const closeContextMenu = () => {
    setContextMenuState({
      x: null,
      y: null,
      executionData: {}
    })
  }
  const handlePinBoard = () => {
    if (!contextMenuState.executionData.isPinned) {
      dispatch(initPinBoard({
        boardId: contextMenuState.executionData.boardId,
        isPinned: true
      }))
    } else {
      dispatch(initPinBoard({
        boardId: contextMenuState.executionData.boardId,
        isPinned: false
      }))
    }
  }
  const handleDeleteBoard = () => {
    dispatch(initDeleteBoard({
      boardId: contextMenuState.executionData.boardId,
      isAdmin: contextMenuState.executionData.role === ROLES.ADMIN
    }))
  }
  const handleRemoveBoardFromUser = () => {
    dispatch(initDeleteBoardFromUser({
      boardId: contextMenuState.executionData.boardId,
      isAdmin: contextMenuState.executionData.role === ROLES.ADMIN
    }))
  }
  const handleAddNewBoard = () => {
    dispatch(openAddNewTableWindow(true))
  }

  if (!userId) return <Redirect to="/login" />

  return (
    <div className={styles.linksWrapper}>
      {userBoards.map((boardLink, i) => <BoardLink
        key={boardLink._id}
        isUserLink={true}
        idx={i}
        linkData={boardLink}
        onContextMenu={openContextMenu(boardLink)}
      />)}
      <button
        className={styles.addBoardButton}
        onClick={handleAddNewBoard}
      >
        <AddIcon style={{ color: '#fff' }} />
      </button>
      <ContextMenu
        x={contextMenuState.x}
        y={contextMenuState.y}
        onClose={closeContextMenu}
      >
        <button onClick={handlePinBoard}>
          {contextMenuState.executionData.isPinned ? 'Открепить' : 'Закрепить'}
        </button>
        <button onClick={handleRemoveBoardFromUser}>Удалить из своего списка</button>
        <button onClick={handleDeleteBoard}>Удалить</button>
      </ContextMenu>
    </div>
  )
}

export default UserPage
