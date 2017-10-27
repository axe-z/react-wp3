import React, {Component} from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

import HelpPage from '../components/HelpPage.js'
import ExpenseDashboardPage from '../components/ExpenseDashboardPage.js'
import EditExpensePage from '../components/EditExpensePage.js'
import AddExpensePage from '../components/AddExpensePage.js'

import Oups404 from '../components/Oups404.js'
import Header from '../components/Header.js'



const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" exact={true} component={ExpenseDashboardPage} />
        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={Oups404} />
      </Switch>
    </div>
  </BrowserRouter>
)

 export default AppRouter
