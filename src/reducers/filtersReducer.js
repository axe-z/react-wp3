///REDUCER POUR FILTERS
import moment from 'moment';
moment.locale('fr-ca');

const filterReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
};
const filtersReducer = (state = filterReducerDefaultState, action) => {
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
export default filtersReducer
