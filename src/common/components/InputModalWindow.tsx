import React from 'react';
import { Button, Modal, TextField, Paper } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'

interface IModalWindow {
  isOpen: boolean,
  onClose: () => void,
  inputValue: string | number,
  inputTitle: string,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onSubmit: () => void,
  renderInput?: () => void
}

const useStyles = makeStyles(theme => ({
  addCardModalWrapper: {
    width: '250px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    background: theme.palette.background.paper,
    borderRadius: '5px',
    padding: '20px',
  },
  addCardInput: {
    width: '100%',
    marginBottom: '10px'
  },
  addCardButton: {
    width: '100%'
  },
  inputBorder: {
    borderColor: theme.palette.primary.main
  }
}))

const InputModalWindow: React.FC<IModalWindow> = ({
  isOpen,
  onClose,
  inputValue,
  inputTitle,
  handleChange,
  onSubmit,
  renderInput
}) => {
  const styles = useStyles()
  const theme = useTheme()

  return (
    <Paper>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={styles.addCardModalWrapper}>
          {
            renderInput
              ? renderInput()
              : <TextField
                id="email"
                required
                color="secondary"
                label={inputTitle}
                variant="outlined"
                className={styles.addCardInput}
                value={inputValue}
                onChange={handleChange}
                InputLabelProps={{
                  style: {
                    color: theme.palette.text.primary
                  }
                }}
                InputProps={{
                  classes: {
                    notchedOutline: styles.inputBorder
                  }
                }}
              />
          }
          <Button
            variant="contained"
            className={styles.addCardButton}
            disableElevation
            onClick={onSubmit}
          >Добавить</Button>
        </div>
      </Modal>
    </Paper>
  )
}

export default InputModalWindow
