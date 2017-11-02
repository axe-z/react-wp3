import React from "react";
import { connect } from 'react-redux';
 import {  Route, Redirect } from 'react-router-dom';
import Header from '../components/Header.js';

{/* <PrivateRoute path="/edit/:id" component={EditExpensePage} /> */}

const PrivateRoute = ({isAuthenticated, component: Component , ...reste}) => {
 return (

    <Route {...reste} component={(props) => (
      isAuthenticated ? (
        <div>
           <Header />
           <Component {...props} />
         </div>
      ) : (
        <Redirect to="/" />
       )
    )}/>
  )
};


const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.uid ? true : false       //OU !!state.auth.uid
  }
};

export default connect(mapStateToProps)(PrivateRoute);
