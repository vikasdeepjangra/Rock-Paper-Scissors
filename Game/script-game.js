const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDGe4K_yRdEUfM-z5vSZ7NVpr3AS_kl1Ro",
    authDomain: "stonepaperscissors-dd9c6.firebaseapp.com",
    projectId: "stonepaperscissors-dd9c6",
    storageBucket: "stonepaperscissors-dd9c6.appspot.com",
    messagingSenderId: "575119062385",
    appId: "1:575119062385:web:2b820e195d980f051472d0"
});

const db = firebaseApp.firestore();
var database = firebase.database();
const auth = firebaseApp.auth();

firebase.auth().onAuthStateChanged((user) => {
    
    if (user) {
        //console.log("User Logged In.");
        //console.log(firebase.auth().currentUser);
        document.getElementById("welcomeMsg").innerHTML = firebase.auth().currentUser.displayName+"!";
        document.getElementById("welcomeMsg").style.color = "white";
    } else {
        //console.log("User Logged Out.");
        window.location = "../index.html";
    }

});

function logOut(){
 
    firebase.auth().signOut().then(() => {
        //console.log("Logged Out.");        
    }).catch((error) => {
        //console.log("Error Loggin Out.");
    });
}

// ------------------------------ GAME LOGIC ------------------------------ //

const computerChoiceDisplay = document.getElementById("computer-choice");
const userChoiceDisplay = document.getElementById("user-choice");
const resultHere = document.getElementById("result-here");
const options = document.querySelectorAll(".options");
let userChoice;
let computerChoice;

options.forEach(possibleOption => possibleOption.addEventListener('click', (e) =>{

    userChoice = e.target.id;
    userChoiceDisplay.innerHTML = "&nbsp&nbsp" + userChoice;
    userChoiceDisplay.style.color = "black";
    generateComputerChoice();
    getResult();
}));

function generateComputerChoice(){
    const randomNumber = Math.floor(Math.random() * options.length) + 1;

    if(randomNumber === 1){
        computerChoice = 'Rock'
    }
    if(randomNumber === 2){
        computerChoice = 'Paper'
    }
    if(randomNumber === 3){
        computerChoice = 'Scissors'
    }

    computerChoiceDisplay.innerHTML = "&nbsp&nbsp" + computerChoice;
    computerChoiceDisplay.style.color = "black";
}

function getResult(){

    //DRAW
    if(computerChoice === userChoice){
        resultHere.innerHTML = "&nbsp&nbsp Draw!";
        resultHere.style.color = "black";
    }

    //COMPUTER WIN
    if(computerChoice === "Paper" && userChoice === "Rock"){
        resultHere.innerHTML = "&nbsp&nbsp You Lost.";
        resultHere.style.color = "maroon";
    }
    if(computerChoice === 'Scissors' && userChoice === 'Paper'){
        resultHere.innerHTML = "&nbsp&nbsp You Lost.";
        resultHere.style.color = "maroon";
    }
    if(computerChoice === 'Rock' && userChoice === 'Scissors'){
        resultHere.innerHTML = "&nbsp&nbsp You Lost.";
        resultHere.style.color = "maroon";
    }

    //USER WIN
    if(computerChoice === 'Rock' && userChoice === 'Paper'){
        resultHere.innerHTML = "&nbsp&nbsp You Won.";
        resultHere.style.color = "green";
    }
    if(computerChoice === 'Paper' && userChoice === 'Scissors'){
        resultHere.innerHTML = "&nbsp&nbsp You Won.";
        resultHere.style.color = "green";
    }
    if(computerChoice === 'Scissors' && userChoice === 'Rock'){
        resultHere.innerHTML = "&nbsp&nbsp You Won.";
        resultHere.style.color = "green";
    }

}