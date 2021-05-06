import React, { useState, useEffect } from 'react'
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
import { isAdminOfBoard } from '../../common/user/utils'
import { setBoardSettingsOpen } from "../BoardSettings/boardSettingsSlice";

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
  const [headerTitle, setHeaderTitle] = useState(INITIAL_HEADER_TITLE)
  const [isModdingTitle, setIsModdingTitle] = useState(false)
  const [title, setTitle] = useState('')
  const [isControlIconsVisible, setIsControlIconsVisible] = useState(false)

  useEffect(() => {
    if (isOnBoardPage(location.pathname)) {
      setHeaderTitle(boardPageState.name)
    } else {
      setHeaderTitle(INITIAL_HEADER_TITLE)
      setIsModdingTitle(false)
    }
  }, [location.pathname, boardPageState.name])
  useEffect(() => {
    if (
      isOnBoardPage(location.pathname) &&
      userState.id &&
      isAdminOfBoard(boardPageState.id, userState.registeredInBoards)
    ) {
      setIsControlIconsVisible(true)
    } else {
      setIsControlIconsVisible(false)
    }
  }, [location.pathname, userState.id])

  const handleTitleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (headerTitle !== INITIAL_HEADER_TITLE && userState.id) {
      setIsModdingTitle(true)
      setTitle(boardPageState.name)
    }
  }
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }
  const exitUpdatingMode = () => {
    if (!boardPageState.id) {
      dispatch(fireSetError('Непредвиденная ошибка'))
      setIsModdingTitle(false)
      return false
    }
    if (headerTitle === title) {
      setIsModdingTitle(false)
      return false
    }
    dispatch(initChangeBoardTitle({
      boardId: boardPageState.id,
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
  const TableTitle: React.FC = () => (
    <Link to="/" className={styles.logoBtn} onClick={handleTitleClick}>
      <h3 className={styles.logo}>{headerTitle}</h3>
    </Link>
  )

  return <Paper className={styles.headerWrapper} square>
    {
      isModdingTitle
        ? <TextField
          label="Новое название"
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
        isControlIconsVisible
          ? <IconButton onClick={openBoardSettings} color="secondary">
              <SettingsIcon />
            </IconButton>
          : null
      }
      {
        userState.id
          ? <Link to="/user" className={styles.headerLink}>
            <Button variant="contained" color="secondary">
              <PersonIcon fontSize="small" />
            </Button>
          </Link>
          : <Link to="/login" className={styles.headerLink}>
            <Button className={styles.headerButton} variant="contained">Войти</Button>
          </Link>
      }
    </div>
  </Paper>
}

export default Header
