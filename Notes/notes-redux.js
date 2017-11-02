///////////////////////////////////////////////////////////////////////////////////////////////
                              ///REDUX/////
///////////////////////////////////////////////////////////////////////////////////////////////
REDUC C EST QUOI ?
EN FAIT SANS REDUX, REACT EST DU CACA . IL EST IMPOSSIBLE DE FAIRE UN BEAU PROJET REACT SANS FLUX OU REDUX OU MOBX


REDUX EST UN STORE , un simple obj {} ET JAMAIS RIEN DE PLUS , QUI PERMET D ECHANGER FACILEMENT
LES STATES  ENTRE COMPONENT AVEC DES ACTIONS, LE STATE MEUBLERA LE STORE

dans un app simple, les states sont dans le seul component parent et sont passés par les props.
a un certains point, ceci n est plus viable quand une app a plusieurs parents qui ne sont pas connecte.

MAIS AVANT TOUT, L IMPRESSION QUE DES COMPONENTS SONT FACILE A REUTILISER
EST FAUSSE DANS UNE APPLICATION SIMPLE, ILS DEPENDENT TRES SOUVENT
THE PROPS QUI SONT DE LEURS PARENTS, DONC UNE FOIS AILLEURS, IL SONT COMPLETEMENT INUTILE.

imaginons un component action qui regarde si le state est vide
ou pas pour produire un bouton: si il est directement associer au parent
qui a ce state, ca ira, mais si on le veut ailleurs, on doit faire une longue
,p-e tres longue passation de ce state en props, d un component a lautre, ce qui
complexifie grandement une app.

LE STORE DE REDUX EST LA POUR RENDRE ACCESSIBLE A TOUS LES COMPONENTS CE STATE
SANS AVOIR A FAIRE 14 LIENS D UN PARENT A CHILD A CHILD A CHILD ETC...


LES FUNCTIONS MAJEURES :
Store = {} thats it
State = peut etre un array, obj .. immutable.
const store = createStore( prend le combineReducer ou le reducer)
store.subscribe() = prend un arrow fn, ecoute les changement sur le state
store.dispatch(arg1=action, ou actionGenerator)
actionGenerator/Creator(arg1= payload)
reducer= prend un arrow FN rtourne le state

+----------------------------------------------------------------------------------------------------------+
|                                                                                                          |
|                                                                                                          |
|                                            LE STORE VA TENIR LE STATE                                    |
|                                                                                                          |
|                                                                                                          |
|                                                                                                          |
|                                                                                                          |
|      +----------------------------+                        +--------------------------------+            |
|      |                            |                        |                                |            |
|      |        COMPONENT1          |                        |         COMPONENT2             |            |
|      |                  STATE = 1 |                        |                    STATE=1     |            |
|      |                            |                        |                                |            |
|      +-----------+----------------+                        +----------------+---------------+            |
|                  |                                                          |                            |
|                  |                                                          |                            |
|                  |                                                          |                            |
|                  |                                                          |                            |
|                  |                                                          |                            |
|                  |                                                     +----+------------------+         |
|          +-------++-------+                                            |                       |         |
|          | ACTION + 1     |                                            |   ACTION - 1          |         |
|          |                |                                            |                       |         |
|          |                |                                            |                       |         |
|          +----------------+                                            +-----------------------+         |
|                                                                                                          |
+----------------------------------------------------------------------------------------------------------+

BREF ON VEUT EVITER DE FAIRE DES CHAINE DE PROPS

///////////////////////////////////////////////////////////////////////////////////////////////
                              ///REDUX INSTALLATION - 101/////
///////////////////////////////////////////////////////////////////////////////////////////////
INSTALL:
yarn add redux

import:
import { createStore } from 'redux'

ON CREER UN STORE, POUR UN DEMO, ON VA METRE UN STATE par default OBJ A 0
const store = createStore((state = { count: 0}) => {
  console.log('en action');
  return state  // le state DOIT se retourner
})

GETSTATE EST LA FUNCTION QUI PERMET DE VOIR LE STORE
console.log(store.getState())

maintenant, on peut pas faire grand chose avec ca ...

ARRIVE DONC LES ACTIONS :


///////////////////////////////////////////////////////////////////////////////////////////////
                              ///LES ACTIONS PART I /////
///////////////////////////////////////////////////////////////////////////////////////////////

UNE ACTION EST RIEN D AUTRE QU UN OBJ QUI EST ENVOYÉ AU STORE
EST LA SEULE MANIERE DE COMMUNIQUER AVEC LES STORE D AILLEURS,
ELLE DECRIT LE TYPE D ACTION QUEL VA FAIRE

ET ON MODIFIE LE STORE EN DISPATCHANT, EN APPELANT CEUX-CI

le type par convention est tjrs en MAJ et _

ACTION:
{
  type: 'INCREMENT',
}

L ACTION IRA ENSUITE AU DISPATCH store.dispatch(arg1 = action( arg1= payload))

store.dispatch({
  type: 'INCREMENT',
})

UN DISPATCH ACTIVE LE STORE, LE STORE ROULERA A NOUVEAU ET EMETERA POUR PROUVER,
console.log('en action') A NOUVEAU

