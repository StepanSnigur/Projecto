import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBoardPageState } from './selectors'
import { initSetNewBoard } from './actions'
import Preloader from '../../common/components/Preloader'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
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
  }
})

const BoardPage: React.FC<IBoardPage> = ({ boardId }) => {
  const dispatch = useDispatch()
  const boardPageState = useSelector(getBoardPageState)
  const styles = useStyles({
    background: boardPageState.backgroundImage,
    isImage: !isHexColor(boardPageState.backgroundImage || '')
  })
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
          key={i}
        />)}
      </Container>
    </div>
  )
}

export default BoardPage
