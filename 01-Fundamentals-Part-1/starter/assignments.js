const continent = "North America";
const country = "United States";
let population = 328000000;
let finlandPop = 60000000;
// console.log(country);
// console.log(continent);
// console.log(population);

let isIsland = false;

let language;

// console.log(typeof isIsland)
// console.log(typeof population)
// console.log(typeof country);
// console.log(typeof language);

language = "English";

// console.log(language);

let halfPop = country / 2;
population = 328000001;

// console.log(halfPop)
// console.log(population);

function biggerPop() {
  if (finlandPop >= population) {
    return true;
  } else {
    return false;
  }
}

// console.log(biggerPop())

let countryAve = 33000000;

function biggerCountry() {
  if (population >= countryAve) {
    return true;
  } else {
    return false;
  }
}

// console.log(biggerCountry());

let description =
  "Portugal is in Europe, and its 11 million people speak Portuguese.";

// console.log(description)

// console.log(updatedDescription);

let portugalPop = 11000000;
let portugalCountry = "Europe";
let portugalLanguage = "Portuguese";

let updatedDescription = `Portugal is in ${portugalCountry}, and its ${portugalPop} people speak ${portugalLanguage}!`;

// console.log(updatedDescription);

if (portugalPop > 33000000) {
  // console.log("Portugal's population is above average.")
} else {
  // console.log("Portugal's population is 22 million below average.");
}

"9" - "5"; // prediction of answer: '4' correct answer: 4
"19" - "13" + "17"; // prediction of answer: '617' correct answer: '617'
"19" - "13" + 17; // prediction of answer: 23 correct answer: 23
"123" < 57; // prediction of answer: false correct answer: false
5 + 6 + "4" + 9 - 4 - 2; // prediction of answer: '117' correct answer: 1143 because 5+6=11, 11+'4'= 114, 114 + (9-4-2=3) - 114+'3' = 1143

// let numNeighbours = Number(prompt('How many neighbour countries does your country have?'));

// if(numNeighbours === 1) {
//     // console.log('Only 1 border!')
// } else if(numNeighbours > 1) {
//     // console.log('More than 1 border.');
// } else {
//     // console.log('No borders!');
// }

if (language === "English" && population < 50000000 && isIsland) {
  // console.log(`You should live in ${country}! 😄`)
} else {
  // console.log(`${country} does not meet your criteria 😔`);
}

// SWITCH STATEMENTS
let newLanguage = "chinese";
switch (newLanguage) {
  case "chinese":
  case "mandarin":
    // console.log('MOST number of native speakers!');
    break;
  case "spanish":
    // console.log('2nd place in number of native speakers.');
    break;
  case "english":
    // console.log('3rd place.');
    break;
  case "hindi":
    // console.log('Number 4.');
    break;
  case "arabic":
    // console.log('5th most spoken language.');
    break;
  default:
  // console.log('Great language too :D');
}

// CONDITIONAL (TERNARY) OPERATOR
// MY ANSWER

// const pop = population >= 33000000 ? console.log("The United States' population is above average.") : console.log("The United States' population is below average.");

// TEACHER ANSWER
// console.log(
//     `${country}'s population is ${population > 33 ? 'above' :
//     'below'} average`,
//   );

// here I changed something for the github save...
