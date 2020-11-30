let myFirstName = "Sherre";
// console.log(myFirstName);

let myLastName = "Ahlers";
// console.log(myLastName);

let myFirstJob = "Sales Associate";
let myCurrentJob = "Software Engineer";

// console.log(myCurrentJob);

const now = 2037;
const ageSherre = now - 1987;
const ageSara = now - 1984;

// console.log(ageSherre);
// console.log(ageSara, ageSherre);

// console.log(ageSara * 2, ageSara / 10, 2 ** 3)
// 2 ** 3 means 2 to the power of 3 - 2 * 2 * 2

const herFirstName = "Rhonda";
const herLastName = "Johnson";

// console.log(herFirstName + ' ' + herLastName);

let a = 10 + 5;
// // a will be 15 because the script runs the stuff to the right of the assignment operator (=)

a += 10;
// // x will be 25 because will be written as x = a + 10

a *= 4;
// // x = x * 4 = 100

a++;
// // x = x + 1

a--;

a--;
// console.log(a)

// console.log(ageSara > ageSherre);
// greater than >
// less than <
// greater than or equal >=
// less than or equal <=
// console.log(ageSara >= 18);

const isFullAge = ageSherre <= 35;

// console.log(isFullAge);
// console.log(now - 1984 > now - 2018);
// Reference MDN operator precedence to see what is looked at first.

let c, d;
c = d = 25 - 10 - 5; // c = d = 10, d = 10, c = 10
// console.log(c, d)

const averageAge = (ageSherre + ageSara) / 2;
// console.log(ageSara, ageSherre, averageAge);

// More complicated way to write this
// const myFirstNameIs = 'Sherre';
// const myJob = 'Software Engineer';
// const birthYear = 1987;
// const currentYear = 2020;

// const sherre = "I'm " + myFirstName + ', a ' + (year - birthYear) + ' year old ' + myJob + '!';

// console.log(sherre);

// Easier way to write - Template Literals
// const sherreNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`;

// console.log(sherreNew)

// const age = 16;
// const isOldEnough = age >= 15;
// if(isOldEnough) {
// console.log('Sara can start getting DL 😍');
// }
// This will return true and give output Sara can start getting DL 😍

// const ageNew = 15;
// if(ageNew >= 16) {
// console.log('Sherre can get a DL.')
// } else {
// const yearsLeft = 16 - age;
// console.log(`Sherre is too young! Wait another ${yearsLeft} years.`)
// }

const birthYear = 1991;
let century;
if (birthYear <= 2000) {
  century = 20;
} else {
  century = 21;
}

// console.log(century);

// Type Conversion //
const inputYear = "1991";
// console.log(inputYear + 18);
// This will not work because it will add the string to the number outputting 199118 instead of adding the year and number together.

// console.log(Number(inputYear), inputYear);
// console.log(Number (inputYear) + 18);
// Must add number before a string of a number to make it a number instead of a string.

// console.log(String(23));
// This will convert a string into a number.

// Type coercion //
// console.log('I am ' + 33 + ' years old');
// console.log('I am ' + '33' + ' years old.')
// console.log('23' - '10' - 3);
// console.log('23' * '2');
// console.log('23' > '18');

let n = "1" + 1; // '11'
n = n - 1; // '11' = 11 - 1 = 10
// console.log(n)

2 + 3 + 4 + "5"; // output will be '95'
// because will add all numbers then add string to end of numbers

"10" - "4" - "3" - 2 + "5"; // output will be
// 6 - 3 = 3, 3 - 2 = 1, 1 + '5'
// output will be '15'

// TRUTHY AND FALSY
// console.log(Boolean(0)); // false
// console.log(Boolean(undefined)); // false
// console.log(Boolean('Sherre')); // true
// console.log(Boolean('')); // false
// console.log(Boolean({})); // true

const money = 0;
if (money) {
  //     console.log("Don't spend it all!")
} else {
  //     console.log('You should get a job!');
}
// output will be "You should get a job!"
// money = 0 but 0 is a falsey value so output will be second (else) "you should get a job."

// const money = 100;
// if(money) {
// console.log("Don't spend it all!")
// } else {
// console.log('You should get a job!');
// }
// Output will be "don't spend it all" because money = 100 is a truthy value.

