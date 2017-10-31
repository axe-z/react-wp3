import * as firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};
// const config = {
//    apiKey: "AIzaSyD0MeRik9qYGX0--jWzN8z3H8pVYWMjmG0",
//    authDomain: "axe-z-budget.firebaseapp.com",
//    databaseURL: "https://axe-z-budget.firebaseio.com",
//    projectId: "axe-z-budget",
//    storageBucket: "axe-z-budget.appspot.com",
//    messagingSenderId: "395234716581"
//  };

  firebase.initializeApp(config);


  const db = firebase.database()

  export { firebase , db as default };







///test de connection:
  // firebase.database().ref().set({
  // db.ref().set({
  //   nom: 'Axe-Z',
  //   age: 40,
  //   ideesPourquoi: ['poche', 'laid', 'gras'],
  //   location: {
  //     ville : 'Mtl',
  //     province: "QC",
  //     adresse:{
  //       num: 5555,
  //       app: "A"
  //     }
  //   }
  // });


// db.ref('age').set(41); // modifie sans obj
//
// db.ref('location/adresse/num').set(5262); //modifie avec path

// db.ref('attributs').set({   //ajoute un obj
//  hauteur: 193,
//  poid: 220
// });

//avec promise
// db.ref('attributs').set({   //ajoute un obj
//  hauteur: 193,
//  poid: 220
// }).then((res) => {
//   console.log('bravo')
// }).catch((e) => {
//   console.log(e)
// });


// db.ref().set({
//   nom: 'Axe-Z',
//   age: 40
// });

// //avec remove
// db.ref('age').remove()
// .then(() => {
//   console.log('bravo')
// }).catch((e) => {
//   console.log(e)
// });
//
// //retirer age a nouveau
// db.ref('age').set(null);


//update est puissant

// db.ref().set({
//   nom: 'Axe-Z',
//   age: 40
// });
//
// db.ref().update({
//   nom: 'BEN',
//   age: null,  //supprime age
//   job: 'dev' //ajout
// });


// db.ref().set({
//   nom: 'Axe-Z',
//   age: 40,
//   location: {
//     ville : 'Mtl',
//     province: "QC",
//   }
// });

// db.ref().update({
//   age: 41,
//   location: {
//     ville : 'Plateau'
//   }
// });

// db.ref().update({
//   age: 41,
//   'location/ville':  'Plateau'
// });



//
// db.ref().set({
//   nom: 'Axe-Z',
//   age: 40,
// });
//
// db.ref()
// .once('value')
// .then((data) => {
//   const val = data.val();
//   console.log(val)
// }).catch((e) => {
//  console.log(e)
// });


// db.ref().set({
//   nom: 'Axe-Z',
//   age: 40,
//   location: {
//     ville : 'Mtl',
//     province: "QC",
//   }
// });

// once
// db.ref('location') //donc que location
// .once('value')
// .then((data) => {
//   const val = data.val();
//    console.log(val)
// }).catch((e) => {
//  console.log(e)
// });


//on
// db.ref()
// .on('value', (snapshot) => {
//    console.log(snapshot.val())
// });


// db.ref().update({
//   age: 41,
//   location: {
//     ville : 'Plateau'
//   }
// });




//
// db.ref().set({
//   nom: 'Axe-Z',
//   age: 40,
//   location: {
//     ville : 'Mtl',
//     province: "QC",
//   }
// });
//
// const onValueUser = db.ref().on('value', (snapshot) => {
//     const val = snapshot.val();
//      console.log(`je suis ${val.nom}, j ai ${val.age} ans`)
// }, (e) => {
//    console.log('erreur avec la database', e)
// });
//
// db.ref().update({
//   age: 41,
//   nom: "Ben"
// });


// const notes = [{
//   id: '12',
//   nom: 'ben',
//   age: 40
// },
// {
//   id: '13',
//   nom: 'benoit',
//   age: 44
// },
// {
//   id: '14',
//   nom: 'axe-z',
//   age: 2
// }];

// const firebaseNotes = {
//   notes: {
//     '12':{
//       nom: 'ben',
//       age: 40
//     },
//     '13':{
//       nom: 'benoit',
//       age: 44
//     },
//     '14':{
//       nom: 'axe-z',
//       age: 2
//     }
//   }
// }


// db.ref('expenses').push({
//   note: 'notes 3 ',
//   amount: 125.50,
//   description: 'c est cher en crisse',
//   createdAt: Date.now()
// });


// db.ref('expenses')
// .once('value')
// .then((snapshot) => {
//     console.log(snapshot.val())
// }).catch((e) => {
//   console.log(e)
// });

//
// db.ref("expenses").once("value")
//   .then(function(snapshot) {
//     const expenses = [];
//     snapshot.forEach(function(childSnapshot) {
//       var id = childSnapshot.key;
//       var childData = childSnapshot.val();
//       expenses.push({id,  ...childData });
//   });
//    console.log(expenses)
//   return expenses
// });

//plus rapide :
// db.ref("expenses").once("value")
//   .then(function(snapshot) {
//     const expenses = []; //creer l array
//     snapshot.forEach(function(childSnapshot) {  //passe sur tous les key
//       expenses.push({ id : childSnapshot.key, ...childSnapshot.val()});
//   });
//    console.log(expenses) // (3) [{…}, {…}, {…}]
//   return expenses
// });



// db.ref('expenses').on('value', snapshot => {
//   const expenses = []; //creer l array
//   snapshot.forEach(childSnapshot => {
//     expenses.push({ id: childSnapshot.key, ...childSnapshot.val() }); //on spread
//   });
//   console.log(expenses);
// });
//
//
//
// db.ref('expenses').on('child_removed', (snapshot) => {
//    console.log(snapshot.key, snapshot.val()) //retourne dans cette forme lui enlevé
// });
//
//
//
// db.ref('expenses').on('child_changed', (snapshot) => {
//    console.log(snapshot.key, snapshot.val()) //retourne dans cette forme lui modifié
// });
//
//
// db.ref('expenses').on('child_added', (snapshot) => {
//    console.log(snapshot.key, snapshot.val()) //retourne dans cette forme lui modifié
// });