Maintenant cette action seule ne fait pas grand chose,
mais une fois dans le store on peut faire quelque chose :


EXEMPLE AVEC SWITCH, CA POURRAIT ETRE IF():
const store = createStore((state = { count: 0 }, action) => {
  console.log('en action');
  switch (action.type) {
    case 'INCREMENT':
    return {
      count: state.count + 1
    };
    default: {
      return state;
    }
  }
});


EXPLICATIONS:
Donc , ici le state est par defaut { count : 0 } , on y passe l action
si le type est reconnu , on doit retourner le meme state ({ count : 0 } ) en pure function + 1 .


ALORS SI ON DISPATCH 2 FOIS NOTRE ACTION:

store.dispatch({
  type: 'INCREMENT'
})

store.dispatch({
  type: 'INCREMENT'
})

LE COUNT SERA A {count: 2}

//////////////////////////////

AJOUT D AUTRES ACTIONS :

store.dispatch({
  type: 'DIMINUE'
})
store.dispatch({
  type: 'RESET'
})


CE QUI REND LE SWITCH MEILLEUR QUE LE IF POUR DIFFERENT SCENARIO
const store = createStore((state = { count: 0 }, action) => {
  console.log('en action');
  switch (action.type) {
    case 'INCREMENT':
    return {
      count: state.count + 1
    };
    case 'DIMINUE':
    return {
      count: state.count - 1
    };
    case 'RESET':
    return {
      count: 0
    };
    default: {
      return state;
    }
  }
});



CECI DIT TOUT METTRE CA DANS LE STORE DIRECTEMENT N EST PAS LA BONNE SOLUTION..
ACTION A STORE FONCTIONNE , MAIS REDUX OFFRE UN PONT, UN ENTRE DEUX , LE REDUCER .

///////////////////////////////////////////////////////////////////////////////////////////////
                              ///store.subscribe(() /////
///////////////////////////////////////////////////////////////////////////////////////////////

Mais avant pour voir les changement au store quand on dispatch sans avoir
a toujours laisser un console.log(store.getState()) apres nos dispatchs:

store.subscribe() VA LANCER LA FUNCTION A CHAQUE DISPATCH ET CHANGEMENT DE STATE

donc:

store.subscribe(() => {
 const state = store.getState();
 console.log('Nouveau state', state);
});

PAR DESIGN, subscribe RETOURNE LA FUNCTION POUR unsubscribe .
SI ON NE VEUT PLUS DE LOG (MAIS LES CHANGEMENT ARRIVENT QUAND MEME):

const unsubscribe = store.subscribe(() => {
 const state = store.getState();
 console.log('Nouveau state', state);
});
//Nouveau state {count: ?} A CHAQUE DISPATCH


///////////////////////////////////////////////////////////////////////////////////////////////
                              ///ACTIONS PART II/////
///////////////////////////////////////////////////////////////////////////////////////////////

ON PEUT AJOUTER PLEINS DE CHOSES A NOS ACTIONS :

store.dispatch({
  type: 'INCREMENT',
  incrementPar: 5
})

MAINTENANT ON A MIS 5, MEAIS SI UN UTILISATEUR EST CELUI
QUI ENTRE LA VALEUR, IL FAUT FAIRE UN CHECK, SINON PASSER 1:

switch (action.type) {
  case 'INCREMENT':
  const incrementPar = typeof action.incrementPar === "number" ? action.incrementPar : 1;
  return {
    count: state.count + incrementPar
  };

donne:
Nouveau state {count: 5}
/////


store.dispatch({
  type: 'SET',
  count: 101
})

...
case 'SET':
return {
  count: action.count
};
...



///////////////////////////////////////////////////////////////////////////////////////////////
                              ///ACTION CREATOR /GENERATORS/////
///////////////////////////////////////////////////////////////////////////////////////////////

CE SONT DES FUNCTIONS SIMPLE QUI RETOURNES DES ACTIONS, L OBJ QU IL SONT PAR EUX MEME,
elle permettent plus de souplesse, plus facile de voir les erreur,
et peuvent entrer des variables, et prendre moins de place , etc..

BREF EVITER DE FAIRE DES ACTIONS, ET S EN TENIR AU CREATOR.

ACTION CREATOR:
const incrementCount = (payload) => {
  return {
    type: 'INCREMENT'
    incrementPar: typeof payload === "number" ? payload : 1;
  }
}

DANS LE REDUCER:

   case 'INCREMENT':
    return {
      count: state.count + action.incrementPar
    };

store.dispatch(incrementCount(10)); //ajoute 10




///////////////////////////////////////////////////////////////////////////////////////////////
                              ///REDUCERS/////
///////////////////////////////////////////////////////////////////////////////////////////////


L IMPORTANT DE COMPRENDRE , ON ON VEUT SIMPLEMENT RETOURNER DANS NOS CASE, CE QU ON VEUT COMME STATE , CE
SANS PRENDRE LE STATE MODIFIER POUR LE FAIRE . CE QU ON RETOURNE DEVIENT LE STATE.
AU LIEU DE METTRE CA DNAS CREATESTORE, ON VA TRAITER NOS ACTION DNAS CECI: REDUCER .

Le reducer est entre l action et le store, et ecoute pour chaque dispatch ,
quand un dispatch est lancé , il va les comparer sur les types qu il
traite et ajustera le state , du store.

DONC LE REDUCER EST UNE FN !!PURE!! QUI TRAITE LE STATE SELON LES TYPES D ACTIONS.
1-parceque pure, on assigne PAS de valeur a state et action !state= truc
2-on retourne un object qui sera le state seulement


const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementPar
      };
      ...
    case 'RESET':
      return {
        count: 0
      };
    default:
      return state;
  }
};


