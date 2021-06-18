import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  message: {
    position: 'relative',
    background: theme.palette.primary.dark,
    width: 'fit-content',
    maxWidth: '90%',
    minWidth: '80px',
    borderRadius: '8px',
    padding: '16px',
    paddingBottom: '18px',
    marginTop: '10px',
    overflow: 'hidden'
  },
  messageInfo: {
    position: 'absolute',
    top: '1px',
    left: '5px',
    margin: 0,
    padding: 0,
    opacity: .8
  },
  messageTime: {
    bottom: '3px',
    right: '5px',
    top: 'auto',
    left: 'auto'
  },
  currentUserMessage: {
    marginLeft: 'auto'
  }
}))

interface IChatMessage {
  text: string,
  from: string,
  time: string,
  fromCurrentUser?: boolean
}

const ChatMessage: React.FC<IChatMessage> = ({ text, from, time, fromCurrentUser }) => {
  const styles = useStyles()

  return (
    <div className={`${styles.message} ${fromCurrentUser ? styles.currentUserMessage : ''}`}>
      <h6 className={styles.messageInfo}>{from}</h6>
      {text}
      <h6 className={`${styles.messageInfo} ${styles.messageTime}`}>{time}</h6>
    </div>
  )
}

export default ChatMessage
