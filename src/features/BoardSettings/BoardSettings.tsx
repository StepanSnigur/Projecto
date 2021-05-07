import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppStateType } from '../../App/store'
import { getBoardPageState } from '../../pages/BoardPage/selectors'
import { setBoardSettingsOpen } from './boardSettingsSlice'
import {
  changeCommentsState,
  changeIsPrivateState,
  saveBoardPageSettings
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
  formSelect: {
    width: '210px'
  },
  settingsGrid: {
    display: 'flex',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '52px'
  },
  submitBtn: {
    marginTop: '100px',
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
  const styles = useStyles()

  const handleTableMemberDelete = (params: GridCellParams) => {
    console.log('delete', params.id)
  }
  const handleTableMemberUpdate = (params: GridCellParams) => {
    console.log('update', params.id)
  }
  const membersTableGrid: GridColDef[] = [
    { field: 'id', headerName: 'id', width: 120 },
    { field: 'name', headerName: 'имя', width: 140 },
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
    console.log('add member')
  }

  return (
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
              <FormControl variant="outlined" className={styles.formSelect}>
                <InputLabel>Коментарии</InputLabel>
                <Select onChange={handleCommentsStateChange} value={boardPageState.settings.comments}>
                  <MenuItem value="disabled">отключить</MenuItem>
                  <MenuItem value="only-registered">только зарегистрированные пользователи</MenuItem>
                  <MenuItem value="only-members">только участники</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className={styles.formSelect}>
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
              />
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
  )
}

export default BoardSettings
