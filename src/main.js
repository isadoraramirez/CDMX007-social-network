var mainApp = {};
let buttonLogOut = document.getElementById('logOut');

var app_fireBase;

var firebase = app_fireBase;
var uid = null;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    uid = user.uid;
  } else {
    uid = null;
    console.log('no hay usuario')
      if(location.pathname !== "/src/login.html"){
      window.location.replace("login.html")

      }
  }
});

function logOut(){
  firebase.auth().signOut();
}
mainApp.logOut = logOut;
buttonLogOut.addEventListener('click',mainApp.logOut);

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });
