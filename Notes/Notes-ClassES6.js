 

        ///////////////////////////////////////////////////////////////////////////////////////////////
                                      /// TOUT SUR LES CLASS  /////
        ///////////////////////////////////////////////////////////////////////////////////////////////

avant tout, les class rappel ...


Premierement comment extender , on part the person , la class qui est la base, tout les autres class ici partent de person . un student est une person un Traveler est une person


                    /***POUR LA CLASSE INITIALE - PERSON  ***/

                    class Person {
                      constructor(name = 'Anonymous', age = 0) {
                        this.name = name;
                        this.age = age;
                      }
                      getGreeting() {
                        return `Hi. I am ${this.name}!`;
                      }
                      getDescription() {
                        return `${this.name} is ${this.age} year(s) old.`;
                      }
                    }

LE CONSTRUCTOR :
 EST LA FONCTION QUI PERMET DE CREER L INSTANCE, DANS LAQUEL ON MET NOS VARIABLES ET NON LES FONCTIONS. ON DOIT Y METTRE LES ARGUMENTS NECESSAIRE POUR CREER L INSTANCE. ON PEUT DEPUIS ES6 Y METTRE DES VALEURS PAR DEFAUT. constructor(name = 'Anonymous') {
   this.name = name;

   /*** LES FONCTIONS DANS UN CLASS  ***/
   LE THIS FAIT REFERENCE A L INSTANCE CREER PAR LE CONSTRUCTOR
   nomDeLaFN (){
     return this.name;
   }
   /// pas de virgule
   nomDeLaFN2 (){
     return `mon nom est ${this.name}`;
   }
  puisque les functions on acces aux variable, pas besoin de les mettres





/************************************************************************/
                    /*** POUR LES EXTENDS ***/

Extends grandit la class Person, la class initiale.
UNE CLASS EXTEND AVEC RIEN DEDANS , PAS DE CONSTRUCTOR , NI DE SUPER , VA QUAND MEME PERMETTRE DE CREER UNE INSTANCE IDENTIQUE A CELLE DE LA CLASS MAITRAISE . BON YH A AUCUN POINT A FAIRE CA, MAIS CA FONCTIONNE:

class Student extends Person { }
const ben = new Student("ben", 36)  //va utiliser , le this.name et age de Person


/************************************************************************/
LE SUPER :

 LE SUPER EST UN FN PERMET DE DONNER ACCES AU CONSTRUCTEUR DE LA CLASS PARENT, SANS CA, ON A PAS ACCES A SES DEUX VARIABLES. DONNERA UN MESSAGE D ERREUR SI ON LE MET PAS .
 PERMET AUSSI D APPELER LES METHODES DE LA CLASS PARENT A PARTIR D UN CLASS EXTENDS:

 super.nomDeLaMethode()

/******/La bonne maniere :

class Student extends Person {
  constructor(name, age, major) {     // permettra a student de creer un name, age ET major
   super(name, age );                 // appele le constructeur DE LA CLASS PARENT, donne acces a name et age
   this.major = major;                // creer une variable propre a student
  }

  const ben = new Student('ben', 40 ,"Dev")  //Student {name: "ben", age: 40, major: "Dev"}
  console.log(ben.getGreeting())  //Hi. I am ben!

/************************************************************************/
/******/Pour bien comprendre l impact de super :

class Student extends Person {
  constructor(name, age, major) {
   super(name);   // si on amene pas age avec super
   this.major = major;
  }

 new Student('ben', 40 ,"Dev") // Student {name: "ben", age: 0, major: "Dev"}  ca prend la val de default

/************************************************************************/
/******/Si on oublie un arg :

class Student extends Person {
  constructor(name, major) {   //ON NE MET PAS AGE - DONNE UNE ERREUR ReferenceError: age is not defined
   super(name, age);

Donne un MESSAGE D ERREUR //ReferenceError: age is not defined

/************************************************************************/

AUTRE mauvaise idee :

POUR AJOUTER DES TRUCS A STUDENT, et avoir acces au valeur default a la fois aux methodes et this.name et this.age !! SANS POUVOIR LES EDITER AVEC DES ARGS
class Student extends Person {
  constructor(major) {  //on ne peut pas entrer name et age mais ca fonctionne
   super();
   this.major = major;
  }
const ben = new Student("Dev")  //Student {name: "Anonymous", age: 0, major: "Dev"}
console.log(ben.getGreeting())  // Hi. I am Anonymous! (on a pas donner de nom)

/************************************************************************/

AJOUTER UN METHODE SUR UN EXTEND:
CE FAIT DE LA MEME MANIERE QUE D HABITUDE,


class Student extends Person {
  constructor(name, major) {
   super(name, age);
   this.major = major;
  }
hasMajor() {

  return !!this.major;  // EQUIVALENT DE FAIRE IF(this.major) RETURN TRUE OU FALSE

  explication du !!:
                console.log( '' == false) //true
                console.log( !'' == true) //true
                console.log( !!'' == false) //true

                DONC :
                console.log( !!'') //false
                console.log(!!'qquechose') //true
                console.log(ben.hasMajor()) //true
}


IL EST AUSSI POSSIBLE D OVERWRITER UNE METHODE DE LA CLASSE PARENT :
ELLE SUR LA CLASS PARENT :
getDescription() {
  return `${this.name} is ${this.age} year(s) old.`; //ben is 40 year(s) old
}

ET MAINTENANT POUR LA MODIFIER POUR STUDENT POUR Y AJOUTER LA OU LES VARIABLES, (MAJOR):
MEME NOM -

1- ON POURRAIT SIMPLEMENT FAIRE QUELQUE CHOSE DE COMPLETEMENT DIFFERENT AVEC LA METHODE, MAIS ICI ON VA PLUS Y ALLER AVEC L AJOUT , UN AJUSTEMENT POUR ACCEPTER D AUTRE CHOSE.

CE QUI NOUS AMENE SUPER PART II
LA POSSIBILITE D APPELER LA FONCTION GETDESCRIPTION, TELLE QU ELLE EST DANS PERSON EST DE STORER LA REPONSE :

let description = super.getDescription();  //ben is 40 year(s) old.


getDescription() {
  let description = super.getDescription();  //Super pour appeler la fn parent :  ben is 40 year(s) old.

  if (this.hasMajor()) {      //this.major retourne true ou false
    description += ` Their major is ${this.major}.`; //on joint les deux string
  }

  return description; //retourne le string :  ben is 40 year(s) old. Their major is Dev.
}

}

Donc :
console.log(ben.getDescription()) //ben is 40 year(s) old. Their major is Dev.



/************************************************************************/



 EXEMPLE DU CODE COMPLET AVEC NOTES :

//CLASS PARENT
class Person {
  constructor(name = 'Anonymous', age = 0) {  //VALEUR PAR DEFAULT
    this.name = name;
    this.age = age;
  }
  getGreeting() {
    return `Hi. I am ${this.name}!`;
  }
  getDescription() {
    return `${this.name} is ${this.age} year(s) old.`;
  }
}

class Student extends Person {
  constructor(name, age, major) { // DOIT RAMENER NAME ET AGE POUR EDITER , AJOUT D UNE VARAIBLE
    super(name, age);             // POUR ACTIVER LE CONSTRUCTEUR ET AMENE AUSSI LES VAL DE DEFAUT
    this.major = major;       // NOUVELLE VARIABLE
  }
  hasMajor() {
    return !!this.major;   //return true ou false
  }
  getDescription() {
    let description = super.getDescription(); //ben is 40 year(s) old.

    if (this.hasMajor()) {  //return true ou false
      description += ` Their major is ${this.major}.`; //lie les deux strings
    }

    return description;  // retourne la string
  }
}


const ben = new Student('Benoit Last', 36, 'Dev');
console.log(ben.getDescription());

//Benoit Last is 36 year(s) old. Their major is Dev.
/************************************************************************/

///////////////////////////////////////////////////////////////////////////////////////////////
                              ///fin des class ES6/////
///////////////////////////////////////////////////////////////////////////////////////////////
