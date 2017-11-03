import 'react-dates/initialize';
import React from "react";

import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
moment.locale('fr-ca');

class ExpenseForm extends React.Component {
  constructor (props){
    super(props)
    this.state = {
       description: props.expense ? props.expense.description : '',
       note:  props.expense ? props.expense.note : '',
       amount:  props.expense ? (props.expense.amount / 100).toString() : '',
       createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
       calendarFocused: false,
       error: false
     };
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({description}));
  }
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({note}));
  }

  onAmountChange = (e) => {
    const amount = e.target.value
    if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
        this.setState(() => ({amount}))
    }
  }
  onDateChange = createdAt => {
    //console.log(createdAt); obj moment
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };

  onFocusChange = ({focused}) => {
    this.setState(() => ({calendarFocused: focused}));
  }

  onSubmit = (e) => {
    e.preventDefault();
    if(!this.state.description || !this.state.amount){
       this.setState(() => ({ error: true }));
    } else {
        this.setState((error) => ({ error: false }));

        this.props.onSubmit({   //on va ajuster le data au lieu de donner this.state
          description: this.state.description,
          note: this.state.note,
          amount: parseFloat(this.state.amount, 10) * 100, // 88$ devient 8800
          createdAt: this.state.createdAt.valueOf()  //redonne un timestamp
        });

    }
  };
  render() {
    return (
      <div>

      <form className="form" onSubmit={this.onSubmit}>
          {this.state.error ? <p className="form__error">svp ajouter description et montant</p> : '' }
        <input type="text"
          className="text-input"
          onChange={this.onDescriptionChange}
          placeholder="description" autoFocus value={this.state.description}/>
        <input type="number" placeholder="Montant"
          className="text-input"
          onChange={this.onAmountChange}
          value={this.state.amount} />
        <br/>

        <SingleDatePicker
          date={this.state.createdAt} // momentPropTypes.momentObj or null
          onDateChange={this.onDateChange} // PropTypes.func.isRequired
          focused={this.state.calendarFocused} // PropTypes.bool
          numberOfMonths={1}
          isOutsideRange={() =>  false}
          onFocusChange={this.onFocusChange}
        />
        <br/>
        <textarea onChange={this.onNoteChange}
          placeholder="Note sur la depense (optionnel)"
          className="textarea"
          value={this.state.note}
          cols="40" rows="05"></textarea>
        <br/>
        <button className="button">{ this.props.expense ? 'Enregistrer modifications' : 'Ajouter Depense'}</button>
      </form>
      </div>
    );
  }
}

export default ExpenseForm
