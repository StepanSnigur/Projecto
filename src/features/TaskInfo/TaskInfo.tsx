import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTaskInfoOpen } from './taskInfoSlice'
import { initChangeBoardCard } from '../../pages/BoardPage/boardPageSlice'
import { getTaskInfoState } from './selectors'
import { Modal, Slide, TextField, Button, IconButton } from '@material-ui/core'
import { makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { green, blueGrey } from '@material-ui/core/colors'
import { Save, Delete } from '@material-ui/icons'

const useStyles = makeStyles({
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
    background: '#f4f5f7',
    borderRadius: '5px 0 0 5px',
    padding: '0 120px'
  },
  taskDescription: {
    marginTop: '12px',
    height: '60px'
  },
  controlButtons: {
    boxSizing: 'border-box',
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '15px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #23324b'
  },
  deleteBtn: {
    color: '#e53935'
  }
})
const taskInfoTheme = createMuiTheme({
  palette: {
    primary: green,
    secondary: blueGrey
  }
})
const DoTaskBtn = withStyles({
  root: {
    color: '#fff'
  }
})(Button)
const ControlBtn = withStyles({
  root: {
    color: '#fff',
    marginLeft: '10px'
  }
})(IconButton)

const TaskInfo = () => {
  const dispatch = useDispatch()
  const taskInfoState = useSelector(getTaskInfoState)
  const styles = useStyles()

  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false)

  useEffect(() => {
    setTaskTitle(taskInfoState.taskData.title)
  }, [taskInfoState.taskData.title, setTaskTitle])
  useEffect(() => {
    setTaskDescription(taskInfoState.taskData.description)
  }, [taskInfoState.taskData.description, setTaskDescription])
  useEffect(() => {
    const isTaskChanged = (taskTitle !== taskInfoState.taskData.title)
      || (taskDescription !== taskInfoState.taskData.description)
    setIsSaveButtonDisabled(!isTaskChanged)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskTitle, taskDescription, setIsSaveButtonDisabled])

  const handleClose = () => {
    dispatch(setTaskInfoOpen({
      isOpen: false,
      title: '',
      description: '',
      id: '',
      listId: '',
      canEdit: false
    }))
  }
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value)
  }
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(e.target.value)
  }
  const handleTaskInfoSave = () => {
    dispatch(initChangeBoardCard({
      taskId: taskInfoState.id,
      listId: taskInfoState.listId,
      newTitle: taskTitle,
      newDescription: taskDescription
    }))
  }

  return (
    <Modal
      open={taskInfoState.isOpen}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Slide direction="left" in={taskInfoState.isOpen}>
        <div className={styles.modalWindowContent}>
          {taskInfoState.canEdit ? <div className={styles.controlButtons}>
            <ThemeProvider theme={taskInfoTheme}>
              <div>
                <DoTaskBtn
                  variant="contained"
                  size="small"
                  color="primary"
                  disableElevation
                >Выполнить</DoTaskBtn>
                <ControlBtn
                  aria-label="сохранить"
                  size="small"
                  disabled={isSaveButtonDisabled}
                  onClick={handleTaskInfoSave}
                >
                  <Save color={isSaveButtonDisabled ? 'disabled' : 'secondary'} />
                </ControlBtn>
              </div>
              <ControlBtn aria-label="удалить" size="small">
                <Delete className={styles.deleteBtn} />
              </ControlBtn>
            </ThemeProvider>
          </div> : null}
          <TextField
            label="Название задачи"
            variant="outlined"
            value={taskTitle}
            fullWidth
            onChange={handleTitleChange}
            disabled={!taskInfoState.canEdit}
          />
          <TextField
            className={styles.taskDescription}
            label="Описание задачи"
            variant="outlined"
            value={taskDescription}
            fullWidth
            multiline
            rows={7}
            onChange={handleDescriptionChange}
            disabled={!taskInfoState.canEdit}
          />
        </div>
      </Slide>
    </Modal>
  )
}

export default TaskInfo
