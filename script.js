"use strict";

// Selecting elements
const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");

const score0Element = document.getElementById("score--0");
const score1Element = document.getElementById("score--1");
const diceElement = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnDouble = document.querySelector(".btn--double");

const current0Element = document.getElementById("current--0");
const current1Element = document.getElementById("current--1");

// Preconditions
score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add("hidden");

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0Element.classList.toggle("player--active");
  player1Element.classList.toggle("player--active");
};

// Dice Roll
btnRoll.addEventListener("click", function () {
  // 1. Random dice roll generation
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display result
  diceElement.classList.remove("hidden");
  diceElement.src = `dice-${dice}.png`;

  // 3. Check for rolled 1: if true, next player's turn
  if (dice !== 1) {
    // Add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //Switch to next player
    switchPlayer();
  }
});

btnHold.addEventListener("click", function () {
  //1. Add the current score to active player's score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  //2. Check to see if score is >= 100 for active player

  //3. Switch to next player
  switchPlayer();
});