Et avnt d avoir un rootReducuer qui combine tous les Reducer avec combineReducer,
on peut simplement passer celui ci dnas le store si c est tout .


const store = createStore(countReducer);



///////////////////////////////////////////////////////////////////////////////////////////////
                              ////COMBINEREDUCER////
///////////////////////////////////////////////////////////////////////////////////////////////

Une app a souvent plusieurs reducer,
en fait mieux vaut diviser pour pas se retrouver avec 40 case: "truc" dans le switch


POUR EXPLIQUER, J VAIS FAIRE UN SCENARIO:
on va avoir ca comme data :
const demoState = {
  expenses: [{
    id:'gerhreh',
    description: 'loyer Novembre',
    note: 'ceci est le dernier paiement fait',
    amount: 120500,
    createdAt: 0
  }]
}

ET FINALEMENT UN REDUCER :
const expenseReducer = (state = [], action) => {
 switch (action.type) {
   default:
     return state
 }
};

ON A BESOIN DU STORE:
const store = createStore(expenseReducer); //ON PASSE L UNIQUE REDUCER..

const unsubscribe = store.subscribe(() => {
 const state = store.getState();
 console.log('Nouveau state', state);
});

LE FUCK AVEC CA, EST QUE TOUT RESIDE SUR L OBJECT STORE, A LA RACINE
console.log(store.getState())  //[]
ET NON PAS DANS { expenses : [] }
BREF ON EST LIMITÉ A TOUT METTRE DANS LE MEME PAQUET.
CE QUI N EST PAS TOUJOURS LE CAS...  { expenses : [], AUTRETRUC: ... }


DONC COMBINE REDUCER !!
import { createStore, combineReducers } from 'redux';

et ensuite on le passe dans le store:
const store = createStore(combineReducers({
  expenses : expenseReducer
}));

MAIS LA MAJORITE DU TEMPS IL SERA DNAS SON FICHIER, ON EXPORT
//dans combine.js
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
 expenses: expenseReducer,
// truc: autreTrucReducer
});

export default rootReducer;

//dans app.js
UNE FOIS IMPORTÉ, CA REVIENT AU MEME.
const store = createStore(rootReducer)


MAINTENANT LE STORE = {expenses: Array(0)} //AU LIEU DE []





///////////////////////////////////////////////////////////////////////////////////////////////
                              ///ACTIONS ET LE REST operator part III/////
///////////////////////////////////////////////////////////////////////////////////////////////

ALLONS DANS DES ACTIONS PLUS COMPLEXES

nous avons a gerer ce genre d object:
expenses: [{
  id:'generé',
  description: 'loyer Novembre',
  note: 'ceci est le dernier paiement fait',
  amount: 120500,
  createdAt: 0 //sera genere
}],


Plusieur champs seront fait par les utilisateur, et ..
DONC LE ACTION CREATOR PREND DES DEFAULTS :

/********************  Ce quon passe en arg est un deconstruct de expense(payload)  ***************************/

const addExpense = ({description = '', note = '', amount = 0, createdAt = 0 }) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  }
});


                               ///Suite REDUCER ET ...REST/////

PURE PURE PURE ,
on ne peut pas modifier , le state  ou action, on veut SEULEMENT LIRE CEUX - CI
expenseReducerDefaultState ici est un ARRAY

on serait porter , a pusher : state.push(action.payload) MAIS CECI MUTATE LE STATE, BIG NO NO
push() retourne par l array, mais le length arr.push('truc') retourne la length de arr avec truc d ajouté.

ARRIVE :  CONCAT ,
QUI LUI CREER UNE NOUVELLE ARRAY ET MET LES TRUC DEDANS , DONC ON RETOURNE UN STATE PUR.
Ce qu on retour dans le switch va au state

MIEUX LE SPREAD: voir notes es6-decons-spread.


////////AJOUTER

const expenseReducer = (state = expenseReducerDefaultState, action) => {
 switch (action.type) {
   case "ADD_EXPENSE":
   //CONCAT
   //return state.concat(action.expense)
   //AVEC spread
   return [...state, action.expense]
   default:
     return state
 }
};

rappel : store.dispatch(arg1 = action( arg1= payload))

DISPATCH
store.dispatch(addExpense({description: 'loyer', note: 'outch', amount: 800 }));


Store :
state : Array(1)
0 : amount : 800
createdAt : 0
description : "loyer"
id : "934a3e31-0ffa-4134-95b1-cc79bac5cc70"
note : "outch"




/////////RETIRER

