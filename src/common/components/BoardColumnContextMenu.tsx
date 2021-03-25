import React, { useContext } from 'react'
import { BoardColumnContext } from '../context/BoardColumnContext'
import { Menu, MenuItem } from '@material-ui/core'
import { Delete, Create } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  contextMenuIcon: {
    marginRight: '6px'
  }
})

const BoardColumnContextMenu = () => {
  const context = useContext(BoardColumnContext)
  const styles = useStyles()

  return context.isOpen ? <Menu
    open={context.isOpen}
    onClose={() => context.setIsOpen(false)}
    anchorEl={context.anchorEl?.current}
  >
    <MenuItem onClick={() => context.setIsOpen(false)}>
      <Delete className={styles.contextMenuIcon} />
      Удалить
    </MenuItem>
    <MenuItem onClick={() => context.setIsOpen(false)}>
      <Create className={styles.contextMenuIcon} />
      Изменить название
    </MenuItem>
  </Menu> : null
}

export default BoardColumnContextMenu
