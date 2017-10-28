///////////////////////////////////////////////////////////////////////////////////////////////
                              ///ABC DE REACT /////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
SETUP REACT-BABEL SANS WEBPACK:
React doit passer par babel=>
<script src="https://unpkg.com/react@16.0.0/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16.0.0/umd/react-dom.development.js"></script>
<script src="/scripts/app.js"></script>
On travaille dans src/app.js et compile dans public/ ..
Compiler: babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch
Serveur : live-server public  //on sert que public
///////////////////////////////////////////////////////////////////////////////////////////////

SIMPLEMENT POUR PASSER UNE VARIABLE : {}
LE JSX DOIT ETRE WRAPPER, AVOIR QU UN SEUL ELEMENT , ICI LE WRAPPER EST UN DIV
let ben = 'Ben'
const template = (
  <div>
    <h1>Babel cli </h1>
    <h2>{ben}</h2>
    <p>test de babel cli</p>
  </div>
);

LE RENDER DE REACDOM

const AppRoot = document.getElementById('app');
ReactDOM.render(template, AppRoot);


///////////////////////////////////////////////////////////////////////////////////////////////
                              ///AVANT LES COMPONENTS - BASE DU JSX/////
///////////////////////////////////////////////////////////////////////////////////////////////

////////////////CONDITIONNEL AVEC UN TERNARY, OU LOGICAL OPERATEUR:////////////////////////

let obj = {
  nom: 'ben',
  age: 40,
  ville: 'Mtl'
};

AVEC IF:
function getLocation(loc) {
  if (loc) {
    return loc;
  } else {
    return 'laval';
  }
}

const template = (
  <div>
    <p>Location: {getLocation(obj.ville)}</p>      //Location: Mtl
  </div>
);

AVEC FUNCTION CALL :
function getLocation(loc) {
  if (loc) {
     return <p>Location: { obj.ville } </p>
  } else {  return 'laval' }
}

const template = (
  <div>{getLocation(obj.ville)}</div>
);

TERNARY:
quand on veut faire un de deux choses
true ? 'oui' : 'non' //oui
false ? 'oui' : 'non' //non

const template = (
  <div>
    <h1>Babel cli </h1>
      { obj.ville ? obj.ville : 'laval' }       //Mtl

      {true, false et null} sont ignore par jsx si mis seul.
  </div>
);


LOGICAL &&
Quand on veut faire une seule chose si vrai ou faux
console.log(true && 'ben')  //'ben' true ne sort pas.
console.log(false && 'ben') //false

const template = (
  <div>
    <h1>Babel cli </h1>
    {obj.age >= 18 && <p>Age: {obj.age}</p> } //true , donc on verre que le &&:  Age 40
    {obj.age >= 41 && <p>Age: {obj.age}</p> } //false, donc ecrit rien du tout.
  </div>
);



/************************************ Attributs ************************************/


POUR LES ATTRIBUTS:

id = id
class = className  //parcequ il ya des reserves words, class devient className

let count = 0;
const template2 = (
  <div>
    <h1>Count : {count} </h1>
    <button id="but" className="but">  + 1 </button>
  </div>
);

console.log(template2); // {$$typeof: Symbol(react.element), type: "div", key: null, ref: null, props: {…}, …}
DONC UN DIV, DANS PROPS.CHILDREN ON A LE H1 ET LE BUTTON. // props: children:(2) [{…}, {…}]
si on pousse plus loin, et regarde le h1, lui aussi a dans props.children 2 trucs:
1-Counts: 2-0
Pour le button, dans props.children, on a , 1- +1 2-className: but 3-id: but.



BREF, TOUS LES TRUCS IMPORTANT SONT DANS PROPS.CHILDREN SUR LES ELEMENTS
pour plus d info : https://reactjs.org/docs/dom-elements.html

le reste des atttributs dispo, certains sont different du html a cause de mots reservés:
accept acceptCharset accessKey action allowFullScreen allowTransparency alt
async autoComplete autoFocus autoPlay capture cellPadding cellSpacing challenge
charSet checked cite classID className colSpan cols content contentEditable
contextMenu controls controlsList coords crossOrigin data dateTime default defer
dir disabled download draggable encType form formAction formEncType formMethod
formNoValidate formTarget frameBorder headers height hidden high href hrefLang
htmlFor httpEquiv icon id inputMode integrity is keyParams keyType kind label
lang list loop low manifest marginHeight marginWidth max maxLength media
mediaGroup method min minLength multiple muted name noValidate nonce open
optimum pattern placeholder poster preload profile radioGroup readOnly rel
required reversed role rowSpan rows sandbox scope scoped scrolling seamless
selected shape size sizes span spellCheck src srcDoc srcLang srcSet start step
style summary tabIndex target title type useMap value width wmode wrap


/***********************  Events et le binding manuel et le re-rendering. ************************************/

Le concept derriere React est le rendering, on render ce qui est utiles, sans avoir a reloader tout. maintenant ceci s applique a tout ce qui est a l ecran, ici rien re-render, donc l ecran reste fixe...
1-On peut sortir des console log comme ca mais ON NE PEUT PAS MODIFIER CE QUI EST DEJA RENDERER A L ECRAN, count part a 0 et restera 0 ...  on doit s y prendre autrement et re-renderer, ceci est l exemple de log seulement sans re-render

let count = 0;
const addUn = (x) => {
  console.log('addUn')
}
const moinUn = (x) => {
  console.log('moinUn')
}
const reset = ( ) => {
  console.log('reset')
  return count = 0
}
const template2 = (
  <div>
    <h1>Count: {count} </h1>
    <button id="but1" className="but" onClick={addUn}>  + 1 </button>
    <button id="but2" className="but" onClick={moinUn}>  - 1 </button>
    <button id="but3" className="but" onClick={reset}>  reset </button>
  </div>
);


2-MAINTENANT LA BONNE FACON, EN RELANCANT UN RENDER DU JSX AVEC RENDERCOUNTERAPP:.
pas besoin de () , l event lance la fn . on ne peut pas mettre d argument, sinon on fait un loop.


let count = 0;
const addOne = () => {
  count++;
  //OU count += 1  OU //count = count + 1
  renderCounterApp(); //re-render
};
const minusOne = () => {
  count--;
  renderCounterApp();//re-render
};
const reset = () => {
  count = 0;
  renderCounterApp();//re-render
};

const appRoot = document.getElementById('app');

const renderCounterApp = () => {
  const templateTwo = (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={addOne}>+1</button>
      <button onClick={minusOne}>-1</button>
      <button onClick={reset}>reset</button>
    </div>
  );

  ReactDOM.render(template2, appRoot);
};

renderCounterApp();  //pour Avoir une valeur au depart.


DONC REACT VA CALCULER CE QUI DOIT ETRE RE-RENDERER, IL VA LAISSER LES BOUTONS EN PLACE, MEME SI IL SONT DANS LA FONCTION, IL VA AVEC INTELLIGENCE S OCCUPER SEULEMENT DE CE QUI CHANGE VISUELLEMENT. Meme si ceci semble penible comme code, il n y a pas pas de data binding comme en JS, donc pas possible de juste faire + 1 simplement. Mais avec les components ca sera plus simple... a venir.



/************************************ Event suite et les forms ************************************/
ON VA CONTINUER SUR LE PRINCIPE DE RE-RENDER. C EST LA MEME TECHNIQUE, ON MET LE DOM DNAS UNE FONCTION QU ON LANCE
AU DEPART ET QU ON RELANCE QUAND ON FAIT UNE FONCTION

pour tous les events:
https://reactjs.org/docs/events.html

//notre data
const app = {
  title: 'Indecision App',
  subtitle: 'Mettre sa vie dans son ordi',
  options: []
};

const onFormSubmit = (e) => {
  e.preventDefault(); //evite le refresh
  const option = e.target.elements.option.value; //elements retourne le name [input, button, option: input] option contient ce que l on veut , le text .  console.log(e.target[0].value) fonctionne aussi.
  if (option) {
    app.options.push(option);  //la pousser dnas l arr
    e.target.elements.option.value = '';  //remettre a 0
    render();  //relancer le render.
  }
};

/*NOTE:
  const option = e.target.elements.option.value;  on peut aussi faire juste : e.target[0].value
  console.log(e.target[0].value , e.target[1].value), si y a 2 inputs.
*/

const onRemoveAll = () => {
  app.options = [];  //vider l arr.
  render();  //relancer le render.
};


const render = () => {    //wrapper dnas la fonction pour re-renderer
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? 'Ici sont vos options' : 'Pas d options'}</p>
      <p>{app.options.length}</p>
      <button onClick={onRemoveAll}>Enleve Tout</button>
      <ol>
        <li>Item one</li>
        <li>Item two</li>
      </ol>
      <form onSubmit={onFormSubmit}>  // submit prend enter ou le bouton
        <input type="text" name="option" />  //name unique important
        <button>Ajouter Option</button>  // la form s occupe du submit.
      </form>
    </div>
  );

  ReactDOM.render(template, appRoot); //on doit mettre ceci dans la FN ..
};


render();  //render et re-render .
const appRoot = document.getElementById('app');





/************************************ Presenter un array (map-forEach) ************************************/

JSX SUPPORT LES STRINGS ,LES NUMBER, BOOL, NULL ET UNDEFINED  ET SURTOUT LES ARRAY. MAIS NE SUPPORT PAS LES OBJ
{
  [99, 98, 97];
}
{
  ('strings');
}
{
  55;
}
{
  ben: 'Benoit' //ERREUR
}

/*******************************************************/
donc avec l arr:
{
  [99,98,97].map(n => {
    return  n+1
  })
}
//retourne 1009998


/*******************************************************/
NULL ET UNDEFINED et TRUE /false  ne change pas ce qui est affiché,
{
  [null, undefined , true , false, 1 ].map(n => {
    return  n
  })
}
//retourne 1


/*******************************************************/
{
  [ <p>a</p>, <p>b</p>,<p>c</p> ]
}
retourne
a
b
c
ET RETOURNE UNE ERREUR DE KEY SUR UN ITERATOR, LES PATERNS QUI SE REPETE DANS JSX DOIVENT ETRE IDENTIFIER PAR UNE KEY QUI LES DIFFERENCIE..


Jsx fonctionne en mettant des comments partout dans le HTML qu il produit, il se retrouve de cette maniere. Maintenant dans les iterateur sans key, il en mettra pas et il aura de la misere a gerer le tout, ajouter une key arrange ca et optimise le jsx pour le render:
{
  [ <p key="1">a</p>, <p key="2">b</p>,<p key="3">c</p> ]
}


/*******************************************************/
itere et faire un p avec key.
const number = [55,65,75];

{
  number.map( n => {
    return (
      <p key={n}>{n / 2}</p>
    )
  })
}

retourne
27.5
32.5
37.5

/*******************************************************/

MAPPER DANS UN UL OU OL

<ol>
  {
    app.options.map((option) => {
      return (
        <li key={option}>{option}</li>
      )
    });
  }
</ol>

OU
<ol>
  {
    app.options.map((option) => {
      <li key={option}>{option}</li>
    });
  }
</ol>


/************************************ click random, disabled button ************************************/



  <button onClick={onMakeDecision} disabled={!app.options.length > 0}>Que faire ?</button>

  app.options se remplie que on ajoute, si on veut pas de bouton avant qu il y est qque chose dans l arr.
  donc avec JSX : disabled={!app.options.length > 0}
  Donc disabled si true , ici on renverse le true pour que si 1 ou plus ca devient false
  OU
  disabled={app.options.length === 0} true a 0 false si 1 ou plus


  const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length);
    const option = app.options[randomNum];
    alert( option )  //choisi un des choix
  };

//floor retourne de 0-4
//ceil retourne de 1 a 5 , moins bon pour les arrays.

/************************************ click random, disabled button ************************************/


    /************************************ Toggle  et && ************************************/
RENVERSER , TOGGLE click AVEC RENDER ENSUITE.

    let visible = false;

    const render = () => {
      const template = (
      <div>
        <h1>Toggle visible</h1>
        <button  onClick={() => {
          visible = !visible;
          render();
         }}>
          {visible ? 'HIDE TRUC' : 'MONTRE MOI'}
       </button>
       {visible && <p>La force est avec toi</p>}      //ici si true, <p>La force est avec toi</p>
      </div>
      );

      ReactDOM.render(template, appRoot);
    };

    render();
        /************************************ Toggle   et && ************************************/


        ///////////////////////////////////////////////////////////////////////////////////////////////
                                      ///AVANT/SANS LES COMPONENTS /////
        ///////////////////////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////////////////////////////////////
                              ///CREATION D'UN CLASS COMPONENT /////
///////////////////////////////////////////////////////////////////////////////////////////////
    Nos deux links dans le html :
    <script src="https://unpkg.com/react@16.0.0/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16.0.0/umd/react-dom.development.js"></script>

nous donne acces a react Et reactDom dans window.React
D ordinaire :

import React from "react";
import ReactDOM from 'react-dom';


TOUS LES CLASS QUE L ON VA FAIRE IRONT DANS REACT.COMPONENT, CELUI-CI EST LA CLASS PARENT. ON EXTENDS DE CETTE CLASS QUI NOUS DONNE UN PACQUET DE METHODES PROPRES A REACT, ON LES VERRA.

LA CLASS REACT A BESOIN DE DEUX CHOSES, UN NOM EN MAJUSCULE ET
UNE FN RENDER() ET CETTE FONCTION RETOURNE LE JSX:

class IndecisionApp extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Action />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>Indecision</h1>
        <h2>Mettre la vie dnas les mains de l'informatique</h2>
      </div>
    );
  }
}

class Action extends React.Component {
  render() {
    return (
      <div>
        <button>Que faire ?</button>
      </div>
    );
  }
}

ET POUR AFFICHER ON PREND LE NOM DE LA CLASS ET ON EN FAIT , COMME UN ELEMENT HTML: <Header />

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));