MAINTENANT COMMENT RETIRER :
dnas cet example le id nous est inconnue ( uuid ) mais :


/*** dispatch ***/
const depenseUn = store.dispatch(addExpense({description: 'loyer', note: 'outch', amount: 800 }));
const depenseDeux = store.dispatch(addExpense({description: 'loye2', note: 'super', amount: 800 }));

store.dispatch de toute facon retourne le state entier,
donc avec depenseUn.expense.id on a l id pour avancer et detruire :

 console.log('data', depenseUn.expense )
 //{id: "a9e4e613-284c-4d70-b9d4-59d70422e639", description: "loyer", note: "outch", amount: 800, createdAt: 0}


DONC pour enelever on a besoin que ca dans notre action (id)

const removeExpense = ({id}) => ({     //{payload.id} deconstruit
  type: "REMOVE_EXPENSE",
  expense: {
    id
  }
});

et filter retourne un array pure pour le state dans le reducer

case "REMOVE_EXPENSE":
return state.filter((item) => {
  return item.id !== action.expense.id
});

TRUC :  state.filter(({id}) => {   ICI ITEM ON A BESOIN QUE DE ID, DONC DECONSTRUCT


 store.dispatch(removeExpense({id: depenseUn.expense.id }));



///////////////////////////////////////////////////////////////////////////////////////////////
                              ///obj rest /////
///////////////////////////////////////////////////////////////////////////////////////////////
npm install babel-plugin-transform-object-rest-spread
yarn add babel-plugin-transform-object-rest-spread
.babelrc :
{
  "presets" : ["env", "react"],
  "plugins": ["transform-class-properties", "transform-object-rest-spread"]
}

const user = {
  nom: 'ben',
  age: 40000
};

console.log({...user, test: 'tester!'});
RETOURNE:  {nom: "ben", age: 40000, test: "tester!"}

/////////////////
SI ON A LES MEME KEY, LE DERNIER ECRASE CEUX D AVANT
const user = {
  nom: 'ben',
  age: 40000
}
const user2 = {
  nom: 'bob',
  age: 12,
  JOB: 'TECH'
};

const u = {...user, ...user2}
console.log(u)  //{nom: "bob", age: 12, JOB: "TECH"}


///////////////////////////////////////////////////////////////////////////////////////////////
                              ///REDUCER AVEC l OBJECT SPREAD /////
///////////////////////////////////////////////////////////////////////////////////////////////

pour comprendre il faut un scenario
IL EST TRES UTILE DE POUVOIR SPREADER UN OBJECT POUR UN EDIT :

on a ajouté dans un arr un obj Expense avec plusieurs champs possible a editer, updater:
const addExpense = ({description = '', note = '', amount = 0, createdAt = 0 }) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  }
});

Dans le store un obj dans l arr expense :

 obj { amount : 555
createdAt : 0
description : "loye2"
id : "ddc76b8f-945e-42b9-9227-ac7fd9dedb47"
note : "super"}


on veut le modifier , mais on ne sait pas quoi le sera, on a besoin du id pour sur
et aussi les trucs a changer:

on a le lien pour l obj, ici donc l id
const depenseDeux = store.dispatch(addExpense({description: 'loye2', note: 'super', amount: 800 }));

passe donc l id, le difficulté est ici , le deuxieme arg pour ce qui change , on le passe ici  { amount: 555 }
 store.dispatch(editExpense(depenseDeux.expense.id, { amount: 555 }));

//action creator
 const editExpense = (id, changeObj) => ({
   type: 'EDIT_EXPENSE',
   id,
   changeObj
 });

//reducer
case "EDIT_EXPENSE":
return state.map((expense) => {
  //console.log(action.changeObj)//{amount: 555}
 if(expense.id === action.id) {
   return {
     ...expense, ...action.changeObj
   }
 } else {
   return expense
 }
});

REVIENT A FAIRE CECI
const user = {
  nom: 'ben',
  age: 40000
}
const user2 = {
  nom: 'bob',
  age: 12,
};

const state = {...user, ...user2} on pourrait donner n importe quel nom (changeObj) ,
c est le contenu qui compte.

////////////////////////////////////
Autre scenario

filters: {
  text: '',
  truc: ' ',            //ou date
...
}

ON VEUT DISPATCHER UNE ACTION QUI CHANGE LE TEXT ET LE REMET A VIDE SI ON PASSE RIEN
store.dispatch(setTextFilter('loyer'));
store.dispatch(setTextFilter());
store.dispatch(setTextFilter('bain'));

donc
const setTextFilter = (text = '') => ({  //defaut vide si on passe rien
  type: 'SET_TEXT_FILTER',
  payload: text
});

