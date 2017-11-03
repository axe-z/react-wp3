
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
        test: /\.js$/,    //le $ veut dire FINI avec
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
         ///Ajout du source map, pour mieux s y retrouver avec erreurs /////
///////////////////////////////////////////////////////////////////////////////////////////////

DONC SI ON FAIT UNE ERREUR, IL POINTERA PAS LE BUNDLE.JS , MAIS MIEUX LE FICHIERS X , QUI A L ERREUR
MEME CHOSE POUR LES CONSOLE.LOG

IL Y A PLUSIEURS OPTIONS AU SOURCES-MAP, VOICI LE LIEN :
https://webpack.js.org/configuration/devtool/
POUR UTILISATION :
https://webpack.js.org/guides/development/#using-source-maps


POUR DEV :
cheap-module-eval-source-map


DONC
module.exports = {
  entry: './src/app.js',
  output: {
  path: path.join(__dirname, 'public'),
  filename: 'bundle.js'
},
module:  {
  rules: [{
    loader: 'babel-loader',
    test: /\.js$/,
    exclude: /node_modules/
  }]
},
devtool: 'cheap-module-eval-source-map'
}



///////////////////////////////////////////////////////////////////////////////////////////////
                              ///DEV-SERVER ET HOT RELOAD PAR DEFAUT/////
///////////////////////////////////////////////////////////////////////////////////////////////

SERVEUR DE DEVELLOPMENT :
https://webpack.js.org/configuration/dev-server/


ON DOIT L AJOUTER :
yarn add webpack-dev-server

webpack dev server example
devServer: {
  contentBase: path.join(__dirname, "public"),
  compress: true,
  port: 8080
}


LE contentBase: path.join(__dirname, "public"),
on doit pointer vers les fichiers traité par webpack, donc meme path absolue que le output.



ON VA RETOUCHER NOTRE PACKAGE.JSON :
"scripts": {
  "serve": "live-server public/",
  "build": "webpack",
  "dev": "webpack-dev-server"
},


DONC POUR ROULER :
yarn run dev


LE HOT RELOAD EST LA PAR DEFAUT !!!

FAIT INTERESSANT:

LE FICHIER BUNDLE.JS N EST PAS CE QUI APPARAIT VRAIMENT DANS CHROME, MAIS BIEN UNE VERSION SIMILAIRE MISE EN CACHE POUR DES QUESTION DE RAPIDITÉ.

SI ON DELETE NOTRE BUNDLE.JS ET RELANCE LE DEV-SERVER, BUNDLE.JS N Y SERA PAS !
ONDOIT RELANCER WEBPACK POUR RECONSTRUIRE BUNDLE.JS

DONC C EST LA MEME CHOSAE QUE LIVE-SERVER. MAIS AVEC UNE APPROCHE RAPIDE POUR WEBPACK.


///////////////////////////////////////////////////////////////////////////////////////////////
                              ///Ajouter le CSS / SCSS / SASS /////
///////////////////////////////////////////////////////////////////////////////////////////////
ON DOIT AJOUTER PLUSIEURS TRUC POUR FAIRE DU CSS ET SCSS :

COMMENCONS PAR LE SIMPLE CSS :

css-loader
style-loader

install:
yarn add css-loader style-loader

VOILA LA DIFFERENCE DANS MODULE, SI UN SEUL LOADER, ON UTILISE : loader: 'babel-loader'
SI LE BESOIN EST D AVOIR PLUS D UN LOADER, ON UTLISE DANS UN ARR:   use: [ 'style-loader','css-loader' ]
DANS L ORDRE, QUI VA DE DROITE A GAUCHE , ON TRAITE LES CSS ENSUITE ON PITCH LE CSS AVEC STYLE

...
module: {
  rules: [
    {
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    },
    {
      use: [ 'style-loader','css-loader' ],
      test: /\.css$/
    }
  ]
},
...

LE STYLE LOADER EST CELUI QUI AJOUTE DANS NOTRE HTML
LES BALISES <STYLE> DANS LE HEAD UNE FOIS TRAITÉ..

POUR UTILISER :

import './style/style.css'

////////////////////////////////////////////
LE SCSS (enleve le css):

INSTALL:
scss-loader
node-sass

yarn add sass-loader node-sass


IL NE RESTE QUY A MODIFIER LE LOADER DE CSS
{
  use: [ 'style-loader','css-loader','sass-loader' ],
  test: /\.scss$/
}


import './style/style.scss'
Dans le scss , on peut importer les aux(partial) dans style.scss.
Exemple :
UN FICHIER DANS: style/base_base.scss
NOTRE MAIN LUI EST DANS: style/style.scss

PAS D EXPORT.SEULEMENT UN IMPORT :

@import './base/base';
CE, MEME SI LE FICHIER SE NOMME _base OU VA METTRE base, IL NE FAUT PAS OUBLIER LE POINT VIRGULE=   ;

VOILA, CECI FAIT IL N EST PLUS POSSIBLE D UTILISER DU CSS !!



////////////////////////////////////////////
CSS ET SCSS EN MEME TEMPS :

FAIRE L INSTALL DES 2 CSS ET SCSS

POUR POUVOIR UTILISER DU CSS ET SCSS :

il s agit seulement de rajouter un ?  a  test: /\.s?css$/,

{
  use: [ 'style-loader','css-loader','sass-loader' ],
  test: /\.s?css$/
}