// let height;
// if(height) {
//     console.log('Yay! Height is defined!');
// } else {
//     console.log('Height is undefined');
// }
// Output will be "Height is undefined."
// undefined is a falsey value so will run the (else).

let height = 5.4;
if (height) {
  // console.log('Yay! Height is defined!');
} else {
  // console.log('Height is undefined');
}
// Output will be "yay! Height is defined" because if height has a value it will be a truthy

const ageAdult = 18;
// if(ageAdult === 18) console.log('You just became an adult! (strict)');
// === will return a boolean value only if both sides are the same.

// if(ageAdult == 18) console.log('You just became an adult (loose)');

let favorite;
// let favorite = Number(prompt('What is your favorite number?')); // this will create a value based off number inputted
// console.log(favorite);
// console.log(typeof favorite);

if (favorite === 23) {
  // console.log('Cool! 23 is an amazing number!');
} else if (favorite === 7) {
  // console.log('7 is also a cool number!');
} else if (favorite === 9) {
  // console.log('9 is also a cool number!')
} else {
  // console.log('Number is not 23 or 7!');
}

if (favorite !== 23) {
  // console.log('Why not 23?');
}

// Boolean value operators

myAge = 33;
// myAge is greater than 20 = false
// myAge is less than 34 = true

// const hasDriversLicense = true;
// const hasGoodVision = false;

// console.log(hasDriversLicense && hasGoodVision);
// console.log(hasDriversLicense || hasGoodVision);
// console.log(hasDriversLicense);

// const shouldDrive = hasDriversLicense && hasGoodVision;
// if(shouldDrive) {
//     console.log('Sherre is able to drive!')
// } else {
//     console.log('Someone else should drive...');
// }
// Output will be false, because both hasDriversLicense and hasGoodVision are not both true.

const hasDriversLicense = true;
const hasGoodVision = true;

if (hasDriversLicense && hasGoodVision) {
  // console.log('Sara is able to drive!');
} else {
  // console.log("Someone else should drive.")
}

const isTired = false;
// console.log(hasDriversLicense && hasGoodVision && !isTired);

if (hasDriversLicense && hasGoodVision) {
  // console.log('Sara is able to drive now.')
} else {
  // console.log('Someone else should drive now');
}
// Output will be "Sara is able to drive now";
// because each variable is true; the isTired variable is true because of the !isTired in the if statement.

// SWITCH STATEMENTS

const day = "monday";

switch (day) {
  case "monday":
    // console.log('Plan my course structure');
    // console.log('Go to coding meetup.');
    break;
  case "tuesday":
    // console.log('Prepare theory videos.')
    break;
  case "wednesday":
  case "thursday":
    // console.log('Write code examples.');
    break;
  case "friday":
    // console.log('Record videos.');
    break;
  case "saturday":
  case "sunday":
    // console.log('Enjoy the weekend!');
    break;
  default:
  // console.log('Not a valid day.');
}

// the above done with if / else statements
// let day = 'monday';

// if(day === 'monday') {
// console.log('Plan course structure');
// console.log('Go to coding meetup.');
// } else if(day === 'tuesday') {
// console.log('Prepare theory videos.')
// } else if(day === 'wednesday' || day === 'thursday') {
// console.log('Write code examples')
// } else if(day === 'friday') {
// console.log('Record videos.')
// } else if(day === 'saturday' || day === 'sunday') {
// console.log('Enjoy the weekend!')
// } else {
// console.log('Not a valid day!');
// }

// CONDITIONAL (TERNARY OPERATOR)

const age = 33;
// age >= 21 ? console.log('I like to drink wine :)') : console.log('I like to drink water.');

// before the ? is the condition, after the ? is if statement : is the false part, if the first part is not true it moves onto next section.

// this is a better use than above.
const drink = age >= 21 ? "wine" : "water";
// console.log(drink);

// this is a longer block of code than the above, so it is less efficient.
let drink2;
if (age >= 21) {
  drink2 = "wine";
} else {
  drink2 = "water";
}
// console.log(drink2);
// console.log(`I like to drink ${age >= 21 ? 'wine' : 'water'}`);
