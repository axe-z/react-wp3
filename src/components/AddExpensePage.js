import React, {Component} from "react";
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm.js'

import { addExpense } from '../actions/expenses.js'

const AddExpensePage = (props) => {
  return (
    <div>
      <h1>Ajout de depense</h1>
      <ExpenseForm
        onSubmit={(expense) => {
          // console.log(expense)
           props.dispatch(addExpense(expense))
           props.history.push('/');
        }
      }/>
    </div>
  );
};

export default connect()(AddExpensePage)
