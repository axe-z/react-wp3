import React, {Component} from "react";
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth.js';

const style = {
  backgroundColor: '#4c85af', /* Green */
  border: 'none',
  color: 'white',
  padding: '15px 152px',
  margin: '5px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px'
}


const LoginPage = ({startLogin}) => {
 return (
    <div>
      <button style={style}
        onClick={ startLogin }>LOGIN</button>
    </div>
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    startLogin: () => dispatch(startLogin())
  }
};

export default connect(undefined, mapDispatchToProps)(LoginPage);
