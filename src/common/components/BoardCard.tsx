import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { makeStyles } from '@material-ui/core/styles'

interface IBoardCard {
  title: string,
  id: string,
  index: number
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

const BoardCard: React.FC<IBoardCard> = ({ title, id, index }) => {
  const styles = useStyles()

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={styles.wrapper}
        >
          <div className={styles.taskButton}>{title}</div>
        </div>
      )}
    </Draggable>
  )
}

export default BoardCard
