import React, {Component} from "react";

import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Expensify</h1>
    <nav>
      <NavLink to="/" activeClassName="is-active" exact={true}>ACCUEIL</NavLink>
      <NavLink to="/create" activeClassName="is-active">AJOUT DE DEPENSES</NavLink>
      {/* <NavLink to="/edit" activeClassName="is-active">EDIT</NavLink> */}
      <NavLink to="/help" activeClassName="is-active">AIDE</NavLink>
    </nav>
  </header>
);
export default Header