switch (action.type) {
 case 'SET_TEXT_FILTER':
 return {...state, text: action.payload }


QUAND ON VEUT RETOURNER UNDEFINED AU LIEU DE ''
const setTextFilter = (text)  //ON MET RIEN , PAR DEFAUT C'EST UNDEFINED si on passe rien dans le dispatch.

///////////////////////////////////////////////////////////////////////////////////////////////
  Vraiment important    ////COMMENT FILTRER / LINKER 2 SET DE REDUCER ET FAIRE UN FILTRE/ SORT SUR LES OBJECT D UN ARRAY D APRES LES VALEURS D'UN AUTRE OBJECT.
                              ////
///////////////////////////////////////////////////////////////////////////////////////////////
CECI SERA LONG , ICI EST TOUT CE QUI EST NECESSAIRE POIUR QUE CA ROULE :

!!!!!LA PORTION IMPORTANTE EST PLUS BAS , MAIS CECI EST TOUT CE QU ON DEVRAIT VISÉ !!!!!

import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

 Fake data POUR DONNER UNE IDEE DU TRUC :
const demoState = {
  expenses: [{
    id:'gerhreh',
    description: 'loyer Novembre',
    note: 'ceci est le dernier paiement fait',
    amount: 120500,
    createdAt: 0
  }],
  filters: {
    text: 'loyer',
    sortBy: 'amount',            //ou date
    startDate: undefined,
    endDate: undefined
  }
}

//2 reducer et default state :
const expenseReducerDefaultState = [];
const filterReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};
const expenseReducer = (state = expenseReducerDefaultState, action) => {
 switch (action.type) {
   case "ADD_EXPENSE":
   //return  state.concat(action.expense)
   return [...state, action.expense]
   case "REMOVE_EXPENSE":
   return state.filter(({id}) => {
     return id !== action.id
   });
   case "EDIT_EXPENSE":
   //console.log(action.updates)//{amount: 555}
   return state.map((expense) => {
    if(expense.id === action.id) {
      return {
        ...expense, ...action.updates
      }
    } else {
      return expense
    }
  });
   default:
     return state
 }
};

const filterReducer = (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return { ...state, text: action.payload };
    case 'SET_SORT_BY_FILTER':
      return { ...state, sortBy: action.val };
    case  "SET_SORT_BY_DATE":
    return { ...state, sortBy: action.payload };
    case  "SET_SORT_BY_AMOUNT":
    return { ...state, sortBy: 'amount' };
    case  "SET_START_DATE":
    return { ...state, startDate: action.payload };
    case  "SET_END_DATE":
        return { ...state, endDate: action.payload };
    default:
      return state;
  }
};


//LES ACTIONS:

const addExpense = ({description = '', note = '', amount = 0, createdAt = 0 }) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  }
});
//const removeExpense = ({id} = {}) => ({
const removeExpense = (id) => ({
  type: "REMOVE_EXPENSE",
  // expense: {
  //   id
  // }
  id
});
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  payload: text
});
const setSortByFilter = (val) => ({
  type: 'SET_SORT_BY_FILTER',
  val
})
const setSortByDate = (payload = "date") => ({
  type: "SET_SORT_BY_DATE",
  payload
})
//OU
const setSortByAmount = ( ) => ({
  type: "SET_SORT_BY_AMOUNT",
})
const setStartDate = (payload = undefined) => ({
  type: "SET_START_DATE",
  payload
})
const setEndDate = (payload = undefined) => ({
  type: "SET_END_DATE",
  payload
})



/*** dispatch ***/
//add
const depenseUn = store.dispatch(addExpense({description: 'loyer', note: 'outch', amount: 800 }));
const depenseDeux = store.dispatch(addExpense({description: 'loye2', note: 'super', amount: 800 }));
///remove

// store.dispatch(removeExpense({id: depenseUn.expense.id }));
store.dispatch(removeExpense(depenseUn.expense.id));
//edit
 store.dispatch(editExpense(depenseDeux.expense.id, { amount: 555 }));


 //filter text
 store.dispatch(setTextFilter('loyer'));
 store.dispatch(setTextFilter());
 store.dispatch(setTextFilter('bain'));


//filter Sortby
 store.dispatch(setSortByFilter('date'));
 store.dispatch(setSortByFilter('amount'));
 //OU
store.dispatch(setSortByDate());
store.dispatch(setSortByAmount());
///StartDate EndDate
store.dispatch(setStartDate(Date.now()));
store.dispatch(setStartDate());
store.dispatch(setEndDate(Date.now()));
store.dispatch(setEndDate());



/*** store  combine ***/
const store = createStore(
  combineReducers({
    expenses: expenseReducer,
    filters: filterReducer
  })
);

/************************************  ************************************/
/************************************ voici le bout cool  ************************************/
/************************************  ************************************/

DONC ICI LE DATA DU STORE SERA :
{
EXPENSES: [],
FILTER: {}
}


UNE FONCTION QUI MIXE LES DEUX
DONC ICI ON TEST LES OBJECT D UN ARRAY AVEC COMME CONDITION LES VALEURS DE L OBJECT FILTRE.
chaque changement de  state va passer par cette fonction qui prend l object expense et lui passe le filtre commandé et retourne ce qui est true.
startDateMatch si true, continue
endDateMatch si true, continue
textMatch si true, continue
et en ressort un array avec ceux qui on passé le test


const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
      ///(false true) si pas un number passe a lautre condition donc 1 = false pour le premier
      // ensuite va au >= voir si true si createdAt est 2 et startDate 1 === true si tout est true
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  });
};
//JUSTE LES DEPENSES RETOURNE DNAS LE CONSOLE PLUS BAS


