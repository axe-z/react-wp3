import React, {Component} from "react";
import ReactDOM from 'react-dom';

/*
//regulier stateless
const Info = (props) => (
 <div>
   <h1>Info</h1>
   <p>l'info est : {props.info}</p>
 </div>
);

//HOC higher order component :
//avecAdminWarning est une function reguliere et pas vraiment un component
//function reguliere qui retourne une fonction

const avecAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <p>Ceci est de l info privee, ne pas partager si vous n etes pas admin</p>}
      <WrappedComponent  {...props} />
    </div>
  );
};


const AdminInfo = avecAdminWarning(Info)


ReactDOM.render(<AdminInfo isAdmin={true} info='Benoit'  />, document.getElementById('app'));
*/


const Info = (props) => (
 <div>
   <h1>Info</h1>
   <p>l'info est sur: {props.info}</p>
   <p>il a {props.age} ans</p>
 </div>
);


const requireAuthentication = (WrappedComponent) => {
  return (props) => {
    return (
      <div>
        {props.isAuthenticated ?
          <WrappedComponent  {...props} /> : <p>Vous devez vous logguer </p> }
      </div>
    );
  };
};

const AuthInfo = requireAuthentication(Info);


ReactDOM.render(<AuthInfo isAuthenticated={true} info='Benoit' age={40} />, document.getElementById('app'));
