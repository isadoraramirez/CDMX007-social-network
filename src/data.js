
 
   const docRef = firestore.doc("samples/userData");
   const outputHeader = document.querySelector("#status");
   const inputTextField= document.querySelector("#latestStatus");
   const saveButton = document.querySelector("#saveButton");
  //  const loadButton = document.querySelector("#loadButton")
   saveButton.addEventListener("click",function(){
     const textToSave = inputTextField.value;
     //console.log(textToSave);
     docRef.set({
       userStatus: textToSave
     }).then(function(){
       //console.log("Status saved!");
     }).catch(function (error) {
       //console.log("error:",error);
     });
     })
   

     saveButton.addEventListener("click",function(){
docRef.get()
.then(function (doc){
if (doc && doc.exists){
  const myData = doc.data();
  outputHeader.innerText = myData.userStatus
}
}).catch(function (error){
  console.log("Got an error:",error);
});
     });

     getRealtimeUpdates = function(){
      //docRef.onSnapshot({includeMetadataChanges: true},function(doc){ //imprimo en la consola dos veces la metadata creo que podriamos usarla para guardar estatus anteriores
       docRef.onSnapshot(function (doc){
         if (doc && doc.exists){
           const myData = doc.data();
           console.log("recibido",doc);
         outputHeader.innerText = myData.userStatus;
         }
       });
     }
     getRealtimeUpdates();

    //intento 
    let post = firebase.database().docRef('posts/' + postId + '/userStatus');
    post.on('value', function(snapshot) {
      updateStarCount(postElement, snapshot.val());
      console.log(userStatus);
    });


  //   ref.set("hello")
  // .then(function() {
  //   return ref.once("value");
  // })
  // .then(function(snapshot) {
  //   var data = snapshot.val(); // data === "hello"
  // });


    // function writeNewPost(uid, username, picture, title, body) {
    //  ---- A post entry.
    //   var postData = {
    //     author: username,
    //     uid: uid,
    //     body: body,
    //     title: title,
    //     starCount: 0,
    //     authorPic: picture
    //   };
    
    //   // Get a key for a new Post.
    //   var newPostKey = firebase.database().ref().child('userStatus').push().key;
    
    //   // Write the new post's data simultaneously in the posts list and the user's post list.
    //   var updates = {};
    //   updates['/userStatus/' + newPostKey] = postData;
    //   updates['/user-userStatus/' + uid + '/' + newPostKey] = postData;
    
    //   return firebase.database().ref().update(updates);
    // }