LE DIV ICI EST OPTIONNEL,  SI IL Y A QU UN COMPONENT
///////////////////////////////////////////////////////////////////////////////////////////////
                              ///CREATION D'UN CLASS COMPONENT /////
///////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////
                    ///PASSER DU DATA D'UN COMPONENT A L AUTRE: THIS.PROPS /////
///////////////////////////////////////////////////////////////////////////////////////////////

Le data qu on passe se nomme PROPS :
0- ILS SONT READ-ONLY PAR LE COMPONENT QUI LES TIENS.
1-Se passe en key-value
2-peu etre n importe quoi comme key
3-peu etre un string, { FN/JSX }, nombre meme arr , tout sauf Obj:
title={1+1} // 2
title={1000} // 1000
title='allo' // 'allo'
title={[1,2,3]} //123
5- S invoque ailleurs avec le this.props dans une expression JSX {this.props.title}
6-this.props est un obj :
7-Dans une class On doit mettre les variable DANS la fonction render(), autrement on doit la mettre Avant, global hors de la class.


Exemple :


class IndecisionApp extends React.Component {
  render() {
    const subtitle = "La force du mental"
    const optionsArr = ['truc 1', 'truc 2', 'truc 3'];
    return (
      <div>
        <Header title="Indecision" sousTitre={subtitle}/>
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
      console.log(this.props) //retourne l obj
    return (
      <div>
        <h1>{this.props.title}</h1> //Indecision
        <h2>{this.props.sousTitre}</h2>
        <ol>
          {this.props.optionsArr.length} //3

          {/* //SORTIR L ARR EN LI AVEC KEY OBLIGATOIRE */}
          {this.props.optionsArr.map(option => {
            return <li key={option}>{option}</li>
          })}
        </ol>
      </div>
    );
  }
}

//////////////////////////////////////////


PLUS COMPLEX, Mapper UN COMPONENT COMPLET:
En passant la props optionText a chaque component option, BCP plus facile d ajuster le look ainsi.



class IndecisionApp extends React.Component {
  render() {
    const optionsArr = ['truc 1', 'truc 2', 'truc 3'];
    return (
      <div>
        <Options optionsArr={optionsArr}/>   //PASSE L ARR A OPTIONS
      </div>
    );
  }
}

class Options extends React.Component {  //OPTIONS UTILISE MAINTENANT LE COMPONENT OPTION, L ARRAY PASSE 2 COMP.
  render() {
    return (
      <div>
        <h4>Options</h4>
        <ol>
          {this.props.optionsArr.map(option  => <Option key={option} optionText={option}/> )}
        </ol>
      </div>
    );
  }
}

class Option  extends React.Component {
  render() {
    return (
      <div>
        Le component va etre repeter avec chaque option
        <li>  choix: {this.props.optionText} </li>
      </div>
    );
  }
}



DONC LE DATA PEUT PASSER D UN COMPONENT A UN AUTRE A UN AUTRE ET AINSI DE SUITE... CECI VA DNAS UN SENS SEULEMENT. DE PARENT A CHILD .
LE THIS.PROPS PERMET DE FAIRE DESCENDRE , DE PASSER LE DATA ,
DE PARENT A CHILD, MAIS NE PERMET PAS DE FAIRE MONTER LE DATA .
//////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////
                              ///LES METHODES DANS LES CLASS  /////
///////////////////////////////////////////////////////////////////////////////////////////////




LE  onSubmit={this.handleAddOption} FAIT REFERENCE A LA METHODE AJOUTER A LA CLASS, PAS DE () DONC
LES FONCTIONS VONT TOUJOURS AVANT LE RENDER(), CONTRAIREMENT AUX VARIABLES

DANS LES METHODES AVEC LE RENDER() , ICI HANDLECLICK, LE THIS , N EST PAS DISPONIBLE.



class AddOption extends React.Component {
  handleAddOption(e) {
    e.preventDefault();
    console.log(this) // undefined

    const option = e.target[0].value.trim();   //trim evite le vide et les espace inutile ..
    option ? console.log(option) : null;
    option && console.log(option)  //les 2 marche
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Ajouter Option</button>
        </form>
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////
                              ///LE THIS BINDING  /////
///////////////////////////////////////////////////////////////////////////////////////////////


DANS LE RENDER , LE THIS FAIT REFERENCE TOUJOURS A CE COMPONENT SUR LEQUEL VOUS ETES,
MAIS ON PERD LE BINDING , L EQUIVALENCE ENTRE LE THIS ET LE COMPONENT UNE FOIS DANS LES METHODES DU HAUT.

Exemple :

class Options extends React.Component {
  handleRemoveAll() {
    console.log(this)   //undefined, le binding est perdu.
    console.log(this.props.optionsArr); //err, cannot read props of undefined.
  }
  render() {
    return (
      <div>
        <button onClick={this.handleRemoveAll}>Detruire</button> //ICI LE THIS FONCTIONNE
        {this.props.optionsArr.map(option => (        //ICI LE THIS FONCTIONNE
          <Option key={option} optionText={option} />
        ))}
      </div>
    );
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////
                              ///EXPLICATION SUR LE BINDING /////
///////////////////////////////////////////////////////////////////////////////////////////////
LE BINDING AKA EQUIVALENCE OU LE THIS REFERE A QUELQUE CHOSE:
EXEMPLE :
Le this est l obj.

const obj = {
  getName() { return this.name },   //on utilise la meme forme es6 pour methode, mais on DOIT METTRE UNE VIGULE
  name: 'Ben',
  getThis(){  console.log(this ===  obj) //TRUE }
}
// obj.getThis()  //TRUE  // console.log(obj.getName()) //Ben

MAINTENANT SI ON COPIE OBJ.GETNAME DANS UNE VARIABLE On detruit tout :
const getName = obj.getName;
console.log(getName())  ERROR ON PERD LE BINDING DU THIS .


DONC QU EST- CE QUI ARRIVE ?
TOUT EST UNE QUESTION DE CONTEXTE :

1-OBJ.GETNAME A SON THIS QUAND IL EST DANS LE CONTEXT D UN OBJET
2-getName = obj.getName; CECI DEVIENT UNE FUNCTION !! ET NON PAS UN OBJ, DONC PERD SON THIS.

UNE FUNCTION N A PAS DE THIS :

const FUNC = () => {
  console.log(this) //UNDEFINED
};
///////////////////////////////////////////////////////////////////////////////////////////////
                ///COMMENT CONTOURNER ET ARRANGER  LE BINDING .BIND() /////
///////////////////////////////////////////////////////////////////////////////////////////////

https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function/bind
AVEC LE MEME EXEMPLE

const obj = {
  getName() { return this.name },
  name: 'Ben'
}
const getName = obj.getName.bind(obj);  //LE BINDER A L OBJ QU IL A DE BESOIN ET NON LA FN
console.log(getName()) // BEN , CA FONCTIONNE


MAINTENANT, RIEN N OBLIGE A BINDER A OBJ, CECI DIT LA FONCTION A BESOIN D UN OBJ AVEC UN NAME:

const getName = obj.getName.bind({name: 'AXE-Z'});  //ca fait le boulot
console.log(getName()) // AXE-Z' , CA FONCTIONNE

DONC LE BINDING EST ULTRA IMPORTANT, PREMIEREMENT PARCE QU ON LE PERD AVEC LES EVENT HANDLERS (CLICK, SUBMIT..)
MAIS ON PEUT TOUJOURS L ARRANGER !



AUTRE EXEMPLE :
window.x = 9; // en dehors de tout contexte,
            // pour un navigateur, this est
            // l'objet window
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 81

var getX = module.getX;
getX(); // 9, car ici, this fait référence à l'objet global

// On crée une nouvelle fonction à laquelle on lie module en
// tant que 'this'
var boundGetX = getX.bind(module);
boundGetX(); // 81


///////////////////////////////////////////////////////////////////////////////////////////////
                        /// .BIND() AVEC UN EVENT HANDLER /////
///////////////////////////////////////////////////////////////////////////////////////////////


DONC DANS LE CONTEXTE D UN COMPONENT ET DES METHODE EXTERNE AU RENDER(), IL SUFFIT SIMPLEMENT DE BINDER LE EVENT HANDLER A THIS, THIS DNAS LE RENDER EST LE COMPONENT :


class Options extends React.Component {
  handleRemoveAll() {
    console.log(this); //Options {props: {…}, context: {…}, refs: {…}, updater: {…}, _reactInternalFiber: FiberNode, …}

  }
  render() {
    return (
      <div>
        {/* //BIND A THIS, QUI DANS LE RENDER EST LE COMPONENT DIRECTEMENT  */}
        <button onClick={this.handleRemoveAll.bind(this)}>Detruire</button>
        <ol>
          {this.props.optionsArr.map(option => (
            <Option key={option} optionText={option} />
          ))}
        </ol>
      </div>
    );
  }
}

MAINTENANT L APPELE DE LA METHODE HANDLEREMOVEALL() SE FAIT DANS LE BON CONTEXTE,
CELUI OU THIS === LE COMPONENT. MAIS A CHAQUE CLICK , LE BINDING SE FAIT , CE QUI EST PAS PERFORMANT.
CETTE METHODE FONCTIONNE PARFAITEMENT, MAIS EST FACILE A OUBLIER. il ya d autres maniere moins gourmandes :

///////////////////////////////////////////////////////////////////////////////////////////////
                        /// .BIND() AVEC UN EVENT HANDLER part II /////
///////////////////////////////////////////////////////////////////////////////////////////////

AVEC LE CONSTRUCTOR IL EST POSSIBLE DE RAPIDEMENT , UNE SEULE FOIS ETABLIR LE BINDING

ON DOIT APPELER PROPS, DANS LE CONSTRUCTOR ET LE SUPER POUR AVOIR ACCES ENSUITE A THIS.PROPS
ENSUITE Y METTRE LES METHODES ET LES BINDER TOUT DE SUITE.

class Options extends React.Component {
  constructor (props){
    super(props)
    this.handleRemoveAll  = this.handleRemoveAll.bind(this)  //PAS DE CALL!!  ()
  }
  handleRemoveAll() {
    console.log(this);
  }
  render() {
    return (
      <div>
        {/* //BIND A THIS, QUI DANS LE RENDER EST LE COMPONENT DIRECTEMENT  */}
        <button onClick={this.handleRemoveAll}>Detruire</button>
        <ol>
          {this.props.optionsArr.map(option => (
            <Option key={option} optionText={option} />
          ))}
        </ol>
      </div>
    );
  }
}


MIEUX VAUT TOUJOURS METTRE PROPS DANS LE CONSTRUCTOR ET LE SUPER:
les 3 cas :
bon:
class MyComponent extends React.Component {
    constructor(props) {
        super(props)

          console.log(this.props)  // -> { icon: 'home', … }
        console.log(props)  // -> { icon: 'home', … }
    }
}

mauvais:
class MyComponent extends React.Component {
    constructor(props) {
        super()  //SANS PROPS

        console.log(this.props)// -> UNDEFINED

        // ON ARRIVE A AVOIR ACCES, AVEC PROPS DIRECT
        console.log(props)   // -> { icon: 'home', … }
    }
    render() {
        // CA FONCTIONNE TOUJOURS PEU IMPORTE
        console.log(this.props) // -> { icon: 'home', … }
    }
}

tres mauvais:
class MyComponent extends React.Component {
    constructor() { //SANS PROPS
        super()  //SANS PROPS

        console.log(this.props)// -> UNDEFINED

        // ON ARRIVE A AVOIR ACCES, AVEC PROPS DIRECT
        console.log(props)   // ERRRORS
    }
}



///////////////////////////////////////////////////////////////////////////////////////////////
                              ///LE STATE /////
///////////////////////////////////////////////////////////////////////////////////////////////
1- LUI CONTRAIREMENT AU PROPS , N EST PAS READ-ONLY.

LE STATE, EST UN OBJ, QUI DECLENCHE UN RENDER QUAND DES CHANGEMENTS SONT SURVENUES.
PERMET AUSSI COMME LE PROPS D ECHANGER DU DATA ENTRE COMPONENTS, DANS UNE DIRECTION DIFFERENTE

EXEMPLE :
Pour un counter , qui fait +1 -1 et montre le total a chaque fois.

 ON ETABLIE LE STATE EN OBJECT ICI DANS LA FONCTION CONSTRUCTOR :

constructor (props){
 super(props)

  this.state = {
   count : 0
 }
   this.plusUn = this.plusUn.bind(this); //ici le binding
   this.reset = this.reset.bind(this);
}


1- C EST AVEC THIS.SETSTATE QU ON MODIFIE LE STATE AVEC SOIT UN OBJ, OU UN ARROW FN,
2- COMME PREMIER ARGUMENT, THIS.SETSTATE VIENT AVEC LE STATE PRECEDENT
3- PREVSTATE EST UN OBJ. COMME STATE.
4-SI NOTRE STATE A PLUSIERS KEY-VALUE ON N INSCRIT QUE CELLE OU CELLES QU ON VEUT MODIFIER
5- ON RETOURNE UN OBJ
6- THIS.SETSTATE PAR FN EST LA METHODE A PREVILIGIER

plusUn() {
  this.setState(prevState => {
    return {
      count: prevState.count + 1
    };
  });
}

reset() {
  this.setState(() => {
    return {
      count: 0
    };
  });
}

AUTRE MANIERE D UTILISER THIS.SETSTATE SANS PASSER PAR UNE FUNCTION ARROW, MAIS JUSTE UN OBJ
1-CETTE MANIERE EST PLUS VIEILLE
2-POURRAIT QUITTER REACT DANS L AVENIR DIT IL
3- LA VALEUR PRECEDENT N ETANT PAS LA ( PAS D ARG) , ON DOIT UTILISER THIS.STATE.TRUC

plusUn() {
  this.setState({
    count: this.state.count + 1
  });
}
reset() {
  this.setState({
    count: 0
  });
}

Probleme:
Y A UN FUCK UP AVEC CETTE ANCIENNE VERSION SANS UPDATE FN, ELLE FERA LE BOULOT DANS 99% DES SITUATIONS CECI DIT,
LE TROUBLE VIENT DU FAIT QUE SETSTATE EST ASYNCHRO, ET QUE DNAS UNE FN , SI ON DOIT CHAINER 2 SETSTATE, UN ERREUR SURVIENT. VOILA UN EXEMPLE :


reset() {
  this.setState({
    count: 0  //ON MET A 0
  });
  this.setState({
    count: this.state.count + 1 // ET ON FAIT PLUS 1
  });
} //NE DONNERA PAS LA BONNE CHOSE !!

 DONC DISONT QUE LE COUNT EST A 3 , QU ON FAIT RESET, ON DEVRAIT AVOIR 1 , MAIS 4 APPARAIT. IL N A PAS LE TEMPS DE FAIRE LE 0 , ET FAIT LE PLUS 1 SUR LA VERSION A 3  ... C EST TOUT , MAIS CE GENRE DE SITUATION EST RARE.



render() {
  return (
    <div>
      <h1 >Count: {this.state.count}</h1> // ON AFFICHE LA VALEUR DE THIS.STATE.COUNT
      <button onClick={this.plusUn}>+1</button>  //ICI ON APPEL
      <button onClick={this.reset}>Reset</button>
    </div>
  );
}



REACT LUI REGARDE CA ET RENDER CETTE PORTION LA QUAND UN CHANGEMENT SURVIENT.

EXEMPLE QUI MONTRE TOUT CE QU ON A COMME NOTE A CE POINT-CI, SANS AVOIR A BINDER,
AVEC DES FUNCTION DIRETEMNET DANS LE JSX :

class Visibility extends React.Component {
  constructor (props){
   super(props)
   this.state = {
     visible : false
   }
  }
  render() {
    return (
      <div>
          <h1>Toggle visible</h1>
        <button onClick={() => {
          //LES DEUX MANIERES DE MODIFIER LE STATE :

          //1- VIEILLE MANIERE AVEC L INVERSE DE LA METHODE ACTUELLE
           this.setState({
             visible : !this.state.visible
          });

          //2- NOUVELLE MANIERE AVEC PREV QUI EST L ETAT PRECEDENT . ON VEUT L INVERSE
          this.setState((prev) => {
            return {
            visible : !prev.visible
            }
          });

         }}>
         {/* //TERNARY DONNE LE TEXT DU BOUTON SI TRUE OU FALSE */}
          {this.state.visible ? 'HIDE TRUC' : 'MONTRE MOI'}
       </button>

       {/* //MONTRE UNE PORTION DU JSX QUAND C'EST TRUE  */}
       {this.state.visible  && <p>La force est avec toi</p>}
      </div>
    );
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////
                   ///LE STATE SUR UN DEVIENT UN PROP SUR L AUTRE /////
///////////////////////////////////////////////////////////////////////////////////////////////

ON PEUT PASSER LA VALEUR D UN STATE D UN component A UN AUTRE MAIS AVANT :

ICI ON VA DIRE A ACTION COMPONENT D AFFICHER OU NON UN BOUTON SI LE STATE A QUELQUE CHOSE :

class IndecisionApp extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      options : ['truc 1', 'truc 2', 'truc 3']
    }
  }
  render() {
    return (
      <div>
        <Action hasOptions={this.state.options.length > 0}/>  //RETOURNE UN BOOL
      </div>
    );
  }
}

MAINTENANT ICI ,
1- PARFAIT POUR LE LOGICAL OPERATOR . SEULEMENT SI VRAI AFFICHE LE BOUTON :
2- AUTRE SCENARIO AUSSI, SI ON VEUT UN BOUTON DISABLED
class Action extends React.Component {
  render() {
    return (
      <div>
1-        {this.props.hasOptions && <button onClick={...}>Que faire ?</button>}
//OU
2-        <button
           disabled={!this.props.hasOptions}  //true ou false , on veut renverser, montrer si true
           onClick={this.handleClick}>
           Que faire ?
         </button>
      </div>
    );
  }
}
///////////////////////////////////////////////////////////////////////////////

MAINTENANT LAISSER UN AUTRE COMPONENT MANIPULER LE STATE D UN AUTRE :

///////////////////////////////////////////////////////////////////////////////////////////////
                   ///MANIPULER LE STATE PARENT AVEC COMPONENT CHILD  /////
///////////////////////////////////////////////////////////////////////////////////////////////
*CE PATERN EST ULTRA COMMUN

LES PROPS PASSE DE PARENT A CHILD, MAIS COMMENT MANIPULER LE DATA SI ON EST AILLEURS, DANS UN CHILD:
PAR LES FONCTIONS !

LE OPTIONS COMPONENT VA RECEVOIR L ARRAY ET UNE FUNCTION POUR LA REMMETTRE A ZERO DANS SON PROPS:

ICI ON PASS L ARRAY COMPLETE ET UNE FN, IL NE FAUT PAS OUBLIER DE LA BINDER ICI:

class IndecisionApp extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      options : ['truc 1', 'truc 2', 'truc 3']
    }
    //ON DOIT BINDER
      this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
  }
  CETTE FONCTION SERA PASSEE AU CHILD QUI POURRA DONC MANIPULER LE STATE
  handleDeleteOptions(){
      this.setState(() => {
        return {
          options: []       //remet l arr a 0
        }
      });
  }
  render() {
    return (
      <div>
            ON PASSE LA FONCTION AU CHILD EN PROPS
        <Options
          optionsArr={this.state.options}   //ARR
          handleDeleteOptions={this.handleDeleteOptions} //REMISE A 0 , ON PASSE LA FONCTION AU CHILD EN PROPS
         />
      </div>
    );
  }
}

MAINTENANT ICI DANS PROPS this.props.handleDeleteOptions VA DETRUIRE L ARRAY STATE DE L AUTRE COMPONENT:
class Options extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.handleDeleteOptions}>Detruire</button> //DETRUIT
      </div>
    );
  }
}

