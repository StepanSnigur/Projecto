import React from 'react'
import { useLocation } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'

import RegistrationPage from '../pages/RegistrationPage'
import LoginPage from '../pages/LoginPage'
import BoardPage from '../pages/BoardPage'
import Header from '../features/Header'
import Sidebar from '../features/Sidebar'

interface IContentWrapperProps {
  isLogged: boolean,
  onBoardPage: boolean
}
const useStyles = makeStyles({
  contentWrapper: (props: IContentWrapperProps) => ({
    paddingLeft: (props.isLogged && props.onBoardPage)
      ? '60px'
      : '0'
  })
})

const AppRouter = () => {
  const location = useLocation()
  const styles = useStyles({
    isLogged: true,
    onBoardPage: location.pathname.split('/').includes('board')
  })

  return (
    <>
      <Route path="/board" component={Sidebar} />
      <div className={styles.contentWrapper}>
        <Header />
        <Switch>
          <Route path="/" exact render={() => <div>test</div>} />
          <Route path="/registration" component={RegistrationPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/board/:id" render={({ match }) => {
            const { id } = match.params
            return <BoardPage boardId={id} />
          }}/>
        </Switch>
      </div>
    </>
  )
}

export default AppRouter
