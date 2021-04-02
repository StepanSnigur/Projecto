import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { initDeleteBoardList } from '../../pages/BoardPage/actions'
import { BoardColumnContext } from '../context/BoardColumnContext'
import { Menu, MenuItem } from '@material-ui/core'
import { Delete, Create } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  contextMenuIcon: {
    marginRight: '6px'
  }
})
interface IBoardColumnContextMenu {
  boardId: string
}

const BoardColumnContextMenu: React.FC<IBoardColumnContextMenu> = ({ boardId }) => {
  const dispatch = useDispatch()
  const context = useContext(BoardColumnContext)
  const styles = useStyles()

  const deleteList = () => {
    dispatch(initDeleteBoardList(context.currentListId || '', boardId))
    context.setIsOpen(false)
  }
  const updateList = () => {
    context.setIsUpdating(true)
    context.setIsOpen(false)
  }

  return context.isOpen ? <Menu
    open={context.isOpen}
    onClose={() => context.setIsOpen(false)}
    anchorEl={context.anchorEl?.current}
  >
    <MenuItem onClick={deleteList}>
      <Delete className={styles.contextMenuIcon} />
      Удалить
    </MenuItem>
    <MenuItem onClick={updateList}>
      <Create className={styles.contextMenuIcon} />
      Изменить название
    </MenuItem>
  </Menu> : null
}

export default BoardColumnContextMenu
