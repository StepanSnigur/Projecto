import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBoardPageState } from './selectors'
import { initAddNewBoardCard, initSetNewBoard, initAddNewBoardList } from './actions'
import Preloader from '../../common/components/Preloader'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Container } from '@material-ui/core'
import { isHexColor } from './utils'

import BoardColumn from '../../common/components/BoardColumn'
import InputModalWindow from '../../common/components/InputModalWindow'

interface IBoardPage {
  boardId: string
}
interface IStyleProps {
  background: string | null,
  isImage: boolean
}

const useStyles = makeStyles({
  boardWrapper: {
    height: '100vh',
    background: (props: IStyleProps) => props.isImage ? `url(${props.background}) no-repeat center / cover` : (props.background || '#fff')
  },
  tasksListWrapper: {
    overflowX: 'auto',
    display: 'flex',
    alignItems: 'flex-start'
  },
  addListBtn: {
    height: '40px',
    flexShrink: 0
  },
})

const BoardPage: React.FC<IBoardPage> = ({ boardId }) => {
  const dispatch = useDispatch()
  const boardPageState = useSelector(getBoardPageState)
  const styles = useStyles({
    background: boardPageState.backgroundImage,
    isImage: !isHexColor(boardPageState.backgroundImage || '')
  })

  const [addNewCardModalOpen, setAddNewCardModalOpen] = useState(false)
  const [newCardTitle, setNewCardTitle] = useState('')
  const [currentColumnId, setCurrentColumnId] = useState('')

  const [addNewListModalOpen, setAddNewListModalOpen] = useState(false)
  const [newListTitle, setNewListTitle] = useState('')

  const handleCloseAddNewCardModal = () => {
    setAddNewCardModalOpen(false)
    setCurrentColumnId('')
    setNewCardTitle('')
  }
  const handleAddNewCard = (columnId: string) => {
    console.log(columnId)
    setAddNewCardModalOpen(true)
    setCurrentColumnId(columnId)
  }
  const addNewCard = () => {
    dispatch(initAddNewBoardCard(newCardTitle, currentColumnId, boardId))
    handleCloseAddNewCardModal()
  }

  const handleCloseAddNewListModal = () => {
    setAddNewListModalOpen(false)
  }
  const addNewList = () => {
    dispatch(initAddNewBoardList(newListTitle, boardId))
    handleCloseAddNewListModal()
  }

  useEffect(() => {
    dispatch(initSetNewBoard(boardId))
  }, [dispatch, boardId])

  if (boardPageState.isLoading) return <Preloader />
  if (boardPageState.error) return <div>error</div>

  return (
    <div className={styles.boardWrapper}>
      <Container>
        board, {boardId}
        <h2>{boardPageState.name}</h2>
        <div className={styles.tasksListWrapper}>
          {boardPageState.lists.map(tasksList => <BoardColumn
            tasksList={tasksList}
            onAddNewCard={handleAddNewCard}
            key={tasksList.id}
          />)}
          <Button
            variant="contained"
            disableElevation
            className={styles.addListBtn}
            onClick={() => setAddNewListModalOpen(true)}
            disabled={boardPageState.isCardLoading}
          >Добавить список</Button>
        </div>
      </Container>

      <InputModalWindow
        isOpen={addNewCardModalOpen}
        onClose={handleCloseAddNewCardModal}
        inputValue={newCardTitle}
        inputTitle="Новая задача"
        handleChange={(e) => setNewCardTitle((e.target.value))}
        onSubmit={addNewCard}
      />
      <InputModalWindow
        isOpen={addNewListModalOpen}
        onClose={handleCloseAddNewListModal}
        inputValue={newListTitle}
        inputTitle="Новый список"
        handleChange={(e) => setNewListTitle((e.target.value))}
        onSubmit={addNewList}
      />
    </div>
  )
}

export default BoardPage
