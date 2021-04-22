import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getUserState } from '../../common/user/selectors'
import { getUserBoards } from '../../features/Sidebar/selectors'
import BoardLink from '../../common/components/BoardLink'

const UserPage = () => {
  const userState = useSelector(getUserState)
  const userBoards = useSelector(getUserBoards)

  if (!userState.id) return <Redirect to="/login" />

  return (
    <div>
      {userBoards.map((boardLink, i) => <BoardLink
        key={boardLink.id}
        isUserLink={true}
        idx={i}
        linkData={boardLink}
      />)}
    </div>
  )
}

export default UserPage
