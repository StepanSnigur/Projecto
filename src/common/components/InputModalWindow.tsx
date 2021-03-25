import React from 'react';
import { Button, Modal, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

interface IModalWindow {
  isOpen: boolean,
  onClose: () => void,
  inputValue: string | number,
  inputTitle: string,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onSubmit: () => void
}

const useStyles = makeStyles({
  addCardModalWrapper: {
    width: '250px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    background: '#f4f5f7',
    borderRadius: '5px',
    padding: '20px',
  },
  addCardInput: {
    width: '100%',
    marginBottom: '10px'
  },
  addCardButton: {
    width: '100%'
  }
})

const InputModalWindow: React.FC<IModalWindow> = ({
  isOpen,
  onClose,
  inputValue,
  inputTitle,
  handleChange,
  onSubmit
}) => {
  const styles = useStyles()

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={styles.addCardModalWrapper}>
          <TextField
            id="email"
            required
            label={inputTitle}
            variant="outlined"
            className={styles.addCardInput}
            value={inputValue}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            className={styles.addCardButton}
            disableElevation
            onClick={onSubmit}
          >Добавить</Button>
        </div>
      </Modal>
    </div>
  )
}

export default InputModalWindow
