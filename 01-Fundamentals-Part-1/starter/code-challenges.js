// Coding Challenge # 1
// MY VERSION

// BMI = mass / height ** 2;
// let markMass = 78;
// let johnMass = 92;
// let markHeight = 1.69;
// let johnHeight = 1.95;

// let markTotalBMI = markMass / markHeight ** 2;
// console.log(markTotalBMI)

// let johnTotalBMI = johnMass / johnHeight ** 2;
// console.log(johnTotalBMI)

// function markHigherBMI() {
// if (markTotalBMI > johnTotalBMI) {
//     return true;
// } else {
//     return false;
// }
// }

// console.log(markHigherBMI()) // result is true

// Coding Challenge # 1
// TEACHER VERSION

let massMark = 78;
let heightMark = 1.69;
let massJohn = 92;
let heightJohn = 1.95;

const BMIMark = massMark / heightMark ** 2;
const BMIJohn = massJohn / (heightJohn * heightJohn);
const markHigherBMI = BMIMark > BMIJohn;

// console.log(BMIMark, BMIJohn)
// console.log(markHigherBMI);

// Coding Challenge # 2
// MY VERSION
// BMI = mass / height ** 2;
// if (BMIMark > BMIJohn) {
//     console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})!`)
//   } else {
//     console.log(`John's BMI (${BMIJohn}) is higher than Marks's (${BMIMark})!`)
//   }

// TEACHER VERSION
if (BMIMark > BMIJohn) {
  // console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})!`)
} else {
  // console.log(`John's BMI (${BMIJohn}) is higher than Marks's (${BMIMark})!`)
}

// Coding Challenge # 3
// MY VERSION
let dolphins = (96 + 108 + 89) / 3;
let koalas = (88 + 91 + 110) / 3;
if (dolphins > koalas) {
  // console.log('Dolphins Win!')
} else if (koalas > dolphins) {
  // console.log('Koalas Win!');
} else {
  // console.log("It's a draw! No one wins!");
}

// let dolphinsWin = dolphins >= 100;
// let koalasWin = koalas >= 100;
// if()

// TEACHER VERSION
// const scoreDolphins = (96 + 108 + 89) / 3;
// const scoreKoalas = (88 + 91 + 110) / 3;
// console.log(scoreDolphins, scoreKoalas);

// if(scoreDolphins > scoreKoalas) {
//     console.log('Dolphins win the trophy!')
// } else if (scoreKoalas > scoreDolphins) {
//     console.log('Koalas win the trophy!');
// } else if (scoreDolphins === scoreKoalas) {
//     console.log('Both win the trophy!');
// }

//Bonus
// Test Data 1
// const scoreDolphins = (97 + 112 + 101) / 3;
// const scoreKoalas = (109 + 95 + 123) / 3;
// console.log(scoreDolphins, scoreKoalas);

// if(scoreDolphins > scoreKoalas && scoreDolphins >= 100) {
//     console.log('Dolphins win the trophy!')
// } else if (scoreKoalas > scoreDolphins && scoreKoalas >= 100) {
//     console.log('Koalas win the trophy!');
// } else if (scoreDolphins === scoreKoalas) {
//     console.log('Both win the trophy!');
// }

// Bonus
//test data 2
const scoreDolphins = (97 + 112 + 81) / 3;
const scoreKoalas = (109 + 95 + 86) / 3;
// console.log(scoreDolphins, scoreKoalas);

if (scoreDolphins > scoreKoalas && scoreDolphins >= 100) {
  // console.log('Dolphins win the trophy!')
} else if (scoreKoalas > scoreDolphins && scoreKoalas >= 100) {
  // console.log('Koalas win the trophy!');
} else if (
  scoreDolphins === scoreKoalas &&
  scoreDolphins >= 100 &&
  scoreKoalas >= 100
) {
  // console.log('Both win the trophy!');
} else {
  // console.log('No one wins a trophy 😭');
}

// Coding Challenge # 4
// MY VERSION
let bill = 275;
const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
const total = bill + tip;
// console.log(`The bill was ${bill}, the tip was ${tip} and the total value is ${total}`);

// TEACHER VERSION

// const bill = 275;
// const tip = bill <= 300 && bill >= 50 ? bill * .15 : bill * .20;
// const total = bill + tip;
// console.log(`The bill was ${bill}, the tip was ${tip} and the total value is ${bill + tip}`);

// Coding Challenge # 5
// MY VERSION

// TEACHER VERSION
