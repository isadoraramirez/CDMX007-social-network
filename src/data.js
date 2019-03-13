const postStatus = document.getElementById("post-status");
const postButton = document.getElementById("post-button");
const printPost = document.getElementById("print-post");
var db = firebase.firestore();
const docRef = firestore.collection("wallPost").doc("post");
// const textToPost = postStatus.value;

function onloadWall() {

  const bd = firebase.firestore();
  const publicaciones = bd.collection('/wallPost').orderBy('name');
  publicaciones.get().then(snapshot => {
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      document.getElementById("wall").innerHTML += `
                
            <div class="col s12 m7">
              <h4 class="header">${doc.data().name}</h4>
                <div class="card horizontal">
                  <div class="card-image">
                    <img class="circle"src="${doc.data().photo}">
                  </div>
                <div class="card-stacked">
                  <div class="card-content">
                    <p>${doc.data().post}</p>
                  </div>
                </div>
              </div>
            </div>`
    });
  });

}
console.log(new Date())

postButton.addEventListener("click", () => {
  const muro = document.getElementById("wall")
  muro.innerHTML = ''
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
  firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      console.log(user.email);

      await db.collection("wallPost")
        .add({
          name: user.displayName,
          email: user.email,
          post: textToPost,
          photo: user.photoURL,
          //date: new Date,
        })

      const bd = await firebase.firestore();

      const publicaciones = await bd.collection('/wallPost').orderBy('name');
      publicaciones.get().then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          muro.innerHTML += `
                
            <div class="col s12 m7">
              <h4 class="header">${doc.data().name}</h4>
                <div class="card horizontal">
                  <div class="card-image">
                    <img class="circle"src="${doc.data().photo}">
                  </div>
                <div class="card-stacked">
                  <div class="card-content">
                    <p>${doc.data().post}</p>
                  </div>
                </div>
              </div>
            </div>`
        });;
      });





    } else {
      console.log("No hay usuario loggeado")
    }
  });
});

/*realTimeUpdates = () =>{
docRef.onSnapshot(doc => {
  if (doc && doc.exists) {
    const postData = doc.data();
    printPost.value = postData.status;
  }
})
}

realTimeUpdates();*/
