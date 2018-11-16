/**
My special thanks to Mr. Matthew Cranford. BLOG POSTS, MEMORY GAME, WALKTHROUGH
*/
/** Section:1
*variables: [var,let or const]
@description: since we all know that JavaScript variables are containers for storing data values.
Redeclaration:
Assuming strict mode, var will let you re-declare the same variable in the same scope. On the other hand, let will not.

The difference is scoping. var is scoped to the nearest function block and let is scoped to the nearest enclosing block, which can be smaller than a function block. Both are global if outside any block.

  below decks: contains the array of the first child of .deck element.
  newList is the empty list
  clockOff is set to true.
  stats like time,moves, matched are set to zero.
  clockid: In the startClock function, we can store the interval in the clockId variable and inside this interval increment time++ every 1000 ms or 1 second.
*/

const deck = document.querySelector(".deck");
let newList=[];
let clockOff= true;
let time = 0;
let moves = 0;
let clockId;
let matched = 0;

/*Section:2
 *  list is created that holds all of the cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//start game button
var start = document.querySelector('.container');
var startGame= document.createElement("button");
var text = document.createTextNode("START");
startGame.classList.add("text");
startGame.appendChild(text);
start.appendChild(startGame);

//document.querySelector(".text").addEventListener("click", location.reload());
document.querySelector(".text").addEventListener("click",function(){
  shuffleCard();
});


/**
*Section:3.we have added addEventListener to handle clicks.This reveals the "hidden" side of each card.
Clicking on the first card should turn it over, show the symbol, and remain turned over.
Clicking on a different card must also turn it over and show the symbol.
*@constructor are desribed below

*@description	 : when the card is clicked, the condition isValid(clickTarget){see that section for explanation} is checked.If its true then startClock() function is called.
then toggledCard(clickTarget) & addToList(clickTarget) these both function will turn the card and later add to the newList{empty list declared above}.
another if condition is used to check length then below funtions are called :
      cardMatch(clickTarget) : describes Matching logic
      checkScore(): check the moves and adjust the star rating
      addMoves(): display the moves
Created the winning condition for player who won.
      @gameOver() function is called which satisfies below requirement:
          created an @anchor tag "Result" which appears when the player wins.
          see a popup with players stats.
          also give playes option to cancel or continue.
*/


deck.addEventListener("click",function(event){
  var clickTarget = event.target;
  if (isValid(clickTarget)) {
    if (clockOff){
      startClock();
      clockOff = false;
    }
  }
  if (clickTarget.classList.contains("card") && newList.length < 2 && !newList.includes(clickTarget)
){

    toggledCard(clickTarget);
    addToList(clickTarget);
    if (newList.length ===2){
      cardMatch(clickTarget);
      checkScore();
      addMoves();
    }
  }

    var Pair_Match = 8 ;
    if (matched===Pair_Match){
      gameOver();
    }
});

/** Section3: Work on the matching logic.
*@constructor:
*@cardMatch() has @param clickTarget which is looped through each index above in the shuffleCard().
*@toggleCard() has @param newList[], which are the selected unmatched cards, which will turn back.
*@description  we match the className of each clickTarget and assigned class"match".
              this will prevent the user from selecting the same card twice
              two cards match, they stay turned over
              two cards do not match, they turn back
              This card needs to be compared to the next card turned over.
*/

function cardMatch(clickTarget){

  if (newList[0].firstElementChild.className===newList[1].firstElementChild.className){
      newList[0].classList.toggle("match");
      newList[1].classList.toggle("match");
      newList = [];
      matched++;
  }
  else {
    setTimeout(function(){
      toggledCard(newList[0]);
      toggledCard(newList[1])
      newList = [];
    },2000);

}
}


/** Section 4
*@constructor manipulating the DOM element ".restart"
*created a button for time display.
*/
var spa = document.querySelector('.restart');
var newSpan = document.createElement("button");

//var score = document.querySelector(".score-panel");
var clock = document.createTextNode("00:00");
newSpan.classList.add("clock");
newSpan.appendChild(clock);
spa.appendChild(newSpan);


/** Section 4.	Implement additional functionality:
•	Move counter. The game should display the number of moves the player has made.
•	Timer (hint: how does setTimeout() come into play here?). This timer should start when the player starts a game, and end when the player wins the game.
•	Star rating. The player should begin with a certain number of stars displayed on the screen. The number of moves made during the game should visually decrease this star rating.
•	Reset button. This should allow the player to reset the entire grid as well as all the above.
6.	We recommend saving most of the styling until the very end. Allow your game logic and functionality to dictate the styling.
*/

/** Section 5
*@description starts the clock, used setInterval(This method repeats a given function at every given time-interval.).
1000ms===1sec.
*@constructor
*/
function startClock(){
  clockId = setInterval(function(){
    time++;
    displayTime();
  },1000);
}

/** Section6
*@description pushes the clicked card in the newList
*The push() method adds one or more elements to the end of an array and returns the new length of the array.
*/

function addToList(clickTarget){
  newList.push(clickTarget);

}

/** Section 7
*@description this is one of the most important function it returns the following:
*@returns the card which is clicked
  which is not under .match class
  card should not be found in the newList
  and the length of the newList should be less that 2 as are comparing two card at a time.
*/

