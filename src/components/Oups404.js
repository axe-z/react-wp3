import React, {Component} from "react";
import {  Link } from 'react-router-dom';

const Oups404 = () => (
 <div>
   <h1>Vous etes perdu! 404!</h1>
   <ul>
      <li><Link to="/">REVENIR</Link></li>
    </ul>
 </div>
);
export default Oups404
