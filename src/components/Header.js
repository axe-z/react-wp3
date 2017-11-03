import React, {Component} from "react";
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth.js';
import {  Link } from 'react-router-dom';



export const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>bud-z</h1>
        </Link>
        <button className="button button--link" onClick={startLogout}>Fermer</button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => {
  return {
    startLogout: () => dispatch(startLogout())
  }
};


export default connect(undefined, mapDispatchToProps)(Header);
