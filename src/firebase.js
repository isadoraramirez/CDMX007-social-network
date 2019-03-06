var config = {
    apiKey: "AIzaSyC4TSrYGpQTAYRPxWPUfxoTjlx4TDBjwDw",
    authDomain: "red-social-proyecto.firebaseapp.com",
    databaseURL: "https://red-social-proyecto.firebaseio.com",
    projectId: "red-social-proyecto",
    storageBucket: "red-social-proyecto.appspot.com",
    messagingSenderId: "909899627887"
  };
  firebase.initializeApp(config);
  app_fireBase = firebase;

  const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);


 
   const docRef = firestore.doc("samples/sandwitchData");
   const outputHeader = document.querySelector("#hotDogOutput");
   const inputTextField= document.querySelector("#latestHotDogStatus");
   const saveButton = document.querySelector("#saveButton");

   saveButton.addEventListener("click",function(){
     const textToSave = inputTextField.value;
     console.log(textToSave);
     docRef.set({
       hotDogStatus: textToSave
     }).then(function(){
       console.log("Status saved!");
     }).catch(function (error) {
       consile.log("error:",error);
     });
     })
   