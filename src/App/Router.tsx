import React from 'react'
import { useSelector } from 'react-redux'
import { getUserState } from '../common/user/selectors'
import { useLocation } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { isOnBoardPage } from '../common/utils/routes'

import LandingPage from '../pages/LandingPage'
import RegistrationPage from '../pages/RegistrationPage'
import LoginPage from '../pages/LoginPage'
import BoardPage from '../pages/BoardPage'
import Header from '../features/Header'
import Sidebar from '../features/Sidebar'
import UserPage from '../pages/UserPage'
import AddNewTable from '../features/AddNewTable'

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
  const userState = useSelector(getUserState)
  const styles = useStyles({
    isLogged: !!userState._id,
    onBoardPage: isOnBoardPage(location.pathname)
  })

  return (
    <>
      <Route path="/board" component={Sidebar} />
      <Route path={['/user', '/board/:id']} component={AddNewTable} />
      <div className={styles.contentWrapper}>
        <Header />
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/registration" component={RegistrationPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/board/:id" render={({ match }) => {
            const { id } = match.params
            return <BoardPage boardId={id} />
          }}/>
          <Route path="/user" component={UserPage} />
        </Switch>
      </div>
    </>
  )
}

export default AppRouter