ICI ON ENLEVE LE DATA , MAIS ON AURAIT BIEN PU EN AJOUTER AUSSI . ICI handleDeleteOptions FAIT EN SORTE QUE LES DEUX COMPONENTS RE-RENDER.

MEME GENRE D EXEMPLE :

class IndecisionApp extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      options : ['truc 1', 'truc 2', 'truc 3']
    }

    this.handlePick = this.handlePick.bind(this);
  }

handlePick(){
 const pick  = Math.floor(Math.random() * this.state.options.length) //1-3
 alert(this.state.options[pick])
}
  render() {
    return (
      <div>
       <Action hasOptions={this.state.options.length > 0} pick={this.handlePick}/>  //ENVOIE DE PICK
      </div>
    );
  }
}

class Action extends React.Component {
  render() {
    return (
      <div>
       <button
          disabled={!this.props.hasOptions}
          onClick={this.props.pick}>  //PICK DEVIENT UN PROPS.
          Que faire ?
        </button>
      </div>
    );
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////
                   ///MANIPULER LE STATE PARENT AVEC COMPONENT CHILD  /////
///////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////
     ///MANIPULER LE STATE PARENT AVEC COMPONENT CHILD AVANCEE Fn a FN a FN /////
///////////////////////////////////////////////////////////////////////////////////////////////

MEME CHOSE PASSONT DU PARENT A UN CHILD UNE FN, MAIS CETTE FOIS CI , ON DOIT TRAVAILLER LE DATA AVANT DE LE RENVOYER AU PARENT .

MEME CHOSE QUE L EXEMPLE PRECEDENT:

class IndecisionApp extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      options : ['truc 1', 'truc 2', 'truc 3']
    }
    this.handleAddOption = this.handleAddOption.bind(this);
  }

handleAddOption(option){
  console.log(option)  //TOUJOURS UNE BONNE IDEE DE SAVOIR QUUN SIMPLE CONSOLE VA AVANT D ALLER + LOIN
}

  render() {
    const subtitle = 'La force du mental';

    return (
      <div>
        <AddOption handleAddOption={this.handleAddOption}/>
      </div>
    );
  }
}

MAIS ICI ON VA DEVOIR TRAVAILLER LE DATA QUI DOIT RETOURNER AU PARENT :
* IMPORTANT SI UNE FONCTION UTILISE LE THIS AILLEURS QUE DANS LE RENDER, IL FAUT Y METTRE LE CONSTRUCTOR - SUPER
1- PUISQU ON DOIT VALIDER LE INPUT FIELD, ONSUBMIT APPELE UNE FONCTION LOCALE
2- ON PREND LE DATA DU INPUT : E.TARGET[0].VALUE.TRIM(); OU E.TARGET.ELEMENTS.OPTION.VALUE.TRIM();
3- TOUJOURS UNE BONNE IDEE DE TRIM()
4- ON APPELLE LA FN DU PARENT QUI EST DISPO EN PROPS, ILFAUT LE THIS DONC METTRE LE CONSTRUCTOR - SUPER
5- IL FAUT DONC MAINTENANT BINDER LA FONCTION !!LOCALE! AU COMPONENT CHILD, PAS CELLE SUR LE PROPS.
6- REMETTRE LE INPUT VIDE : e.target[0].value = '';

class AddOption extends React.Component {
  constructor (props){
   super(props)
   this.handleAddOptionlocal = this.handleAddOptionlocal.bind(this);
  }
  handleAddOptionlocal(e) {
    e.preventDefault();
    const option = e.target[0].value.trim();  //OU e.target.elements.option.value
    //option ? this.props.handleAddOption(option) : console.log('vide');// OU
        option && this.props.handleAddOption(option)
    e.target[0].value = '';
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleAddOptionlocal} >
          <input type="text" name="option"/>
          <button>Ajouter Option</button>
        </form>
      </div>
    );
  }
}


1-Donc on fait un fonction sur le parent
2- la passe en props -
3-sur le child dans le submit on lance une function
4-qui elle doit relancer la function du parent qu elle a sur son this.props avec le data en argument.
5- le parent pourra maintenant faire de quoi avec le data (option) :
6-
                              ///AJOUTE A UN ARRAY DE STATE AVEC CONCAT OU ES6 /////
                              handleAddOption(option){
                                this.setState((prev) => {
                                  return {
                                    options:  [...prev.options, option] // prev.options.concat(option)
                                  }
                                });
                              }

donc prev.options.concat(option) ou prev.options.concat([option]) OU [...prev.options, option]
QUI EU NE MODIFIE PAS MUTATE PAS.

ON SERAIT PORTER A FAIRE :

  options: prev.options.push(option)
   MAIS PUSH MUTATE UN ARRAY, EN FAIT QUAND ON FAIT UN PUSH LA FONCTION RETOURNE SUR LE COUP LE LENGTH !

  const test = [A,B,C,D,E]
  console.log(test.push('G')) // retourne 6 !! et non pas l array [1,2,3,4,5,7]

 DONC OPTION AURAIT COMME VALEUR, UNE VALEUR NUMERIQUE, 4 ICI (  options : ['truc 1', 'truc 2', 'truc 3'] + LA NOUVELLE ) , PARCE QU ON RAJOUTE UN 4 IEME OPTION.



///////////////////////////////////////////////////////////////////////////////////////////////
     ///MANIPULER LE STATE PARENT AVEC COMPONENT CHILD AVANCEE Fn a FN a FN /////
///////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////
                              ///AJOUTER DE LA LOGIQUE POUR VALIDER/////
///////////////////////////////////////////////////////////////////////////////////////////////

GARDONS LA MEME FONCTION :
ON RECOIT N IMPORTE QUOI EN CE MOMENT, SEUL CHOSE, C EST TRIMÉ ...

BIEN QUE LE CHILD VERIFIE QUE CE N EST PAS VIDE, ON VA FAIRE SEMBLANT QUE NON..
EN FAIT ON VA DEFAIRE LA PROTECTION QU ON AVAIT MIS: option && this.props.handleAddOption(option)

ARRAY.INDEXOF(OPTION) : -1 VEUT DIRE QU IL N A PAS TROUVÉ DE REPONSE IDENTIQUE 0 VEUT DIRE OUI :
var a = [2, 9, 9]; // a.indexOf(2) = 0 a.indexOf(7) = -1

PARENT CLASS
handleAddOption(option){
  //QUE FAIRE ICI POUR VALIDER :
  if(!option){
    return 'ENTREZ UNE OPTION VALIDE SVP'
  } else if (this.state.options.indexOf(option) > -1) {
    return 'CETTE OPTION EXISTE DEJA'
  }

  this.setState((prev) => {
    return {
        options: prev.options.concat(option) //[...prev.options, option]
    }
  });
}

MAINTENANT CES 2 RETURN IRONT LA OU LA FONCTION A ETE APPELÉ: DANS NOTRE CHILD :

A apprendre : const error = this.props.handleAddOption(option)
CECI APPELE LA FONCTION , LA SEULE DIFFERENCE C EST QUE LE RETURN IRA DANS DANS ERROR !!
ET SI Y A UN RETURN ON VEUT/PEUT MAINTENANT LE VOIR !

