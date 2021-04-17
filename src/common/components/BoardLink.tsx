import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fireSetError } from '../../features/ErrorManager/actions'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import boardApi from '../../api/boardApi'

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
    lineHeight: '100px'
  }
})

interface IBoardLink {
  linkId: string,
  isUserLink?: boolean
}
export const BoardLink: React.FC<IBoardLink> = ({ linkId, isUserLink = false }) => {
  const dispatch = useDispatch()
  const styles = useStyles()
  const [boardLink, setBoardLink] = useState({
    background: '#eee',
    name: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const loadLinkData = async () => {
    try {
      setIsLoading(true)
      const linkData = await boardApi.getBoard(linkId)
      setBoardLink({
        name: linkData?.name,
        background: linkData?.backgroundImage || '#eee'
      })
    } catch (e) {
      dispatch(fireSetError(e.message))
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadLinkData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) return (
    <div
      className={isUserLink ? styles.boardLink : styles.sidebarItem}
      style={{
        background: boardLink.background
      }}
    >
      loading
    </div>
  )
  if (error) {
    <div
      className={isUserLink ? styles.boardLink : styles.sidebarItem}
      style={{
        background: boardLink.background
      }}
    >
      {error}
    </div>
  }
  return (
    <Link
      to={`/board/${linkId}`}
      className={isUserLink ? styles.boardLink : styles.sidebarItem}
      style={{
        background: boardLink.background
      }}
      title={isUserLink ? '' : boardLink.name}
    >{isUserLink ? boardLink.name : ''}</Link>
  )
}

export default BoardLink
