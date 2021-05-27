import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getUserId } from '../../common/user/selectors'
import { getUserBoards } from '../../features/Sidebar/selectors'
import BoardLink from '../../common/components/BoardLink'
import { makeStyles } from '@material-ui/core/styles'
import ContextMenu from '../../common/components/ContextMenu'
import { initPinBoard } from '../../features/Sidebar/sidebarSlice'

const useStyles = makeStyles({
  linksWrapper: {
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: 'repeat(5, 202px)',
    gridRowGap: '20px',
    gridColumnGap: '20px',
    paddingTop: '30px'
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
    console.log(contextMenuState.executionData, 'delete')
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
      <ContextMenu
        x={contextMenuState.x}
        y={contextMenuState.y}
        onClose={closeContextMenu}
      >
        <button onClick={handlePinBoard}>
          {contextMenuState.executionData.isPinned ? 'Открепить' : 'Закрепить'}
        </button>
        <button onClick={handleDeleteBoard}>Удалить</button>
      </ContextMenu>
    </div>
  )
}

export default UserPage
