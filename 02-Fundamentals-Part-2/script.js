"use strict";

let hasDriverLicense = false;
const passTest = true;

if (passTest) hasDriverLicense = true;
// if(hasDriverLicense) console.log('I can drive!');

// const interface = 'Audio';
// interface is a reserved word in strict mode - cannot use for variables if reserved.
// const private = 123;
// private is a reserved word in strict mode - cannot use for variables if reserved.

// FUNCTIONS
function logger() {
  // console.log('My name is Sherre.');
}

logger();
// this is how you invoke/call/run this function.
// each time we invoke a function whatever in the body of function will be executed every time it is called.

function fruitProcessor(apples, oranges) {
  // console.log(apples, oranges);
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

// fruitProcessor(5, 0);
// inside parenthesis are called arguments

const appleJuice = fruitProcessor(5, 0);
// console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
// console.log(appleOrangeJuice);

// My practice
function chocolatePieRecipe(
  sugar,
  cocoa,
  cornStarch,
  eggYolk,
  milk,
  butter,
  vanilla
) {
  const favoritePie = `Chocolate Pie: Add ${sugar} cup/s of sugar, ${cocoa} cup/s of cocoa, ${cornStarch} cup/s of cornstarch and mix till there are no lumps. Then add to saucepan. In a seperate bowl, add ${eggYolk} egg yolks and ${milk} cup/s of milk. Turn saucepan on to medium heat and stir in eggs and milk. Stir till thickens, let boil for 1 minute. Remove from heat and add ${butter} tbs of butter and ${vanilla} tsp of vanilla extract. Pour into pie crust. Let cool, refriderate before use!`;
  return favoritePie;
}

const bestPie = chocolatePieRecipe(1, 0.25, 0.25, 3, 3, 3, 1.5);
// console.log(bestPie);

// FUNCTION DECLARATION
// function calcAge1(birthYear) {
//     const age = 2020 - birthYear;
//     return age;
// }
// OR

const age1 = calcAge1(1987);
// can call function before defined w/ declarations
function calcAge1(birthYear) {
  return 2020 - birthYear;
}
// const age1 = calcAge1(1987);
// or you can call it afrer function is declared
// console.log(age1);

// FUNCTION EXPRESSION - expression produces values
const calcAge2 = function (birthYear) {
  return 2020 - birthYear;
};
const age2 = calcAge2(1987);
// console.log(age1, age2);

// ARROW FUNCTIONS
const calcAge3 = (birthYear) => 2020 - birthYear;
// great for 1 liner functions
const age3 = calcAge3(1987);
// console.log(age3);
// above is simplest arrow function that contains only one perameter

const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2020 - birthYear;
  const retirement = 65 - age;
  // return retirement;
  return `${firstName} retires in ${retirement}.`;
};
// Can only omit the return when it is a one line function unlike the one above

// console.log(yearsUntilRetirement(1987, 'Sherre'));
// console.log(yearsUntilRetirement(2000, 'Bob'));

// Arrow functions do not get a 'this' keyword.

// FUNCTIONS CALLING OTHER FUNCTIONS
// want a function that cuts fruit into pieces and function will recieve fruit cut into 4 pieces
function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessors(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice1 = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
  return juice1;
}

// console.log(fruitProcessors(2, 3));

// ARRAYS
const friend1 = "Cameron";
const friend2 = "Mark";
const friend3 = "Tanya";
// the above is not efficient, use an array instead.
// ARRAYS AND OBJECTS ARE TWO MOST IMPORTANT DATA STRUCTURE IN JS

const friends = ["Cameron", "Mark", "Tanya"];
// console.log(friends);
// the bracket version is the simplest

// another way of writing arrays
const year = new Array(1991, 1984, 2008, 2020);
// arrays can hold as many as want and different types
// here the new Array is a function
// console.log(friends[0]);
// this will look into array and pull out first element in array

// console.log(friends.length);
// this will tell you how many elements are in the array
// .length is not 0 based so the above friends array would be 3
// if you want the last element of the array
// console.log(friends.length - 1);
// will output 2 because the array ends in index 2.
// console.log(friends[friends.length - 1])

// you can mutate the array like this
friends[2] = "Gabe";
// console.log(friends);
// will output ['Cameron', 'Mark', 'Gabe']

// Arrays can hold different value types
const firstName = "Sherre";
const sherre = [firstName, "Ahlers", 2020 - 1987, "software engineer", friends];
// console.log(sherre);

// Exercise
const calcAge10 = function (birthYear) {
  return 2020 - birthYear;
};
const years = [1990, 1967, 2002, 2010, 2018];

// console.log(calcAge(years));
// cannot do operations on arrays
const age10 = calcAge10(years[0]);
const age11 = calcAge10(years[1]);
const age12 = calcAge10(years[years.length - 1]);
// console.log(age10, age11, age12);

