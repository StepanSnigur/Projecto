import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTaskInfoOpen } from './actions'
import { getTaskInfoState } from './selectors'
import { Modal, Slide, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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
  }
})

const TaskInfo = () => {
  const dispatch = useDispatch()
  const taskInfoState = useSelector(getTaskInfoState)
  const styles = useStyles()

  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')

  useEffect(() => {
    setTaskTitle(taskInfoState.taskData.title)
  }, [taskInfoState.taskData.title, setTaskTitle])
  useEffect(() => {
    setTaskDescription(taskInfoState.taskData.description)
  }, [taskInfoState.taskData.description, setTaskDescription])

  const handleClose = () => {
    dispatch(setTaskInfoOpen(false))
  }
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value)
  }
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(e.target.value)
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
