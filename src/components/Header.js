import React, {Component} from "react";
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth.js';
import { NavLink } from 'react-router-dom';

const style = {
  backgroundColor: '#4CAF50', /* Green */
  border: 'none',
  color: 'white',
  padding: '15px 32px',
  margin: '5px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px'
}
const style2 = {
  backgroundColor: '#838383', /* Green */
  float: 'right',
    padding: '15px 15px',
  marginRight: '25px',
//  borderRadius: '100%',
  //lineHeight:'12px',
  fontSize: '10px'
}

const Header = ({startLogout}) => (
  <header>
    <h1>Expensify</h1>
    <nav>
      <NavLink to="/dashboard" activeClassName="is-active" style={style}>DASHBOARD</NavLink>
      <NavLink to="/create" activeClassName="is-active"  style={style}>AJOUT DE DEPENSES</NavLink>
      <button style={{...style , ...style2 }} onClick={startLogout}>out</button>
    </nav>
  </header>
);

const mapDispatchToProps = (dispatch) => {
  return {
    startLogout: () => dispatch(startLogout())
  }
};


export default connect(undefined, mapDispatchToProps)(Header);
