
import uuid from 'uuid';
import db from '../firebase/firebase';

/*** action creator EXPENSES ***/
// export const addExpense = ({description = '', note = '', amount = 0, createdAt = 0 }) => ({
//   type: "ADD_EXPENSE",
//   expense: {
//     id: uuid(),
//     description,
//     note,
//     amount,
//     createdAt,
//   }
// });

//DEVIENT
export const addExpense = (expense) => ({
  type: "ADD_EXPENSE",
  expense : expense
});

//thunk
export const startAddExpense  = (expenseData = {}) => {  //ICI ON PASSERA LES DEFAULTS DE ADDEXPENSE
  return (dispatch) => {
    const {description = '', note = '', amount = 0, createdAt = 0 } = expenseData;
    const expense = {description, note, amount, createdAt}; //ceci contien les defaults on les prend des const fait
  return db.ref('expenses').push(expense)
    .then((data) => {
      dispatch(addExpense({
        id: data.key,     //ID DE FIREBASE
        ...expense        //le reste des key value
      }))
    }).catch((e) => {
      console.log(e)
    });
  };
};

//const removeExpense = ({id} = {}) => ({
export const removeExpense = (id) => ({
  type: "REMOVE_EXPENSE",
  // expense: {
  //   id
  // }
  id
});


export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});
