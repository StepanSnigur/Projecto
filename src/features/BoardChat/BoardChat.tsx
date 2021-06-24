import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Modal,
  Slide,
  TextField,
  IconButton,
  Paper,
  makeStyles,
  createStyles
} from '@material-ui/core'
import { initSendMessage, setBoardChatOpen } from './boardChatSlice'
import { getBoardChatState } from './selectors'
import { getUserState } from '../../common/user/selectors'
import SendIcon from '@material-ui/icons/Send'
import ChatMessage from '../../common/components/ChatMessage'

const useStyles = makeStyles(theme => createStyles({
  modalWindowContent: {
    boxSizing: 'border-box',
    display: 'flex',
    width: '40%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '0',
    right: '0',
    outline: 'none',
    borderRadius: '5px 0 0 5px',
    padding: '0 80px'
  },
  sendMessageWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '25px'
  },
  textInput: {
    width: '300px'
  },
  messagesList: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '700px',
    overflowY: 'auto'
  },
}))

const BoardChat = () => {
  const dispatch = useDispatch()
  const boardChatState = useSelector(getBoardChatState)
  const userState = useSelector(getUserState)
  const [message, setMessage] = useState('')
  const styles = useStyles()
  const messagesListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // wait until opening animation ends
    setTimeout(() => {
      const messagesListEl = messagesListRef.current
      if (messagesListEl) {
        messagesListEl.scroll({
          top: messagesListEl.scrollHeight,
          behavior: 'smooth'
        })
      }
    }, 0)
  }, [messagesListRef, boardChatState])

  const handleClose = () => {
    dispatch(setBoardChatOpen(false))
  }

  const handleMessageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }
  const handleSendMessage = () => {
    dispatch(initSendMessage(message))
    setMessage('')
  }

  return (
    <Modal
      open={boardChatState.isOpen}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Slide direction="left" in={boardChatState.isOpen}>
        <Paper className={styles.modalWindowContent}>
          <div className={styles.messagesList} ref={messagesListRef}>
            {boardChatState.messages.map(message => (
              <ChatMessage
                key={message._id}
                text={message.content}
                from={message.sender}
                time={message.sendedAt}
                fromCurrentUser={message.sender === userState.email}
              />
            ))}
          </div>
          <div className={styles.sendMessageWrapper}>
            <TextField
              placeholder="Сообщение"
              className={styles.textInput}
              onChange={handleMessageInputChange}
              value={message}
            />
            <IconButton onClick={handleSendMessage} color="secondary">
              <SendIcon />
            </IconButton>
          </div>
        </Paper>
      </Slide>
    </Modal>
  )
}

export default BoardChat