const unsubscribe = store.subscribe(() => {
 const state = store.getState(); //STATE COMPLET QUI LANCE A CHAQUE DISPATCH
 //visibleExpenses SE LANCE A CHAQUE DISPATCH PAR LE FAIT MEME
 const visibleExpenses = getVisibleExpenses(state.expenses, state.filter);

 console.log(visibleExpenses) //RETOURNE ?
 RETOURNE UN ARRAY D OBJECT DE EXPENSES, SI ON EN AJOUTE BIEN SUR , UN EXEMPLE
});

SI ON  FAIT
store.dispatch(addExpense({description: 'loyer', note: 'outch', amount: 800, createdAt: 1000 }));
store.dispatch(addExpense({description: 'loyer2', note: 'super', amount: 800, createdAt: -1000 }));

store.dispatch(setStartDate(500));


RETOURNE CA PARCE QUE ON REPOND A :
>= startDate; -1000
<= endDate; 1000   garde lui a 500

[{…}]0: {id: "5d472448-dbcd-4900-a580-e20dc65eb3a6", description: "loyer", note: "outch", amount: 800, createdAt: 1000}



MEM CHOSE ICI POUR TEXT QUI REGARDE DESCRIPTION,
ON NE PASSE PAS DE NUMBER, DONC PASSE AU 3 IEME DESCRIPTION:

store.dispatch(setTextFilter('LOYER2'));

RETOURNE CA PARCE QUE ON REPOND A LOYER2 toLowerCase():
[{…}]0: {id: "e7d7e0e5-7bea-4352-bd49-16406f28445c", description: "loyer2", note: "super", amount: 800, createdAt: -1000}




EQUIVALENT DE CECI:
le state se remplie , et le filtre est passé et retourne
const fakestate = [1,2,3];
const filtre = {
   filtre: 1
}

const test = (arr, {filtre}) => {
 return arr.filter((num) => {
  return num ===  filtre;
 });
}

const te = test(fakestate, filtre)
console.log('rep :', te) // DONC: REP : [1]



///////////////////////////////////////////////////////////////////////////////////////////////
                              ///SORT DANS REDUX /////
///////////////////////////////////////////////////////////////////////////////////////////////

MEME SCENARIO QUE LE POINT PRECEDENT:
on a couvert text - startDate - endDate
IL RESTE  SORTBY :

filters: {
  text: 'loyer',
  sortBy: 'amount',            //ou date
  startDate: undefined,
  endDate: undefined
}
la fonction qu on passe:
 (a, b) =>  {
  if (a < b )
     return -1;
  if (a > b  )
     return 1;
  return 0;  // a doit être égal à b
}

/************************************ les valeurs  ************************************/
a > b  ?  1  : - 1  === de plus petit a plus grand
a < b  ?  1  : - 1  === de plus grand a plus petit
/************************************ les valeurs ************************************/

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    ...
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

 store.dispatch(addExpense({description: 'loyer', note: 'outch', amount: 800, createdAt: -1000 }));
 store.dispatch(addExpense({description: 'loyer2', note: 'super', amount: 800, createdAt:  1000 }));

DONNERA :
0: {id: "61bfee54 ", description: "loyer2", note: "super", amount: 1800, createdAt: 20}
1: {id: "bd06f308 ", description: "loyer", note: "outch", amount: 800, createdAt: 20}

                              ///info sur Sort()/////


SORT POUR LES ARRAYS SUR MSN :
https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/sort

arr.sort() //donne pas grand controle snas fFN
arr.sort(fonctionComparaison)

var fruit = ["pommes", "bananes", "Cerises"];
fruit.sort(); // ["Cerises", "bananes", "pommes"];
//Selon l'ordre des points de code Unicode. Par exemple, "Cerise" sera trié avant "banane".'

var scores = [1, 2, 10, 21];
scores.sort(); // [1, 10, 2, 21]
//VAL NUMERIQUE ne fonctionne pas . 10 arrive avant 2 , premier caractere
var choses = ["mot", "Mot", "1 Mot", "2 Mots"];
choses.sort(); // ["1 Mot", "2 Mots", "Mot", "mot"]
//CHIFFRES ARRIVENT AVANT LES LETTRES


donc avec les valeurs numerique on va avec -1 1 et 0 si egal  , ce pourrait etre 10 et -10 .

MAIS GENERALEMENT ON VOIR SORT COMME CA :
function compare(a, b) {
  if (a est inférieur à b selon les critères de tri)
     return -1;
  if (a est supérieur à b selon les critères de tri)
     return 1;
  return 0;  // a doit être égal à b
}



///////////////////////////////////////////////////////////////////////////////////////////////
                              ///Redux avec React /////
///////////////////////////////////////////////////////////////////////////////////////////////



EN FAIT SANS REDUX, REACT EST DU CACA . IL EST IMPOSSIBLE DE FAIRE UN BEAU
PROJET REACT SANS FLUX OU REDUX OU MOBX

info:
https://github.com/reactjs/react-redux

install:
yarn add react-redux

