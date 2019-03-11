/*const postStatus = document.getElementById("post-status");
const postButton = document.getElementById("post-button");
const printPost = document.getElementById("print-post");
var db = firebase.firestore();
const docRef =firestore.doc("wallPost/posts");

postButton.addEventListener("click", ()=>{
    const textToPost = postStatus.value;
    console.log("guardando esto"+ textToPost + "en FireStore")
    docRef.set({
        printPost: postStatus
    }).then(()=>{
        console.log("gusrdando estado");
    }) .catch((error)=>{
        console.log("Hay un error:", error);
        
    })
})




/*db.collection("users").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});*/