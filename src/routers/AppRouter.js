import React, {Component} from "react";
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';

import LoginPage from '../components/LoginPage.js'

import ExpenseDashboardPage from '../components/ExpenseDashboardPage.js'
import EditExpensePage from '../components/EditExpensePage.js'
import AddExpensePage from '../components/AddExpensePage.js'

import PrivateRoute from './PrivateRoute.js'
import PublicRoute from './PublicRoute.js'


import Oups404 from '../components/Oups404.js'


import createHistory from 'history/createBrowserHistory'

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>

      <Switch>
        <PublicRoute path="/" exact={true} component={LoginPage} />
        <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        <Route component={Oups404} />
      </Switch>
    </div>
  </Router>
)

 export default AppRouter
