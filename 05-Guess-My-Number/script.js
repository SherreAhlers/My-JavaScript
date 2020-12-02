'use strict';
// DOM MANIPULATION
// DOCUMENT OBJECT MODEL - structured representation of HTML documents allows JavaScript to access HTML elements and styles to manipulate them. - Change text, HTML, attributes and CSS styles

// Tree structure
//      Document  -- this is the entry point to the DOM see line 3
//          |
//          Element
//           |    |
// Element(head)  Element(body)     -- these 2 elements are sibling
//      |             |              \
// Element(title)  Element(selct)   Element(selct)
//   |              |            |               |
// Text('blah')   Element(p)    Element(p)      Element(img)
//                |         |            |
//          Element(a)      Text('blah')  Text('blah')
//              |
//              Text(link)
// DOM Methods and properties are web API's - basically libraries we can use

// console.log(document.querySelector('.message').textContent);
// selecting a class will start with .
// selecting an Id will start with //#endregion

// on the .message operator we can read textContent property
// document.querySelector('.message').textContent = 'Correct number!';
// The above line will change the .message text to Correct number! from start guessing
// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 10;
// document.querySelector('.guess').value = 23;
// console.log(document.querySelector('.guess').value);

// Building the guess my number game

// We must define secret number outside of click event so we only get one random number per game.
// let secretNum = Math.trunc(Math.random() * 20) + 1;
// let score = 20; // this is a state value same with secretNum.

// let highScore = 0;
// // first score is always going to be high score because it will always be greater than 0.

// document.querySelector('.check').addEventListener('click', function () {
//   // just specify what want to happen
//   const guess = Number(document.querySelector('.guess').value);
//   console.log(guess, typeof guess);

//   // When there is no input
//   if (!guess) {
//     // will output 0 if button is clicked without a value in guess field which is a falsy value - in a conditional will always get converted into a boolean
//     document.querySelector('.message').textContent = 'No Number!';
//     // will show up in browser in place of original .message block - will see on screen No number if clicked without putting in a guess.
//     // this is when guess is correct
//   } else if (guess === secretNum) {
//     document.querySelector('.message').textContent = 'Correct Number!';
//     document.querySelector('.number').textContent = secretNum;

//     document.querySelector('body').style.backgroundColor = '#60b347';
//     // this will change the background color when someone gets the correct number.
//     document.querySelector('.number').style.width = '30rem';

//     // insert high score tracker here.
//     if (score > highScore) {
//       highScore = score;
//       document.querySelector('.highscore').textContent = highScore;
//     }

//     // this will display only when guess correct score.
//     // this is when guess is too high
//   } else if (guess > secretNum) {
//     if (score > 1) {
//       document.querySelector('.message').textContent = 'Too high!';
//       score--; // this decreases the score by 1 if incorrect guess
//       document.querySelector('.score').textContent = score;
//       // this displays the updated score on browser
//     } else {
//       document.querySelector('.message').textContent = 'You lost the game!';
//       document.querySelector('.score').textContent = 0;
//     }
//     // this is when guess is too low
//   } else if (guess < secretNum) {
//     if (score > 1) {
//       document.querySelector('.message').textContent = 'Too low!';
//       score--; // this decreases the score by 1 if incorrect guess
//       document.querySelector('.score').textContent = score;
//       // this displays the updated score on browser
//     } else {
//       document.querySelector('.message').textContent = 'You lost the game!';
//       document.querySelector('.score').textContent = 0;
//     }
//   } else if (guess < secretNum) {
//     if (score > 1) {
//       document.querySelector('.message').textContent = 'Too low!';
//       score--; // this decreases the score by 1 if incorrect guess
//       document.querySelector('.score').textContent = score;
//       // this displays the updated score on browser
//     } else {
//       document.querySelector('.message').textContent = 'You lost the game!';
//       document.querySelector('.score').textContent = 0;
//     }
//   }
// });

// document.querySelector('.again').addEventListener('click', function () {
//   score = 20;
//   secretNum = Math.trunc(Math.random() * 20) + 1;

//   // the two above will restore the totals back to their beginning game values when again is clicked
//   document.querySelector('.message').textContent = 'Start guessing...';
//   document.querySelector('.score').textContent = score;
//   document.querySelector('.number').textContent = '?';
//   document.querySelector('.guess').value = '';
//   document.querySelector('body').style.backgroundColor = '#222';
//   document.querySelector('.number').style.width = '15rem';
// });

// addEventListener needs two arguments the first is the event the 2nd is an eventhandler function - need to pass in a function value as an argument.
// the function will only be called when the click happens

// --------The above game but DRY-------
// ---- This is refactoring code - reuse code used over and over -------------
// let secretNum = Math.trunc(Math.random() * 20) + 1;
// let score = 20;

// let highScore = 0;

// document.querySelector('.check').addEventListener('click', function () {
//   const guess = Number(document.querySelector('.guess').value);
//   console.log(guess, typeof guess);

//   if (!guess) {
//     document.querySelector('.message').textContent = 'No Number!';
//   } else if (guess === secretNum) {
//     document.querySelector('.message').textContent = 'Correct Number!';
//     document.querySelector('.number').textContent = secretNum;

//     document.querySelector('body').style.backgroundColor = '#60b347';

//     document.querySelector('.number').style.width = '30rem';

//     if (score > highScore) {
//       highScore = score;
//       document.querySelector('.highscore').textContent = highScore;
//     }

//     // When guess is wrong
//   } else if (guess !== secretNum) {
//     if (score > 1) {
//       document.querySelector('.message').textContent =
//         guess > secretNum ? 'Too high!' : 'Too low!';
//       score--;
//       document.querySelector('.score').textContent = score;
//     } else {
//       document.querySelector('.message').textContent = 'You lost the game!';
//       document.querySelector('.score').textContent = 0;
//     }
//   }
// });

// document.querySelector('.again').addEventListener('click', function () {
//   score = 20;
//   secretNum = Math.trunc(Math.random() * 20) + 1;

//   document.querySelector('.message').textContent = 'Start guessing...';
//   document.querySelector('.score').textContent = score;
//   document.querySelector('.number').textContent = '?';
//   document.querySelector('.guess').value = '';
//   document.querySelector('body').style.backgroundColor = '#222';
//   document.querySelector('.number').style.width = '15rem';
// });

// -------EVEN DRYER CODE!!----------
let secretNum = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  if (!guess) {
    // document.querySelector('.message').textContent = 'No Number!';
    displayMessage('No number!');
  } else if (guess === secretNum) {
    // document.querySelector('.message').textContent = 'Correct Number!';
    displayMessage('Correct number!');

    document.querySelector('.number').textContent = secretNum;

    document.querySelector('body').style.backgroundColor = '#60b347';

    document.querySelector('.number').style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }

    // When guess is wrong
  } else if (guess !== secretNum) {
    if (score > 1) {
      //   document.querySelector('.message').textContent =
      // guess > secretNum ? 'Too high!' : 'Too low!';
      displayMessage(guess > secretNum ? 'Too high!' : 'Too low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      //   document.querySelector('.message').textContent = 'You lost the game!';
      displayMessage('You lost the game!');
      document.querySelector('.score').textContent = 0;
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNum = Math.trunc(Math.random() * 20) + 1;

  //   document.querySelector('.message').textContent = 'Start guessing...';
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
