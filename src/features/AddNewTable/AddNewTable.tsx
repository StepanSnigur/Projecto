import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openAddNewTableWindow } from './addNewTableSlice'
import { getAddNewTableState } from './selectors'
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles'
import { Modal, Slide, Paper } from '@material-ui/core'
import { initCreateBoardPage } from '../../pages/BoardPage/boardPageSlice'
import { TextField, Button } from '@material-ui/core'
import SearchUserInput from '../../common/components/SearchUserInput'

const useStyles = makeStyles(theme => createStyles({
  modalWindowContent: {
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
    borderRadius: '5px 0 0 5px'
  },
  title: {
    fontSize: '32px'
  },
  textInput: {
    width: '400px',
    marginBottom: '20px'
  },
  inputColor: {
    borderColor: theme.palette.text.primary
  },
  modalBtn: {
    width: '200px',
    background: '#2c86ff',
    color: '#fff',

    '&:hover': {
      background: '#3855c9'
    }
  }
}))

export interface ITableMember {
  id: string,
  name: string
}
const AddNewTable = () => {
  const dispatch = useDispatch()
  const addNewTableState = useSelector(getAddNewTableState)
  const [tableName, setTableName] = useState('')
  const theme = useTheme()
  const styles = useStyles()

  const [tableMembers, setTableMembers] = useState<ITableMember[]>([]) // <-- added members

  const handleTableNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTableName(e.target.value)
  }
  const handleClose = () => {
    dispatch(openAddNewTableWindow(false))
  }
  const handleAddNewTable = () => {
    console.log(tableName, 'members')
    dispatch(initCreateBoardPage({
      name: tableName,
      members: tableMembers
    }))
    setTableName('')
    setTableMembers([])
    dispatch(openAddNewTableWindow(false))
  }

  return (
    <Modal
      open={addNewTableState.isOpen}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Slide direction="left" in={addNewTableState.isOpen}>
        <Paper className={styles.modalWindowContent}>
          <h3 className={styles.title}>Добавить новую таблицу</h3>
          <TextField
            variant="outlined"
            label="Имя таблицы"
            className={styles.textInput}
            color="primary"
            required
            InputProps={{
              classes: {
                notchedOutline: styles.inputColor
              }
            }}
            InputLabelProps={{
              style: {
                color: theme.palette.text.primary
              }
            }}
            onChange={handleTableNameChange}
            value={tableName}
          />
          <SearchUserInput
            isMultiple={true}
            onUsersLoad={setTableMembers}
          />
          <Button
            variant="contained"
            className={styles.modalBtn}
            disableElevation
            onClick={handleAddNewTable}
          >Создать</Button>
        </Paper>
      </Slide>
    </Modal>
  )
}

export default AddNewTable
