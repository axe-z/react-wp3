import React, {Component} from "react";

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

const Header = () => (
  <header>
    <h1>Expensify</h1>
    <nav>
      <NavLink to="/" activeClassName="is-active" exact={true}   style={style}>ACCUEIL</NavLink>
      <NavLink to="/create" activeClassName="is-active"  style={style}>AJOUT DE DEPENSES</NavLink>
      {/* <NavLink to="/edit" activeClassName="is-active">EDIT</NavLink> */}
      <NavLink to="/help" activeClassName="is-active" style={style}>AIDE</NavLink>
    </nav>
  </header>
);
export default Header
