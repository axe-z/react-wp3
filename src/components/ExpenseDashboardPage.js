import React, {Component} from "react";
import ExpenseList from './ExpenseList';
import ExpenseListFilter from './ExpenseListFilter';
 
const ExpenseDashboardPage = (props) => (
 <div>

   <ExpenseListFilter />
   <ExpenseList />

 </div>
);




export default ExpenseDashboardPage
