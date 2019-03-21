/// CONSTANTES

const postStatus = document.getElementById("post-status");
const postButton = document.getElementById("post-button");
const printPost = document.getElementById("print-post");
// const deletePost = document.getElementById("delete-post");
// const editPost = document.getElementById("edit-post");
const userLS = JSON.parse(localStorage.getItem('user'))
const db = firebase.firestore();

// INICIALIZADOR
//const onloadWall = () => {
const bd = firebase.firestore();
const postPublications = bd.collection('/wallPost').orderBy('created_at', "desc");
const muro = document.getElementById("wall")
postPublications.onSnapshot(querySnapshot => {
  let str = '';
  querySnapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data().name);
    if (userLS.uid === doc.data().uid) {
      if (doc.data().photo === null) {
        str += `      
          <div class="col s12 m7">
          <h4 class="header name-title">${doc.data().name.toUpperCase()}</h4>
          <div class="card horizontal z-depth-3">
          <div class="c-i">
          <img class="user-photo"src="../imágenes/computer.png">
          </div>
          <div class="card-stacked">
          <div class="post">
          <p class="p-post">${doc.data().post}</p>
          </div>
          </div>
          </div>
          <button onclick="editPost('${doc.id}')" class="edit-post">Editar</button>
          <button onclick="deletePost('${doc.id}')" class="delete-post">Borrar</button>
          </div>`
      } else {
        str += `      
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
    <button onclick="editPost('${doc.id}'))" class="edit-post">Editar</button>
    <button onclick="deletePost('${doc.id}'))" class="delete-post">Borrar</button>
    </div>`
      }
    } else {
      if (doc.data().photo === null) {
        str += `      
          <div class="col s12 m7">
          <h4 class="header name-title">${doc.data().name.toUpperCase()}</h4>
            <div class="card horizontal z-depth-3">
              <div class="c-i">
               <img class="user-photo"src="../imágenes/computer.png">
              </div>
            <div class="card-stacked">
              <div class="post">
                <p class="p-post">${doc.data().post}</p>
              </div>
            </div>
          </div>
        </div>`
      } else {
        str += `      
        <div class="col s12 m7">
        <h4 class="header name-title">${doc.data().name}</h4>
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
    }
  });
  muro.innerHTML = str
  // console.log(str)
});
//}

// EVENTOS - Listeners
postButton.addEventListener("click", () => {
  let str = ''
  const muro = document.getElementById("wall")
  // muro.innerHTML = ''
  let textToPost = postStatus.value;

  firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      console.log(user)
      await db.collection("wallPost")
        .add({
          name: user.displayName,
          email: user.email,
          post: textToPost,
          photo: user.photoURL,
          uid: user.uid,
          created_at: firebase.firestore.Timestamp.fromDate(new Date())
        })

      // console.log(user)
      const bd = await firebase.firestore();
      const postPublications = await bd.collection('/wallPost')
        .orderBy('created_at', "desc")
      postPublications.onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          // console.log(doc.id, '=>', doc.data());
          if (user.uid === doc.data().uid) {
            if (doc.data().photo === null) {
              str += `      
            <div class="col s12 m7">
            <h4 class="header name-title">${doc.data().name.toUpperCase()}</h4>
            <div class="card horizontal z-depth-3">
              <div class="c-i">
               <img class="user-photo"src="../imágenes/computer.png">
              </div>
            <div class="card-stacked">
              <div class="post">
                <p class="p-post">${doc.data().post}</p>
              </div>
            </div>
          </div>
         <button onclick="editPost('${doc.id}')" class="edit-post">Editar</button>
         <button onclick="deletePost('${doc.id}')" class="delete-post">Borrar</button>
        </div>`
            } else {
              str += `      
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
        <button onclick="editPost('${doc.id}')" class="edit-post">Editar</button>
         <button onclick="deletePost('${doc.id}')" class="delete-post">Borrar</button>
      </div>`
            }
          } else {
            if (doc.data().photo === null) {
              str += `      
              <div class="col s12 m7">
              <h4 class="header name-title">${doc.data().name.toUpperCase()}</h4>
                <div class="card horizontal z-depth-3">
                  <div class="c-i">
                   <img class="user-photo"src="../imágenes/computer.png">
                  </div>
                <div class="card-stacked">
                  <div class="post">
                    <p class="p-post">${doc.data().post}</p>
                  </div>
                </div>
              </div>
            </div>`
            } else {
              str += `      
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

          }
        });
      });
    } else {
      console.log("No hay usuario loggeado")
    }
  });
  postStatus.value = '';
  muro.innerHTML = str
});

function deletePost(id){
db.collection("/wallPost").doc(id).delete().then(function() {
  console.log("Document successfully deleted!");
}).catch(function(error) {
  console.error("Error removing document: ", error);
});
}