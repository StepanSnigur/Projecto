import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getUserId } from '../../common/user/selectors'
import { getUserBoards } from '../../features/Sidebar/selectors'
import BoardLink from '../../common/components/BoardLink'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  linksWrapper: {
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: 'repeat(5, 202px)',
    gridRowGap: '20px',
    gridColumnGap: '20px',
    paddingTop: '30px'
  }
})

const UserPage = () => {
  const userId = useSelector(getUserId)
  const userBoards = useSelector(getUserBoards)
  const styles = useStyles()

  if (!userId) return <Redirect to="/login" />

  return (
    <div className={styles.linksWrapper}>
      {userBoards.map((boardLink, i) => <BoardLink
        key={boardLink._id}
        isUserLink={true}
        idx={i}
        linkData={boardLink}
      />)}
    </div>
  )
}

export default UserPage
