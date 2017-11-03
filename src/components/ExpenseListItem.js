import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment'
moment.locale('fr-ca');
import numeral from 'numeral'

const ExpenseListItem = ({ id, description, amount, createdAt }) => (

    <Link to={`/edit/${id}`} className="list-item" >
    <div>
      <h3 className="list-item__title">{description}</h3>
      <span className="list-item__sub-title">{moment(createdAt).format('MMMM Do, YYYY')}</span>

  </div>
  <h3>
    {numeral(amount / 100).format('$0,0.00')} -
     {moment(createdAt).format('D MMMM, YYYY')}
  </h3>

   </Link>
 );


export default ExpenseListItem
