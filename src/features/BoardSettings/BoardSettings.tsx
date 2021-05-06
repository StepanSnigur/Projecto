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
import { Button, Modal, Paper, Slide, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

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
    width: '200px'
  },
  settingsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '15px'
  },
  submitBtn: {
    marginTop: '15px',
    width: '160px'
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
