import React, { Component } from "react";
import ReactDOM from 'react-dom';
import AppRouter, { history } from './routers/AppRouter';
import LoadingPage from './components/LoadingPage';
import { Provider  } from 'react-redux'

import configureStore from './store/configureCombineStore'; //store Redux
import { startSetExpenses } from './actions/expenses' //expenses Actions

import { login, logout } from './actions/auth';

import getVisibleExpenses from './selectors/expensesSorting'
import 'react-dates/lib/css/_datepicker.css';
//DB execute connection
import { firebase } from './firebase/firebase.js';
// import  './firebase/firebase.js';


import 'normalize.css/normalize.css';
import './style/styles.scss';

const store = configureStore();


let unsubscribe = store.subscribe(() => {
  var state = store.getState();
  //console.log('state ->', state);
});

const wrapProvider = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false ;

const renderApp = () => {
  if(!hasRendered){
    ReactDOM.render(wrapProvider, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));


//
firebase.auth().onAuthStateChanged((user) => {
 if(user) {
   //console.log(user.uid)
   store.dispatch(login(user.uid))
   store.dispatch(startSetExpenses()).then(() => {

    renderApp()
    if(history.location.pathname === '/'){
      history.push('/dashboard');
    }
    });
 } else {
    store.dispatch(logout())
    renderApp()
    history.push('/');
 }
});

 
