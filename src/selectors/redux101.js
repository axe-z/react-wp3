import { createStore } from 'redux';


// Action generators - functions that return action objects

const incrementCount = ({ incrementPar = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementPar
});

const decrementCount = ({ diminuePar = 1 } = {}) => ({
  type: 'DIMINUE',
  diminuePar
});

const setCount = ({ count }) => ({
  type: 'SET',
  count
});

const resetCount = () => ({
  type: 'RESET'
});

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementPar
      };
    case 'DIMINUE':
      return {
        count: state.count - action.diminuePar
      };
    case 'SET':
      return {
        count: action.count
      };
    case 'RESET':
      return {
        count: 0
      };
    default:
      return state;
  }
};


const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
 const state = store.getState();
 console.log('Nouveau state', state);
});


store.dispatch(incrementCount({ incrementPar: 5 }))

store.dispatch(incrementCount());

store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({ diminuePar: 10 }));

store.dispatch(setCount({ count: -100 }));
