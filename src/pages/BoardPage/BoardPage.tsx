import React, { useState, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBoardPageState } from './selectors'
import {
  initAddNewBoardCard,
  initSetNewBoard,
  initAddNewBoardList,
  initMoveBoardTask,
  initMoveBoardColumn
} from './boardPageSlice'
import Preloader from '../../common/components/Preloader'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Button, Container } from '@material-ui/core'
import { isHexColor } from './utils'
import { IBoardList } from './boardPageSlice'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import BoardColumn from '../../common/components/BoardColumn'
import InputModalWindow from '../../common/components/InputModalWindow'
import BoardColumnContextMenu from '../../common/components/BoardColumnContextMenu'
import BoardColumnContextProvider from '../../common/context/BoardColumnContext'
import TaskInfo from '../../features/TaskInfo'

interface IBoardPage {
  boardId: string
}
interface IStyleProps {
  background: string | null,
  isImage: boolean
}
export interface IDropResult {
  index: number,
  droppableId: string
}

const useStyles = makeStyles(theme => createStyles({
  boardWrapper: {
    width: '100%',
    minHeight: 'calc(100vh - 85px)',
    background: (props: IStyleProps) => props.isImage
      ? `url(${props.background}) no-repeat center / cover`
      : (props.background || theme.palette.secondary.dark),
    paddingTop: '25px'
  },
  boardContainer: {
    margin: 0,
    maxWidth: 'none'
  },
  tasksListWrapper: {
    maxHeight: '850px',
    overflow: 'auto',
    display: 'flex',
    alignItems: 'flex-start',
    paddingBottom: '20px'
  },
  addListBtn: {
    height: '40px',
    flexShrink: 0
  },
}))

const BoardPage: React.FC<IBoardPage> = ({ boardId }) => {
  const dispatch = useDispatch()
  const boardPageState = useSelector(getBoardPageState)
  const styles = useStyles({
    background: boardPageState.backgroundImage,
    isImage: !isHexColor(boardPageState.backgroundImage || '') && !!boardPageState.backgroundImage?.length
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
    dispatch(initAddNewBoardCard({
      cardName: newCardTitle,
      columnId: currentColumnId,
      boardId
    }))
    handleCloseAddNewCardModal()
  }

  const handleCloseAddNewListModal = () => {
    setAddNewListModalOpen(false)
  }
  const addNewList = () => {
    dispatch(initAddNewBoardList({
      name: newListTitle,
      boardId
    }))
    handleCloseAddNewListModal()
  }
  const handleDragEnd = (result: any) => {
    const { destination, source } = result
    if (
      !destination ||
      (destination.droppableId === source.droppableId && destination.index === source.index)
    ) return false

    result.type === 'column'
      ? dispatch(initMoveBoardColumn({ source, destination }))
      : dispatch(initMoveBoardTask({ source, destination }))
  }

  useLayoutEffect(() => {
    dispatch(initSetNewBoard(boardId))
  }, [dispatch, boardId])

  if (boardPageState.isLoading) return <Preloader />
  if (boardPageState.error) return <div>error</div>

  return (
    <div className={styles.boardWrapper}>
      <DragDropContext
        onDragEnd={handleDragEnd}
      >
        <BoardColumnContextProvider>
          <BoardColumnContextMenu boardId={boardId} />
          <Container className={styles.boardContainer}>
            <Droppable droppableId="task-lists" direction="horizontal" type="column">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className={styles.tasksListWrapper}>
                  {boardPageState.lists.map((tasksList: IBoardList, i) => <BoardColumn
                    tasksList={tasksList}
                    onAddNewCard={handleAddNewCard}
                    dragIndex={i}
                    key={tasksList.id}
                  />)}
                  {provided.placeholder}
                  <Button
                    variant="contained"
                    disableElevation
                    className={styles.addListBtn}
                    onClick={() => setAddNewListModalOpen(true)}
                    disabled={boardPageState.isCardLoading}
                  >Добавить список</Button>
                </div>
              )}
            </Droppable>
          </Container>
        </BoardColumnContextProvider>

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
      </DragDropContext>
      <TaskInfo />
    </div>
  )
}

export default BoardPage
