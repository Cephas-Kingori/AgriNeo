  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAycvCsKb5nFuuatKIpXbi2Vk3DklS93-0",
    authDomain: "mkoolima-782e6.firebaseapp.com",
    databaseURL: "https://mkoolima-782e6-default-rtdb.firebaseio.com",
    projectId: "mkoolima-782e6",
    storageBucket: "mkoolima-782e6.appspot.com",
    messagingSenderId: "1028380163016",
    appId: "1:1028380163016:web:06b7f2e1acc2e8fd165efd",
    measurementId: "G-6KT3WN11FC"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$(document).ready(function(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        console.log("logged in");
    
        const mkoolima_user = firebase.auth().currentUser;
        //what will displayed on the header
        var jina = mkoolima_user.displayName;
        
        var photo = mkoolima_user.photoURL;
    
        if (jina === null){
        //if no dispaly name, we use the email address
        jina = mkoolima_user.email;
        }
        $('#user_profile').html(jina);
        if (photo != null){
            //use the google photo
            $("#avatar").attr("hidden", true);
            $("#user_photo").attr("hidden", false);
            $("#user_photo").attr("src", photo);
        }
    } else {
        console.log("Not logged in");
        window.location.replace("login.html");
    }
    });
});
