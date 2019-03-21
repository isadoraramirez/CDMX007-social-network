//var mainApp = {};
let buttonLogOut = document.getElementById('logOut');
let buttonLogOutWeb = document.getElementById('logOutWeb');
const userImage = document.getElementById("userImage");
const userNameP= document.getElementById("userNameP");
const userEmailP= document.getElementById("userEmailP");
//var app_fireBase;

//var firebase = app_fireBase;
var uid = null;
var user = firebase.auth().onAuthStateChanged

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user))
    // User is signed in.
    uid = user.uid;
        userImage.innerHTML = `<img class="circle"src="${user.photoURL}"></img>`
        userNameP.innerHTML = `<p id="userNameP" href="#!"><i class="material-icons">account_circle</i> &nbsp ${user.displayName}</p></li>`
        userEmailP.innerHTML = `<p id="userEmailP" href="#!"><i class="material-icons">email</i> &nbsp ${user.email}</p></li>`
        console.log(userImage)
    
  } else {
    console.log('no hay usuario')
    
    uid = null;
    if(location.pathname === "/src/" || location.pathname === '/src/main.html'){
      window.location.replace("index.html")
      //  console.log('dfjp') 
     }
     if(location.pathname === "/CDMX007-social-network/src/" || location.pathname ==="/CDMX007-social-network/src/main.html"){
      window.location.replace("/CDMX007-social-network/src/index.html")
      }
  }
});

function logOut(){
  console.log('asmd')
  firebase.auth().signOut();
}
//mainApp.logOut = logOut;
buttonLogOut.addEventListener('click',logOut);

//function logOut(){
  //console.log('asmd')
  //firebase.auth().signOut();
//}
//mainApp.logOut = logOut;
//buttonLogOutWeb.addEventListener('click',logOutWeb);

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });

