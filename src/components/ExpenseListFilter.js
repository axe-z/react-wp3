import 'react-dates/initialize';
import React, {Component} from "react";
import { connect } from 'react-redux';
import {setTextFilter , setSortByFilter, setStartDate, setEndDate} from '../actions/filters.js'



import moment from 'moment'
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
moment.locale('fr-ca');

class ExpenseListFilter extends React.Component {
//const ExpenseListFilter = (props) => {
  constructor (props){
   super(props)
   this.state = {
    // startDate: props.filters.startDate,
    // endDate: props.filters.endDate,
     calendarFocused: null,
    }
  }
  // console.log(props)  //{filters: {…}, dispatch: ƒ}
   //console.log(props.filters.startDate)
onDatesChange = ({ startDate, endDate }) =>  {
   this.props.dispatch(setStartDate(startDate));
   this.props.dispatch(setEndDate(endDate));
  }

onFocusChange = (calendarFocused) =>  {
  this.setState({ calendarFocused });
}
     render() {
return (
  <div>
    <br />
    <input
      type="text"
      value={this.props.filters.text}
      onChange={e => {
        this.props.dispatch(setTextFilter(e.target.value));
      }}
    />
    <select
      onChange={e => {
        //  console.log('choix:', e.target.value);
        this.props.dispatch(setSortByFilter(e.target.value));
      }}
    >
      <option value="date">Date</option>
      <option value="amount">Montant</option>
    </select>
    <DateRangePicker
      startDate={this.props.filters.startDate}
      endDate={this.props.filters.endDate}
      isOutsideRange={() => false}
      numberOfMonths={1}
      showClearDates={true}
      onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
      focusedInput={this.state.calendarFocused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
      onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
    />
  </div>
);
};
};

const mapStateToProps = (state) => {
 return {
  filters: state.filters
 }
}

export default connect(mapStateToProps, null)(ExpenseListFilter)
