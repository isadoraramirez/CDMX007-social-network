//var app_fireBase = {}
var firebase;
 //  Initialize Firebase
 var config = {
    apiKey: "AIzaSyC4TSrYGpQTAYRPxWPUfxoTjlx4TDBjwDw",
    authDomain: "red-social-proyecto.firebaseapp.com",
    databaseURL: "https://red-social-proyecto.firebaseio.com",
    projectId: "red-social-proyecto",
    storageBucket: "red-social-proyecto.appspot.com",
    messagingSenderId: "909899627887"
  };
  firebase.initializeApp(config);
  //app_fireBase = firebase;

  const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);


// comentrio otro 
//uno mas