import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import RegistrationPage from '../pages/RegistrationPage'
import BoardPage from '../pages/BoardPage'

const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/" exact render={() => <div>test</div>} />
      <Route path="/registration" component={RegistrationPage} />
      <Route path="/board/:id" render={({ match }) => {
        const { id } = match.params
        return <BoardPage boardId={id} />
      }}/>
    </Switch>
  </Router>
)

export default AppRouter
