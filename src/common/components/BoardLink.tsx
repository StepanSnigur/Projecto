import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { initUpdateSidebarLink } from '../../features/Sidebar/sidebarSlice'
import { IExtendedBoardLink } from '../../features/Sidebar/sidebarSlice'

const useStyles = makeStyles({
  sidebarItem: {
    width: '48px',
    height: '48px',
    borderRadius: '10px',
    background: '#2c86ff', // 2c86ff
    cursor: 'pointer',
    marginTop: '12px',
    textAlign: 'center',
    lineHeight: '60px'
  },
  boardLink: {
    display: 'block',
    width: '200px',
    height: '100px',
    borderRadius: '12px',
    textDecoration: 'none',
    textAlign: 'center',
    lineHeight: '100px',
    border: '1px solid #afbcc5',
    justifySelf: 'center'
  }
})

interface IBoardLink {
  isUserLink?: boolean,
  idx: number,
  linkData: IExtendedBoardLink
}
export const BoardLink: React.FC<IBoardLink> = ({ isUserLink = false, idx, linkData }) => {
  const dispatch = useDispatch()
  const styles = useStyles()

  const loadLinkData = async () => {
    !linkData.name && dispatch(initUpdateSidebarLink({
      id: linkData.boardId,
      position: idx
    }))
  }

  useEffect(() => {
    loadLinkData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (linkData.isLoading) return (
    <div
      className={isUserLink ? styles.boardLink : styles.sidebarItem}
      style={{
        background: linkData.background
      }}
    >
      loading
    </div>
  )
  if (false) {
    <div
      className={isUserLink ? styles.boardLink : styles.sidebarItem}
      style={{
        background: linkData.background
      }}
    >
      {'error'}
    </div>
  }
  return (
    <Link
      to={`/board/${linkData.boardId}`}
      className={isUserLink ? styles.boardLink : styles.sidebarItem}
      style={{
        background: linkData.background
      }}
      title={isUserLink ? '' : linkData.name}
    >{isUserLink ? linkData.name : ''}</Link>
  )
}

export default BoardLink
