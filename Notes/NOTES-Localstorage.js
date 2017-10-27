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
