// CONSTANTES

const postStatus       = document.getElementById("post-status");
const postButton       = document.getElementById("post-button");
const printPost        = document.getElementById("print-post");
const deletePost       = document.getElementById("delete-post");
const editPost         = document.getElementById("edit-post");

const db               = firebase.firestore();

// INICIALIZADOR
//const onloadWall = () => {
  const bd = firebase.firestore();
  const postPublications = bd.collection('/wallPost') .orderBy('created_at', "desc");
  const muro = document.getElementById("wall")
  postPublications.onSnapshot(querySnapshot => {
    querySnapshot.forEach(doc => {
      // console.log(doc.id, '=>', doc.data());
      if (user.uid === doc.data().uid) {
       if (doc.data().photo === null) {
        muro.innerHTML += `      
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
    <button onclick="editPost()" id="edit-post">Editar</button>
     <button onclick="deletePost() "id="delete-post">Borrar</button>
  </div>`
      }
      

      }else{
        if (doc.data().photo === null) {
            muro.innerHTML += `      
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
        muro.innerHTML += `      
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
    muro.innerHTML = ''
  });
//}

// EVENTOS - Listeners
postButton.addEventListener("click", () => {
  const muro = document.getElementById("wall")
  muro.innerHTML = ''
  let textToPost = postStatus.value;
  
  firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      await db.collection("wallPost")
        .add({
          name: user.displayName,
          email: user.email,
          post: textToPost,
          photo: user.photoURL,
          uid: user.uid,
          created_at: firebase.firestore.Timestamp.fromDate(new Date())
        })

      const bd = await firebase.firestore();

      const postPublications = await bd.collection('/wallPost')
      .orderBy('created_at', "desc")
      
      postPublications.onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          // console.log(doc.id, '=>', doc.data());
          if (user.uid === doc.data().uid) {
           if (doc.data().photo === null) {
            muro.innerHTML += `      
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
        <button onclick="editPost()" id="edit-post">Editar</button>
         <button onclick="deletePost() "id="delete-post">Borrar</button>
      </div>`
          }
          

          }else{
            if (doc.data().photo === null) {
                muro.innerHTML += `      
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

          }
        });
      });
    } else {
      console.log("No hay usuario loggeado")
    }
  });
    postStatus.value = '';  
});