MAINTENAN CECI AJOUTE A NOTRE HTML, SANS CREER DES FICHIERS DEDIERS CSS,
CE QUI N EST PAS UNE BONNE PRATIQUE TOUT DEPENDANT DU PROJET.












///////////////////////////////////////////////////////////////////////////////////////////////

            ///ajouter des plugins:  CLASS PROPERTIES TRANSFORM
          ///    COMMENT EVITER LE BINDING ET LE CONSTRUCTOR   /////

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
CECI VA DE TOUS LES METHODES D UNE CLASS !! SAUF !! LES METHODES DE REACT, COMME LES LIFECYCLES :



///////////////////////////////////////////////////////////////////////////////////////////////
                              ///CREER UNE VERSION PRODUCTION/////
///////////////////////////////////////////////////////////////////////////////////////////////
UN PROJET VA FINIT TPAR PESER PAS LOIN DE 6 MEG AVEC REACT,
MAIS CE POID LA , EST EN GROSSE PARTIE DES SOURCES MAP.

ON DOIT AINSI FAIRE NOTRE POSSIBLE POUR BAISSER LE POID.
https://webpack.js.org/guides/production/

WP3 REND CA PLUS SIMPLE :
webpack -p

"scripts": {
  "serve": "live-server public/",
  "build:dev": "webpack",
  "build:prod": "webpack -p",   //ici on fait un script
  "dev": "webpack-dev-server",
  "test": "jest"
},


yarn run build:prod

ceci baisse le poid de 30%


1-faire une FN qui retourne webpack :
au lieu de module.exports = {
on fera une fonction qui retourne notre setup.

module.exports = (ici on passera si prod ou dev) => {
  return {     //retourne un obj de notre config
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js'
    },
    ...

2- Passer au package l info que l envirronement est production si build:prod
  "build:prod": "webpack -p --env production",


3- Faire un script qui regarde si en production, sinon est en development.
module.exports = (env) => {
  const isProduction = env === 'production';  //true ou false
  return {
    entry: './src/app.js',
    output: {
      ..


4- le source map est ce qui prend bcp de poid, et pas de besoin en production
en fait le mettra a part :
...
devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
devServer: {
  contentBase: path.join(__dirname, 'public'),
...

5-yarn run build:prod , le script qui etait a 6meg, est maintenant a 600k
un fichier externe s ajoute pour le source-map(bundle.js.map), mais personne a besoin de ca sauf nous.





///////////////////////////////////////////////////////////////////////////////////////////////
                              ///SEPARER LE CSS, le sortir de bundle.css/////
///////////////////////////////////////////////////////////////////////////////////////////////
https://github.com/webpack-contrib/extract-text-webpack-plugin

npm install --save-dev extract-text-webpack-plugin
yarn add extract-text-webpack-plugin

0-const ExtractTextPlugin = require('extract-text-webpack-plugin');


autre maniere :
1- creer une variable avec une nouvelle instance et donner le nom de notre css
  const CSSExtract = new ExtractTextPlugin('styles.css');

  module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css'); //permet de choisir les noms
    return { ...


2-  creer le test, avec source-map actif pour le css aussi.
...
{
  test: /\.s?css$/,
  use: CSSExtract.extract({
    use: [
      {
        loader: 'css-loader',
        options: {
          sourceMap: true   //nous donne la ligne dans le fichier css.
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }
    ]
  })
...


3- l ajouter dans nos plugins dans webpack :
plugins: [
  CSSExtract,
],


4- Maintenant qu on a un fichier css, on doit l ajouter dans notre HTML
  <link rel="stylesheet" href="/styles.css"  /> (pas mettre le / c est pour fermer et pas fucker les notes)

/********************  maniere dite sur npm (pas celle qu on prend mais marche )   ***********************/
1- une maniere :
{
  test: /\.s?css$/,
  use:  ExtractTextPlugin.extract({
  fallback: "style-loader",
  use: ["css-loader",'sass-loader']
  })
}

2- plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
3- ajout dnas html
  <link rel="stylesheet" href="/styles.css" />(pas mettre le / c est pour fermer et pas fucker les notes)
  mais on aura p-e des trouble avec source-map de notre css


!!!! important !!!!!!

  <link rel="stylesheet" href="/styles.css" />  METTRE /REP/TRUC.CSS PAS ./REP/TRUC.CSS , SINON LE CSS FONCTIONNERRA PAS BIEN SI ON RELOAD NON PAS DE LA PAGE PRINCIPALE , MAID AILLEURS DANS L APP

/********************  maniere dite sur npm (pas celle qu on prend mais marche )   ***********************/




///////////////////////////////////////////////////////////////////////////////////////////////
                              ///Babel polyfill/////
///////////////////////////////////////////////////////////////////////////////////////////////
POUR FAIRE EN SORTE DE SUPPORTER DE VIEUX BROWSER AVEC LE CSS

ON PEUT TESTER TOUS LES BROWSER AVEC BROWSERSTACK.COM
MAINTENANT CA COUTE CHER ...

install:
npm install --save babel-polyfill



DANS WEBPACK.CONFIG :
ON LE PASSE JUSTE AAVANT NOTRE APP.JS , DONC SERA DANS LE BUNDLE.JS
...
return {
  entry: ['babel-polyfill','./src/app.js'],
  output: {
    path: path.join(__dirname, 'public', 'dist'),
    filename: 'bundle.js'
  },



MAIUNTENANT LE POLYFILL VA PATCHER LES VIEUX BROWSER
