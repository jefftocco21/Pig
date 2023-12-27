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
const announcer = document.getElementById("announcer");
const btnRules = document.querySelector(".btn--rules");

const current0Element = document.getElementById("current--0");
const current1Element = document.getElementById("current--1");

const modal = document.getElementById("rulesModal");
const close = document.querySelector(".close");

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  diceElement.classList.add("hidden");
  announcer.classList.add("hidden");

  //Only one element will have this class, remove from both just in case
  player0Element.classList.remove("player--winner");
  player1Element.classList.remove("player--winner");

  //Make sure active player is player 0
  player0Element.classList.add("player--active");
  player1Element.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0Element.classList.toggle("player--active");
  player1Element.classList.toggle("player--active");
};

// Dice Roll
btnRoll.addEventListener("click", function () {
  if (playing) {
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
      announcer.classList.remove("hidden");
      announcer.textContent = `🗣️ You rolled a ${dice}`;
    } else {
      //Switch to next player
      switchPlayer();
      announcer.textContent = `🗣️ You rolled a ${dice}`;
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1. Add the current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check to see if score is >= 75 for active player
    if (scores[activePlayer] >= 75) {
      //Finish game
      playing = false;
      diceElement.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      console.log(activePlayer);
    } else {
      //3. Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);

btnRules.addEventListener("click", function () {
  modal.style.display = "block";
});

close.addEventListener("click", function () {
  modal.style.display = "none";
});
