import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUserState } from '../../common/user/selectors'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  boardLink: {
    display: 'block',
    width: '200px',
    height: '100px',
    borderRadius: '12px',
    textDecoration: 'none',
    textAlign: 'center',
    lineHeight: '100px'
  }
})

const UserPage = () => {
  const userState = useSelector(getUserState)
  const styles = useStyles()

  if (!userState.id) return <Redirect to="/login" />

  return (
    <div>
      {userState.registeredInBoards.map(boardLink => <Link
        key={boardLink.id}
        to={`/board/${boardLink.id}`}
        className={styles.boardLink}
        style={{
          background: boardLink.background
        }}
      >{boardLink.name}</Link>)}
    </div>
  )
}

export default UserPage