function isValid(clickTarget){
  return ( clickTarget.classList.contains( "card" ) && !clickTarget.classList.contains("match")&& !newList.includes(clickTarget) && newList.length < 2  );

}

/** Section 8
*@description toggles the clicked card "open" and "show".
*/
function toggledCard(clickTarget){
  clickTarget.classList.toggle("open");
  clickTarget.classList.toggle("show");
}

/** Section 9
*@description stops the clock, used clearInterval() method stops the executions of the function specified in the setInterval() method.

*/

function stopClock(){
  clearInterval(clockId);
  }
/** Section 10
@description time calculation for seconds.
*/

function displayTime(){
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;
  var clock = document.querySelector(".clock");
  clock.innerHTML = time;
  if (seconds < 10) {
     clock.innerHTML = `${minutes}:0${seconds}`;
  }  else {
     clock.innerHTML = `${minutes}:${seconds}`;
  }
}

/** Section 11
*@description takes care of number of moves taken by user, to get the correct match.
*/

function addMoves(){
  moves++;
  document.querySelector(".moves").innerHTML=moves;
}


/** Section 12
*@description stores the array of all the unordered list of class (.stars)
and used for loop and manipulated the style.display and will hide the star.
*/
function removeStar(){
  var stars = document.querySelectorAll(".stars li");
  for (star of stars){
    if (star.style.display !== "none"){
      star.style.display = "none";
      break;
    }
  }
}
/** Section 13
*@description here will consider both above functions and apply if condition:
*      user is give two threshold (16 and next 24) moves.
*/
function checkScore(){
  if ((moves === 5) || (moves === 15) || (moves === 25) || (moves === 30)){
    removeStar();
  }
}

/** Section 14
*@description writes the result of time,moves,star rating on the ".modal__stats"
*            The innerHTML property sets or returns the HTML content (inner HTML) of an element.
*@constructor getStars is called which returns the num. of star count.
*/

function writeResults() {
  var clockTime = document.querySelector(".clock").innerHTML;
  var star = getStars();

  document.querySelector(".modal__time").innerHTML = `Time = ${clockTime}`;
  document.querySelector(".modal__moves").innerHTML = `Moves = ${moves}`;
  document.querySelector(".modal__stars").innerHTML = `Stars = ${star}`;
}

/** Section 15
*@description this function is called when the game is over and to get the current star count of the user.
*@return num. of star left with respect to the users move.
*/
function getStars(){
  stars = document.querySelectorAll(".stars li");
  var starCount = 0;
  for (star of stars) {
    if (star.style.display !== "none"){
      starCount++;
    }
  }
  return starCount;
}
/** Section 16
*@constructor anchor tag #hideResult is a link
*@description the result link appears when the user wins.
*/
//hide result

function toggleModal(){
  var modal = document.querySelector(".modal__background");
  modal.classList.toggle("hide");
}
toggleModal();

/** Section 17
*@description resets the time to 0 and writes that result to the "modal__stats".
*/
//reset the game
function resetStats(){
  stopClock();
  clockOff = true;
  time = 0;
  displayTime();

}
/** Section 18
*@description manipulate the DOM moves innerHTML to 0.
*/
//reset moves
function resetMoves(){
  moves=0;
  document.querySelector(".moves").innerHTML=moves;
}

/**Section 19
*@description array of unordered list is stored in a variable and then looped through each list and manipulated the style.display to "inline"
*/
//reset starsStat
function resetStars(){
  stars = 0;
  var showStar = document.querySelectorAll(".stars li");
  for (star of showStar){
    star.style.display = "inline";
  }
}

/** Section 20
*@description this is a nested function to reset the game.
*/
//reset the game
function resetGame(){
  resetStats();
  resetMoves();
  resetStars();
  resetCards();
  shuffleCard();
  resetMatched();
  newList=[];
  toggleModal();
}

/** Section 21
*@description when replay button is clicked this function calls resetGames().
*/

function replayGame() {
  resetGame();

}
/**Section 22
*@description tie function to a handler of our reset button and replay button.

*/
document.querySelector(".restart").addEventListener("click", resetGame);

document.querySelector(".modal__replay").addEventListener("click", replayGame);



/** Section 23
*@description tie function to a handler of our cancel button and calling this function will hide the modal__stats.
*/
document.querySelector(".modal__cancel").addEventListener("click", function(){
  toggleModal();

//  hidetheModal();
});


/** Section 24
*@description all the cards are queried and the classname is changed from "match" to "card".
*/

function resetCards(){
  var cards = document.querySelectorAll(".deck li");
  for (let card of cards){
    card.className = "card";
  }
}

function resetMatched(){
  matched = 0;
}

/** Section 25
*@description re-shuffle the card
*/

function shuffleCard(){

  var shuffleTheCard = [].slice.call(document.querySelectorAll(".card"));
  var shuffledCard = shuffle(shuffleTheCard);
  for (card of shuffledCard){
    deck.appendChild(card);
    }
}

/** Section 26
*@description this is a nested function callback the stopClock(), toggleResult(),
writeResults().
*/
//game is over

function gameOver(){
  stopClock();
  writeResults();
  toggleModal();
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
