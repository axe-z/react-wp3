///////////////////////////////////////////////////////////////////////////////////////////////
                              ///IMPORT EXPORT ES6/////
///////////////////////////////////////////////////////////////////////////////////////////////

PREMIERE CHOSE ON DOIT AVOIR UN MODULE BUNDLER - WEBPACK-  SINON ON AURA REQUIRE NOT FOUND.

PATH
pour un import dans le meme folder :
 import './nom.js'    ON DOIT ABSOLUMENT METTRE LE ./  not found sans le path!!!
 
 maintenant, faire un import sans declaration de nom ne donne pas grand acces


///////////////////////////////////////////////////////////////////////////////////////////////
                              ///le named import- exports {truc} /////
///////////////////////////////////////////////////////////////////////////////////////////////



**********PRENNONS UN FICHIER Z :

console.log('je suis Z');

export const square = (x) => {  //EXPORT AVANT
   return x * x
 }
 OU APRES
export { square };   CECI N EST PAS UN OBJ, ON NE PEUT PAS METTRE { TRUC: NOM }

MAUVAIS:
//et non pas export = {square}
//ni meme export default = {square}


*********DANS LE FICHIER MAITRE, LE A :

console.log('je suis A');

import { square } from './utils.js';    ON DOIT UTILISER LE NOM, CECI N EST PAS UN OBJ
console.log(square(3)) // 9

MAUVAIS:
//import './utils.js';  //ERROR
// import * as square from './utils.js'; //ERROR

LES FAUTES DE FRAPPES AMENERA UNE ERREUR SQUARE NON PAS SQUAREE,

/***********************  named import- exports avec plus d un truc a exporter  ***************************/

**********PRENNONS UN FICHIER Z :

console.log('je suis Z');

const square = (x) => {
   return x * x
 }
const add = (a,b) => a + b;

export   {square, add}   ON DOIT SEPARER PAR UNE VIRGULE



*********DANS LE FICHIER MAITRE, LE A :

console.log('je suis A');
import { square, add } from './utils.js'; ON DOIT SEPARER PAR UNE VIRGULE ICI AUSSI


console.log(square(3))
console.log(add(3,4))

RIEN N OUBLIGE DE RAMMASSER LES DEUX, SI ON A QUE BESOIN DE ADD, ON PEUT JUSTE Y METTRE LUI:
import { add } from './utils.js';



/***********************  choisir ce quon a à exporter  ***************************/
PARFOIS ON NE VEUT PAS TOUT PARTAGER , OU AJOUTER DE STATEMENT DANS LE BAS, CECI EST RAPIDE


**********PRENNONS UN FICHIER Z :

console.log('je suis Z');

export const square = (x) => {  ICI ON EXPORT SUR LA CREATION DE FUNCTION
   return x * x
 }

const add = (a,b) => a + b;


*********DANS LE FICHIER MAITRE, LE A :

console.log('je suis A');

import { square } from './utils.js';      ADD N EST PLUS DISPONNIBLE

console.log(square(3))

console.log(add(3,4))       ADD N EST PLUS DISPONNIBLE


/***************************  changer le nom d un nammed export dans le import   ******************************/
le keyword:  as

import { square as carre } from './utils.js';
console.log(carre(3)) //9

/****************************  on ne peut pas exporter directement un string  *******************************/

CECI MENERA A UNE ERREUR :

export 'bonjour erreur';

ON DOIT AVOIR UNE VARIABLE AU MINIMUM:
export const message = 'c est mieux';




///////////////////////////////////////////////////////////////////////////////////////////////
                              ///Le default export /////
///////////////////////////////////////////////////////////////////////////////////////////////

LE DEFAULT, PERMET PLUS D OPTION , L IMPORTANT EST L APPEL QUI NE SE FIAT PAS ENTRE { }

par exemple :
**********PRENNONS UN FICHIER Z :
const square = (x) => x * x;

const add = (a,b) => a + b;

const sub = (a,b) => a - b;

export {square, add, sub as default }   //as default

