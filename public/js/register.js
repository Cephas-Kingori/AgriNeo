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
    
        $("#signup").validate({
          //rules
          debug: false,
          rules :
          {
            email:{
              required: true,
              email: true
            },
            phone:{
              required: false,
              minlength: 10,
              maxlength: 10,
            },
            password:{
                required: true,
                minlength: 8,
                maxlength: 20
            },
            password2:{
                required: true,
                equalTo: '#password'
            }
          },
          messages:{
            //for custom messages
            email: {
              required: "Email is required",
              email: "Please enter a valid email address"
            },
            phone:{
              minlength: "The phone number is a 10 digit number",
              maxlength: "Enter the phone number in the format shown",
            },
            password: {
              required: "Password is required",
              minlength: "password at least 8 characters",
              maxlength:"Too long!",
            },
            password2: {
                required: "please retype your password",
                equalTo: "Your password doesn't match the one above!"},

          }
        });

      });


  //listen to submit event 
  document.getElementById("signup").addEventListener('submit',function(e){
    e.preventDefault();
    // continue to firebase after the form is validated
    $("#signup").submit(function () {

      // if form was valid ..................
      if ($(this).valid()) {  
            //prevent double submissions
            if($(this).data === "sumitted"){
              e.preventDefault();
          }else{
              $(this).data = "submitted";
          }          
          //pick the users input
          var email = document.getElementById("email").value;
          var phone = document.getElementById("phone").value;
          var password = document.getElementById("password").value;


          //firebase to create account based on email / password 
          //createUserWithEmailAndPassword
          firebase.auth().createUserWithEmailAndPassword(email,password).then(
            function(response){
              console.log(response);
              //alert("account created ");
              swal({
                title: "Account Created!",
                text: "Your account at mkoolima has been created. Check your email shortly.",
                icon: "success",
              });
       
            }
          ).then(function(){
            //send email
            sendVerificationEmail();
          })
          .then(
            //take user details to real time db 
            function(){
              firebase.database().ref("user_information/").push({
                email: email,
                phone: phone,
              }).then(
                function(response){
                  swal({
                    title: "Details Saved!",
                    text: "Redirecting you to the login page. Check email to verify your email address.",
                    icon: "success",
                  });
                  //transition to login
                    redirect_after("login.html", 5000);
                }

                ).catch(function(error){
                    alert("something went wrong " + error);
                });
            }
          )
          .catch(
            function(error){
              //alert("something went wrong " + error);
              //console.log(error);
              swal({
                title: "Error",
                text: error.message,
                icon: "error",
              });
              reload_after(6000);
            }
          );
      }
    });
 });

 //Function called right after the signUpWithEmailAndPassword to send verification emails
function sendVerificationEmail() {
   //Built in firebase function responsible for sending the verification email
   firebase.auth().currentUser.sendEmailVerification()
   .then(() => {
       console.log('Verification Email Sent Successfully !');
       //redirecting the user to the profile page once everything is done correctly
       // window.location.assign('../profile');
   })
   .catch(error => {
       console.error(error);
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