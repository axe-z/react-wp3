///////////////////////////////////////////////////////////////////////////////////////////////
                              ///YARN/////
///////////////////////////////////////////////////////////////////////////////////////////////
YARN EST PLUS RAPIDE ET PLUS STABLE . PARCE QUE ASYNC
EN PLUS CACHE TOUT..
LE YARN.LOCK EST MIEUX FAIT SE MET A JOUR, POUR LES UPGRADE COMPATIBILITY
il est installé global, donc ...

npm install -g yarn



POUR COMMENCER :
yarn init      //pour partir , exactement comme nom et fait un package.json
npm init


                        /*** comment fonctionne yarn ***/

global = veut dire global...
add = est l equivalent d install

Donc :
yarn global add live-server             //va installer live-server globallement

*note : live-server public              //lance le serveur sur le rep public, il est real time ! good.


normal:
 yarn add truc
 pour installer en devDependencies:
 npm install --save-d truc
 yarn add --dev truc


pour installer seulement les node modules utile pour PROD , donc pas de dev:
npm install --production
yarn install --production


yarn install ou nom install, met tout.

{
  "name": "indecision-app",
  "version": "1.0.0",
  "main": "index.js",
  "author": "Axe-Z",
  "license": "MIT"
}

AJOUTER DES PACKAGES :
yarn add babel-preset-react babel-preset-env

{
  "name": "indecision-app",
  "version": "1.0.0",
  "main": "index.js",
  "author": "Axe-Z",
  "license": "MIT",
  "dependencies": {
    "babel-preset-env": "^1.6.0",
    "babel-preset-react": "^6.24.1"
  }
}



POUR REINSTALLER LES DEPENDANCES D UN PACKAGE.JSON:
yarn install


DESINSTALLER DES PACKAGE GLOBAL :
il est peut aviser de travailler avec des package global, de un si on passe a d autre dev notre projet, il ne voit pas tout ce qu on a de besoin, et les version aussi se garde mal a jour.

yarn global remove babel-cli live-server
MIEUX VAUT
yarn add babel-cli live-server


POUR FAIRE DES SCRIPTS SHORTCUT:
{
  "name": "indecision-app",
...
  "scripts": {
    "dev": "live-server public/",
    "build":"babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch"
  },
  "dependencies": {
    "babel-cli": "^6.26.0",
...
  }
}


LES LANCER:
dans le terminal,
comme pour npm :
yarn run dev



pas rapport avec yarn mais.. MANUELLEMENT LANCER BABEL en WATCH
babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch





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
