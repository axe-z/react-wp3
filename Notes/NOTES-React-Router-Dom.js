///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
                              ///REACT ROUTER  ET REACT ROUTER-DOM/////
///////////////////////////////////////////////////////////////////////////////////////////////
LA DIFFERENCE ENTRE REACT-ROUTER ET LE DOM, CE SONT EN FAIT LE MEME,
SEULEMENT REACT ROUTER-DOM NE FAIT QUE LE WEB. REACT ROUTER LUI
PEUT FAIRE LE WEB, REACT NATIVE, ANDROID IOS... DONC DNAS UN PROJET WEB BASED: DOM

info:
https://reacttraining.com/react-router/

install:
yarn add react-router-dom



import { BrowserRouter, Route } from 'react-router-dom'


Les bornes sont
<BrowserRouter>
...
</BrowserRouter>


ROUTE , prend deux trucs, PATH et COMPONENT :

const route = (
  <BrowserRouter>
    <Route path="/" component={App}/>
  </BrowserRouter>
);
ReactDOM.render(route, document.getElementById('app'));


///////////////////////////////////////////////////////////////////////////////////////////////
                              ///AJOUTER UNE ROUTE SECONDAIRE/////
///////////////////////////////////////////////////////////////////////////////////////////////

Prennont :
const route = (
  <BrowserRouter>
    <div>
        <Route path="/" component={ExpenseDashboardPage}/>
        <Route path="/create" component={AddDashboardPage}/>
    </div>
  </BrowserRouter>
);

CECI POURRAIT LAISSER CROIRE QUE SUR /CREATE ON AURAIT LE COMPONENT,
MAIS ON A PAS DE SERVEUR EXPRESS ICI :

ON AURA UN MESSAGE D ERREUR, NOUS N AVONS PAS DE HTML POUR CETTE PAGE !!
UNE FOIS A CETTE ADRESSE NOTRE INDEX.HTML N Y EST JUSTE PAS,
CE QU ON DOIT ARRANGER DANS WEBPACK :


SIMPLEMENT POUR DEVELOPMENT:
devServer: {
...
  historyApiFallback: true,  //CECI DIRA QU ON S OCCUPE DU ROUTING, ET DE RETOURNE INDEX.HTML A CHAQUE 404
...
}

DONC A CHAQUE FOIS QUE INDEX.HTML NE SERA PAS TROUVÉ
 SUR LA ROUTE, historyApiFallback, METTRA L UNIQUE.



Donc maintenant
http://localhost:8080/create fonction et montre les deux components



///////////////////////////////////////////////////////////////////////////////////////////////
                              ///CONTROLE D AFFICHAGE DES COMPONENT /////
///////////////////////////////////////////////////////////////////////////////////////////////

COMMENT SEPARER QUEL COMPONENT AFFICHE POUR CHAQUE URL

<Route path="/" component={ExpenseDashboardPage}/>
<Route path="/create" component={AddDashboardPage}/>

POSONT LA QUESTION EST CE QUE /CREATE INCORPORE / , OUI :
Donc les 2 components afficheront , autrement dit des que '/' est la le component  '/' affichera.


COMMENT CONTOURNER CECI SI JAMAIS: EXACT
exact est un autre attribut de Route , est un bool et FALSE par defaut.


Donc
<Route path="/" exact={true} component={ExpenseDashboardPage}/>
<Route path="/create" component={AddDashboardPage}/>

donc '/' n affichera que quand c est EXACTEMENT ET JUSTE '/'




///////////////////////////////////////////////////////////////////////////////////////////////
                              ///COMMENT FAIRE UN 404 /////
///////////////////////////////////////////////////////////////////////////////////////////////
https://reacttraining.com/react-router/web/example/no-match
SI UN UTILISATEUR ESSAYE DES URL , LE FAMEUX 404

ON VA FAIRE UN COMPONENT RAPIDEMENT:
const Oups404 = () => (
 <div>
   <h1>Vous etes perdu! 404!</h1>
 </div>
)

ON VEUT SEULEMENT PRESENTER CECI QUAND
 L UTILISATEUR N EST PAS SUR UNE DES ROUTE OFFERTE:    SWITCH

import { BrowserRouter, Route, Switch } from 'react-router-dom'
ENSUITE :
<BrowserRouter>

  <Switch>
    <Route path="/" exact={true} component={ExpenseDashboardPage} />
    <Route path="/create" component={AddDashboardPage} />
    <Route path="/edit" component={EditExpensePage} />
    <Route path="/help" component={HelpPage} />
    <Route component={Oups404} />
  </Switch>

</BrowserRouter>;

