
import uuid from 'uuid';

/*** action creator EXPENSES ***/
export const addExpense = ({description = '', note = '', amount = 0, createdAt = 0 }) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  }
});

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