const ages = [calcAge10(years[0]), calcAge10(years[1])];

// METHODS - ARRAY OPERATIONS
// ADD ELEMENTS TO ARRAYS
const friends1 = ["Cameron", "Mark", "Gabe"];
friends1.push("Jay");
// this will add an element to the end of the array - must specify what to put into the array.
// console.log(friends1);

friends1.unshift("Tanya");
// console.log(friends1);

// REMOVES ELEMENTS IN ARRAY
friends1.pop();
// console.log(friends1);
// do not need to add anything inside the pop() because will automatically remove the last element
// pop() will return not the length like push and unshift, but the removed element.
const popped = friends1.pop();
// console.log(popped); //this will remove Gabe because it is the second time i called pop
friends1.shift();
// console.log(friends1)
// console.log(friends.indexOf('Cameron'));
// will return 0 because Cameron is at index 0 in friends1 array

// ES6 method - include
// will return true if element is in array and false if not
// console.log(friends1.includes('Bob')); // will be false because there is no Bob in array
// because it tests with strict equality must be exactly the same.

// includes can be used to test
if (friends1.includes("Mark")) {
  // console.log('You have a friend called Mark');
}
// there are many more methods to manipulate the arrays than above... will get to later.

// OBJECTS
// objects define key value pairs

const cameron = {
  firstName: "Cameron",
  lastName: "Baker",
  age: 2020 - 1983,
  job: "Owner",
  friends2: ["Gabe", "Mark", "Tanya"],
};

// this object called cameron has 5 key value pairs
// objects are most fundamental piece of JavaScript
// multiple ways to create objects
// the above is called object literals
// objects are used to group values together that should go together.
// objects are used for more unstructured data.

// DOT NOTATION VS BRACKET NOTATION
// console.log(cameron.lastName); // dot notation
// dot notation must use real property name
// console.log(cameron['lastName']); // bracket notation

const nameKey = "Name";
// console.log(cameron['first' + nameKey]);
// console.log(cameron['last' + nameKey]);

// prompt is a built in JS
// const interestedIn = prompt('What do you want to know about Cameron? Choose between firstName, lastName, age, job, and friends.');
// console.log(interestedIn);
// console.log(cameron[interestedIn]);
// the expresion between the brackets will get evaluated.
// if(cameron[interestedIn]) {
// console.log(cameron[interestedIn]);
// } else {
// console.log('Wrong request! Choose between firstName, lastName, age, job, and friends.')
// }

// how to use dot and bracket notation to add new properties to object
cameron.location = "United States";
cameron["twitter"] = "@cameronbaker";
// console.log(cameron);

