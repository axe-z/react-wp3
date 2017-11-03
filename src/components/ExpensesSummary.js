import React from 'react';
import { connect } from 'react-redux';
import getExpensesTotal from '../selectors/expenses-total'
import getVisibleExpenses from '../selectors/expensesSorting'
import numeral from 'numeral'
import { Link } from 'react-router-dom';

const ExpensesSummary = ({expenseCount, expensesTotal}) => {
const depenseMont = expenseCount.length !== 1 ? 'dépenses' : 'dépense';
const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');
return (
  <div className="page-header">
    <div className="content-container">

    <h1  className="page-header__title">Ici nous avons<span> {expenseCount}</span>  {depenseMont} pour un total de <span> {formattedExpensesTotal}</span> </h1>
    <div className="page-header__actions">
      <Link className="button" to="/create">Ajouter une Dépense</Link>
    </div>
  </div>
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
