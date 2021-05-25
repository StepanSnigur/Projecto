import Header from './Header'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux'
import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit'

describe('Header', () => {
  it('Should correctly render admin buttons', () => {
    const mockUserReducer = createSlice({
      name: 'mock user reducer',
      initialState: {
        email: 'mock email',
        nickName: '',
        registeredInBoards: [
          { boardId: 'mock board id', role: 'ADMIN' }
        ],
        _id: 'mock id',
        icon: null
      },
      reducers: {}
    })
    const mockBoardPageReducer = createSlice({
      name: 'mock board page reducer',
      initialState: {
        isLoading: false,
        isCardLoading: false,
        error: null,
        name: 'mock board',
        backgroundImage: null,
        assignedUsers: [],
        lists: [],
        actions: [],
        _id: 'mock board id',
        settings: {
          comments: 'disabled',
          isPrivate: 'false'
        }
      },
      reducers: {}
    })
    const rootReducer = combineReducers({
      user: mockUserReducer.reducer,
      boardPage: mockBoardPageReducer.reducer
    })
    const store = configureStore({ reducer: rootReducer })

    const history = createMemoryHistory()
    history.push('/board/mockBoard')
    const { getByRole } = render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>
    )
    const settingsButton = getByRole('settingsButton')
    expect(settingsButton).toBeInTheDocument()
  })
  it('Should correct render title', () => {
    const mockUserReducer = createSlice({
      name: 'mock user reducer',
      initialState: {
        email: 'mock email',
        nickName: '',
        registeredInBoards: [
          { id: 'mock board id', role: 'ADMIN' }
        ],
        id: 'mock id',
        icon: null
      },
      reducers: {}
    })
    const mockBoardPageReducer = createSlice({
      name: 'mock board page reducer',
      initialState: {
        isLoading: false,
        isCardLoading: false,
        error: null,
        name: 'mock board',
        backgroundImage: null,
        assignedUsers: [],
        lists: [],
        actions: [],
        id: 'mock board id',
        settings: {
          comments: 'disabled',
          isPrivate: 'false'
        }
      },
      reducers: {}
    })
    const rootReducer = combineReducers({
      user: mockUserReducer.reducer,
      boardPage: mockBoardPageReducer.reducer
    })
    const store = configureStore({ reducer: rootReducer })
    const history = createMemoryHistory()

    const { getByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>
    )
    expect(getByText('Projecto')).toBeInTheDocument()
  })
})
