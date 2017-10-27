///////////////////////////////////////////////////////////////////////////////////////////////
                              ///UUID - comment generer des IDs/////
///////////////////////////////////////////////////////////////////////////////////////////////
https://www.npmjs.com/package/uuid

npm install --save uuid
yarn add uuid

import uuid from 'uuid';


const addExpense = ({description = '', note = '', amount = 0, createdAt = 0 }) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  }
});



const expenseReducer = (state = expenseReducerDefaultState, action) => {
 switch (action.type) {
   case "ADD_EXPENSE":
   return {
     state : ...state
   }
   default:
     return state
 }
};
