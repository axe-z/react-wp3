///////////////////////////////////////////////////////////////////////////////////////////////
                              ///DESTRUCTURER / DÉCOMPOSITION/////
///////////////////////////////////////////////////////////////////////////////////////////////

RACCOURCIR NOTRE CODE POUR LE MIEUX

///////////////////////////////////////////////////////////////////////////////////////////////
                              ///Avec OBJ/////
///////////////////////////////////////////////////////////////////////////////////////////////

PRENNONS :

const person = {
  name: 'Benoit',
  age: 26,
  location: {
    ville: 'mtl',
    temp: 32
  }
};

NORMALEMENT:
console.log(`nom nom est ${person.name} et j ai fucking pas ${person.age} ans`)
//nom nom est Benoit et j ai fucking pas 26 ans

MAINTENANT DESTRUC :
faut le voir ainsi, person.name ou age ,
donc on prend le debut et le mets a la fin name ou age = person
const { name, age } = person;

console.log(`nom nom est ${name} et j ai fucking pas ${age} ans`)
////nom nom est Benoit et j ai fucking pas 26 ans

const { ville , temp } = person.location;
//ici on peut dire: person.location.ville ou temp
console.log(`j suis a ${ville} et il fait ${temp}`)
//j suis a mtl et il fait 32



DESTRUCTURER UN INNER-OBJ:
const { name, age , location: { ville, temp }} = person;

console.log(`nom nom est ${name} et j ai fucking pas ${age} ans, j suis a ${ville} et il fait ${temp}`)
//nom nom est Benoit et j ai fucking pas 26 ans, j suis a mtl et il fait 32


AVEC 3 LAYERS:
const person = {
  name: 'Benoit',
  age: 26,
  location: {
    ville: 'mtl',
    temp: 32,
    compagnie: {
      nom: 'axe-z'
    }
  }
};
Donc:
const { name, age, location: { ville, temp, compagnie: { nom } } } = person;


console.log(`nom nom est ${name} et j ai fucking pas ${age} ans,
  j suis a ${ville} chez ${nom} et il fait ${temp}`);
  //nom nom est Benoit et j ai fucking pas 26 ans, j suis a mtl chez axe-z et il fait 32



CHANGER LE TERME :
si name ne convient pas , ou est floue, le change ainsi, 'as' n existe pas :
const { name: ben,  age } = person;

console.log(`nom nom est ${ben} et j ai fucking pas ${age} ans`);
//nom nom est Benoit et j ai fucking pas 26 ans


SANS VARIABLES :
({a, b} = {a: 10, b: 20});
console.log(a); // 10
console.log(b); // 20



CHANGER LE TERME ET VALEUR PAR DEFAUT :
le double point : pour attribuer un autre nom, egal = pour donner une valeur par defaut si aucune existe.
const {a:aa = 10, b:bb = 5} = {a: 3};

console.log(aa); // 3 la valeur par default s applique pas , a existe et a 3
console.log(bb); // 5


INCLUANT UN ARR:
const metadata = {
    title: "Scratchpad",
    translations: [
       {
        locale: "de",
        localization_tags: [ ],
        last_edit: "2014-04-14T08:43:37",
        url: "/de/docs/Tools/Scratchpad",
        title: "JavaScript-Umgebung"
       }
    ],
    url: "/en-US/docs/Tools/Scratchpad"
};

const { title: englishTitle, translations: [{ title: localeTitle }] } = metadata;

console.log(englishTitle); // "Scratchpad"
console.log(localeTitle);  // "JavaScript-Umgebung"



const book = {
  title: 'la force du mal',
  author: "Ken Poklington",
  publisher: {
    name: 'Penguin'
  }
};

const { title , author, publisher: {name: nom = 'Pengouin'}} = book;
console.log(title, author, nom)



///////////////////////////////////////////////////////////////////////////////////////////////
                              ///Avec ARRAY/////
///////////////////////////////////////////////////////////////////////////////////////////////

RENDRE PLUS CLAIR :

const address = ['1805 rue lautrec', 'laval', 'Qc', 'H7M 2C6'];


ON PEUT TOUJOURS FAIRE DEPUIS TOUJOURS, MAIS CECI N EST JAMAIS CLAIR :

console.log(`Vous etes au ${address[0]} a ${address[1]}`)
//Vous etes au 1805 rue lautrec a laval



DONC DESTRUCTURER POUR MIEUX SE COMPRENDRE,
BCP BCP PLUS CLAIR AINSI:
const address = ['1805 rue lautrec', 'laval', 'Qc', 'H7M 2C6'];
const [rue, ville, province, cp] = address;

console.log(`Vous etes au ${rue} a ${ville} au ${province}, ${cp}`)
//Vous etes au 1805 rue lautrec a laval au Qc, H7M 2C6


SI ON VEUT ETRE SELECTIF ! :
EN LAISSANT LES ESPACE POUR FITER AVEC L INDEX DE CHAQUE.
const address = ['1805 rue lautrec', 'laval', 'Qc', 'H7M 2C6'];
const [rue, , , cp] = address;
console.log(`Vous etes au ${rue} , ${cp}`)
Vous etes au 1805 rue lautrec , H7M 2C6


LES DEFAULT :
MEME SI Y A RIEN EN POSITION[1] aka 2
const address = ['1805 rue lautrec'];
const [rue, cp = 'HOH OHO'] = address;

console.log(`Vous etes au ${rue} , ${cp}`)
//Vous etes au 1805 rue lautrec , HOH OHO



const a, b, rest;
[a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20





const x = [1, 2, 3, 4, 5]; // On crée un "paquet" de donnée
const [y, z, a] = x; // On utilise l'affectation par décomposition
console.log(y); // 1
console.log(z); // 2
console.log(a) //3



const toto= ["un", "deux", "trois"];

// sans utiliser la décomposition
const un    = toto[0];
const deux  = toto[1];
const trois = toto[2];

// en utilisant la décomposition
const [un, deux, trois] = toto;




////rest

[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a); // 10
console.log(b); // 20
console.log(rest); // [30, 40, 50]



///////////////////////////////////////////////////////////////////////////////////////////////
                              ///SPREAD/////
///////////////////////////////////////////////////////////////////////////////////////////////


/************************************ Array ************************************/

Permet de ne pas muter et d agrandir nos ARRAY
on peut aussi utiliser arr.concat(truc)

const nom = ['ben','bert','bob']
[...nom,'robert'] retourne = ['ben','bert','bob','robert']
['steeve',...nom,'robert'] retourne =  ['steeve','ben','bert','bob','robert']

ce qui le rend plus maleable que concat.

Particulierement pour Redux. ce qu on retourne sera le state


const expenseReducer = (state = [], action) => {
 switch (action.type) {
   case "ADD_EXPENSE":
   //CONCAT
   return state.concat(action.payload)
   //AVEC spread
   return [...state, action.payload]
   default:
     return state
 }
};


/************************************ obj rest ************************************/

N EST PAS SUPER SUPPORTÉ ENCORE IL NECCSSITE UN BABEL SPECIAL :

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


DONC FONCTIONNE PAS MAL COMME LUI D ARRAY, DEJA SUPPORTÉ

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
