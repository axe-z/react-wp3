
const getExpensesTotal = (expensesArr) => {
  if (expensesArr.length === 0) {
    return 0;
  }
  return expensesArr
    .map(expense => expense.amount)
    .reduce((accumulateur, valeurCourante) => accumulateur + valeurCourante, 0);
};




export default getExpensesTotal
