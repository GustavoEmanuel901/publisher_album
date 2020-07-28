import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom'

import Logon from './pages/Logon'
import Register from './pages/Register'
import TermsAndConditions from './pages/TermsAndConditions'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Profile from './pages/Profile'

export default function Routes() {
  return (
      <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Logon}/>
            <Route path='/register' component={Register}/>
            <Route path='/terms_and_conditions' component={TermsAndConditions}/>
            <Route path='/forgot_password' component={ForgotPassword}/>
            <Route path='/reset_password' component={ResetPassword}/>
            <Route path='/profile' component={Profile}/>
        </Switch>
      </BrowserRouter>
  )
}

