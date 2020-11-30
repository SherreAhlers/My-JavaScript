// CODING CHALLENGE # 1
// MY VERSION
// const calcAverage = (dolphinScore, koalaScore) => {
//     let dolphinScore = 44 + 23 + 71;
//     let koalaScore = 85 + 54 + 41;
//     const avgDolphins = dolphinScore / 3;
//     const avgKoalas = koalaScore / 3;
// }
// console.log(calcAverage());

// function checkWinner(avgDolphins, avgKoalas) {
//     const winnerDolphins = calcAverage >= 2 * avgKoalas;
//     const winnerKoalas = avgKoalas >= 2 * avgDolphins;
//     if (winnerDolphins > winnerKoalas) {
//     return winnerDolphins;
//     }
// }

// console.log(checkWinner());
// console.log(`Dolphins win (${avgDolphins} vs ${avgKoalas})`);

// TEACHER VERSION
const calcAverage = (a, b, c) => (a + b + c) / 3;
// console.log(calcAverage(3, 4, 5));
// TEST DATA # 1
let scoreDolphins = calcAverage(44, 23, 71);
let scoresKoalas = calcAverage(65, 54, 49);
// console.log(scoreDolphins, scoresKoalas);

const checkWinner = function (avgDolphins, avgKoalas) {
  if (avgDolphins >= 2 * avgKoalas) {
    // console.log(`Dolphins win the trophy (${avgDolphins} vs. ${avgKoalas})`)
  } else if (avgKoalas >= 2 * avgDolphins) {
    // console.log(`Koalas win the trophy (${avgKoalas} vs. ${avgDolphins})`);
  } else {
    // console.log('No team wins...');
  }
};
checkWinner(scoreDolphins, scoresKoalas);
checkWinner(576, 111);

// TEST DATA # 2
scoreDolphins = calcAverage(85, 54, 41);
scoresKoalas = calcAverage(23, 34, 27);
// console.log(scoreDolphins, scoresKoalas);
checkWinner(scoreDolphins, scoresKoalas);

// CODING CHALLENGE # 2
// MY VERSION
// function calcTip(bill) {
//     if (bill >= 50 || bill <= 300) {
//         return bill * .15;
//     } else  if (bill <= 50 || bill >= 300) {
//         return bill * .20;
//     } else {
//             return NaN;
//         }
//     }

// console.log(calcTip(400));

// const bills = [125, 555, 44];
// const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];

// const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];

// console.log(totals, tips);

// TEACHER VERSION
// function expression
const calcTip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
};

// arrow function
// const calcTip = bill => bill >= 50 && <= 300 ? bill * .15 : bill * .2;

const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];

// console.log(bills, tips);

// CODING CHALLENGE # 3
// MY VERSION
//BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter)
// const person1 = {
//     firstName: 'Mark',
//     lastName: 'Miller',
//     weight: 78,
//     height: 1.69,

//     calcBMI: function () {
//         return weight / height ** 2
//     },
//     highestBMI: function () {
//         return `${this.firstName}'s BMI ${this.calcBMI} is higher than Mark's ${this.calcBMI}!`
//     }
// }

// const person2 = {
//     firstName: 'John',
//     lastName: 'Smith',
//     weight: 92,
//     height: 1.95,

//     calcBMI: function () {
//         return weight / height ** 2
//     }
// }
// TEACHER VERSION
const mark = {
  fullName: "Mark Miller",
  mass: 78,
  height: 1.69,
  calcBMI: function () {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  },
};

const john = {
  fullName: "John Smith",
  mass: 92,
  height: 1.95,
  calcBMI: function () {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  },
};

mark.calcBMI();
john.calcBMI();
// console.log(mark.bmi, john.bmi);

if (mark.bmi > john.bmi) {
  // console.log(`${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s BMI (${john.bmi})`)
} else if (john.bmi > mark.bmi) {
  // console.log(`${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s BMI (${mark.bmi})`)
}

// CODING CHALLENGE # 4
// MY VERSION
// const caclTip = function(bill) {
//     return bill >= 50 && bill <= 300 ? bill * .15 : bill * .2;
// }
// const bills1 = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
// let tips1 = [];
// let totals1 = [];
// for(calcTip = 0; calcTip <= bills1.length; calcTip++) {
//     calcTip.push(bills1, tips1);
// }

// let sum = 0;
// for(sum = 0; sum < bills1.length; sum++) {
//     console.log(sum);
// }
// TEACHER VERSION
const caclTip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
};
const bills2 = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips2 = [];
const totals2 = [];

for (let i = 0; i < bills2.length; i++) {
  const tip1 = calcTip(bills2[i]);
  tips2.push(tip1);
  totals2.push(tip1 + bills2[i]);
}
// console.log(bills2, tips2, totals2);

// BONUS QUESTION
const calcAverage1 = function (arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    // sum = sum + arr[i];
    // the above line can be condensed
    sum += arr[i];
  }
  return sum / arr.length;
  // console.log(sum);
};
// console.log(calcAverage1([2, 3, 7]));
// console.log(calcAverage1(totals2));
// console.log(calcAverage1(tips2));