class AddOption extends React.Component {
  constructor (props){
   super(props)
   this.handleAddOptionlocal = this.handleAddOptionlocal.bind(this);
  }

handleAddOptionlocal(e) {
  e.preventDefault();
  const option = e.target[0].value.trim();
DONC :
  const error = this.props.handleAddOption(option)  // APPELE NORMALEMENT LA FONCTION, MEME SI DANS UN CONST.
ET SI Y A UN RETURN :
  if (error) {
    alert(error) //SOIT 'ENTREZ UNE OPTION VALIDE SVP' OU 'CETTE OPTION EXISTE DEJA' SI LE CAS
  }
...
}


/******************  SI ON VEUT GARDER LES ERRORS avec le STATE Danbs le CHILD ************************/

class AddOption extends React.Component {
  constructor (props){
   super(props)
   this.state = {
     error : false
   }
   this.handleAddOptionlocal = this.handleAddOptionlocal.bind(this);
  }

handleAddOptionlocal(e) {
  e.preventDefault();
  const option = e.target[0].value.trim();

  const error = this.props.handleAddOption(option) //lance la fn , peut recevoir 2 strings error

 this.setState(() => {
   error : error //ou juste error , peut recevoir un des 2 strings
 });
e.target[0].value = ''; //remet le input vide.
}

ENSUITE DANS JUSTE AVANT LA FORME ON PEUT METTRE CONDITIONELLEMENT L ERROR est TRUE PARCE QU IL Y A QUELQUE CHOSE DEDANS , ET QUAND IL Y A QUELQUE CHOSE, UN STRING PAR EX, CEST TRUTHY :

!!IMPORTANT LE LOGICAL OPERATOR ( {this.state.error && <p>{this.state.error}</p>}), DEMANDE A REMETTRE DANS LE <P> DES { } </P> SINON CA VA ECRIRE CA EN STRING ET NON APPELER SA VALEUR !!



render() {
  return (
    <div>
    {/* /*  ENTREZ UNE OPTION VALIDE SVP|CETTE OPTION EXISTE DEJA'*/ */}
   {this.state.error && <p>{this.state.error}</p>}
    {/* /*  ENTREZ UNE OPTION VALIDE SVP|CETTE OPTION EXISTE DEJA'*/ */}

      <form onSubmit={this.handleAddOptionlocal} >
        <input type="text" name="option" style={{width : '250px', height: '25px', marginRight: '20px'}}/>
        <button>Ajouter Option</button>
      </form>
    </div>
  );
}

DONC SI ON ECRIT DEUX FOIS TEST , LA DEUXIEME FOIS , LE <P>CETTE OPTION EXISTE DEJA</P> APPARAIT ET AUCUNE OPTION EST AJOUTÉE

Bon voila

///////////////////////////////////////////////////////////////////////////////////////////////
                              /// RECAPITULONS SUR STATE VS PROPS /////
///////////////////////////////////////////////////////////////////////////////////////////////

1- les props vont que dans une direction, de haut en bas, parent a child .
2- this.props et this.state sont deux obj, et peuvent etre utilise pour renderer.
3- Des changements au 2 cause des re-renders. les props change seulement si le parent les change, ils sont read-only, le state lui se change par this.setState((prevState) => {return {truc: prevState.truc + 1}})
4- Je repete, props ne peut pas etre modifier par un component lui meme .Seulement le state peut se modifier.





///////////////////////////////////////////////////////////////////////////////////////////////
                              ///STATELESS FONCTIONAL COMPONENT/////
///////////////////////////////////////////////////////////////////////////////////////////////

CE GENRE DE COMPONENT , SONT PLUS SIMPLE, NE CONTIENNENT EVIDAMENT PAS DE STATE (STATELESS) NI DE CLASS (FONCTIONAL) , SONT PERFORMANT ET COOL AVEC LA DECONSTRUCTION DE PROPS.
ON NE POURRAIT PAS FAIRE D APP SEULEMENT EN STATELESS, MAIS ON VISE PLUS UN MIX DES DEUX. UNE APP SANS STATE N AURAIT PAS DE DATA...
Fini le this !
Fini le bind !

EXEMPLE:

UN PARENT:
 <ExempleDeStateless propTest={'Benoit'} />

 DANS LE ()  PROPS EST A METTRE OU LA DECONSTRUCTION. {proptest est la deconstruction de  props.propTest}
 const ExempleDeStateless = ({propTest}) => {
  return (
     <div className="ExempleDeStateless">
         <h1>Bravo {propTest}</h1>  //Bravo Benoit
     </div>
   )
 };


Donc simplement un autre exemple class VS Stateless :
class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.sousTitre}</h2>
      </div>
    );
  }
}
VS
const Header = ({title, sousTitre}) => {
 return (
   <div>
     <h1>{title}</h1>
     <h2>{sousTitre}</h2>
   </div>
  )
};
OU
const Header = (props) => {
  return (
   <div>
     <h1>{props.title}</h1>
     <h2>{props.sousTitre}</h2>
   </div>
  )
}


ON PEUT AUSSI REDUIRE :

const Header = ({title, sousTitre}) => (
   <div>
     <h1>{title}</h1>
     <h2>{sousTitre}</h2>
   </div>
  )


///////////////////////////////////////////////////////////////////////////////////////////////
                              ///Etablir des props avec defaultProps/////
///////////////////////////////////////////////////////////////////////////////////////////////
DEFAULTPROPS EST UNE OBJ QUI PERMET DE STORER DES PROPS
SI LE PARENT N ENVOIT PAS LA PROPS TEL QUE CONVENU.

Header.defaultProps = {
  title: 'Un titre par defaut si jamais l autre load pas'
}
const Header = (props) => (
   <div>
     <h1>{props.title}</h1>
     {props.sousTitre && <h2>{props.sousTitre}</h2> }  //seulement si dans l appel du component
   </div>
  )


<Header  sousTitre={subtitle} /> // pas de title




ON PEUT AUSSI EN METTRE SUR UN CLASS COMPONENT, POUR PAR
EXEMPLE LAISSER L UTILISATEUR LES SETTER SANS AVOIR A TOUCHER AU COMPONENT :

class IndecisionApp extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      options : props.options  //ICI PAS DE THIS , ON A ACCES DNAS LE CONSTRUCTOR DIRECT.
    }
...


IndecisionApp.defaultProps = {
  options : []
}


ICI L UTILISATEUR POURRAIT ENTRER LES BARS DE SON CHOIX :
ReactDOM.render(<IndecisionApp options={['Porte Rouge', 'Latulipe']}/>, document.getElementById('app'));



///////////////////////////////////////////////////////////////////////////////////////////////
                              ///REACT DEV-TOOLS DANS CHROME /////
///////////////////////////////////////////////////////////////////////////////////////////////
Cest cool.


///////////////////////////////////////////////////////////////////////////////////////////////
                              ///TRUC POUR REFORMATER SETSTATE AVEC ARROW FUNCTION/////
///////////////////////////////////////////////////////////////////////////////////////////////

Ceci est long pour rien , pour simplement mettre un array vide , ca semble bcp de code.

si on veut retourner un obj :
 const test = () => ({})
entourer de () {} n est plus le fonction body.


CA:
handleDeleteOptions(){
    this.setState(() => {
      return {
        options: []       //remet l arr a 0
      }
    });
}

DEVIENT CA, IL FAUT ABSOLUMENT WRAPPER L OBJ, SINON CA DEVIENT LE FUNCTION BODY:

handleDeleteOptions(){
    this.setState(() => ({ options: [] }));
}



///////////////////////////////////////////////////////////////////////////////////////////////
   ///Complexe-  PASSER UNE FUNCTION AVEC ARG DU PARENT A UN CHILD ET LUI PASSE A SON CHILD - 3 LAYERS/////
///////////////////////////////////////////////////////////////////////////////////////////////
CE GENRE DE SITUATION ARRIVE SOUVENT, PARTICULIEREMENT SI ON NE TRAVAILLE PAS AVEC REDUX.


LE SCENARIO EST CELUI-CI LE PARENT :
1-
//PREND COMME ARGUMENT L OPTION ELLE MEME .
this.handleDeleteOptionSolo = this.handleDeleteOptionSolo.bind(this);
et
handleDeleteOptionSolo(option){
    console.log('ca marche', option)
    ...
}

ET DANS LE RENDER
<Options
  ...
  handleDeleteOptionSolo={this.handleDeleteOptionSolo}
 />




LE PREMIER CHILD LUI RECOIT UN ARRAY DU PARENT ET PASSE CHAQUE ITEM A SON CHILD ET AUSSI HANDLEDELETEOPTIONSOLO QUI VA PERMETTRE DE TRUIRE CHAQUE LIGNE, UNE A LA FOIS:
2-
const Options = ({handleDeleteOptions, optionsArr, handleDeleteOptionSolo}) => (
  <div>
    {optionsArr.length === 0 && <h6>Aucune option pour le moment</h6>}
    <ol>
      {optionsArr.map(option => (
        <Option key={option} optionText={option} handleDeleteOptionSolo={handleDeleteOptionSolo}/>
      ))}
    </ol>
  </div>
  )




