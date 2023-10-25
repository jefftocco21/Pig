"use strict";

// Selecting elements
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

let currentScore = 0;

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
    current0Element.textContent = currentScore;
  } else {
  }
});
