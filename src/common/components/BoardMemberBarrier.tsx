import React from 'react'
import { makeStyles, createStyles, Paper } from '@material-ui/core'

const useStyles = makeStyles(theme => createStyles({
  wrapper: {
    height: '100vh',
    lineHeight: '100vh',
    textAlign: 'center',
    background: theme.palette.secondary.dark
  }
}))

const BoardMemberBarrier = () => {
  const styles = useStyles()

  return (
    <Paper className={styles.wrapper} square>
      Вы не являетесь учасником данной таблицы, войдите в аккаунт
    </Paper>
  )
}

export default BoardMemberBarrier