OU
export const square = (x) => x * x;

export const add = (a,b) => a + b;

const sub = (a,b) => a - b;

export default sub

MAUVAIS:
export default const sub = (a,b) => a - b; //ERROR

BON:
on peut cependant faire le export default devant une class, seulement
export default class App extends Component {

*********DANS LE FICHIER MAITRE, LE A :
MAUVAIS:
import { square, add, sub } from './utils.js';  ERROR

CORRECT
import sub, { square, add } from './utils.js';  GOOD

console.log(sub(8,7))

PERMET AUSSI D ENLEVER LES {} :

import sub from './utils.js';  GOOD AUSSI

console.log(sub(8,7))

PERMET DE CHANGER DE NOM SANS AS :
import NIMPORTEQUOI, { square, add } from './utils.js';  GOOD

console.log(NIMPORTEQUOI(8,7))

OU .
import NIMPORTEQUOI from './utils.js';  GOOD

///////

AUTRE CAS :
puisque le nom est maleable on peut en disposer :

export default (a,b) => a - b;

import onLuiDonneUnNom from './utils.js';

///////////////////////////////////////////////////////////////////////////////////////////////
                              ///import de node modules NPM PACKAGE /////
///////////////////////////////////////////////////////////////////////////////////////////////

PREMIEREMENT POUR LES NPM PACKAGE, PAS BESOIN DE PATH , NI BESOIN D EXTENTION


ON VA TESTER AVEC VALIDATOR ( bon pour verifier de adresse email)

-1 yarn add validator


import validator from 'validator';  si on veut la bibliotheque complete
OU
import { isEmail } from 'validator'; //juste pour savoir ce que je veux
OU
import isEmail from 'validator/lib/isEmail';

SI VALIDATOR :
console.log(validator.isEmail('foo@ba.c ')) //FAUX, DOMAINE A UN CAR CA EXISTE PAS.

SI JUSTE ISEMAIL :
console.log(isEmail('foo@ba.c ')) //PAS BESOIN DE VALIDATOR



PRENDRE CE QU ON A DE BESOIN PREND MOINS DE PLACE.

AUTRE CAS :
puisque le nom est maleable on peut en disposer :

export default (a,b) => a - b;

import onLuiDonneUnNom from './utils.js';
CECI DIT LE CODE MONTRERA <UNKNOWNED /> UNE FOIS DANS LE HTML, MAIS FONCTIONNERA

///////////////////////////////////////////////////////////////////////////////////////////////
                              ///IMPORT EXPORT ES6/////
///////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////
                              ///IMPORTER REACT ET REACTDOM/////
///////////////////////////////////////////////////////////////////////////////////////////////
npm:
yarn add react react-dom

import React, {Component} from "react";  //React est le default export, et {Component est une portion}
import ReactDOM from 'react-dom';


On doit importer react dans chaque components qu on creer par page. aussi si un component child est utiliser on doit l importer en plus. le fait d avoir les deux sur le parent aidera pas . chaque fichier/page est independant.

///////////////////////////////////////////////////////////////////////////////////////////////
                              ///import de node modules NPM PACKAGE /////
///////////////////////////////////////////////////////////////////////////////////////////////

PREMIEREMENT POUR LES NPM PACKAGE, PAS BESOIN DE PATH , NI BESOIN D EXTENTION


ON VA TESTER AVEC VALIDATOR ( bon pour verifier de adresse email)

-1 yarn add validator


import validator from 'validator';  si on veut la bibliotheque complete
OU
import { isEmail } from 'validator'; //juste pour savoir ce que je veux
OU
import isEmail from 'validator/lib/isEmail';

SI VALIDATOR :
console.log(validator.isEmail('foo@ba.c ')) //FAUX, DOMAINE A UN CAR CA EXISTE PAS.

SI JUSTE ISEMAIL :
console.log(isEmail('foo@ba.c ')) //PAS BESOIN DE VALIDATOR



PRENDRE CE QU ON A DE BESOIN PREND MOINS DE PLACE.