import { Provider, connect } from 'react-redux'
C EST JUSTE CA REACT-REDUX, LE PROVIDER QUI WRAP NOTRE
REACT ET CONNECT QUI PERMET DONNER ACCES AU STATE DE REDUX DANS LES PROPS DE REACT.







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
                              ///AJOUTER LE REDUX DEV TOOLS/////
///////////////////////////////////////////////////////////////////////////////////////////////

Ca va simplement apres le reducer :



///COMBINE ET CREER LE STORE
import { createStore, combineReducers } from 'redux';

//import reducers
import expensesReducer from '../reducers/expensesReducer'
import filtersReducer from '../reducers/filtersReducer'

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer
    }), //ici
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
}




///////////////////////////////////////////////////////////////////////////////////////////////
                              ///Firebase avec REACT ET REDUX ASYNC /////
///////////////////////////////////////////////////////////////////////////////////////////////

PARCE QUE LES FETCH DE DB, SONT DES ACTIONS ASYNC , REDUX DOIT S AJUSTER :
DANS LE BUT EST DE SAUVEGARGER ET ENSUITE DISPATCHER NOS ACTIONS.

IL EST D USAGE D EVITER DE METTRE LES TRANSFERE DE DONNÉ A LA DB DANS REDUX ET NON DANS REACT
REACT NE DEVRAIT PAS ETRE MEME CONSCIENT D OU VIENT LE DB .


SANS DB :
1- LE COMPONENT CALL UN GENERATEUR D ACTION
2- ACTION GENERATOR RETOURNE UN OBJECT
3- LE COMPONENT DISPATCH L OBJECT
4- LE REDUCER FAIT SON BOULOT ET LE STORE CHANGE

AVEC DB
1- LE COMPONENT CALL UN GENERATEUR D ACTION
2- ACTION GENERATOR RETOURNE UNE FUNCTION ET NON PAS UN OBJECT
3- LE COMPONENT DISPATCH LA FUNCTION
4- LA FUNCTION ROULE, PEUT DISPATCHER ELLE MEME D AUTRE CHOSE DONC UN OBJ , LE STORE ET LA DB CHANGE.




DONC REDUX-THUNK :

npm install --save redux-thunk
yarn add redux-thunk




NOTRE STORE doit etre tweaker:

   import { createStore, combineReducers, applyMiddleware } from 'redux';
   import thunk from 'redux-thunk';
   //import reducers
   import expensesReducer from '../reducers/expensesReducer'
   import filtersReducer from '../reducers/filtersReducer'



   const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

   export default () => {
     const store = createStore(
       combineReducers({
         expenses: expensesReducer,
         filters: filtersReducer
       }),
       composeEnhancers(applyMiddleware(thunk))
     );
     return store;
   };



///////////////////////////////////////////////////////////////////////////////////////////////
                              ///utiliser thunk/////
///////////////////////////////////////////////////////////////////////////////////////////////
import db from '../firebase/firebase';

Dans nos actions :

export const addExpense = ({description = '', note = '', amount = 0, createdAt = 0 }) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  }
});

CETTE ACTION CREAIT LES DEFAUT POUR LE STORE, MAIS MAINTENANT UN VEUT LE DEFAULT POUR FIREBASE

export const startAddExpense  = (expenseData = {}) => {  // METTRE UN DEFAUT VIDE SI JAMAIS
  return (dispatch) => {
    const {description = '', note = '', amount = 0, createdAt = 0 } = expenseData; //DEFAUT
    const expense = {description, note, amount, createdAt}; //FAIRE UN OBJ AVEC NOS DEFAUTS

  return db.ref('expenses').push(expense) //PASSE L OBJECT DE DEFAUT //RETURN FACULTATIF
    .then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense //le reste des key value
      }))
    }).catch((e) => {
      console.log(e)
    });
  };
};

DONC ON POURRA MAINTENANT SIMPLIFIER ADEXPENSE, IL N AURA PLUS BESOIN DE CREER SES DEFAULT.
ON NE PRENDRA PLUS LE ID DU UUID, MAIS LUI DE FIREBASE .

export const addExpense = (expense) => ({
  type: "ADD_EXPENSE",
  expense : expense
});


DONC NOTRE CALL DU THINK VERS L ACTION USUEL ,
ET ON DOIT CHANGER LE NOM DE L ACTION APPELE DANS REACT
PASSER DE addExpense A startAddExpense :





///////////////////////////////////////////////////////////////////////////////////////////////
                              ///Firebase avec  REDUX /////
///////////////////////////////////////////////////////////////////////////////////////////////
import db from '../firebase/firebase';

Dans nos actions :

export const addExpense = ({description = '', note = '', amount = 0, createdAt = 0 }) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  }
});

CETTE ACTION CREAIT LES DEFAUT POUR LE STORE, MAIS MAINTENANT UN VEUT LE DEFAULT POUR FIREBASE

export const startAddExpense  = (expenseData = {}) => {  // METTRE UN DEFAUT VIDE SI JAMAIS
  return (dispatch) => {
    const {description = '', note = '', amount = 0, createdAt = 0 } = expenseData; //DEFAUT
    const expense = {description, note, amount, createdAt}; //FAIRE UN OBJ AVEC NOS DEFAUTS

  return db.ref('expenses').push(expense) //PASSE L OBJECT DE DEFAUT //RETURN FACULTATIF
    .then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense //le reste des key value
      }))
    }).catch((e) => {
      console.log(e)
    });
  };
};

