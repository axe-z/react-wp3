import React from 'react';
import { connect } from 'react-redux';
import getExpensesTotal from '../selectors/expenses-total'
import getVisibleExpenses from '../selectors/expensesSorting'
import numeral from 'numeral'

const ExpensesSummary = ({expenseCount, expensesTotal}) => {
const depenseMont = expenseCount.length !== 1 ? 'dépenses' : 'dépense';
const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');
return (
  <div>
    <h1>Ici nous avons {expenseCount} {depenseMont} pour un total de {formattedExpensesTotal}</h1>
  </div>
  )
};


const mapStateToProps = (state) => {
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters) //retourne ceux qui sont dans les dates.

  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: getExpensesTotal(visibleExpenses)
  };
};


export default connect(mapStateToProps)(ExpensesSummary);
