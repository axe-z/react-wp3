import React, { Component } from "react";
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';

import { Provider, connect } from 'react-redux'

import configureStore from './store/configureCombineStore'; //store Redux
import { addExpense, removeExpense, editExpense } from './actions/expenses' //expenses Actions
import {
    setTextFilter,
    setSortByFilter,
    setSortByDate,
    setSortByAmount,
    setStartDate,
    setEndDate
} from './actions/filters' //filter Actions
import getVisibleExpenses from './selectors/expensesSorting'

//DB execute connection
import './firebase/firebase.js';


import 'normalize.css/normalize.css';
import './style/styles.scss';

const store = configureStore();


const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    // const visibleExpenses = getVisibleExpenses(state.expenses, state.filters); //execute le filtre
    //console.log(visibleExpenses); //juste voir eux filtrés
    // console.log('ca bouge ', state) // voir tout , sans filter
});



//Data TEst
/*store.dispatch(addExpense({description: 'facture loyer', note: 'outch', amount: 1280, createdAt: Date.now() }));
store.dispatch(addExpense({description: 'facture electricité', note: 'super', amount: 70, createdAt:  Date.now() }));
store.dispatch(addExpense({description: 'facture loyer', note: 'outch', amount: 1290, createdAt: Date.now() }));
*/
//filtre test
//store.dispatch(setTextFilter('facture')); // VALEUR PAR DEFAUT
//   store.dispatch(setSortByFilter('date'));
//   store.dispatch(setSortByFilter('amount'));


const wrapProvider = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);



ReactDOM.render(wrapProvider, document.getElementById('app'));
