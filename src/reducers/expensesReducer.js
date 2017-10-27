//REDUCER POUR EXPENSES

const expenseReducerDefaultState = [];

const expensesReducer = (state = expenseReducerDefaultState, action) => {
 switch (action.type) {
   case "ADD_EXPENSE":
   //return  state.concat(action.expense)
   return [...state, action.expense]
   case "REMOVE_EXPENSE":
   return state.filter(({id}) => {
     return id !== action.id
   });
   case "EDIT_EXPENSE":
   //console.log(action.updates)//{amount: 555}
   return state.map((expense) => {
    if(expense.id === action.id) {
      return {
        ...expense, ...action.updates
      }
    } else {
      return expense
    }
  });
   default:
     return state
 }
};

export default expensesReducer;
