import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getUserState } from '../../common/user/selectors'
import BoardLink from '../../common/components/BoardLink'

const UserPage = () => {
  const userState = useSelector(getUserState)

  if (!userState.id) return <Redirect to="/login" />

  return (
    <div>
      {userState.registeredInBoards.map(boardLink => <BoardLink
        key={boardLink.id}
        linkId={boardLink.id}
        isUserLink={true}
      />)}
    </div>
  )
}

export default UserPage
