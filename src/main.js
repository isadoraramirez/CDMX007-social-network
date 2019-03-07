var mainApp = {};
let buttonLogOut = document.getElementById('logOut');
const userImage = document.getElementById("userImage")

var app_fireBase;

var firebase = app_fireBase;
var uid = null;
var user = firebase.auth().onAuthStateChanged
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user)
    uid = user.uid;
        userImage.innerHTML = `<img src="${user.photoURL}"></img>`
        console.log(userImage)
    
  } else {
    console.log('no hay usuario')
    
    uid = null;
    if(location.pathname === "/src/" || location.pathname === '/src/index.html'){
      window.location.replace("login.html")
      //  console.log('dfjp') 
     }
     if(location.pathname === "/CDMX007-social-network/src/" || location.pathname ==="/CDMX007-social-network/src/index.html"){
      window.location.replace("/CDMX007-social-network/src/login.html")
      }
  }
});

function logOut(){
  console.log('asmd')
  firebase.auth().signOut();
}
mainApp.logOut = logOut;
buttonLogOut.addEventListener('click',mainApp.logOut);

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });
