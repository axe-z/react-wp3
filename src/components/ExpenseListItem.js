import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment'
moment.locale('fr-ca');
import numeral from 'numeral'

const ExpenseListItem = ({ id, description, amount, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`} >
      <h3>{description} </h3>
    </Link>
    <p>
      {numeral(amount / 100).format('$0,0.00')} -
       {moment(createdAt).format('D MMMM, YYYY')}
    </p>
  </div>
 );


export default ExpenseListItem
