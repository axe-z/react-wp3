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


                        /*** comment fonctionne yarn ***/

global = veut dire global...
add = est l equivalent d install

Donc :
yarn global add live-server             //va installer live-server globallement

*note : live-server public              //lance le serveur sur le rep public, il est real time ! good.






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
