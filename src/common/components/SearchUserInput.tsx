import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getToken, getUserId } from '../user/selectors'
import { useTheme } from '@material-ui/core/styles'
import {
  asyncThrottle,
  getUniqueArr,
  removeCurrentUserFromSearchList
} from '../../features/AddNewTable/utils'
import { Chip, CircularProgress, makeStyles, TextField } from '@material-ui/core'
import { fireSetError } from '../../features/ErrorManager/errorManagerSlice'
import boardApi from '../../api/boardApi'
import { SEARCH_DELAY } from '../../features/AddNewTable/constants'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { IUserData } from '../user/userSlice'

const useStyles = makeStyles(theme => ({
  textInput: {
    width: '400px',
    marginBottom: '20px'
  },
  inputColor: {
    borderColor: theme.palette.text.primary
  },
}))

export interface ISearchUserInput {
  isMultiple: boolean,
  onUsersLoad: (users: IUserData[]) => void,
  width?: string | number
}
export const SearchUserInput: React.FC<ISearchUserInput> = ({ isMultiple, onUsersLoad, width }) => {
  const dispatch = useDispatch()
  const [tableMembers, setTableMembers] = useState<IUserData[]>([]) // <-- added members
  const [membersList, setMembersList] = useState<IUserData[]>([]) // <-- searched members
  const [searchMembersInputValue, setSearchMembersInputValue] = useState('')
  const [isMemberInputLoading, setIsMemberInputLoading] = useState(false)
  const currentUserId = useSelector(getUserId)
  const token = useSelector(getToken)
  const styles = useStyles()
  const theme = useTheme()

  const handleMemberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchMembersInputValue(e.target.value)
  }
  const handleTableMembersChange = (_: any, newValue: any) => {
    if (!Array.isArray(newValue)) {
      setTableMembers(newValue)
      onUsersLoad(newValue)
      return
    }
    const filteredMembers = getUniqueArr(newValue)
    setTableMembers(filteredMembers)
    onUsersLoad(filteredMembers)
  }
  const renderMembersInput = (params: any) => {
    return <TextField
      {...params}
      style={{
        width
      }}
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
  const membersListLoaded = (members: IUserData[]) => {
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
    throttlesSearchUsers(searchMembersInputValue, token)
      .then(members => removeCurrentUserFromSearchList(members, currentUserId))
      .then(membersListLoaded)
      .catch(membersListError)
  }

  useEffect(() => {
    if (searchMembersInputValue.length >= 3) {
      loadMembersList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchMembersInputValue])

  return (
    <Autocomplete
      multiple={isMultiple}
      freeSolo={!isMultiple}
      value={tableMembers}
      onChange={handleTableMembersChange}
      options={membersList}
      getOptionLabel={(option: IUserData) => option.email || ''}
      renderTags={isMultiple ? (tagValue, getTagProps) => tagValue.map((option, index) => (
        <Chip
          label={option.email}
          {...getTagProps({ index })}
        />
      )) : undefined}
      color="primary"
      renderInput={renderMembersInput}
      loading={isMemberInputLoading}
    />
  )
}

export default SearchUserInput
