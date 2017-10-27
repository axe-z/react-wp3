import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

/*** action creator  ***/
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

//const removeExpense = ({id} = {}) => ({
const removeExpense = (id) => ({
  type: "REMOVE_EXPENSE",
  // expense: {
  //   id
  // }
  id
});



const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// const setTextFilter = (text = '') => ({
//   type: 'SET_TEXT_FILTER',
//   payload: text
// });
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

const setSortByFilter = (val) => ({
  type: 'SET_SORT_BY_FILTER',
  val
})

const setSortByDate = (payload = "date") => ({
  type: "SET_SORT_BY_DATE",
  payload
})
//OU
const setSortByAmount = ( ) => ({
  type: "SET_SORT_BY_AMOUNT",
})


const setStartDate = (payload = undefined) => ({
  type: "SET_START_DATE",
  payload
})
const setEndDate = (payload = undefined) => ({
  type: "SET_END_DATE",
  payload
})

/*** default state  ***/


const expenseReducerDefaultState = [];
const filterReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};




/*** reducers  ***//*** reducers  ***//*** reducers  ***//*** reducers  ***/


const expenseReducer = (state = expenseReducerDefaultState, action) => {
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

const filterReducer = (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return { ...state, text: action.text };
    case 'SET_SORT_BY_FILTER':
      return { ...state, sortBy: action.val };
    case  "SET_SORT_BY_DATE":
    return { ...state, sortBy: action.payload };
    case  "SET_SORT_BY_AMOUNT":
    return { ...state, sortBy: 'amount' };
    case  "SET_START_DATE":
    return { ...state, startDate: action.payload };
    case  "SET_END_DATE":
        return { ...state, endDate: action.payload };
    default:
      return state;
  }
};


/*UNE FONCTION QUI MIXE LES DEUX
DONC ICI ON TEST LES OBJECT D UN ARRAY AVEC COMME CONDITION LES VALEURS DE L OBJECT FILTRE.
chaque changement de  state va passer par cette fonction qui prend l object expense et lui passe le filtre commandé et retourne ce qui est true.
startDateMatch si true, continue
endDateMatch si true, continue
textMatch si true, continue
et en ressort un array avec ceux qui on passé le test*/

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a,b) => {
    if(sortBy === 'date'){
      return a.createdAt > b.createdAt ? -1 :  1  //retourner 1 ou - 1
    }
     if(sortBy === 'amount'){
      return a.amount > b.amount ? 1 : -1  //plus gros montant first
    }
  //  return 0 pas de besoin 
    });
};


/*** store  ***/
const store = createStore(
  combineReducers({
    expenses: expenseReducer,
    filters: filterReducer
  })
);

const unsubscribe = store.subscribe(() => {
 const state = store.getState();
 const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
 console.log(visibleExpenses)
 //console.log(  state.expenses);
});
/*** store  ***/





/*** dispatch ***/
//add
const depenseUn = store.dispatch(addExpense({description: 'loyer', note: 'outch', amount: 800, createdAt: 20 }));
const depenseDeux = store.dispatch(addExpense({description: 'loyer2', note: 'super', amount: 1800, createdAt:  20 }));
///remove

// store.dispatch(removeExpense({id: depenseUn.expense.id }));
// store.dispatch(removeExpense(depenseUn.expense.id));
// //edit
//  store.dispatch(editExpense(depenseDeux.expense.id, { amount: 555 }));


 //filter text
//store.dispatch(setTextFilter('ffe'));
 // store.dispatch(setTextFilter());
//store.dispatch(setTextFilter('loyer2'));

//
// //filter Sortby
//  store.dispatch(setSortByFilter('date'));
//  store.dispatch(setSortByFilter('amount'));

//  //OU
// store.dispatch(setSortByDate());
// store.dispatch(setSortByAmount());

// ///StartDate EndDate
//   store.dispatch(setStartDate(-1500));
// store.dispatch(setStartDate());
 //store.dispatch(setEndDate(Date.now()));
// store.dispatch(setEndDate());

/*function compare(a, b) {
  if (a < b )
     return -1;
  if (a > b  )
     return 1;
  // a doit être égal à b
  return 0;
}

const arr = [10,25,15]
const arr2 = [100,205,50]
console.log(arr.sort())*/

///CE qu on vise a la fin
const demoState = {
  expenses: [{
    id:'gerhreh',
    description: 'loyer Novembre',
    note: 'ceci est le dernier paiement fait',
    amount: 120500,
    createdAt: 0
  }],
  filters: {
    text: 'loyer',
    sortBy: 'amount',            //ou date
    startDate: undefined,
    endDate: undefined
  }
}
