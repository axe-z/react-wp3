import React from "react";
import { connect } from 'react-redux';
 import {  Route, Redirect } from 'react-router-dom';




const PublicRoute = ({isAuthenticated, component: Component , ...reste}) => {
  return (
     <Route {...reste} component={() => (
       isAuthenticated ? (
         <Redirect to="/dashboard" />
       ) : (
            <Component {...reste} />
        )
     )}/>
   )
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated:  state.auth.uid ? true : false       //OU !!state.auth.uid
  }
};

export default connect(mapStateToProps)(PublicRoute);
