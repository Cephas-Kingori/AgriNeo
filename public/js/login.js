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

      //form validation
  
      $('document').ready(function(){
    
        $("#loginForm").validate({
          //rules
          debug: false,
          rules :
          {
            email:{
              required: true,
              email: true
            },
            password:{
                required: true,
                minlength: 8,
                maxlength: 20
            }
          },
          messages:{
            //for custom messages
            email: {
              required: "Email is required",
              email: "Please enter a valid email address"
            },
            password: {
              required: "Password is required",
              minlength: "password at least 8 characters",
              maxlength:"Too long!",
            },
          }
        });

        $('#resetForm').validate({
          debug: false,
          rules: {
            resetEmail: {
              required: true,
              email: true,
            }
          },
          messages: {
            resetEmail: {
              required: "Email is required",
              email: "Please enter a valid email address"
            }
          },
        });
      });

  //listen for submit click action
  document.getElementById("loginForm").addEventListener('submit', function(e){
              e.preventDefault();

              //if the form is valid
              $("#loginForm").submit(function () {
                if ($(this).valid()) {  
                  console.log("valid");
                    //capture user input
              var email = document.getElementById("email").value;
              var password = document.getElementById("password").value;

              //firebase to verify and login user 

              //signInWithEmailAndPassword

              firebase.auth().signInWithEmailAndPassword(email,password).then(
                    function(response){
                      //alert("account verified ");
                      swal({
                        title: "Authenticated!",
                        text: "You account has been verified",
                        icon: "success",
                      });
                      redirect_after("../index.html", 6000);
                      
                    }

                ).catch(function(error){
                      var errorCode = error.code;
                      if (errorCode == "auth/wrong-password") {
                         //alert("wrong password entry");
                         swal({
                            title: "Error!",
                            text: "You have entered a wrong password",
                            icon: "error",
                          });
                          
                         reload_after(6000);
                      } else {
                        //alert(error);
                        swal({
                            title: "Error",
                            text: error.message + " Check your email for a verification link or click Sign Up if you have not registered.",
                            icon: "error",
                          });
                      }
                      reload_after(6000);
                });

                }
              });

  });

//reset password

document.getElementById("resetPass").addEventListener('submit', function(e){
  e.preventDefault();

  //capture user reset email 
  var resetEmail = document.getElementById("emailReset").value;

  //firebase code to reset email : sendPasswordResetEmail
  firebase.auth().sendPasswordResetEmail(resetEmail).then(function(response){
       console.log(response);
       swal({
        title: "password Reset",
        text: "password reset link sent to your email",
        icon: "success",
      });
  }).catch(function(error){
       console.log(error);
       swal({
        title: "Error",
        text: error.message,
        icon: "error",
      });
  });
});


//reset password via firebase 
//listen for form event 
document.getElementById("resetForm").addEventListener('submit', function(e){
     e.preventDefault();
    
     $("#resetForm").submit(function () {
      if ($(this).valid()) {  
          console.log("valid");

          //capture user email 
          var resetEmail = document.getElementById("resetEmail").value;

          //use firebase method sendPasswordResetEmail to send a reset link
          firebase.auth().sendPasswordResetEmail(resetEmail).then(
            function(response){
                console.log(response);
                swal({
                  title: "password Reset",
                  text: "password reset link sent to your email",
                  icon: "success",
                });
            }).catch(function(error){
              console.log(error);
              swal({
                title: "Error",
                text: error.message,
                icon: "error",
              });
            });
      }
    });
});


//google sign in
function googleLogin(){
    //intializing google sign up 
    var base_provider = new firebase.auth.GoogleAuthProvider();

    //signin using the google firebase method signInWithPopUP from firebase 
    firebase.auth().signInWithPopup(base_provider).then(function(response){
             console.log(response);
             swal({
              title: "Login Successfull",
              text: "Authenticated via google account",
              icon: "success",
            });
             //redirect screen
             redirect_after("../index.html", 5000);


    }).catch(function(error){
         var error_code = error.code;
         var error_message = error.message;
         console.log("error code: "+error_code);
         console.log("error message: "+error_message);
         console.log(error);
         swal({
          title: "Error Signing in with google",
          text: error_message,
          icon: "error",
        });
         reload_after(5000);
    })
}



function reload_after(ms) {
  setTimeout(function () {
      if (ms > 0) {
        location.reload();
      }
  }, ms);
}

function redirect_after(page, ms) {
  setTimeout(function () {
      if (ms > 0) {
        window.location.replace(page);
      }
  }, ms);
}