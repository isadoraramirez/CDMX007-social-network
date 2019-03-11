const postStatus = document.getElementById("post-status");
const postButton = document.getElementById("post-button");
const printPost = document.getElementById("print-post");
var db = firebase.firestore();
const docRef =firestore.collection("wallPost").doc("post");

postButton.addEventListener("click", ()=>{
    const textToPost = postStatus.value;
    console.log("guardando esto "+ textToPost + " en FireStore")
    
    docRef.set({
        status: textToPost
    }).then(()=>{
        console.log("gusrdando estado");
    }).catch((error)=>{
        console.log("Hay un error:", error);
        
    })
    docRef.get().then((doc)=>{

        if (doc && doc.exists){
            const postData = doc.data();
            printPost.value = postData.status;
        }
    }).then(()=>{
        console.log("guardando impresion");
    
    }).catch((error)=>{
        console.log("Hay un error en print:", error)
    });
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