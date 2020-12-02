'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting Conditions
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');

// const scores = [0, 0]; // this array holds score of player0 at index 0 and player1 at index 1
// let currentScore = 0; // this must be outside of below function because don't want to reset every time button is clicked.
// let activePlayer = 0; // active player is 0 because we will store
// let playing = true;
// the above was changed to the below code.

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.add('player--active');
  player1El.classList.add('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1; // this will make a random number between 1 - 6.
    //   console.log(dice);

    // 2. Display dice.
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // the above will let us render one of the 6 dice images from the html page.

    // 3. Check for a rolled 1.
    if (dice !== 1) {
      // Add dice to current score
      // currentScore = currentScore + dice;
      // or
      currentScore += dice;
      // above code is dryer
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      // above we select the score dynamically based on which player is playing now.
    } else {
      // if dice = 1, switch to next player
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // currentScore = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // // checking whether is player 0, if it is the result will be active player 1 if false active player will be 0
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active');
      //toggle will add class if not there and will take away class if it is there.
      // ALL ABOVE CODE HAS BEEN REFACTORED INTO A FUNCTION AT TOP!!! SEE FUNCTION!!
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //   console.log('Hold button.');

    // 1. Add current score to active player's score.
    // scores[activePlayer] = scores[activePlayer] + currentScore
    // or
    scores[activePlayer] += currentScore;
    //   console.log(scores[activePlayer]);

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      // find player--winner in css file and use here
      diceEl.classList.add('hidden'); // this hides the dice when someone wins
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3. Switch to next player
      switchPlayer();
    }
  }
});

// Resetting the game
// btnNew.addEventListener('click', function () {
//   score0El.textContent = 0;
//   score1El.textContent = 0;
//   current0El.textContent = 0;
//   current1El.textContent = 0;
//   player0El.classList.remove('player--winner');
//   player1El.classList.remove('player--winner');
//   player1El.classList.add('player--active');
//   player1El.classList.add('player--active');
// });
// add all of above into a function

btnNew.addEventListener('click', init);
