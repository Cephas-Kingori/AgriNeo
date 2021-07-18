function logout(page){
    firebase.auth().signOut()
    .then(function() {
    // Sign-out 
    window.location.replace(page);
    })
    .catch(function(error) {
        // An error happened
        alert(error.message);
    });
}

