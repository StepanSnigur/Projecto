import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserId } from '../user/selectors'
import { initTaskInfoOpen } from '../../features/TaskInfo/actions'
import { Draggable } from 'react-beautiful-dnd'
import { makeStyles } from '@material-ui/core/styles'

interface IBoardCard {
  title: string,
  description?: string,
  id: string,
  listId: string,
  index: number,
  isDraggable: boolean
}

const useStyles = makeStyles({
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
      background: '#fff'
    }
  }
})

const BoardCard: React.FC<IBoardCard> = ({
  title,
  description,
  id,
  listId,
  index,
  isDraggable
}) => {
  const dispatch = useDispatch()
  const userId = useSelector(getUserId)
  const styles = useStyles()

  const openTaskInfo = () => {
    if (userId) {
      dispatch(initTaskInfoOpen(true, title, description, id, listId))
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
          <div className={styles.taskButton} onClick={openTaskInfo}>{title}</div>
        </div>
      )}
    </Draggable>
  )
}

export default BoardCard
