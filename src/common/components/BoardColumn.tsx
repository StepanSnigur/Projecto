import React, { useContext, useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserState } from '../user/selectors'
import { IBoardList } from '../../pages/BoardPage/boardPageSlice'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import BoardCard from './BoardCard'
import { TextField, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { BoardColumnContext } from '../context/BoardColumnContext'
import { ENTER_KEY_CODE } from '../constants'

interface IBoardColumn {
  tasksList: IBoardList,
  onAddNewCard: (columnId: string) => void,
  dragIndex: number
}

const useStyles = makeStyles({
  boardColumnWrapper: {
    width: '280px',
    flexShrink: 0,
    boxSizing: 'border-box',
    padding: '12px 0',
    marginRight: '15px',
    borderRadius: '7px'
  },
  columnTitleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 10px 10px 10px',
    marginBottom: '14px',
    borderBottom: '1px solid #6b778c'
  },
  columnTitle: {
    margin: '0',
    padding: '0'
  },
  columnMenu: {
    display: 'flex',
    alignItems: 'center',
    padding: '7px 0',
    cursor: 'pointer'
  },
  columnMenuDot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    background: '#6b778c',
    marginRight: '3px',

    '&:last-child': {
      marginRight: '0'
    }
  },
  addTaskBtn: {
    display: 'block',
    width: '85%',
    margin: '7px auto 0 auto',
    padding: '5px 0',
    color: '#5e6c84',
    fontSize: '16px',
    background: 'transparent',
    border: '1px solid #6b778c',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  droppableZone: {
    minHeight: '20px'
  }
})

const BoardColumn: React.FC<IBoardColumn> = ({ tasksList, onAddNewCard, dragIndex }) => {
  const boardColumnContext = useContext(BoardColumnContext)
  const userState = useSelector(getUserState)
  const [titleInputValue, setTitleInputValue] = useState('')
  const styles = useStyles()
  const contextMenuBtn = useRef<HTMLDivElement>(null)
  const columnInput = useRef<HTMLInputElement>(null)

  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInputValue(e.target.value)
  }
  const handleTitleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      boardColumnContext.setIsUpdating(false)
    }
  }
  useEffect(() => {
    if (boardColumnContext.isUpdating) {
      setTitleInputValue(tasksList.name || '')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardColumnContext.isUpdating, tasksList.name])
  useEffect(() => {
    if (boardColumnContext.currentListId === tasksList._id && boardColumnContext.isUpdating) {
      columnInput.current?.focus()
    }
  }, [boardColumnContext.isUpdating, columnInput, boardColumnContext.currentListId, tasksList._id])

  const openContextMenu = () => {
    boardColumnContext.setAnchorEl(contextMenuBtn)
    boardColumnContext.setCurrentListId(tasksList._id)
    boardColumnContext.setIsOpen(true)
    boardColumnContext.setIsUpdating(false)
  }
  const handleInputClose = () => {
    boardColumnContext.setIsUpdating(false)
  }

  return (
    <Draggable draggableId={tasksList._id} isDragDisabled={!userState._id} index={dragIndex}>
      {(provided) => (
        <Paper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={styles.boardColumnWrapper}
        >
          <div className={styles.columnTitleWrapper}>
            {(boardColumnContext.currentListId === tasksList._id && boardColumnContext.isUpdating) ?
              <TextField
                label="Новое название"
                variant="outlined"
                size="small"
                value={titleInputValue}
                onChange={handleTitleInputChange}
                onKeyDown={handleTitleInputKeyDown}
                onBlur={handleInputClose}
                inputRef={columnInput}
              /> :
              <h4 className={styles.columnTitle}>{tasksList.name}</h4>
            }
            {userState._id ? <div className={styles.columnMenu} onClick={openContextMenu} ref={contextMenuBtn}>
              <span className={styles.columnMenuDot}/>
              <span className={styles.columnMenuDot}/>
              <span className={styles.columnMenuDot}/>
            </div> : null}
          </div>
          <Droppable droppableId={tasksList._id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles.droppableZone}
              >
                {tasksList.tasks.map((task, i) => <BoardCard
                  key={task._id}
                  title={task.name}
                  description={task.description}
                  id={task._id}
                  listId={tasksList._id}
                  index={i}
                  completed={task.completed}
                  isDraggable={!!userState._id}
                />)}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <button
            className={styles.addTaskBtn}
            onClick={() => onAddNewCard(tasksList._id)}
          >Добавить задачу</button>
        </Paper>
      )}
    </Draggable>
  )
}

export default BoardColumn
