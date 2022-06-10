'use strict';

//Both work same (Selecting element)
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
score0El.textContent = 0;
score1El.textContent = 0;
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const playerActive0El = document.querySelector('.player--0');
const playerActive1El = document.querySelector('.player--1');

let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;

diceEl.classList.add('hidden');
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;

  currentScore = 0;
  playerActive0El.classList.toggle('player--active');
  playerActive1El.classList.toggle('player--active');
};

//Rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //Check for rooled 1
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to active player score
    score[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    //2.Check if players score is >=100
    if (score[activePlayer] >= 10) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }

    //switch to the next player
    switchPlayer();
  }
});

btnNew.addEventListener('click', function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentScore = 0;

  playing = true;
  diceEl.classList.add('hidden');
  score = [0, 0];
  playerActive0El.classList.remove('player--winner');
  playerActive1El.classList.remove('player--winner');
  playerActive0El.classList.add('player--active');
  playerActive1El.classList.remove('player--active');
  activePlayer = 0;
});
