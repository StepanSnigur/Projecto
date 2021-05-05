import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initAddNewUser } from './registrationPageSlice'
import { getRegistrationPageState } from './selectors'

import { Box, Container, Button, TextField, IconButton } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'
import { Visibility, VisibilityOff } from '@material-ui/icons'

const useStyles = makeStyles(() => createStyles({
  headline: {
    fontSize: '50px',
    marginBottom: '45px'
  },
  formInput: {
    width: '100%',
    marginBottom: '20px'
  },
  formButton: {
    display: 'block',
    margin: '0 auto',
  },
  errorAlert: {
    marginBottom: '10px'
  },
  formContainer: {
    border: '1px solid #000',
    borderRadius: '20px',
    padding: '25px 30px 40px 30px'
  },
  formHeadline: {
    margin: '0',
    marginBottom: '30px',
    textAlign: 'center',
    color: '#5E6C84'
  },
  passwordInputWrapper: {
    position: 'relative',
    width: '334px'
  },
  passwordInputIcon: {
    position: 'absolute',
    top: 'calc(56px / 2)',
    right: '16px',
    transform: 'translateY(-50%)'
  }
}))

const RegistrationPage = () => {
  const dispatch = useDispatch()
  const registrationPageState = useSelector(getRegistrationPageState)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordInputType, setPasswordInputType] = useState('password')
  const styles = useStyles()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(initAddNewUser({ email, password }))
  }
  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const changePasswordVisibility = () => {
    setPasswordInputType((prevType: string) => prevType === 'password' ? 'text' : 'password')
  }

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <h2 className={styles.headline}>Projecto</h2>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <h4 className={styles.formHeadline}>Зарегистрировать аккаунт</h4>
          <TextField
            id="email"
            required
            label="Email"
            variant="outlined"
            className={styles.formInput}
            value={email}
            onChange={handleEmailInputChange}
          />
          <div className={styles.passwordInputWrapper}>
            <TextField
              id="password"
              type={passwordInputType}
              required
              label="Пароль"
              variant="outlined"
              className={styles.formInput}
              value={password}
              onChange={handlePasswordInputChange}
            />
            <IconButton size="small" className={styles.passwordInputIcon} onClick={changePasswordVisibility}>
              {passwordInputType === 'password' ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </div>
          {registrationPageState.errors&& registrationPageState.errors.map((error: string, i: number) => (
            <Alert severity="error" className={styles.errorAlert} key={i}>{error}</Alert>
          ))}
          <Button
            type="submit"
            variant="contained"
            className={styles.formButton}
            disableElevation
            disabled={registrationPageState.isLoading}
          >Зарегистрироваться</Button>
        </form>
      </Box>
    </Container>
  )
}

export default RegistrationPage