DONC ON POURRA MAINTENANT SIMPLIFIER ADEXPENSE, IL N AURA PLUS BESOIN DE CREER SES DEFAULT.
ON NE PRENDRA PLUS LE ID DU UUID, MAIS LUI DE FIREBASE .

export const addExpense = (expense) => ({
  type: "ADD_EXPENSE",
  expense : expense
});


DONC NOTRE CALL DU THINK VERS L ACTION USUEL , ET ON DOIT CHANGER LE NOM DE L ACTION APPELE DANS REACT
PASSER DE addExpense A startAddExpense :



///////////////////////////////////////////////////////////////////////////////////////////////
                              ///FAIRE UN DOUBLE DE NOTRE DB POUR TEST /////
///////////////////////////////////////////////////////////////////////////////////////////////

process.env.NODE_ENV,  EST MIS A "PRODUCTION" PAR HEROKU PAR DEFAULT ,

CROSS-ENV
npm install --save cross-env


ce package est tres simple ,
"test": "cross-env NODE_ENV=test ...",

dans le package on dit quel environement on veut quand un script est lancé :
"start": "cross-env NODE_ENV=production node server/server.js", //ceci n est pas necessaire , heriku sait que start est prod.



voir Notes -multi serveur


///////////////////////////////////////////////////////////////////////////////////////////////
                              ////Fetcher le data du serveur avec redux ////
///////////////////////////////////////////////////////////////////////////////////////////////


TOUJOURS EN DEUX ETAPES , UNE ACTION RETOURNE UNE FUNCTION
QUI DISPATCH A UNE AUTRE OPTION QUI RETOURNE UN OBJ

NOTRE DATA EST UN ARRAY D OBJ, DONC ON DOIT RECREER CA:
1- export const startSetExpenses = () => {
  return dispatch => {
    return db
      .ref('expenses') // donne un then l autre bord
      .once('value')
      .then(data => {
        const expenses = []; //on se creer un array
        data.forEach(childSnapshot => {
          //on push pour l array
          expenses.push({
            id: childSnapshot.key, //id
            ...childSnapshot.val() //spread le reste de valeurs
          });
        });
        dispatch(setExpenses(expenses)); //dispatch
      })
      .catch(e => {
        console.log(e);
      });
  };
};

//retourne l array recu
2-export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

//reducer
3-case 'SET_EXPENSES':
  return action.expenses;


PUISQUE QUE CETTE INFO EST NECESSAIRE AU DEPART de l app:


ON MONTRE TELECHARGEMENT
ReactDOM.render(<p>Telechargement...</p>, document.getElementById('app'));

UNE FOIS LE RETOUR DE LA PROMISE , ON MONTRE L APP:
store.dispatch(startSetExpenses()).then(() => {
   ReactDOM.render(wrapProvider, document.getElementById('app'));
   console.log('bravo')
 });




///////////////////////////////////////////////////////////////////////////////////////////////
                              ///Comment supprimer /////
///////////////////////////////////////////////////////////////////////////////////////////////


export const removeExpense = (id) => ({
  type: "REMOVE_EXPENSE",
  id
});


PLUS SIMPLE PARCE QU AVEC FIREBASE, L- OBJET A LE ID COMME KEY :
// -KiqNXPFqocG2GJPNPzQ
//  completed:
//  createdAt:
//  text:
DONC IL D AGIT DE DONNER DONNER L ID ET FAIRE REMOVE :

export const startRemoveExpense = (id) => {
  return (dispatch) => {
    db.ref(`expenses/${id}`).remove()
    .then(() => {
       return dispatch(removeExpense(id))
    }).catch((e) => {
      console.log(e)
    });
  };
}


NOTRE APP TROUVAIS L ID SUR props.match.params.id; :
const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(expense => {
      return expense.id === props.match.params.id;
    })
  };
};


ET LE BUTTON :
<button
  onClick={() => {

    props.dispatch(startRemoveExpense(props.expense.id));
    props.history.push('/');
  }}
>
  Retirer
</button>




///////////////////////////////////////////////////////////////////////////////////////////////
                              ////Maintenant update ////
///////////////////////////////////////////////////////////////////////////////////////////////

//THUNK RETOURNE FN ET DISPATCH
export const startEditExpense = (id, updates) => {
 return (dispatch) => {

   db.ref(`expenses/${id}`).set({
     ...updates
   });
   dispatch(editExpense(id, updates))
 };

OU
 db.ref(`expenses/${id}`).update({
   ...updates
 });
 dispatch(editExpense(id, updates))
};

};


//ACTION RETOURNE L OBJ
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});



//REDUCER
case "EDIT_EXPENSE":
//console.log(action.updates)//{amount: 555}
return state.map((expense) => {
 if(expense.id === action.id) {
   return {
     ...expense, ...action.updates
   }
 } else {
   return expense
 }
});
