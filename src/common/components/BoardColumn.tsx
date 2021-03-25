import React from 'react'
import { IBoardList } from '../../pages/BoardPage/reducer'
import BoardCard from './BoardCard'
import { makeStyles } from '@material-ui/core/styles'

interface IBoardColumn {
  tasksList: IBoardList,
  onAddNewCard: (columnId: string) => void
}

const useStyles = makeStyles({
  boardColumnWrapper: {
    width: '280px',
    flexShrink: 0,
    boxSizing: 'border-box',
    padding: '12px 0',
    marginRight: '15px',
    background: '#ebecf0',
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
    padding: '0',
    color: '#172b4d'
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
  }
})

const BoardColumn: React.FC<IBoardColumn> = ({ tasksList, onAddNewCard }) => {
  const styles = useStyles()

  return (
    <div className={styles.boardColumnWrapper}>
      <div className={styles.columnTitleWrapper}>
        <h4 className={styles.columnTitle}>{tasksList.name}</h4>
        <div className={styles.columnMenu}>
          <span className={styles.columnMenuDot}/>
          <span className={styles.columnMenuDot}/>
          <span className={styles.columnMenuDot}/>
        </div>
      </div>
      {tasksList.tasks.map((task, i) => <BoardCard key={task.id} title={task.name} />)}
      <button
        className={styles.addTaskBtn}
        onClick={() => onAddNewCard(tasksList.id)}
      >Добавить задачу</button>
    </div>
  )
}

export default BoardColumn
