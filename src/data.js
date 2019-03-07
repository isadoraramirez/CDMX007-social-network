
 
   const docRef = firestore.doc("samples/sandwitchData");
   const outputHeader = document.querySelector("#hotDogOutput");
   const inputTextField= document.querySelector("#latestHotDogStatus");
   const saveButton = document.querySelector("#saveButton");
   const loadButton = document.querySelector("#loadButton")
   saveButton.addEventListener("click",function(){
     const textToSave = inputTextField.value;
     console.log(textToSave);
     docRef.set({
       hotDogStatus: textToSave
     }).then(function(){
       console.log("Status saved!");
     }).catch(function (error) {
       console.log("error:",error);
     });
     })
   

     loadButton.addEventListener("click",function(){
docRef.get()
.then(function (doc){
if (doc && doc.exists){
  const myData = doc.data();
  outputHeader.innerText ="status:" +" "+ myData.hotDogStatus
}
}).catch(function (error){
  console.log("Got an error:",error);
});
     });

     getRealtimeUpdates = function(){
      docRef.onSnapshot({includeMetadataChanges: true},function(doc){ //imprimo en la consola dos veces la metadata creo que podriamos usarla para guardar estatus anteriores
      //  docRef.onSnapshot(function (doc){
         if (doc && doc.exists){
           const myData = doc.data();
           console.log("Check out this document I received",doc);
         outputHeader.innerText = "status: " + myData.hotDogStatus;
         }
       });
     }
     getRealtimeUpdates();