///////La mauvaise methode
LE DERNIER CHILD :
3- PAS BON PAS BON PAS BON
const Option = ({optionText, handleDeleteOptionSolo}) => {
 return (

     <li> Choix: {optionText}
        <button onClick={handleDeleteOptionSolo({optionText})}> Supprimer</button>
      </li>

CECI NE FONCTIONNERA PAS , LA FONCTION SE LANCE IMMEDIATEMENT A CAUSE DU () . LA MANIERE DE CONTOURNER CECI EST DE FAIRE UNE UNE FONCTION INLINE

/////la bonne
IMPORTANT !
AUSSI C EST PAS CLAIR QUAND WRAPPER OU PAS NOS PROPS  ({optionText, handleDeleteOptionSolo})
DANS UNE INLINE JSX FUNCTION, NON !!!
4- BON
const Option = ({optionText, handleDeleteOptionSolo}) => {
 return (
     <li style={{margin: '10px'}}> Choix: {optionText}
        <button onClick={(e) => {
          handleDeleteOptionSolo(optionText)
        }}
          style={{marginLeft: '20px'}}> Supprimer</button>
      </li>
);}


ENSUITE COMMENT TRIER AVEC FILTER CELUI QU ON VEUT ENLEVER
AVEC FILTER QUI NE DETRUIT PAS , IMUTABLE , TOUT SAUF L ITEM QU ON A CHOISI

LA FONCTION DANS LE PARENT, CELLE DU DEBUT.

handleDeleteOptionSolo(option){
  console.log(option)  //nom du click ex: porte rouge

    this.setState((prevState) => ({
  options: prevState.options.filter(item => {
    return option !== item;
  })
}));
}

DONC PREND L ARR AVEC TOUS LES OPTIONS ET EN REFAIT UNE SANS LUI DE LA SELECTION .


RESUMONT :
DONC ON PASE DE PARENT UN FN , QUI SUR LE CHILD EST UN PROPS, CE PROPS ON LE REPASSE A UN AUTRE CHILD. POUR L APPELER ON DOIT FAIRE UNE FONCTION INLINE .  ENSUITE FILTRER RETOURNER TOUT SAUF LUI QU ON A CLIQUÉ .

AUSSI DNAS UN FUNCTION LES PROPS N ONT PAS BESOIN DE {}

///////////////////////////////////////////////////////////////////////////////////////////////
                              ///3-layer 3-click fin/////
///////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////
                              ///CLASS ET LIFECYCLE/////
///////////////////////////////////////////////////////////////////////////////////////////////

CE SONT DES MOMENTS , DES FUNCTIONS, DES STOP DANS L EXECUTION QUI PERMET DE FAIRE DES TRUCS, AU DEPART, A LA FIN, APRES LE DEPART... ETC, COMME EN ANIMATION , ils sont seulement dispo dans les class component:

LES LIFECYCLE SONT EXCELLENT POUR AIDER A ENREGISTRER LE DATA , QUAND LE RENDER EST FINI:
POUR L INSTANT SANS DB, AVEC LOCALSTORAGE:

//une fois le render fait. bon pour chercher le data par fetch
componentDidMount(){
  console.log('componentDidMount')
}
// une fois qu on ajoute ou change du data - bon poyur saver le data
componentDidUpdate(){
  console.log('componentDidUpdate')
}

DANS CEUX CI ON A BIEN SUR ACCES A THIS.PROPS ET THIS.STATE , MAIS AUSSI A D AUTRES ARGUMENT, TRUCS .

componentDidUpdate(prevProps, prevState){
  console.log('componentDidUpdate', prevProps, prevState)
  //retourne l array des props et state :[ porte rouge, latulipe ]
}

//lui s'active juste au moment de quitter le component. rarement utiliser bon pour les transitions de page
componentWillUnmount(){
  console.log('componentWillUnmount')
}

POUR PLUS D INFO :
https://reactjs.org/docs/react-component.html

MOUNTING depart Dans l ordre d appel:
These methods are called when an instance of a component is being created and inserted into the DOM:
constructor()
componentWillMount()
render()
componentDidMount()

UPDATING Dans l ordre d appel:
An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:
componentWillReceiveProps()
shouldComponentUpdate()
componentWillUpdate()
render()
componentDidUpdate()

UNMOUNTING
This method is called when a component is being removed from the DOM:
componentWillUnmount()

ERROR HANDLING
This method is called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component.
componentDidCatch()


///////////////////////////////////////////////////////////////////////////////////////////////
                              ///CLASS ET LIFECYCLE FIN/////
///////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////
                              ///LOCALSTORAGE - LA CHEAP DB AVEC JSON /////
///////////////////////////////////////////////////////////////////////////////////////////////
QUAND ON VEUT PAS SE CASSER LE COCO :
IMPORTANT : LOCALSTORAGE NE FONCTIONNE QU AVEC DU STRING DATA - PAS D OBJET , NUMBER, RIEN QUE DES STRING

https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage

monStockage = localStorage;

SETITEM - GETITEM prend key , value  separré par une virgule pour string :

localStorage.setItem('monChat', 'Tom');
alert( "mon Chat s'appele= " + localStorage.getItem("monChat"));

MAIS ...
localStorage.setItem('monAGE', 2);
alert( "mon Chat A= " + localStorage.getItem("monAGE"));
VA RETOURNER NOM PAS 2 MAIS LE STRING "2"


POUR DELETER :
localStorage.clear()  //enleve tout


DONC COMMENT FAIRE POUR CONTOURNER CETTE SEVERRE LIMITATION : JSON

JSON.stringify() //met en string un obj ou arr
JSON.parse()    //remet en obj ou arr

const test = JSON.stringify(age: 26) //{"age":26}
JSON.parse(test) //{ age :26}


DONC DANS NOTRE QUOTIDIENT:
componentDidUpdate roule souvent . un peu trop , meme si un array vide se fait passer un array vide ..
donc on doit verifier si un reel changement s est produit:

componentDidUpdate(prevProps, prevState){
  if (prevState.options.length !== this.state.options.length){
    console.log('componentDidUpdate', prevProps, prevState)
  }
}

SI ON DELETE UN DES TRUC DANS L ARRAY : componentDidUpdate {options: Array(1)} {options: Array(2)}

Donc:

componentDidUpdate(prevProps, prevState){
  if (prevState.options.length !== this.state.options.length){
   const json = JSON.stringify(this.state.options) //array.
   localStorage.setItem('optionsBU', json)  //on met la key qu on veut bien.
  }
}


SI ON VEUT VISUALISER RAPIDEMENT:
componentDidUpdate(prevProps, prevState){
  if (prevState.options.length !== this.state.options.length){
   const json = JSON.stringify(this.state.options)
   localStorage.setItem('optionsBU', json)
  }
  setTimeout( () => {
    console.log(localStorage.getItem('optionsBU')) //on verra la sauvegarde
  },1000)
}
//["Porte Rouge","Latulipe","ajout1","ajout2"]


DE MANIERE UTILE MAINTENANT :
componentDidMount(){  //roule en partant, donc serait la bonne place pour reload le localStorage
  const json = localStorage.getItem('optionsBU'); //arr de string
  const optionsArr = JSON.parse(json) //arr normale
  this.setState(() => ({ options:  optionsArr}));
  console.log('componentDidMount')
}


MAIS METTONS QUE QUELQU UN VA DANS LA CONSOLE ET FAIT :
localStorage.clear()
ENSUITE
localStorage.setItem('optionsBU')
ON AURA NULL ET ENSUITE LE TROUBLE VIENT:
localStorage.getItem(null)
RETOURNE NULL ET ON VEUT PAS NULL.

DONC VERIFIER QU IL Y A UNE VALEUR:

if(optionsArr){  //pas null donc
  this.setState(() => ({ options:  optionsArr}));
}


ET SI Y A DU CACA COMME DATA , TRY CATCH BLOCK :
componentDidMount(){
  try {
    const json = localStorage.getItem('optionsBU');
    const optionsArr = JSON.parse(json);

    if (optionsArr) {
      this.setState(() => ({ options: optionsArr }));
    }
  } catch (e) {
    console.log('data est pas bon');
  }
}


IMPORTANT POUR LOCALSTORAGE ET LE TROUBLE DE TRAVAILLER AVEC DES NUMBERS EST D AVOIR A LES CONVERTIR
UNE FOIS PASSÉ PAR LOCALSTORAGE DE STRING '8' A 8 AVEC PARSEINT('8', 10) lE DEUXIEME ARGUMENT EST POUR SIGNIFIER SUR QUELLE BASE ON EST , LA BASE 10 EST UTILISEE

console.log(parseInt('10', 10)) //10

sinon '10' + 1 == "101"

EXEMPLE AVEC CHIFFRES

this.state = {
  count: 0
};


componentDidMount(){
  const numString = localStorage.getItem('countBU');
  const optionsArr = parseInt(numString, 10)

  if(!isNaN(optionsArr)){ ///si y a de la scrapp
    this.setState(() => ({ count:  optionsArr}));
  }
  console.log('componentDidMount')
}


componentDidUpdate(prevProps, prevState){
if(prevState !== this.state){
     localStorage.setItem('countBU', this.state.count)
}
   ///test
  // setTimeout( () => {
  //   console.log(localStorage.getItem('countBU')) //on verra la sauvegarde
  // },1000)
}


///////////////////////////////////////////////////////////////////////////////////////////////
                              ///LOCALSTORAGE - LA CHEAP DB AVEC JSON /////
///////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////
                              /// WEBPACK POUR REACT /////
///////////////////////////////////////////////////////////////////////////////////////////////
https://webpack.js.org/concepts/

PREMIERE CHOSE :
webpack.config.js

doit etre au root du folder.

DANS
module.exports = {

}

ON DOIT LUI DIRE :
1- le entry
2- le output :
le ouput , est le path absolue (la machine complete, incluant le user),
de la l interet d utiliser PATH de node path.resolve(__dirname, 'public') OU .join(),
__dirname fait le boulot pour se rendre au root du projet,
'public' est le folder dnas le root qu on veut aller

DONC:
const path = require('path');
2
module.exports = {
  entry: './src/app.js',
  output: {
  path: path.resolve(__dirname, 'public'),
  filename: 'bundle.js'
  }
}

A CE POIT-CI , AVEC JUSTE CELA, ON PEUT ROULER WEBPACK, CA DONNERA FUCK ALL, MAIS CA ROULE :
dans package.json:  "build": "webpack --watch",

danas le terminal: YARN RUN WEBPACK
UN BUNDLE.JS EST AJOUTÉ A PUBLIC.



///////////////////////////////////////////////////////////////////////////////////////////////
                              ///ajouter des loaders pour babel JSX/////
///////////////////////////////////////////////////////////////////////////////////////////////

POUR POUVOIR LIRE DU CSS - ES6 - JSX, IL FAUT AJOUTER DES
LOADERS A WEBPACK POURQU IL PUISSE FAIRE SON BOULOT CORRECTEMENT



ON PART DE :
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
  path: path.join(__dirname, 'public'),
  filename: 'bundle.js'
},
module: //LOADERS
}



DANS NPM :
yarn add babel-core //babel pour webpack
yarn add babel-loader //plugin webpack


LES MODULE RULE:
https://webpack.js.org/configuration/module/#rule

const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};


IL NE RESTE MAINTEANT QU A AJOUTER LE .BABELRC SUR LE ROOT :

.babelrc:
{
  "presets" : ["env", "react"]
}
//qui match avec nos :
"babel-preset-env": "^1.6.0",
"babel-preset-react": "^6.24.1",


/************************************ A CE POINT CI REACT FONCTIONNERA ************************************/


///////////////////////////////////////////////////////////////////////////////////////////////
                              ///IMPORT EXPORT ES6/////
///////////////////////////////////////////////////////////////////////////////////////////////

PREMIERE CHOSE ON DOIT AVOIR UN MODULE BUNDLER - WEBPACK-  SINON ON AURA REQUIRE NOT FOUND.

PATH
pour un import dans le meme folder :
 import './nom.js'    ON DOIT ABSOLUMENT METTRE LE ./  not found sans le path!!!
 AUSI ON DOIT CONTRAIRMENT A REQUIRE, COMMON.JS, METTRE L EXTENSION.
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
CECI DIT LE CODE MONTRERA <UNKNOWNED /> UNE FOIS DANS LE HTML, MAIS FONCTIONNERA


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

MAIS SI ON A PAS FAIT NOTRE CONFIG DANS WEBPACK ...


On doit importer react dans chaque components qu on creer par page. aussi si un component child est utiliser on doit l importer en plus. le fait d avoir les deux sur le parent aidera pas . chaque fichier/page est independant.
///////////////////////////////////////////////////////////////////////////////////////////////
                              ///ajouter des loaders pour babel JSX/////
///////////////////////////////////////////////////////////////////////////////////////////////

POUR POUVOIR LIRE DU CSS - ES6 - JSX, IL FAUT AJOUTER DES
LOADERS A WEBPACK POURQU IL PUISSE FAIRE SON BOULOT CORRECTEMENT



ON PART DE :
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
  path: path.join(__dirname, 'public'),
  filename: 'bundle.js'
},
module: //LOADERS
}



DANS NPM :
yarn add babel-core //babel pour webpack
yarn add babel-loader //plugin webpack


LES MODULE RULE:
https://webpack.js.org/configuration/module/#rule

const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};


IL NE RESTE MAINTEANT QU A AJOUTER LE .BABELRC SUR LE ROOT :

.babelrc:
{
  "presets" : ["env", "react"]
}
//qui match avec nos :
"babel-preset-env": "^1.6.0",
"babel-preset-react": "^6.24.1",


/******  A CE POINT CI REACT FONCTIONNERA DU MOINS POUR LE DEVELLOPMENT , LE CODE N EST PAS OPTIMISÉ   *****/



///////////////////////////////////////////////////////////////////////////////////////////////
            ///MIEUX TRAVAILELR AVEC LES CLASS AVEC plugin:  Class properties transform/////
///////////////////////////////////////////////////////////////////////////////////////////////

IL EST POSSIBLE D EVITER DANS NOS COMPONENTS CLASS:

 LES CONSTRUCTOR,
 SUPER,
 MEME LE BIND(THIS)
info:
https://michalzalecki.com/react-components-and-class-properties/

install:
https://babeljs.io/docs/plugins/
LES STAGE DE DEVELOPMENT DE ES6-7-8 ET CE QUE BABEL PEUT FAIRE :

Stage 0 - Strawman: just an idea, TROP RECENT VRAIMENT.
Stage 1 - Proposal: this is worth working on, BON FILON
Stage 2 - Draft: initial spec. CA VA PASSER
Stage 3 - Candidate: complete spec and initial browser implementations. DEJA UN PEU SUR LES BROWSER
Stage 4 - Finished: will be added to the next yearly release. C EST LIVE BIENTOT


DANS LE STAGE 2, ILY A LE : Class properties transform
https://babeljs.io/docs/plugins/transform-class-properties/
CECI TRANSFORME NOS CLASS EN FUNCTIONNAL SANS QU ON LE SACHE ... ET EVITE LES TROUBLES DE BINDING.


INSTALL :
yarn add babel-plugin-transform-class-properties

POUR SE FaiRE :
.BABELRC :
{
  "presets" : ["env", "react"],
  "plugins": ["transform-class-properties"]
}

*doit repartir notre dev-server..

EXEMPLE D UTILISATION SIMPLE:

class Avant {
  constructor() {
    this.name = 'Ben';
  }
  getGret() {
    return `allo mon nom est ${this.name}`;
  }
}
const old = new Avant();
console.log(old.name) //ben
console.log(old.getGret()) //allo mon nom est ben
//MAIS SI ON FUCK ET APPEL D AILLEUR :
const ext = old.getGret;
console.log(ext.call(old)); //marche pu si on met pas call() ou faire le binding dans le constructor

MAINTENANT:

class AvecPlugin {
  name = 'Ben'; //pu de this pour les variables ni meme autre let var const! key = value
  getGret = () => {  POUR LES METHODES , LE ARROW FUNCTION BIND UNE FOIS POUR TOUJOURS.
    return `allo mon nom est ${this.name}`;
  };
}
const nouveau = new AvecPlugin();
console.log(nouveau.name) //BEN
console.log(nouveau.getGret()); // ca marche !
TEST D EXTERIEUR :
const test = nouveau.getGret;
console.log(test()); // ca marche !


