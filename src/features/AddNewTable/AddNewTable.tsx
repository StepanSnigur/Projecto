import React, { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openAddNewTableWindow } from './addNewTableSlice'
import { getAddNewTableState } from './selectors'
import { getUserId } from '../../common/user/selectors'
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles'
import { Modal, Slide, Paper } from '@material-ui/core'
import boardApi from '../../api/boardApi'
import { asyncThrottle, getUniqueArr, removeCurrentUserFromSearchList } from './utils'
import { SEARCH_DELAY } from './constants'
import { fireSetError } from '../ErrorManager/errorManagerSlice'
import { initCreateBoardPage } from '../../pages/BoardPage/boardPageSlice'

import { TextField, Button, Chip, CircularProgress } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

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
    // background: '#f4f5f7',
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
  const currentUserId = useSelector(getUserId)
  const [tableName, setTableName] = useState('')
  const theme = useTheme()

  const [tableMembers, setTableMembers] = useState<ITableMember[]>([]) // <-- added members
  const [membersList, setMembersList] = useState<ITableMember[]>([]) // <-- searched members
  const [searchMembersInputValue, setSearchMembersInputValue] = useState('')
  const [isMemberInputLoading, setIsMemberInputLoading] = useState(false)

  const styles = useStyles()
  const membersListLoaded = (members: ITableMember[]) => {
    setMembersList(members)
    setIsMemberInputLoading(false)
  }
  const membersListError = (errorMessage: string) => {
    dispatch(fireSetError(errorMessage))
  }
  const throttlesSearchUsers = useMemo(
    () => asyncThrottle(boardApi.searchUsers, SEARCH_DELAY),
    []
  )

  const loadMembersList = async () => {
    setIsMemberInputLoading(true)
    throttlesSearchUsers(searchMembersInputValue)
      .then((members) => removeCurrentUserFromSearchList(members, currentUserId))
      .then(membersListLoaded)
      .catch(membersListError)
  }

  useEffect(() => {
    loadMembersList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchMembersInputValue])

  const handleTableNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTableName(e.target.value)
  }
  const handleTableMembersChange = (_: any, newValue: any) => {
    const filteredMembers = getUniqueArr(newValue)
    setTableMembers(filteredMembers)
  }
  const handleClose = () => {
    dispatch(openAddNewTableWindow(false))
  }
  const handleAddNewTable = () => {
    dispatch(initCreateBoardPage({
      name: tableName,
      members: tableMembers
    }))
    setTableName('')
    setTableMembers([])
    dispatch(openAddNewTableWindow(false))
  }
  const handleMemberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchMembersInputValue(e.target.value)
  }
  const renderMembersInput = (params: any) => {
    return <TextField
      {...params}
      variant="outlined"
      label="Добавить участников"
      className={styles.textInput}
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <>
            {isMemberInputLoading ? <CircularProgress size={20} color="inherit" /> : null}
            {params.InputProps.endAdornment}
          </>
        ),
        classes: {
          notchedOutline: styles.inputColor
        }
      }}
      InputLabelProps={{
        style: {
          color: theme.palette.text.primary
        }
      }}
      onChange={handleMemberInputChange}
    />
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
          <Autocomplete
            multiple
            value={tableMembers}
            onChange={handleTableMembersChange}
            options={membersList}
            getOptionLabel={(option: ITableMember) => option.name}
            renderTags={(tagValue, getTagProps) => tagValue.map((option, index) => (
              <Chip
                label={option.name}
                {...getTagProps({ index })}
              />
            ))}
            color="primary"
            renderInput={renderMembersInput}
            loading={isMemberInputLoading}
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
