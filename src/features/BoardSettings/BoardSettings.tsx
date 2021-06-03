import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppStateType } from '../../App/store'
import { getBoardPageState } from '../../pages/BoardPage/selectors'
import { setBoardSettingsOpen } from './boardSettingsSlice'
import {
  changeCommentsState,
  changeIsPrivateState,
  saveBoardPageSettings,
  initAddUserToBoard,
  initDeleteBoardMember
} from '../../pages/BoardPage/boardPageSlice'
import {
  Button,
  Modal,
  Paper,
  Slide,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton
} from '@material-ui/core'
import { DataGrid, GridCellParams, GridColDef } from '@material-ui/data-grid'
import { PAGE_SIZE } from './constants'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import PencilIcon from '@material-ui/icons/Create'
import InputModalWindow from '../../common/components/InputModalWindow'
import SearchUserInput from '../../common/components/SearchUserInput'
import BoardActions from '../../features/ActionsTrack'
import { IUserData } from '../../common/user/userSlice'

const useStyles = makeStyles(theme => createStyles({
  modalWindowContent: {
    boxSizing: 'border-box',
    display: 'flex',
    width: '40%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '0',
    right: '0',
    outline: 'none',
    borderRadius: '5px 0 0 5px',
    padding: '0 80px'
  },
  title: {
    fontSize: '24px'
  },
  settingsGrid: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '210px 210px',
    justifyContent: 'space-between'
  },
  submitBtn: {
    marginTop: '450px',
    width: '160px'
  },
  membersList: {
    width: '100%',
    height: 320
  },
  membersTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0'
  }
}))
const defaultTheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

const BoardSettings = () => {
  const dispatch = useDispatch()
  const boardPageState = useSelector(getBoardPageState)
  const boardSettingsState = useSelector((state: AppStateType) => state.boardSettings)
  const [isAddNewUserWindowOpen, setAddNewUserWindowOpen] = useState(false)
  const [newUserWindowInputValue, setNewUserWindowInputValue] = useState('')
  const [newMember, setNewMember] = useState<IUserData[]>([])
  const styles = useStyles()

  const handleTableMemberDelete = (params: GridCellParams) => {
    dispatch(initDeleteBoardMember({
      boardId: boardPageState._id,
      userId: params.row.userId
    }))
  }
  const handleTableMemberUpdate = (params: GridCellParams) => {
    console.log('update', params.id)
  }
  const membersTableGrid: GridColDef[] = [
    { field: 'userId', headerName: 'id', width: 120 },
    { field: 'name', headerName: 'имя', width: 140 },
    { field: 'role', headerName: 'роль' },
    {
      field: '',
      headerName: 'Действия',
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <>
            <IconButton onClick={() => handleTableMemberDelete(params)}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => handleTableMemberUpdate(params)}>
              <PencilIcon />
            </IconButton>
          </>
        )
      },
      width: 140
    }
  ]

  const handleClose = () => {
    dispatch(setBoardSettingsOpen(false))
  }
  const handleCommentsStateChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(changeCommentsState(e.target.value as string))
  }
  const handleIsPrivateStateChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(changeIsPrivateState(e.target.value as string))
  }
  const handleSettingsSave = () => {
    dispatch(saveBoardPageSettings())
  }
  const handleAddMember = () => {
    setAddNewUserWindowOpen(true)
  }
  const handleAddNewMemberWindowClose = () => {
    setAddNewUserWindowOpen(false)
  }
  const handleAddNewMemberWindowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserWindowInputValue(e.target.value)
  }
  const handleAddNewMemberWindowSubmit = () => {
    console.log(newMember, 'submit')
    dispatch(initAddUserToBoard(newMember))
    handleAddNewMemberWindowClose()
  }

  return (
    <>
      <Modal
        open={boardSettingsState.isOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Slide direction="left" in={boardSettingsState.isOpen}>
          <Paper className={styles.modalWindowContent}>
            <ThemeProvider theme={defaultTheme}>
              <h3 className={styles.title}>Настройки "{boardPageState.name}"</h3>
              <div className={styles.settingsGrid}>
                <FormControl variant="outlined">
                  <InputLabel>Коментарии</InputLabel>
                  <Select onChange={handleCommentsStateChange} value={boardPageState.settings.comments}>
                    <MenuItem value="disabled">отключить</MenuItem>
                    <MenuItem value="only-registered">только зарегистрированные пользователи</MenuItem>
                    <MenuItem value="only-members">только участники</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined">
                  <InputLabel>Приватность</InputLabel>
                  <Select onChange={handleIsPrivateStateChange} value={boardPageState.settings.isPrivate}>
                    <MenuItem value="false">Доска доступна всем</MenuItem>
                    <MenuItem value="true">Доска доступна только участникам</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className={styles.membersList}>
                <div className={styles.membersTitleWrapper}>
                  <h4 style={{ margin: 0, marginRight: '10px' }}>Участники:</h4>
                  <IconButton onClick={handleAddMember}>
                    <AddCircleIcon />
                  </IconButton>
                </div>
                <DataGrid
                  rows={boardPageState.assignedUsers}
                  columns={membersTableGrid}
                  pageSize={PAGE_SIZE}
                  getRowId={row => row._id}
                  disableSelectionOnClick
                />
                <div className={styles.membersTitleWrapper}>
                  <h4 style={{ margin: '10px 0 2px 0' }}>Действия:</h4>
                </div>
                <BoardActions />
              </div>
              <Button
                className={styles.submitBtn}
                size="large"
                variant="outlined"
                onClick={handleSettingsSave}
              >Сохранить</Button>
            </ThemeProvider>
          </Paper>
        </Slide>
      </Modal>
      <ThemeProvider theme={defaultTheme}>
        <InputModalWindow
          isOpen={isAddNewUserWindowOpen}
          onClose={handleAddNewMemberWindowClose}
          inputValue={newUserWindowInputValue}
          inputTitle="Добавить участника"
          handleChange={handleAddNewMemberWindowChange}
          onSubmit={handleAddNewMemberWindowSubmit}
          renderInput={() => <SearchUserInput
            isMultiple={false}
            onUsersLoad={setNewMember}
            width="100%"
          />}
        />
      </ThemeProvider>
    </>
  )
}

export default BoardSettings
