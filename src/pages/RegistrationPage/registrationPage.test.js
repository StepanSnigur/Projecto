import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import RegistrationPage from './RegistrationPage'

describe('Registration page', () => {
  const mockStore = configureStore()

  it('Correct render', () => {
    const initialState = {
      registrationPage: {
        errors: null
      }
    }
    const store = mockStore(initialState)
    render(
      <Provider store={store}>
        <RegistrationPage />
      </Provider>
    )
    expect(screen.getByText('Projecto')).toBeInTheDocument()
  })
  it('Correct render errors', () => {
    const errorMessage = 'error message'
    const initialState = {
      registrationPage: {
        errors: [errorMessage]
      }
    }
    const store = mockStore(initialState)
    render(
      <Provider store={store}>
        <RegistrationPage />
      </Provider>
    )
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })
})