// Challenge
// console.log(`${cameron.firstName} has ${cameron.friends2.length} friends, and his best friend is called ${cameron.friends2[0]}.`);
const person = {
  firstName: "Sherre",
  lastName: "Ahlers",
  birthYear: 1987,
  job: "Software Engineer",
  friends: ["Cameron", "Mark", "Tanya"],
  hasDriverLicense: true,

  // VERSION 1
  // calcAge: function(birthYear) {
  //     return 2037 - birthYear;
  // }

  // VERSION 2
  // calcAge: function() {
  //     // console.log(this);
  //     return 2037 - this.birthYear;
  // }
  // 'this' key word will point to person (the name of the object)

  // VERSION 3 - best version
  calcAge: function () {
    this.age = 2020 - this.birthYear;
    return this.age;
  },
  // ADDING CHALLENGE HERE
  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()}-year old ${
      this.job
    }, and she has ${this.hasDriverLicense ? "a" : "no"} drivers license.`;
  },
  // here we are calculating the age and saving to a variable.
};
// console.log(person.calcAge());
// console.log(person.age);
// console.log(person.calcAge(1987)); // dot notation
// console.log(person['calcAge'](1987)); // bracket notation

// CHALLENGE
//'Sherre is a 33-year old Software Engineer, and he she has a drivers license.'
// console.log(person.getSummary());

// LOOPS

// console.log('Lifting weights repetition 1');
// if we wanted 10 reps would have to paste the above console.log 10 times... that is not dry at all.

// implement a for loop - it has a counter
// for loop keeps running while consitions are TRUE
// for(let rep = 1; rep <= 10; rep++) {
//     console.log('Lifting weights repetition 1');
// }
// this means the string will be printed 10 times.

for (let rep = 1; rep <= 10; rep++) {
  // console.log(`Lifting weights repetition ${rep}`);
}
// I replaced the string to a template literal string with backticks and changed the 1 to the variable rep

// LOOPING ARRAYS, BREAKING AND CONTINUING
const sherreArray = [
  "Sherre",
  "Ahlers",
  2020 - 1987,
  "Software Engineer",
  ["Cameron", "Gabe", "Mark"],
];
const types = [];

// for(let i = 0; i < 5; i++) {
//     console.log(sherreArray[i]);
//     // started counter at 0 because 0 is the first spot in the array
// }
// above we hard coded the length of the array with i < 5; instead use:
for (let i = 0; i < sherreArray.length; i++) {
  // console.log(sherreArray[i], typeof sherreArray[i]);
  // started counter at 0 because 0 is the first spot in the array
  // console.log(types[i] = typeof sherreArray[i]);

  types.push(typeof sherreArray[i]);
}

// how to create a new array based on the properties of an original array (above) added to line 303 also added lines to 313
// console.log(types); // output is (5) ['string', 'string', 'number', 'string', 'object']

const birthYears = [1987, 2007, 1969, 2020];
const ages1 = [];

for (let i = 0; i < birthYears.length; i++) {
  ages1.push(2020 - birthYears[i]);
  // in this loop we did the calculation one by one
}
// console.log(ages1);

// IMPORTANT STATEMENTS FOR LOOPS
// CONTINUE AND BREAK
// CONTINUE
// continue will continue through the loop until found all criteria (ie. string)
// console.log('--- ONLY STRINGS ---');
for (let i = 0; i < sherreArray.length; i++) {
  if (typeof sherreArray[i] !== "string") continue;
  // console.log(sherreArray[i], typeof sherreArray[i]);
}
// the above will only log the strings in the array
// BREAK  this will run until it finds the criteria then will no longer output and will end the loop
// console.log('--- BREAK WITH NUMNBER ---');
for (let i = 0; i < sherreArray.length; i++) {
  if (typeof sherreArray[i] === "number") break;
  // console.log(sherreArray[i], typeof sherreArray[i]);
}
// after first number is found, nothing else will be printed and the loop will be terminated.

// LOOPING BACKWARDS AND LOOPS IN LOOPS
const sherreArr = [
  "Sherre",
  "Ahlers",
  2020 - 1987,
  "Software Engineer",
  ["Cameron", "Mark", "Gabe"],
];

// 0, 1, ..., 4
// 4, 3, ..., 0
for (let i = sherreArr.length - 1; i >= 0; i--) {
  // console.log(i, sherreArr[i]);
}
// this will count backwards through the array because we are starting at end of array with sherreArr.length - 1 and with the counter update being i-- which counts backwards 1 time per iteration.

// LOOP INSIDE A LOOP
for (let exercise = 1; exercise <= 3; exercise++) {
  // console.log(`----- Starting exercise ${exercise}`);
  for (let rep = 1; rep < 6; rep++) {
    // console.log(`Exercise ${exercise} Lifting weights repetition ${rep} :)`)
  }
}
// output will be
// ----- Starting exercise 1
// Exercise 1: Lifting weights repetition 1 :)
// Exercise 1: Lifting weights repetition 2 :)
// Exercise 1: Lifting weights repetition 3 :)
// Exercise 1: Lifting weights repetition 4 :)
// Exercise 1: Lifting weights repetition 5 :)
// ----- Starting exercise 2
// Exercise 2: Lifting weights repetition 1 :)
// Exercise 2: Lifting weights repetition 2 :)
// Exercise 2: Lifting weights repetition 3 :)
// Exercise 2: Lifting weights repetition 4 :)
// Exercise 2: Lifting weights repetition 5 :)
// ----- Starting exercise 3
// Exercise 3: Lifting weights repetition 1 :)
// Exercise 3: Lifting weights repetition 2 :)
// Exercise 3: Lifting weights repetition 3 :)
// Exercise 3: Lifting weights repetition 4 :)
// Exercise 3: Lifting weights repetition 5 :)

// WHILE LOOP
// still need same components like a counter, a condition and a counter
// can only specify a condition in a while loop
// for (let rep1 = 1; rep1 <= 10; rep1++) {
// console.log(`Lifting weights repetition ${rep1}.`)
// }

let rep1 = 1;
while (rep1 <= 10) {
  // console.log(`WHILE: Lifting weights repetition ${rep1}.`)
  rep1++;
}
// we only put counter here because this particular above statement needs it but not all while loops need a counter it will run as long as it is true

// keep running loop while rolled dice is 6 or less
let dice = Math.trunc(Math.random() * 6) + 1;
// here we are creating a number between 1-6
// console.log(dice);
// Math.trunc will make it an integer not a decimal
// while(dice !== 6) {
//     console.log(`You rolled a ${dice}.`)
//     dice = Math.trunc(Math.random() * 6) + 1;
// }
// the condition was tested is dice different from 6 - it was so we entered the loop again. the last dice rolled was 6 so the condition was no longer true so the loop stopped.
while (dice !== 6) {
  // console.log(`You rolled a ${dice}.`)
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6);
  // console.log('Loop is about to end...');
}
// when dice is 6 in the beginning it will have 0 iterations. will not run if dice is 6.
