const postStatus = document.getElementById("post-status");
const postButton = document.getElementById("post-button");
const printPost = document.getElementById("print-post");
var db = firebase.firestore();
const docRef = firestore.collection("wallPost").doc("post");
// const textToPost = postStatus.value;
const deletePost = document.getElementById("delete-post");
const editPost = document.getElementById("edit-post");

function onloadWall() {

  const bd = firebase.firestore();
  const publicaciones = bd.collection('/wallPost').orderBy('name');
  publicaciones.get().then(snapshot => {
    snapshot.forEach(doc => {
      // console.log(doc.id, '=>', doc.data());
      if (user.id === doc.data().uid) {
        document.getElementById("wall").innerHTML += `     
            <div class="col s12 m7">
              <h4 class="header name-title">${doc.data().name.toUpperCase()}</h4>
                <div class="card horizontal z-depth-3">
                  <div class="c-i">
                    <img class="user-photo"src="${doc.data().photo}">
                  </div>
                <div class="card-stacked">
                  <div class="post">
                    <p class="p-post">${doc.data().post}</p>
                  </div>
                </div>
              </div>
            </div>`
          } else {
            `<div class="col s12 m7">
          <h4 class="header name-title">${doc.data().name.toUpperCase()}</h4>
            <div class="card horizontal z-depth-3">
              <div class="c-i">
                <img class="user-photo"src="${doc.data().photo}">
              </div>
            <div class="card-stacked">
              <div class="post">
                <p class="p-post">${doc.data().post}</p>
              </div>
            </div>
          </div>
          <button onclick="editPost()" id="edit-post">Editar</button>
          <button onclick="deletePost() "id="delete-post">Borrar</button>
        </div>`
          }
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
      console.log(user);

      await db.collection("wallPost")
        .add({
          name: user.displayName,
          email: user.email,
          post: textToPost,
          photo: user.photoURL,
          uid: user.uid
          //date: new Date,
        })

      const bd = await firebase.firestore();

      const postPublications = await bd.collection('/wallPost').orderBy('name');
      postPublications.get().then(snapshot => {
        snapshot.forEach(doc => {
          // console.log(doc.id, '=>', doc.data());
          if (user.uid === doc.data().uid) {
            muro.innerHTML += `      
          <div class="col s12 m7">
          <h4 class="header name-title">${doc.data().name.toUpperCase()}</h4>
            <div class="card horizontal z-depth-3">
              <div class="c-i">
                <img class="user-photo"src="${doc.data().photo}">
              </div>
            <div class="card-stacked">
              <div class="post">
                <p class="p-post">${doc.data().post}</p>
              </div>
            </div>
          </div>
         <button onclick="editPost()" id="edit-post">Editar</button>
         <button onclick="deletePost() "id="delete-post">Borrar</button>
        </div>`
          } else {
        muro.innerHTML += `      
        <div class="col s12 m7">
        <h4 class="header name-title">${doc.data().name.toUpperCase()}</h4>
          <div class="card horizontal z-depth-3">
            <div class="c-i">
              <img class="user-photo"src="${doc.data().photo}">
            </div>
          <div class="card-stacked">
            <div class="post">
              <p class="p-post">${doc.data().post}</p>
            </div>
          </div>
        </div>
      </div>`
          }
        });
      });

    } else {
      console.log("No hay usuario loggeado")
    }
  });
    postStatus.value = '';  
});

// deletePost.addEventListener("edit()", ()=>{
//   if (firebase.auth().getCurrentUser() == ){}
// })


// realTimeUpdates = () =>{
//   docRef.onSnapshot(doc => {
//     if (doc && doc.exists) {
//       const postData = doc.data();
//       printPost.value = postData.status;
//     }
//   })
//   }

//   realTimeUpdates();
