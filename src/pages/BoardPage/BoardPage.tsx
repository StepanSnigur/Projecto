import React, { useState, useLayoutEffect, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBoardPageState } from './selectors'
import { getUserId } from '../../common/user/selectors'
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
import { checkIsBoardMember, isHexColor } from './utils'
import { IBoardList } from './boardPageSlice'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import BoardColumn from '../../common/components/BoardColumn'
import InputModalWindow from '../../common/components/InputModalWindow'
import BoardColumnContextMenu from '../../common/components/BoardColumnContextMenu'
import BoardMemberBarrier from '../../common/components/BoardMemberBarrier'
import BoardColumnContextProvider from '../../common/context/BoardColumnContext'
import TaskInfo from '../../features/TaskInfo'
import BoardSettings from '../../features/BoardSettings'
import BoardChat from '../../features/BoardChat'
import boardApi from '../../api/boardApi'
import { sendMessage } from '../../features/BoardChat/boardChatSlice'

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
    paddingBottom: '20px',
    '&::-webkit-scrollbar': {
      backgroundColor: theme.palette.background.paper,
      width: '16px',
      borderRadius: '16px'
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'inherit'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main,
      borderRadius: '16px'
    },
    '&::-webkit-scrollbar-button': {
      display: 'none'
    }
  },
  addListBtn: {
    height: '40px',
    flexShrink: 0
  },
}))

const BoardPage: React.FC<IBoardPage> = ({ boardId }) => {
  const dispatch = useDispatch()
  const boardPageState = useSelector(getBoardPageState)
  const userId = useSelector(getUserId)
  const styles = useStyles({
    background: boardPageState.backgroundImage,
    isImage: !isHexColor(boardPageState.backgroundImage || '') && !!boardPageState.backgroundImage?.length
  })
  const [isBoardMember, setIsBoardMember] = useState(false)

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
    setNewListTitle('')
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
  useEffect(() => {
    setIsBoardMember(checkIsBoardMember(boardPageState.assignedUsers, userId))
  }, [boardPageState.assignedUsers, userId])
  useEffect(() => {
    const socket = boardApi.connectToChat(userId, boardId)
    socket.onmessage = (msg) => {
      const message = JSON.parse(msg.data)
      dispatch(sendMessage(message))
    }

    return boardApi.disconnectFromChat
  }, [dispatch, boardId, userId])

  if (boardPageState.isLoading) return <Preloader />
  if (
    JSON.parse(boardPageState.settings?.isPrivate) &&
    (!userId || !isBoardMember)
  ) return <BoardMemberBarrier />
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
                    isBoardMember={isBoardMember}
                    key={tasksList._id}
                  />)}
                  {provided.placeholder}
                  {isBoardMember
                    ? <Button
                      variant="contained"
                      disableElevation
                      className={styles.addListBtn}
                      onClick={() => setAddNewListModalOpen(true)}
                      disabled={boardPageState.isCardLoading}
                    >Добавить список</Button>
                    : null}
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
      <BoardSettings />
      <BoardChat />
    </div>
  )
}

export default BoardPage