EXEMPLE D UTILISATION AVEC REACT :
ca:
class AddOption extends React.Component {
  constructor (props){
   super(props)
   this.state = {
     error : undefined
   }
   this.handleAddOptionlocal = this.handleAddOptionlocal.bind(this);
  }
  handleAddOptionlocal(e) {
    ...

devient:

class AddOption extends React.Component {
  state = {                                 //pas de this et de constructor, ni de binding
    error : undefined
  }
  handleAddOptionlocal = (e) =>  {        //ARROW FUNC


important:
CECI VA DE TOUS LES METHODES D UNE CLASS SAUF !! LES METHODES DE REACT, COMME LES LIFECYCLES :



///////////////////////////////////////////////////////////////////////////////////////////////
                              ///React differente maniere d inserer du JSX /////
///////////////////////////////////////////////////////////////////////////////////////////////


1-on peut passer ce JSX directement avec {template}
2-on peut le passer en props , avec <Layout content={template}/>
3- on peut aussi inserer entre deux balises de component <Layout> <p>inserer ici</p> </Layout>
cette derniere maniere nous donne acces a ce qui entre les deux balises ailleurs avec this.props.children

1-2 :

const template = (
  <div>
    <h1>Titre Page</h1>
    <p>Ceci est une page</p>
  </div>
);

const Layout = ({content}) => {
 return (
    <div className="Layout">
      <p>Header</p>
      {/* {template} OU */}
      {content}
      <p>Footer</p>
    </div>
  )
};

 ReactDOM.render(<Layout content={template}/> , document.getElementById('app'));


3:
 const Layout = (props OU {children}) => {
  return (
     <div className="Layout">
       <p>Header</p>
       {props.children}  OU {children}        //on verra <p>inserer ici</p>
       <p>Footer</p>
     </div>
   )
 };

 ReactDOM.render(<Layout> <p>inserer ici</p> </Layout>, document.getElementById('app'));


donc:
CETTE TECHINIQUE EST IMPORTANT AVEC LES TIERS PARTIE,
LES COMPONENTS QU ON TROUVE SUR LE WEB

///////////////////////////////////////////////////////////////////////////////////////////////
                              ///Comment Styliser un component /////
///////////////////////////////////////////////////////////////////////////////////////////////


import './style/style.scss'
Dans le scss , on peut importer les aux(partial) dans style.scss.
Exemple :
UN FICHIER DANS: style/base/_reset.scss
NOTRE MAIN LUI EST DANS: style/syle.scss

PAS D EXPORT.SEULEMENT UN IMPORT :

@import './base/reset';
CE, MEME SI LE FICHIER SE NOMME _reset OU VA METTRE reset, IL NE FAUT PAS OUBLIER LE POINT VIRGULE=   ;



IL EST BON DE GARDER LA MEME STRUCTURE QUE NOTRE REACT , SPNC FAIRE DANS STYLE UN REP COMPONENT
ET FAIRE / NOMMER NOS PARTIALS DE LA MEME MANIERE QUE NOS COMPONENTS.

donc style/components/_header.scss  pour le component Header dans react:
@import './components/header';

pour :

const Header = (props) => (
   <div className="header">
     <h1>{props.title}</h1>
     {props.sousTitre && <h5>{props.sousTitre}</h5> }
   </div>
  )




/************************************ LE BEM ************************************/
BLOCK ELEMENT MODIFIER

EVITER LE SCSS HELL :


Ca semble plus vite, mais peut rendre les choses fort complexe.
.header {
 h1 {
   span{
     a{
       icone {
       }
   }
 }
}


ICI LE BLOCK EST HEADER ENSUITE DONNER DES CLASS QUI EXPLIQUE LE CONTEXT DES ELEMENTS
DONC MIEUX VAUT DONNER DES CLASS EN FONCTION DU COMPONENT.

.header {
 background: #20222b;
 margin-bottom: 4.8rem;
 color: #fff;
 padding: 1.6rem 0;
}

.header__titre {
  font-size: 3.5rem;
  margin: 0;
}

.header__subtitle {
  color: rgb(91, 92, 90);
    font-size: 1.6rem;
}

/************************************ Normalize.css ************************************/

UN RESET DE CSS par NPM:

yarn add normalize.css


pour utiliser :
import 'normalize.css/normalize.css';
ensuite notre propre scripte
import './style/style.scss';

OU dans un fichier directement comme _reset et l importer en premier:
@import './base/reset';
@import './base/settings';
@import './base/base';
@import './components/header';



!!IMPORTANT IL NE FAUT PAS AVOIR DE
EXCLUDE: /NODE_MODULES/ DANS LE CONFIG DU CSS/SCSS DE WEBPACK!
il faut :
{
  use: [ 'style-loader','css-loader','sass-loader' ],
  test: /\.s?css$/
}


/*****************************  se faire des normes d'espace et couleurs  ********************************/

Dans base/_setting.scss :
@import './base/reset';
@import './base/settings';
...
Doit etre tout de suite apre le reset


///couleurs
$off-black: rgb(75, 75, 75);
$vert-cool: rgb(140, 201, 0);
$but : rgba(37, 179, 51, 0.5);
$butHigh: rgba(37, 179, 68, 1);

//Spaccing
$s-size: 1.2rem;
$m-size: 1.6rem;  //16px
$l-size: 3.2rem;  //32 ..
$xl-size: 4.8rem;


CE QUI AIDE A NORMALIZER SON APP.

/************************************ Les fonction SCSS ************************************/
info:
http://sass-lang.com/documentation/Sass/Script/Functions.html

  border-bottom: .6rem solid darken($violet, 10%);


  hue($color) : Gets the hue component of a color.

  saturation($color) : Gets the saturation component of a color.

  lightness($color) : Gets the lightness component of a color.

  adjust-hue($color, $degrees) : Changes the hue of a color.

  lighten($color, $amount) : Makes a color lighter.

  darken($color, $amount) : Makes a color darker.

  saturate($color, $amount) : Makes a color more saturated.

  desaturate($color, $amount) : Makes a color less saturated.

  grayscale($color) : Converts a color to grayscale.

  complement($color) : Returns the complement of a color.

  invert($color, [$weight]) : Returns the inverse of a color.


plein d autre :
http://sass-lang.com/documentation/Sass/Script/Functions.html


/************************************ les modifier  ************************************/


ON PEUT PRENDRE UNE CLASS ET EN FAIRE UNE VERSION ALTERNATIVE :

on prend le nom : button et avec 2 -- et un nouveau nom.
et faire differente variation de bouton basee sur le bouton maitre.

.button {
  background: $violet;
  border: none;
  border-bottom: .3rem solid darken($violet, 10%);
  color: white;
  padding: $s-size
}

//BEM - modifier

.button--link{
  background: none;
  border: none;
  color: $vert-cool;
  padding: 0;
}


POUR L UTILISATION :
classname="button button--link"





///////////////////////////////////////////////////////////////////////////////////////////////
            ///AMENER DES COMPONENTS DE QUELQU UN D'AUTRE POUR UN MODAL OU AUTRE/////
///////////////////////////////////////////////////////////////////////////////////////////////

LES COMPONENTS PLEUVENT POUR REACT, POURQUOI CODER POUR RIEN:
https://github.com/reactjs/react-modal

install:
yarn add react-modal

COMMENT L IMPORTER (voir les docs sur github):
import Modal from 'react-modal';


Exemple :
<Modal
  isOpen={true} ///est le truc qui dit si affiche ou pas . true false
  onAfterOpen={afterOpenFn} //methode ajouté
  onRequestClose={props.handleClearSelectedOption} //methode ajoutée par modal pour fermer avec esc et hors cible, on y met la function qu on a fait pour fermer le modal.
  closeTimeoutMS={n} //methode ajouté pour temps d affichage
  style={customStyle}
  contentLabel="Modal"
>
  <h1>Modal Content</h1>
  <button onClick={props.handleClearSelectedOption}> Fermer</button>
</Modal>


pour faire en sorte que quand il y a quelquechose ca affaiche et si il y a rien undefined , il est bon pour un state d etre ainsi construit

this.state.truc = undefined

si quelque chose s ajoute = ca devient true

<Modal
  isOpen={!!props.selectedOption} /> //is open demande true ou false . donc : !!leStateMaintneantUnProps

retour sur true bool. avec le !!
!!undefined == false
!!'string-arr-obj' == true


LE CONCEPT RESTE LE MEME , ON MET LES FUNCTION SUR LE PARENT, ET ON PASSE LES FUNCTION EN PROPS AU COMPONENT QUI A LE MODAL. SI ON A BESOIN D UN STATE ON L AJOUTE AU PARENT .




///////////////////////////////////////////////////////////////////////////////////////////////
                              ////EXTRA styliser le component externe ////
///////////////////////////////////////////////////////////////////////////////////////////////

UNE BONNE IDEE EST DE RAMENER LE HTML PRODUIT PAR LE COMPONENT EN ACTION


/*<div class="ReactModalPortal">
  <div*/  CE DIV EST L OVERLAY QUI CACHE TOUT LE SITE QU ON CLIC POUR SORTIR./*
    class="ReactModal__Overlay ReactModal__Overlay--after-open"
    style="position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; background-color: rgba(255, 255, 255, 0.75);"
  >
    <div */ CE DIV EST LA BOITE OU LES TRUC VONT (TEXT ET BOUTON) /*
      class="ReactModal__Content ReactModal__Content--after-open"
      tabindex="-1"
      aria-label="Modal"
      style="position: absolute; top: 40px; left: 40px; right: 40px; bottom: 40px; border: 1px solid rgb(204, 204, 204); background: rgb(255, 255, 255); overflow: auto; border-radius: 4px; outline: none; padding: 20px;"
    >
      <h3>Option Selectionnée</h3>
      <p> cghc </p>
      <button>OK</button>
 */


ON VA FAIRE UN FADE IN DU MODAL:
.ReactModalPortal > div {
  opacity: 0;
  transition: all 0.35s ease-in-out;
  -webkit-transition: all 0.35s ease-in-out;

}
.ReactModalPortal .ReactModal__Overlay--after-open {
  opacity: 1;
}

LE TROUBLE VIENT QUAND ON FERME, ON NE PEUT PAS RENVERSER LA TRANSITION,
LE COMPONENT S EN VA  COMPLETEMENT DE L ECRAN NE LAISSANT
AUCUN TEMPS POUR UN TRANSITION

COMMENT CONTOURNER:
LE COMPONENT A UN PROPS closeTimeoutMS:
<Modal
  ...
  closeTimeoutMS={350} en ms
/>


EN FAIT MODAL OFFRE LA POSSIBILITÉ AU LIEU D ARRANGER CE QU IL ON FAIT ,
DE PARTIR A ZERO, AVEC LA PROPS CLASSNAME

<Modal
...
  closeTimeoutMS={200}
  className='modal'
/>

ENSUITE ON ENTRE CE QU ON VEUT BIEN POUR LA FENETRE
DONC TOUJOURS VERIFIER LES OPTION DES COMPONENTS.




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
                              ///QUERY STRING ET PARAMETRES URL DYNAMIQUE/////
///////////////////////////////////////////////////////////////////////////////////////////////

CHAQUE FOIS QU ON PASSE UN COMPONENT DANS UN ROUTE,
ON DONNE A NOS COMPONENT DES OUTILS SUPPLEMENTAIRES

UN SIMPLE CONSOLE.LOG(props) VA NOUS LE DEMONTRER

const EditExpensePage = (props) => {
  console.log(props)
  ...
//match: {…}, location: {…}, history: {…}, staticContext: undefined

history : va nous permettre de choisir ce qu on fait a la sorti du component et autre chose...
//history:{length: 48, action: "PUSH", location: {…}, createHref: ƒ, push: ƒ, …}

match: params est la dedans (COMME DANS EXPRESS) , on verra plus loin
//match:{path: "/edit", url: "/edit", isExact: true, params: {…}}

location: ajouter des valeur #id pour scroll et query genre http://localhost:8080/edit?query=name
//location: {pathname: "/edit",search: "?query=name", hash: "", state: undefined, key: "8ih3z0"}


DONC SI ON DOIT EDITER LA FICHE 99 A http://localhost:8080/edit/99
/EDIT EST STATIC, MAIS SI ON VEUT POUVOIR METTRE UNE PORTION DYNAMIQUE /EDIT/CHIFFRE
ON DOIT LE SIGNALER A REACT ROUTER COMEM DANS EXPRESS =

<Route path="/edit/:id" component={EditExpensePage} />

MAINTENANT http://localhost:8080/edit/99
DANS LA CONSOLE ON REGARDE MATCH.PARAMS:
params: {id: "99"}  DONC ON A UN KEY -> VALUE PAIR.

ET DANS LE COMPONENT EditExpensePage:
 <p>je suis le id : {props.match.params.id}</p> //99


 !! ATTENTION , MAINTENANT SI ON RETOURNE SUR /EDIT ET RIEN D AUTRE ON RECOIT UN 404
 PUISQUE QU ON NE PRESENTE AUCUN ID ET DONC S AJOUTE (COMME DNAS TOUS LES CAS DE 404)
 LE COMPOMENT DE OUPS404

 COMMENT EVITER CECI :
 ON VA RETIRER LE LINK !! HAHAHA

<NavLink to="/edit" activeClassName="is-active">EDIT</NavLink> //bye bye



CE CHEMIN SERA UN QUI DEMANDE UN LOGIN.
HEADER QUI EST HORS DU SWITCH - ROUTE N A PAS ACCES A CES PROPS. IL FAUT UN ROUTE.
<Header /> //LUI A RIEN DE CA
<Switch>
  <Route path="/" ... />
</Switch>







///////////////////////////////////////////////////////////////////////////////////////////////
                          ///REACT HIGHER ORDER COMPONENT -HOC-  /////
///////////////////////////////////////////////////////////////////////////////////////////////
DEFINITION:
UN (HOC) EST UN COMPONENT QUI RENDER UN AUTRE COMPONENT QUI LUI EST UN REGULIER.
LE BUT EST DE:
1-REUTILISER DU CODE
2-HIGHJAKER LE RENDER
3-MANIPULER LE PROP
4-ABSTRACK STATE ?



+--------------------------------------------------------+
|                                                        |
|   component 1- stateless -regulier, on l utilise
    a certaine place ainsi
|     +---------------------------------------------+    |
|     |          photo mettons                      |    |
|     |                                             |    |
|     |                                             |    |
|     |                                             |    |
|     |                                             |    |
|     +---------------------------------------------+    |
|     |        texte                                |    |
|     |                                             |    |
+-----+---------------------------------------------+----+


    component hoc. il permet d ajouter des options au component 1
    sans avoir a refaire un autre component avec ce que le component 1 fait deja .
    OU SIMPLEMENT PRESENTER OU NON LE COMPONENT SEULEMENT SI LE USER EST LOGUER PAR EXEMPLE.
+-----------------------------------------------------------+
|     +-----------------------------------------------+     |
|     |   serie de bouton, action possible            |     |
|     +-----------------------------------------------+     |
|     |                                               |     |
|     |                                               |     |
|     |        photo, du component 1                  |     |
|     |                                               |     |
|     |                                               |     |
|     |                                               |     |
|     +-----------------------------------------------+     |
|     |      texte du component 1                     |     |
|     |                                               |     |
+-----+-----------------------------------------------+-----+


EXEMPLE:
import React, {Component} from "react";
import ReactDOM from 'react-dom';



//component 1 regulier stateless
const Info = (props) => (
 <div>
   {console.log(props)} // {isAdmin: true, info: "Benoit"}
   <h1>Info</h1>
   <p>l'info est : {props.info}</p>
 </div>
);


WrappedComponent EST LE COMPONENT 1 ICI ( INFO) , AINSI ON PEUT AJOUTER DES TRUCS A COMPONENT 1
SANS TOUT AVOIR A REFAIRE, SI LE component 1 EST DEJA UTILISE DANS SA FORME INITIALE .
DONC ON MOFIFIE , AMELIORE UN COMPOENENT SANS AVOIR A LE REFAIRE COMPLETEMENT.

//HOC higher order component :
//avecAdminWarning est une function reguliere qui retourne une fonction et pas vraiment un component

const avecAdminWarning = (WrappedComponent) => {
  return (props) => (  //CECI EST LE PROPS DU STATELESS , COMPONENT 1 (INFO)
    <div>
      <p>je pourrais ajouter des boutons et changer le props qui au component1</p>
      {props.isAdmin && <p>Ceci est de l info privee, ne pas partager si vous n etes pas admin</p>}
      <WrappedComponent  {...props}/>
    </div>
  );
};

  // <WrappedComponent  {...props}/> SHORTCUT POUR REDONNER TOUS LES PROPS!!
PASSER {...PROPS} DANS UN COMPONENT HOC, LUI REDONNE
LE LIEN QU IL A DANS SON COMPONENT ORIGINEL : COMME <WrappedComponent  info='Benoit'/>
Aussi C EST AVANT TOUT UN EXCELLENT SHORTCUT, SI Y A 6 PROPS , CA FAIT TOUT D UN COUP !



AdminInfo EST LE COMPONENT HOC ET DONC LUI QU ON RENDER.

const AdminInfo = avecAdminWarning(Info)

ReactDOM.render(<AdminInfo isAdmin={true} info='Benoit' />, document.getElementById('app'));




/************************************ AUTRE EXEMPLE  ************************************/

ICI ON VA MONTRER LE COMPONENT , SEULEMENT SI isAuthenticated={true}

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



DONC :

SI <WrappedComponent   {...props} />  AVAIT PAS  {...props} IL FAUDRAIT TOUT REPASSER LES PROPS QU IL A DE BESOIN : <WrappedComponent  isAuthenticated={true} info='Benoit' age={40}  /> POUR QUE INFO PUISSE LES AVOIR.





///////////////////////////////////////////////////////////////////////////////////////////////
                              ///React avec redux /////
///////////////////////////////////////////////////////////////////////////////////////////////

EN FAIT SANS REDUX, REACT EST DU CACA . IL EST IMPOSSIBLE DE FAIRE UN BEAU
PROJET REACT SANS FLUX OU REDUX OU MOBX

///////////////////////////////////////////////////////////////////////////////////////////////
                              ///PROVIDER/////
///////////////////////////////////////////////////////////////////////////////////////////////
info:
https://github.com/reactjs/react-redux

install:
yarn add react-redux

import { Provider, connect } from 'react-redux'
C EST JUSTE CA REACT-REDUX, LE PROVIDER QUI WRAP NOTRE
REACT ET CONNECT QUI PERMET DONNER ACCES AU STATE DE REDUX DANS LES PROPS DE REACT.

PROVIDER,
CE QUI REND TOUT POSSIBLE ET DONNE ACCES A REDUX PARTOUT DANS LE PROJET :

EXEMPLE POUR REACT SIMPLE :
ReactDOM.render(
  <Provider store={store}>
    <MyRootComponent />
  </Provider>,
 document.getElementById('app'));
)

AVEC REACT-ROUTER :
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="foo" component={Foo}/>
        <Route path="bar" component={Bar}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)


AVEC UN ROUTER QU ON EXPORTE AVEC UNE FN :
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

MAINTENANT DNAS APP.JS :
const wrapProvider = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(wrapProvider, document.getElementById('app'));

///////////////////////////////////////////////////////////////////////////////////////////////
                              ////CONNECT mapStateToProps - LIRE DU STORE ////
///////////////////////////////////////////////////////////////////////////////////////////////

CONNECT
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
mapStateToProps EST UN SIMPLE OBJECT DE KEY VALUE PAIR, D UN BORD {DATA: STORE.TRUC}

AVEC CONNECT ON FAIT DES COMPONENTS PRESENTIONNELS : QUI -CONNECT- AVEC REDUX

exemple SANS STORE :

import React, {Component} from "react";
import { connect } from 'react-redux';

const ExpenseList = (props) => (
  <div>
     {console.log(props)}   //{name: "Benoit", dispatch: ƒ}
    ExpenseList -
    {props.name}
  </div>
);

mapStateToProps: donne acces au data sur le state et le donne a props
BON LE PREMIER ARGUMENT DE CONNECT EST MAPSTATETOPROPS :
DONC ICI ON FAIT UN EXEMPLE SANS STORE VRAIMENT avec un FN qui retourne  SIMPLEMENT UN OBJ:

const ConnectedExpensList = connect((state)  => {   //on pourrait enlever state
  return {
    name: 'Benoit'
  };
})(ExpenseList);
export default ConnectedExpensList
OU
export default connect(() => {
  return {
    name: 'Benoit'
  };
})(ExpenseList);


CECI N EST PAS LA VERSION CONVENTIONELLE, D ORDINAIRE
ON AURA UN STORE AVEC DU DATA DNAS LEQUEL ON PIGE
function mapStateToProps(state){
 return {
   expenses: state.expenses
 }
}
export default connect(mapStateToProps, null)(ExpenseList);



DONC REVISONT L EXEMPLE Mais plus conventionnellement :
ce component s en va dans son parent,
mais prend tout ses props sur le store de redux:
sur le store de redux on a deux truc dans l array expenses fait avec des dispatch ailleurs:
{expenses: Array(2), filters: {…}}


import React, {Component} from "react";
import { connect } from 'react-redux';

const ExpenseList = (props) => (
  <div>
  <h2>ExpenseList -</h2>
  <h5>{props.filters.text}</h5>
  {props.expenses.map((expense) => {
     return <p key={expense.id}>{expense.description}</p>
   })}
  </div>
);

function mapStateToProps(state){
 return {
   expenses: state.expenses,
   filters: state.filters
 }
}
export default connect(mapStateToProps)(ExpenseList);

//////
sur app.js:
ON A LE STORE.SUBSCRIBE  QUI NOUS CONSOLE.LOG NOS STATES .

setTimeout( () => {
  store.dispatch(setTextFilter('police'));
},5000)

DONC APRES 5 SECONDES, UN NOUVEAU FILTER APPARAIT LA DANS ExpenseList:
   <h5>{props.filters.text}</h5> //police
DONC CHAQUE DISPATCH, OU ICI CHANGEMENT DANS LE STORE,
REACT-REDUX DIT A REACT DE RENDERER A NOUVEAU



///////////////////////////////////////////////////////////////////////////////////////////////
                              ///MAPPER UN COMPONENT AVEC UN ARRAY DE REDUX /////
///////////////////////////////////////////////////////////////////////////////////////////////

ICI ON A UN COMPOENENT QUI A EXPENSE, UN ARR D OBJ DANS REDUX:
// {id: "d348a802", description: "electricité", note: "super", amount: 1800, createdAt: 20}

1-
const ExpenseList = (props) => (
  <div>
    <h1>Expense List</h1>
    {props.expenses.map((expense) => {
      return <ExpenseListItem key={expense.id} {...expense} />;
    })}
  </div>
);
function mapStateToProps(state){
 return {
   expenses: state.expenses,  //DONNE L ARRAY
   filters: state.filters
 }
}
export default connect(mapStateToProps)(ExpenseList);


DONC ICI ON PREND LE SHORTCUT POUR TOUT DONNER LES PROPS AVEC {...expense}  :
  return <ExpenseListItem key={expense.id} {...expense} />;



2-

LE COMPONENT VA PRENDRE CHAQUE OBJECT EN PROPS , bcp plus simple que de creer du jsx dans le map dirrectement :

ON DECONSTRUIT CE QU ON A DE BESOIN , ICI ON LAISSE L ID ET NOTE DE COTE :
const ExpenseListItem = ({ description, amount, createdAt }) => (
  <div>
    <h3>{description}</h3>
    <p>{amount} - {createdAt}</p>
  </div>
);

///////////////////////////////////////////////////////////////////////////////////////////////
             ///AJOUTER UN FONCTION DE SORTING POUR MAPSTATETOPROPS /////
///////////////////////////////////////////////////////////////////////////////////////////////

EN CE MOMENT NOUS AVONS LE STATE QUI RETOURNE LES CHOSE DANS L ORDRE QUELLE SONT DISPATCHÉ :
DANS APP.JS :
store.dispatch(addExpense({description: 'loyer', note: 'outch', amount: 800, createdAt: 22 }));
store.dispatch(addExpense({description: 'electricité', note: 'super', amount: 1800, createdAt:  21 }));
 store.dispatch(setSortByFilter('date'));
DONC SORTPAR LA DATE LA PLUS PROCHE, SEULMENT SI !!! ON PREND PAS CE QUI SORT DU STATE, MAIS CE QUI SORT DE NOTRE FONCTION getVisibleExpenses !

const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);  //SORT CE QUI EST FILTRE
  console.log('ca bouge ', state) //SORT TOUT CE QUI EST DISPATCHER DANS L ORDRE

// expenses: (1) [{…}]
// filters: {text: "loyer", sortBy: "date", startDate: undefined, endDate: undefined}

DONC REACT VA LES PRESENTER DANS CET ORDRE LUI MEME.

function mapStateToProps(state){
 return {
   expenses: state.expenses, //SORT TOUT CE QUI EST DISPATCHER DANS L ORDRE
   filters: state.filters //ET LES FILTRES SERVENT  RIEN
 }
}


POUR  ACTIVER LES FILTRE DANS UN COMPOENENT REACT :
const mapStateToProps = (state) => {
  return {
    expenses: getVisibleExpenses(state.expenses, state.filters)  //SORT CE QUI EST FILTRE
  };
};

CE QUI SERA DANS REACT SERA DONC SEULEMENT LA VALEUR/ DATA QUE LA FONCTION RETOURNE .

CETTE FONCTION, PREND L ARRAY DE EXPENSE ET L OBJECT DE FILTER POUR TRIER ET PLACER:

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a,b) => {
    if(sortBy === 'date'){
      return a.createdAt > b.createdAt ? -1 :  1  //retourner 1 ou - 1
    }
     if(sortBy === 'amount'){
      return a.amount > b.amount ? 1 : -1  //plus gros montant first
    }
    });
};


