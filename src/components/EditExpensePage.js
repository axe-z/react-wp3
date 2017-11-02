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




/*export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  };
  onRemove = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  };
  render() {
    return (
      <div>
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={this.onSubmit}
        />
        <button onClick={this.onRemove}>Remove</button>
      </div>
    );
  }
};

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
*/
