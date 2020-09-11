// array to store the family of matched cards
var matchedCards = [];
// variable to hold the timeout function for the counter
var counterShow;
// variable to hold the element that displays the countdown time
var counter = document.getElementById("counter");
//variable to hold the starting value of countdown timer
var start = 59;
// status of the game
var wonGame = false;

//first card (the card that is going to be clicked first) properties
var firstCard = {
  family: null,
  generation: null
};

//second card (the card that is going to be clicked second) properties
var secondCard = {
  family: null,
  generation: null
};

// function on reload/refresh
function onReload() {
  initialState();
}

// initial state as the page loads with an intro modal
function initialState() {
  document.getElementById("game-container").style.display = "none";
  document.getElementById("you-lost").style.display = "none";
  document.getElementById("you-won").style.display = "none";
}

// this function starts the game on pressing the 'Start game' button on the intro modal
function startGame() {
  startTimeOut();
  document.getElementById("you-lost").style.display = "none";
  document.getElementById("you-won").style.display = "none";
  document.getElementById("modal-container").style.display = "none";
  document.getElementById("game-container").style.display = "flex";
  setTimeout(() => {
    clearTimeOutCounter();
    if (!wonGame) {
      handleSingleTurnedCard();
      document.getElementById("game-container").style.display = "none";
      document.getElementById("you-lost").style.display = "flex";
    }
  }, 61000);
}

// function to display countdown timer while playing game
function startTimeOut() {
  counterShow = setTimeout(() => {
    if (start < 10) {
      counter.innerHTML = "0" + "0:" + "0" + String(start);
    } else {
      counter.innerHTML = "0" + "0:" + String(start);
    }
    start--;
    startTimeOut();
  }, 1000);
}

// function to stop the countdown timer if won/lost the game
function clearTimeOutCounter() {
  clearTimeout(counterShow);
  start = 59;
  counter.innerHTML = "0" + "1" + ":" + "0" + "0";
}

// this function gets called on clicking the cards in the game
function getElement(id) {
  // split the id name into family and generation
  var split = id.split("-");
  // if the same card is clicked, ignore
  if (split[0] === firstCard.family && split[1] === firstCard.generation) {
    return;
  }
  // if the cards were matched earlier, ignore
  if (matchedCards.includes(split[0])) {
    return;
  }
  // store the family and generation names in separate variables
  var familyName = split[0];
  var generationName = split[1];
  // if the family and generation of first card is null, set these properties
  if (firstCard.family === null) {
    firstCard.family = familyName;
    firstCard.generation = generationName;
    var firstID = firstCard.family + "-" + firstCard.generation;
    document.getElementById(firstID).style.transform = "rotateY(180deg)";
  } else {
    secondCard.family = familyName;
    secondCard.generation = generationName;
    var secondID = secondCard.family + "-" + secondCard.generation;
    document.getElementById(secondID).style.transform = "rotateY(180deg)";
    // set an interval of half a second in order to display if the two cards are matching
    setTimeout(() => {
      //if the two cards are not matching re-rotate the cards
      if (firstCard.family !== secondCard.family) {
        document.getElementById(
          firstCard.family + "-" + firstCard.generation
        ).style.transform = "rotateY(0deg)";
        document.getElementById(
          secondCard.family + "-" + secondCard.generation
        ).style.transform = "rotateY(0deg)";
        firstCard.family = null;
        firstCard.generation = null;
        secondCard.family = null;
        secondCard.generation = null;
        return;
      }
      //if the cards are matching add the card family name to 'matchedCards' array and set the cursor to not allowed
      matchedCards.push(familyName);
      // if you win the game
      if (matchedCards.length === 10) {
        clearMatchedCards();
        showWinGameModal();
      }
      document.getElementById(
        firstCard.family + "-" + firstCard.generation
      ).style.cursor = "not-allowed";
      document.getElementById(
        secondCard.family + "-" + secondCard.generation
      ).style.cursor = "not-allowed";
      firstCard.family = null;
      firstCard.generation = null;
      secondCard.family = null;
      secondCard.generation = null;
    }, 400);
  }
}

// function to clear all the cards from 'matchedCards' array on win/loss
function clearMatchedCards() {
  for (let i = 0; i < matchedCards.length; i++) {
    document.getElementById(matchedCards[i] + "-" + "first").style.transform =
      "rotateY(0deg)";
    document.getElementById(matchedCards[i] + "-" + "second").style.transform =
      "rotateY(0deg)";
    document.getElementById(matchedCards[i] + "-" + "first").style.cursor =
      "pointer";
    document.getElementById(matchedCards[i] + "-" + "second").style.cursor =
      "pointer";
  }
  matchedCards = [];
}

// function go to intro modal
function goHome() {
  location.reload();
}

// function to retry or play the game again
function retry() {
  wonGame = false;
  clearMatchedCards();
  startGame();
}

function handleSingleTurnedCard(){
  if(firstCard.family !== null){
    document.getElementById(firstCard.family+ "-" + firstCard.generation).style.transform =
    "rotateY(0deg)";
  }
}

// function to display a modal on winning the game
function showWinGameModal() {
  wonGame = true;
  document.getElementById("game-container").style.display = "none";
  document.getElementById("modal-container").style.display = "none";
  document.getElementById("you-lost").style.display = "none";
  document.getElementById("you-won").style.display = "flex";
  clearTimeOutCounter();
}
