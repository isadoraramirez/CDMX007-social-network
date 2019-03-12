const postStatus = document.getElementById("post-status");
const postButton = document.getElementById("post-button");
const printPost = document.getElementById("print-post");
var db = firebase.firestore();
const docRef = firestore.collection("wallPost").doc("post");
// const textToPost = postStatus.value;
postButton.addEventListener("click", () => {
  let textToPost = postStatus.value;

  textToPost;
  console.log("guardando esto " + textToPost + " en FireStore");

  docRef
    .set({
      status: textToPost
    })
    .then(() => {
      console.log("gusrdando estado");
    })
    .catch(error => {
      console.log("Hay un error:", error);
    });
  docRef
    .get()
    .then(doc => {
      if (doc && doc.exists) {
        const postData = doc.data();
        printPost.value = postData.status;
      }
    })
    .then(() => {
      console.log("guardando impresion");
    })
    .catch(error => {
    //   console.log("Hay un error en print:", error);
    });

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().onAuthStateChanged( async function(user) {
        if (user) {
          console.log(user.email);

          await db.collection("wallPost")
          .add({
            name: user.displayName,
            edad: 32,
            otro: "otro",
            email: user.email,
            post: textToPost
          })

        const bd = await firebase.firestore();
        
        const publicaciones = await bd.collection('/wallPost').orderBy('name');
        publicaciones.get().then(snapshot => {
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                document.getElementById("wall").innerHTML += `
                    <div class="single-post">
                        <h1>${doc.data().email}</h1>
                        <p>${doc.data().post}</p>
                    </div>
                    <br>
                ` 
            });;
        });

        

          
      
        } else {
          console.log("No hay usuario loggeado")
        }
      });
});






