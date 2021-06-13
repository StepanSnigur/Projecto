import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserId } from '../user/selectors'
import { initSetTaskInfoOpen } from '../../features/TaskInfo/taskInfoSlice'
import { Draggable } from 'react-beautiful-dnd'
import { makeStyles, createStyles } from '@material-ui/core/styles'

interface IBoardCard {
  title: string,
  description?: string,
  id: string,
  listId: string,
  index: number,
  completed: boolean,
  isDraggable: boolean
}

const useStyles = makeStyles(theme => createStyles({
  wrapper: {
    margin: '0 10px',
    marginBottom: '5px',
    borderRadius: '7px',

    '&:last-child': {
      marginBottom: '0'
    },
  },
  taskButton: {
    padding: '6px 7px',
    borderRadius: '7px',
    cursor: 'pointer',
    transition: '.3s',
    overflow: 'hidden',

    '&:hover': {
      background: theme.palette.primary.main
    }
  }
}))

const BoardCard: React.FC<IBoardCard> = ({
  title,
  description,
  id,
  listId,
  index,
  completed,
  isDraggable
}) => {
  const dispatch = useDispatch()
  const userId = useSelector(getUserId)
  const styles = useStyles()

  const openTaskInfo = () => {
    if (userId) {
      dispatch(initSetTaskInfoOpen({
        isOpen: true,
        title,
        description,
        id,
        completed,
        listId
      }))
    }
  }

  return (
    <Draggable draggableId={id} isDragDisabled={!isDraggable} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={styles.wrapper}
        >
          <div
            className={styles.taskButton}
            onClick={openTaskInfo}
            style={{
              textDecoration: completed ? 'line-through' : 'none',
              opacity: completed ? .4 : 1
            }}
          >{title}</div>
        </div>
      )}
    </Draggable>
  )
}

export default BoardCard
