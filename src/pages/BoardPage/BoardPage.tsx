import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBoardPageState } from './selectors'
import { initAddNewBoardCard, initSetNewBoard } from './actions'
import Preloader from '../../common/components/Preloader'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Container, Modal, TextField } from '@material-ui/core'
import { isHexColor } from './utils'

import BoardColumn from '../../common/components/BoardColumn'

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
  addCardModalWrapper: {
    width: '250px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    background: '#f4f5f7',
    borderRadius: '5px',
    padding: '20px',
  },
  addCardInput: {
    width: '100%',
    marginBottom: '10px'
  },
  addCardButton: {
    width: '100%'
  }
})

const BoardPage: React.FC<IBoardPage> = ({ boardId }) => {
  const dispatch = useDispatch()
  const boardPageState = useSelector(getBoardPageState)

  const [addNewCardModalOpen, setAddNewCardModalOpen] = useState(false)
  const [newCardTitle, setNewCardTitle] = useState('')
  const [currentColumnId, setCurrentColumnId] = useState('')

  const styles = useStyles({
    background: boardPageState.backgroundImage,
    isImage: !isHexColor(boardPageState.backgroundImage || '')
  })

  const handleCloseAddNewCardModal = () => {
    setAddNewCardModalOpen(false)
    setCurrentColumnId('')
  }
  const handleAddNewCard = (columnId: string) => {
    setAddNewCardModalOpen(true)
    setCurrentColumnId(columnId)
  }
  const addNewCard = () => {
    dispatch(initAddNewBoardCard(newCardTitle, currentColumnId, boardId))
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
        {boardPageState.lists.map((tasksList, i) => <BoardColumn
          tasksList={tasksList}
          onAddNewCard={handleAddNewCard}
          key={i}
        />)}
      </Container>

      <Modal
        open={addNewCardModalOpen}
        onClose={handleCloseAddNewCardModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={styles.addCardModalWrapper}>
          <TextField
            id="email"
            required
            label="Новая задача"
            variant="outlined"
            className={styles.addCardInput}
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
          />
          <Button
            variant="contained"
            className={styles.addCardButton}
            disableElevation
            onClick={addNewCard}
            // disabled={registrationPageState.isLoading}
          >Добавить</Button>
        </div>
      </Modal>
    </div>
  )
}

export default BoardPage
