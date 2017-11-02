import React, {Component} from "react";
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm.js'
import {startEditExpense , removeExpense, startRemoveExpense } from '../actions/expenses.js'



const EditExpensePage = (props) => {
  //console.log(props.expense  );
  return (
    <div>
      {/* {props.match.params.id} */}
      <ExpenseForm
        expense={props.expense}
        onSubmit={expense => {
          //console.log(expense)
          props.dispatch(startEditExpense(props.expense.id, expense));
          props.history.push('/dashboard');
        }}
      />
      <button
        onClick={() => {
           console.log( props.expense.id )
          props.dispatch(startRemoveExpense(props.expense.id));
          props.history.push('/dashboard');
        }}
      >
        Retirer
      </button>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(expense => {
      return expense.id === props.match.params.id;
    })
  };
};



export default connect(mapStateToProps)(EditExpensePage)
