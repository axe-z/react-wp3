
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



//LUI PASSE UN OBJ
export const removeExpense = (id) => ({
  type: "REMOVE_EXPENSE",
  id
});

export const startRemoveExpense = (id) => {
  return (dispatch) => {
    db.ref(`expenses/${id}`).remove()
    .then(() => {
       return dispatch(removeExpense(id))
    }).catch((e) => {
      console.log(e)
    });
  };
}




export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

export const startEditExpense = (id, updates) => {
  return dispatch => {
    //   db.ref(`expenses/${id}`).set({
    //     ...updates
    //   });
    //   dispatch(editExpense(id, updates))
    // };

    return db
      .ref(`expenses/${id}`)
      .update({
        ...updates
      })
      .then(() => dispatch(editExpense(id, updates))); //pas vraiment besoin du then
  };
};


export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});


export const startSetExpenses = () => {
  return dispatch => {
    return db
      .ref('expenses') // donne un then l autre bord
      .once('value')
      .then(data => {
        const expenses = []; //on se creer un array
        data.forEach(childSnapshot => {
          //on push pour l array
          expenses.push({
            id: childSnapshot.key, //id
            ...childSnapshot.val() //spread le reste de valeurs
          });
        });
        dispatch(setExpenses(expenses)); //dispatch
      })
      .catch(e => {
        console.log(e);
      });
  };
};