MAIS CECI EN CE MOMENT SE FAIT MANUELLEMENT DANS LE CODE EN DISPATCHANT
EXPENSES
store.dispatch(addExpense({description: 'loyer', note: 'outch', amount: 800, createdAt: 22 }));
store.dispatch(addExpense({description: 'electricité', note: 'super', amount: 1800, createdAt:  21 }));
FILTERS
 store.dispatch(setTextFilter('loyer')); //text a pas besoinb de la function
 store.dispatch(setSortByFilter('date'));
 store.dispatch(setSortByFilter('amount'));


COMMENT LE FAIRE DNAS REACT .... AVEC DISPATCH




///////////////////////////////////////////////////////////////////////////////////////////////
                              ////UTILISER UN ACTION REDUX AVEC REACT////
///////////////////////////////////////////////////////////////////////////////////////////////


import React, {Component} from "react";
import { connect } from 'react-redux';
import {setTextFilter} from '../actions/filters.js' //NOTRE ACTION


//ACTION SUR FILTERS.JS
// export const setTextFilter = (text = '') => ({
//   type: 'SET_TEXT_FILTER',
//   text
// });
// ET REDUCER
//  case 'SET_TEXT_FILTER':
//       return { ...state, text: action.text };


PARCE QUE CONNECT AVEC mapStateToProps NOUS DONNE ACCES A DISPATCH !!
ce qui aura pour consequence de modifier le text , dans l obj filters du store et changer l output.
et puisque notre component qui affiche la list selon les expenses ET filtres vera que filtre a chager , il ajustera selon la condition faite dans la fn selector :
//const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

const ExpenseListFilter = props => {
     console.log(props)  //{filters: {…}, dispatch: ƒ}    !! dispatch bitch  !!
  return (
    <div>
      <input
        type="text"
        value={props.filters.text}   //le filter est setter dans app.js avec le premier dispatch
        onChange={e => {
          console.log('target', e.target.value);
          props.dispatch(setTextFilter(e.target.value));  //ICI ON CHANGE LE FILTERS OBJ
        }}
      />
    </div>
  );
};

DONC CE COMPONENT ON NE CHANGE ET TOUCHE QUE FILTER
const mapStateToProps = (state) => {
 return {
   filters: state.filters
 }
}


/*********************  Exemple de dispatch, sans mapStateToProps  **************************/