SWITCH REGARDE CHAQUE PATH UN APRES L AUTRE (LE METTRE A LA FIN EST IMPORTANT)
A CHAQUE APPEL DE CHANGEMENT D URL ET VERIFIE SI CA MATCH.
DONC SI L ADRESSE NE MATCH PAS, IL PASSE AU SUIVANT
JUSQU AU DERNIER ET AFFICHERA CELUI CI:  <Route component={Oups404} />




///////////////////////////////////////////////////////////////////////////////////////////////
                              ///LINK ENTRE LES PAGES ET NAVLINK /////
///////////////////////////////////////////////////////////////////////////////////////////////
https://reacttraining.com/react-router/web/example/custom-link
POUR EVITER LES PAGE REFRESH QUE CHANGER L URL FAIT: LE LINK

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

const Oups404 = () => (
 <div>
   <h1>Vous etes perdu! 404!</h1>
   <ul>
      <li><Link to="/">Home</Link></li>
    </ul>
 </div>

 LE LINK NOUS PERMET DE REVENIR A '/' ETNE CREER AUCUN RELOAD..
 SEULEMENT LES COMPONENT QUI RENDER.

 SI ON FAIT UN TRADIOTIONEL <a href=""></a> UN RELOAD VA SE FAIRE..
 DONC A EVITER TOUT LE TEMPS SAUF POUR SORTIR DE L APP.


 ET

NAVLINK  BON JUSTEMENT POUR LES NAV =

import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'

<nav>
  <NavLink to="/">HOME</NavLink>
  <NavLink to="/create">ADD</NavLink>
  <NavLink to="/edit">EDIT</NavLink>
  <NavLink to="/help">HELP</NavLink>
</nav>

NAVLINK DONNE ACCES UN UN ATTRIBUT  activeClassName="truc"
QUAND ON EST DANS LE COMPONENT CETTE CLASS ENTRE EN FONCTION,
CE QUI REND LA CHOSE PLUS SIMPLE A STYLISER

.is-active {
  color: red;
  font-weight: bold;
}

CEPENDANT HOME RESTE EN BOLD MEME QUAND ON VA SUR LES AUTRES,
PARCE QU IL SUIT LA REGLE DE PATH '/', POUR ANNULER CE GOSSANT TRUC  =

 <NavLink to="/" activeClassName="is-active" exact={true}>HOME</NavLink>

///////////////////////////////////////////////////////////////////////////////////////////////
                              ///COMPONENT PERSISTENT (HEADER - FOOTER)/////
///////////////////////////////////////////////////////////////////////////////////////////////

ON A UN HEADER
const Header = () => (
  <header>
    <h1>Expensify</h1>
    <nav>
      <NavLink to="/" activeClassName="is-active" exact={true}>HOME</NavLink>
      <NavLink to="/create" activeClassName="is-active">ADD</NavLink>
      ...
    </nav>
  </header>
);


EN WRAPPANT AVEC UN DIV ET METTRE LE <Header />  PARENT A TOUS LES COMPONENTS =

<BrowserRouter>
  <div>
    <Header />
    <Switch>
      <Route path="/" exact={true} component={ExpenseDashboardPage} />
      <Route path="/create" component={AddDashboardPage} />
      ...
      <Route component={Oups404} />
    </Switch>
  </div>
</BrowserRouter>;



///////////////////////////////////////////////////////////////////////////////////////////////
                              ////SEPARER LE ROUTER DE APP.JS////
///////////////////////////////////////////////////////////////////////////////////////////////

CONSEILLER DE FAIRE UN REP = routers/AppRouter
DANS CELUI-CI ON GERE ET IMPORTE NOS COMPONENTS ET LES LINKS :

import React, {Component} from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

//NOS COMPONENTS
import Header from '../components/Header.js'
import ExpenseDashboardPage from '../components/ExpenseDashboardPage.js'
...
import Oups404 from '../components/Oups404.js'

//LES ROUTER
const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" exact={true} component={ExpenseDashboardPage} />
        <Route path="/create" component={AddDashboardPage} />
        ...
        <Route component={Oups404} />
      </Switch>
    </div>
  </BrowserRouter>
)

 export default AppRouter



ET DANS APP.JS , SUPER CLEAN =
import React, {Component} from "react";
import ReactDOM from 'react-dom';

import AppRouter from './routers/AppRouter';
import 'normalize.css/normalize.css';
import './style/styles.scss';


ReactDOM.render(<AppRouter />, document.getElementById('app'));


///////////////////////////////////////////////////////////////////////////////////////////////
                              ///QUERY STRING ET PARAMETRES URL/////
///////////////////////////////////////////////////////////////////////////////////////////////
