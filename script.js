const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDGe4K_yRdEUfM-z5vSZ7NVpr3AS_kl1Ro",
    authDomain: "stonepaperscissors-dd9c6.firebaseapp.com",
    projectId: "stonepaperscissors-dd9c6",
    storageBucket: "stonepaperscissors-dd9c6.appspot.com",
    messagingSenderId: "575119062385",
    appId: "1:575119062385:web:2b820e195d980f051472d0"
});

const auth = firebaseApp.auth();

function showSignup(){
    $("#login-form").hide('normal');
    $("#signUp-form").addClass("visible");
}

function showLogin(){
    $("#signUp-form").removeClass("visible");
    $("#login-form").show('normal');
}

function signUpFunction(){

    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(result) {
        return result.user.updateProfile({
          displayName: document.getElementById("userNAME").value
        })
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode, errorMessage);
    });

}

function logInFunction(){

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        var user = userCredential.user;
        //alert("User Logged in Successfully!");
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorCode == "auth/user-not-found"){
            alert("User not found. Try Signing Up.");
        }
        if(errorCode == "auth/wrong-password"){
            alert("Incorrect Password.");
        }
    });
}

firebase.auth().onAuthStateChanged((user) => {
    
    if (user) {
        //console.log("User Logged In.");
        window.location = "/Rock-Paper-Scissors/Game/index-game.html";
    } else {
        //console.log("User Logged Out.");
    }

});