Parce que ce compoenent est creer avec chaque object de l array expenses, et qu on le creer et lui passe tous les props avec {...expense}  :
{props.expenses.map((expense) => {
  return <ExpenseListItem key={expense.id} {...expense} />;

EXPENSESLISTITEM.JS
import React from 'react';
import { connect } from 'react-redux';
import {removeExpense} from '../actions/expenses.js'

l action:
// export const removeExpense = (id) => ({
//   type: "REMOVE_EXPENSE",
//   id
// });


const ExpenseListItem = ( {id, description, amount, createdAt, dispatch }) => (
  <div>
    <h3>{description}</h3>
    <p>{amount} - {createdAt}</p>
    <button onClick={( ) => {
     dispatch(removeExpense(id))
    }}>Retirer</button>
  </div>
);

//pour avoir dispatch on a besoin de connect
export default connect()(ExpenseListItem)





///////////////////////////////////////////////////////////////////////////////////////////////
            ///FORM Controlled OUTPUT e.target.value LE TWO WAY DATA BINDING /////
///////////////////////////////////////////////////////////////////////////////////////////////

CECI EST SIMPLE UNE VALEUR DETERMINE PAR JAVASCRIPT
EXEMPLE LE NOM D UN BOUTON , CE QUI EST AFFICHÉ A L ECRAN, SELON
UN SCRIPT JAVASCRIPT. VOILA TOUT .
<input
  type="text"
  value={props.filters.text}  //CECI EST UN CONTROLLED INPUT.
  onChange={(e) => {
    props.dispatch(setTextFilter(e.target.value));
  }}
/>

OU MIEUX ICI :
<select onChange={(e) => {
    console.log('choix:', e.target.value);
    props.dispatch(setSortByFilter(e.target.value)); //SOIT SORT BY DATE OU AMOUNT
  }}>
  <option value="date">Date</option>
  <option value="amount">Montant</option>
</select>


LES BUGS POSSIBLES avec e.target.value:
le synthetic event:
IL SEMBLE EVIDENT QUE onDescriptionChange , AU LIEU DE FAIRE :
const description = e.target.value;
POUR ENSUITE
this.setState(() => ({description})); //OU ({description : description}));
QU ON POURRAIT JUSTE FAIRE
this.setState(() => ({description: e.target.value; })); ET EVITER PAR LE FAIT
MEME D AVOIR A FAIRE LA CONSTANTE description ...

MAIS NON ! CECI MENE A UN BUG DE PERFORMANCE . ET REACT VA NOUS DEMANDER
DE SOIT AJOUTER :
e.persist()
onAmountChange = (e) => {
  //const amount = e.target.value; // autre maniere sans utiliser le caching.
  e.persist()
  this.setState(() => ({amount : e.target.value})); //ici ca fonctionne
}
OU BCP MIEUX , CACHER LA VALEUR e.target.value



class ExpenseForm extends Component {
 state = {
    description: '',
    note: ''
  };
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({description}));
  }
  render() {
    return (
      <div>
      <form >
        <input type="text"
          onChange={this.onDescriptionChange}
          placeholder="description" autoFocus value={this.state.description}/>
        <button type="submit">Ajout Depense</button>
      </form>
      </div>
    );
  }
}


BUG :
SI AMOUT ETAIT A UNDEFINED , ON AURAIT UN  BUG, C EST PAS SIMPLE, LE TWO WAY DATA BINDING
state = {
...
   amount: ''
 };

 onAmountChange = (e) => {
   const amount = e.target.value;
   this.setState(() => ({amount}));
 }

 <input type="number" placeholder="Montant"
   onChange={this.onAmountChange}
   value={this.state.amount}    />



/******************   comment faire pour gzarder le format monetaire  (/REGEX/) ********************/

GARDONS SL EXEMPLE PRECEDENT onAmountChange, POUR UN INPUT DE TYPE number:
POUR AVOIR AU MAX 2 CHIFFRES APRES LE POINT.

avec le /regex/ et match :
https://regex101.com

pour argent : /^\d*(\.\d{0,2})?$/

Donc seulement si le format esrt 50 ou 50.50 mais pas 50.152
onAmountChange = (e) => {
  const amount = e.target.value
  if(amount.match(/^\d*(\.\d{0,2})?$/)) {
      this.setState(() => ({amount}))
  }
};


///////////////////////////////////////////////////////////////////////////////////////////////
                 ///OnSubmit React-redux EN PASSANT LE SUBMIT VERS LE PARENT/////
///////////////////////////////////////////////////////////////////////////////////////////////
IL EST UN BON TRUC


PRENNONT LE CHILD :
EXPENSEFORM.JS :
class ExpenseForm extends React.Component {
 state = {
    description: '',
    note: '',
    amount: '',
    createdAt: moment(),
    calendarFocused: false,
    error: false
  };

  onSubmit = (e) => {
    e.preventDefault();
    if(!this.state.description || !this.state.amount){
       this.setState(() => ({ error: true }));
    } else {
        this.setState((error) => ({ error: false }));

        ON POURRAIT PASSE THIS.STATE, L OBJ COMPLET, MAIS ON A ICI UNE CHANCE DE CLEANER NOTRE DATA :

        this.props.onSubmit({   //on va ajuster le data au lieu de donner this.state
          description: this.state.description,
          note: this.state.note,
          amount: parseFloat(this.state.amount, 10) * 100, // 88$ devient 8800
          createdAt: this.state.createdAt.valueOf()  //redonne un timestamp
        });

    }
  };

  <form onSubmit={this.onSubmit}>
      {this.state.error ? <p>svp ajouter description et montant</p> : '' }
  ...
    <button type="submit">Ajout Depense</button>
  </form>


LE PARENT:
const AddExpensePage = (props) => {
  return (
    <div>
      <ExpenseForm
        onSubmit={(expense) => {
           props.dispatch(addExpense(expense))
        }
      }/>
    </div>
  );
};
//PAS BESOIN DE MAPSTATETOPROPS , DISPATCH EST DONNE AVEC LE CONNECT
export default connect()(AddExpensePage)

ET VOILA ! REDIRIGER MAINTENANT...


///////////////////////////////////////////////////////////////////////////////////////////////
                              ///COMMENT REDIRIGER AVEC HISTORY/////
///////////////////////////////////////////////////////////////////////////////////////////////

LES COMPONENTS QUI SONT DIRECTMENT DANS REACT-ROUTER SE FONT DONNER DES PROPS SUPPLEMENTAIRES :

  <Route path="/" exact={true} component={ExpenseDashboardPage} />
  <Route path="/create" component={AddExpensePage} />
  <Route path="/edit/:id" component={EditExpensePage} />
  <Route path="/help" component={HelpPage} />
  <Route component={Oups404} />

DONC ExpenseDashboardPage AddExpensePage HelpPage Oups404 ON CHACUN :
history:{…}
location:{…}
match:{…}
FACILE A VOIR DANS REACT DEV-TOOL

ET HISTORY A TOUT CA :
action : "PUSH"
block : block()
createHref : createHref()
go : go()
goBack : goBack()
goForward : goForward()
length : 12
listen : listen()
location : {…}
push : push()
replace : replace()


POUR UNE REDIRECTION : PUSH()

<ExpenseForm
  onSubmit={(expense) => {
    // console.log(expense)
     props.dispatch(addExpense(expense))
     props.history.push('/'); //ne reloadera pas
  }
}/>

AINSI ON SE RETROUVE LA OU LES RESULTATS DE LA FORM SONT.



///////////////////////////////////////////////////////////////////////////////////////////////
                              ///mapStateToProps RETOURNE CE QUE L ON VEUT BIEN/////
///////////////////////////////////////////////////////////////////////////////////////////////

on peut choisir , cas par cas ce que mapStateToProps va servir sur le props.truc :

ici on retourne une seule instance=> find() , find fonctionne exactement comme filter, mais au lieu ici de retourner un array, il retourne l obj unique qui correspond.

dans ce scenarion on recoit de l url le url/:id pour faire la recherche , ce id est disponible avec :
{props.match.params.id}


const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(expense => {
      return expense.id === props.match.params.id;
    })
  };
};


  maintenant on a sur props.expense l object qu on recherchait, celui de l id est en question.




///////////////////////////////////////////////////////////////////////////////////////////////
                              ///Un child a besoin du props pour son state /////
///////////////////////////////////////////////////////////////////////////////////////////////
il recoit ici un obj avec tous les jey de l obj state
pour pouvoir utiliser les props dans le state quand on utlise :
option qui enleve le besoin d avoir un constructor

babel-plugin-transform-class-properties:

il recoit une expense sur son props
//id: "6264223b-e448-4235-b579-c46248c0e133", description: "facture loyer", note: "outch", amount: 1280, createdAt: 22

MAINTENANT POUR EN AVOIR ACCES ON DOIT REMMETRE UN CONSTRUCTOR

class ExpenseForm extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      description: props.expense ? props.expense.description : '',
      note:  props.expense ? props.expense.note : '',
      amount:  props.expense ? (props.expense.amount / 100).toString() : '',  //remmetre de sous a string
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: false
     };
  }

mais les fn reste () => {};
et non pas fn(){}



///////////////////////////////////////////////////////////////////////////////////////////////
                              ///FILTER PAR DATES/////
///////////////////////////////////////////////////////////////////////////////////////////////

REACT-DATES A NOUVEAU :

https://github.com/airbnb/react-dates

permet de choisir une periode entre 2 dates.

exemple:
DateRangePicker:
 demande 5 proprietés minimalement et un compoenent CLASSED BASED avec un this.state :
 this.state = {
   calendarFocused: null,   //doit etre a null
 }

NOS DATES PAR DEFAUT ARRIVENT DE REDUX
 const mapStateToProps = (state) => {
  return {
   filters: state.filters  //this.props.filters.startDate ET this.props.filters.endDate qui un un moment
  }
 }
 on set ici notre obj filtre avec des valeur par defaut :
 import moment from 'moment';
 moment.locale('fr-ca');
 const filterReducerDefaultState = {
 ...
   startDate: moment().startOf('month'),  //debut du mois
   endDate: moment().endOf('month')      //jusqua la fin
 };







DONC L UTILISATION MAINTENANT :
this.state = {
  calendarFocused: null,   //doit etre a null
}

//ici ({ startDate, endDate }) est passé par le datepicker, pour s appeler autre chose.
onDatesChange = ({ startDate, endDate }) =>  {
   this.props.dispatch(setStartDate(startDate));
   this.props.dispatch(setEndDate(endDate));
 }

onFocusChange = (calendarFocused) =>  {
  this.setState({ calendarFocused });
}

ET DANS LE RETURN , tout ceci est requis:
<DateRangePicker
  startDate={this.props.filters.startDate}  //date de depart du cal
  endDate={this.props.filters.endDate} //fin du mois
  isOutsideRange={() =>  false}  //pour pouvoir aller dnas le passé (pas requis) mais mieux
  numberOfMonths={1} //juste un mois (pas requis) mais mieux
  onDatesChange={this.onDatesChange} //fn qui change
  focusedInput={this.state.calendarFocused} //pour poper le truc
  onFocusChange={this.onFocusChange} //pour poper le cal a l ecran
/>


SORTING :
MOMENT A DES METHODES POUR VERIFIER DES DATES :
moment().isSameOrBefore(Moment|String|Number|Date|Array, String);
moment('2010-10-20').isSameOrBefore('2009-12-31', 'year'); // false
moment('2010-10-20').isSameOrBefore('2017-12-31', 'year'); // true


pour l instant on fonctionne avec des timestamp , mais on peut faire mieux avec moment
import moment from 'moment';
moment.locale('fr-ca');

notre function de sorting
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
  //  const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
  //  const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;

  const  createdAtMoment:  moment(expense.createdAt) //en fait un moment obj
  const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true ;
  //passe a l autre ca sera true a quelque part , le but ici est d etre true.
  const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment) : true ;
  const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

  return startDateMatch && endDateMatch && textMatch;
}).sort((a,b) => {
  if(sortBy === 'date'){
    return a.createdAt > b.createdAt ? -1 :  1  //retourner 1 ou - 1
  }
   if(sortBy === 'amount'){
    return a.amount > b.amount ? 1 : -1  //plus gros montant first
  }
//  return 0 pas de besoin
  });
};


GETVISIBLEEXPENSES EST TUFF A LIRE parceque le >= est presente a l envers :
CA SERT A GARDER CE QUI EST ENTRE 2 VALEURS :


en fait voici un exemple plus simple :
const arr = [80,12,100,140]
const now = 100;
const then = 150;
const test = arr.filter(item => {
  const debut = item ? item >= now : true;
  const fin = item ? item <= then  : true;
  return debut && fin
});
 console.log(test) //100





///////////////////////////////////////////////////////////////////////////////////////////////
                  ///Se faire un petit server express pour heroku/////
///////////////////////////////////////////////////////////////////////////////////////////////
//yeah right serverless.
www.expressjs.com

server/server.js :
yarn add express



const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');  //ou just public si on mets pas dans server/
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

SERVIR INDEX.HTML POUR TOUS LES REDIRECTIONS DE REACT incluant le css:
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('ca roule');
});


///////////////////////////////////////////////////////////////////////////////////////////////
                              ///DEployer la sur HEROKU /////
///////////////////////////////////////////////////////////////////////////////////////////////

CREER NOTRE HEROKU APP, LE RESERVOIR:
heroku create wp3-react-expensify  //on peut donner un nom !


package -
"start":{
  "node":"8.1.3",
  "start": "node server/server.js",
  "heroku-postbuild": "yarn run build:prod"
},


 .gitignore  - il va les faire lui meme
 /public/bundle.js
 /public/bundle.js.map
 /public/styles.css
 /public/styles.css.map


ajuster ses dependencies :
y a tous les trucs de testing qui ne devrait pas etre sur heroku,
de meme que live-ser et webpack dev server.

pour installer en devDependencies:
npm install --save-d chalk
yarn add --dev chalk

donc tout ce qui n est pas necessaire le mettre :
"dependencies": {
...
"uuid": "^3.1.0",
"validator": "^9.0.0",
"webpack": "^3.7.1"
  },
"devDependencies": {
"live-server": "^1.2.0",
"enzyme": "2.9.1",
"enzyme-to-json": "1.5.1",
"react-test-renderer": "15.6.1",
"webpack-dev-server": "^2.9.2",
"jest": "^21.2.1"
  }
}

apres avoir fait notre github a jour

 git push heroku master

 heroku open

-- git rm package-lock.json si jamais on veut enlever un fichier





NETTOYER LES OUTPUTS AVEC /DIST:
<link rel="stylesheet" href="./dist/styles.css">
<script src="/dist/bundle.js"></script>

pour y arriver :
module.exports = (env) => {
...
  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
...
devServer: {
  contentBase: path.join(__dirname, 'public'),
  //compress: true,     //MINIFY LE CODE, PAS BESOIN POUR DEV.
  historyApiFallback: true,  //CECI DIRA QU ON S OCCUPE DU ROUTING, ET DE RETOURNE INDEX.HTML A CHAQUE 404
  port: 8080            //PORT PAR DEFAUT
  publicPath: '/dist/'
},

2- deleter les fichier de public sauf index.html

3- yarn run build:prod
va  construire dist/ fichiers et les maps

4-ajuster le .gitignore
/node_modules
/public/dist/
/Notes/


///////////////////////////////////////////////////////////////////////////////////////////////
                  ////CONNECT  ECRIRE SUR LE STORE////
///////////////////////////////////////////////////////////////////////////////////////////////
CONNECT
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])

 mapDispatchToProps: DONNE ACCES AUX ACTIONS DE REDUX
 Ce qui est retourner par cette fonction ira sur le this.props
 de ce component:  props.filters

function mapDispatchToProps(dispatch){
  return  bindActionCreators({

  }, dispatch) //dispatch en 2ieme arg
}
