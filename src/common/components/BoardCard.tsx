import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

interface IBoardCard {
  title: string
}

const useStyles = makeStyles({
  wrapper: {
    padding: '6px 7px',
    margin: '0 10px',
    marginBottom: '5px',
    borderRadius: '7px',
    cursor: 'pointer',
    transition: '.3s',

    '&:last-child': {
      marginBottom: '0'
    },
    '&:hover': {
      background: '#fff'
    }
  }
})

const BoardCard: React.FC<IBoardCard> = ({ title }) => {
  const styles = useStyles()

  return (
    <div className={styles.wrapper}>
      {title}
    </div>
  )
}

export default BoardCard
