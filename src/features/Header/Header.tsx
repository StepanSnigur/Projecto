import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getUserState } from '../../common/user/selectors'
import { initChangeBoardTitle } from '../../pages/BoardPage/boardPageSlice'
import { fireSetError } from '../ErrorManager/errorManagerSlice'
import { isOnBoardPage } from '../../common/utils/routes'
import { getBoardPageState } from '../../pages/BoardPage/selectors'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { Button, IconButton, TextField, Paper } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import PersonIcon from '@material-ui/icons/Person'
import { INITIAL_HEADER_TITLE } from './constants'
import { ENTER_KEY_CODE } from '../../common/constants'
import SettingsIcon from '@material-ui/icons/Settings'
import ChatIcon from '@material-ui/icons/Chat'
import { isAdminOfBoard } from '../../common/user/utils'
import { setBoardSettingsOpen } from '../BoardSettings/boardSettingsSlice'
import { checkIsBoardMember } from '../../pages/BoardPage/utils'
import { initSetBoardChatOpen } from '../BoardChat/boardChatSlice'
import { getBoardChatState } from '../BoardChat/selectors'

const useStyles = makeStyles((theme) => createStyles({
  headerWrapper: {
    height: '60px',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 30px',
    // background: theme.palette.primary.main, // '#23324b', // 23324b
    color: '#afbcc5' // #afbcc5 f6f1f1
  },
  logo: {
    fontSize: '24px',
    margin: 0,
    padding: 0
  },
  logoBtn: {
    textDecoration: 'none',
    border: 'none',
    background: 'inherit',
    color: '#afbcc5'
  },
  headerLink: {
    textDecoration: 'none',
    marginLeft: '7px'
  },
  headerButton: {
    background: '#2c86ff', // 3855c9 7f4bec 2c86ff
    color: '#fff',
    '&:hover': {
      background: '#3855c9'
    }
  },
  redIndicator: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: 'red'
  }
}))

interface ITextWithLoading {
  isLoading: boolean,
  Component: React.FC
}
const TextWithLoading: React.FC<ITextWithLoading> = ({ isLoading, Component }) => {
  return (
    <>
      {
        isLoading
          ? <Skeleton variant="text" height={44} width={90} />
          : <Component />
      }
    </>
  )
}

const Header = () => {
  const styles = useStyles()
  const location = useLocation()
  const dispatch = useDispatch()
  const userState = useSelector(getUserState)
  const boardPageState = useSelector(getBoardPageState)
  const boardChatState = useSelector(getBoardChatState)
  const [headerTitle, setHeaderTitle] = useState(INITIAL_HEADER_TITLE)
  const [isModdingTitle, setIsModdingTitle] = useState(false)
  const [title, setTitle] = useState('')
  const [isControlIconsVisible, setIsControlIconsVisible] = useState(false)
  const [isBoardMember, setIsBoardMember] = useState(false)

  useEffect(() => {
    if (isOnBoardPage(location.pathname)) {
      setHeaderTitle(boardPageState.name)
    } else {
      setHeaderTitle(INITIAL_HEADER_TITLE)
      setIsModdingTitle(false)
    }
  }, [location, boardPageState])
  useLayoutEffect(() => {
    setIsControlIconsVisible(
      !!(isOnBoardPage(location.pathname) &&
      userState._id &&
      isAdminOfBoard(boardPageState._id, userState.registeredInBoards)
      && !boardPageState.isLoading)
    )
  }, [
    location,
    userState,
    boardPageState
  ])
  useLayoutEffect(() => {
    setIsBoardMember(isOnBoardPage(location.pathname)
      && checkIsBoardMember(boardPageState.assignedUsers, userState._id)
      && !boardPageState.isLoading)
  }, [
    location,
    boardPageState,
    userState
  ])

  const handleTitleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (headerTitle !== INITIAL_HEADER_TITLE && userState._id) {
      setIsModdingTitle(true)
      setTitle(boardPageState.name)
    }
  }
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }
  const exitUpdatingMode = () => {
    if (!boardPageState._id || headerTitle === title) {
      !boardPageState._id && dispatch(fireSetError('???????????????????????????? ????????????'))
      setIsModdingTitle(false)
      return false
    }

    dispatch(initChangeBoardTitle({
      boardId: boardPageState._id,
      newTitle: title
    }))
    setIsModdingTitle(false)
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      exitUpdatingMode()
    }
  }
  const openBoardSettings = () => {
    dispatch(setBoardSettingsOpen(true))
  }
  const openBoardChat = () => {
    dispatch(initSetBoardChatOpen())
  }
  const TableTitle: React.FC = () => (
    <Link to="/" className={styles.logoBtn} onClick={handleTitleClick}>
      <h3 className={styles.logo}>{headerTitle}</h3>
    </Link>
  )

  return <Paper className={styles.headerWrapper} square>
    {
      isModdingTitle
        ? <TextField
          label="?????????? ????????????????"
          variant="outlined"
          size="small"
          value={title}
          onChange={handleTitleChange}
          onKeyDown={handleKeyDown}
          onBlur={exitUpdatingMode}
          autoFocus
        />
        : <TextWithLoading isLoading={boardPageState.isLoading} Component={TableTitle} />
    }
    <div>
      {
        isBoardMember
          ? <IconButton onClick={openBoardChat} color="secondary">
            {boardChatState.newMessageIndicator ? <div className={styles.redIndicator}/> : ''}
            <ChatIcon />
          </IconButton>
          : null
      }
      {
        isControlIconsVisible
          ? <IconButton role="settingsButton" onClick={openBoardSettings} color="secondary">
              <SettingsIcon />
            </IconButton>
          : null
      }
      {
        userState._id
          ? <Link to="/user" className={styles.headerLink}>
            <Button variant="contained" color="secondary">
              <PersonIcon fontSize="small" />
            </Button>
          </Link>
          : <Link to="/login" className={styles.headerLink}>
            <Button className={styles.headerButton} variant="contained">??????????</Button>
          </Link>
      }
    </div>
  </Paper>
}

export default Header
