// CODE CHALLENGE # 1

// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about thier dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:
// 1. Julia found out that the owners of the FIRST and LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practive to mutate function parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data.
// 3. For each remaining dog, lof to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy")
// 4. Run the function for both test

// HINT: Use tools from all lectures in this section so far.

// TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  // console.log(dogsJuliaCorrected);
  const dogs = dogsJuliaCorrected.concat(dogsKate);

  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      // console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old.`);
    } else {
      // console.log(`Dog number ${i + 1} is still a puppy!`);
    }
  });
};
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// this will output:
// Dog number 1 is an adult, and is 5 years old.
// Dog number 2 is still a puppy!
// Dog number 4 is still a puppy!
// Dog number 5 is an adult, and is 15 years old.
// Dog number 6 is an adult, and is 8 years old.
// Dog number 7 is an adult, and is 3 years old.

checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
// this will output:
// Dog number 1 is an adult, and is 16 years old.
// Dog number 2 is an adult, and is 6 years old.
// Dog number 3 is an adult, and is 10 years old.
// Dog number 4 is an adult, and is 5 years old.
// Dog number 5 is an adult, and is 6 years old.
// Dog number 6 is still a puppy!
// Dog number 7 is an adult, and is 4 years old.

// CODE CHALLENGE # 2

// Let's go back to Julia and Kate's study about dogs. This time, they want to convert dogs ages to human ages and calculate the average age of the dogs in their study.

// Create a function 'calcAverageHumanAge', which accepts an array of dog's ages ('ages'), and does the following things in order:
// 1. Calculate the dog age in human years using the following formula:  if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
// 2. Exclude all dogs that are less than 18 human years ikd (which is the same as keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages)
// 4. Run the function for both test datasets:
// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

// MY VERSION - WRONG!

// const calcAverageHumanAge = function(ages) {
//     let humanAge = 0;
//     let dogAge = 0;
//     if (dogAge <= 2) {
//         return (dogAge * 2 = humanAge);
//     } else {
//         return (16 + dogAge * 4 = humanAge);
//     }
// };

const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adults = humanAges.filter(age => age >= 18);
  // console.log(humanAges);
  // this will output:
  // (7) [36, 4, 32, 2, 76, 48, 28]
  // 0: 36
  // 1: 4
  // 2: 32
  // 3: 2
  // 4: 76
  // 5: 48
  // 6: 28
  // 7) [80, 40, 56, 36, 40, 2, 32]
  // 0: 80
  // 1: 40
  // 2: 56
  // 3: 36
  // 4: 40
  // 5: 2
  // 6: 32

  // console.log(adults);
  // this will output:
  // 5) [36, 32, 76, 48, 28]
  // 0: 36
  // 1: 32
  // 2: 76
  // 3: 48
  // 4: 28

  // (6) [80, 40, 56, 36, 40, 32]
  // 0: 80
  // 1: 40
  // 2: 56
  // 3: 36
  // 4: 40
  // 5: 32

  const average = adults.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );

  // 2 3. (2+3)/2 = 2.5 2/2+2/3 = 2.5

  return average;
};
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);
// this will output:
// 44 47.333333333333336

// CODE CHALLENGE # 3
// Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chainging.

// TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
// TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
const calcAverageHumanAge1 = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const avg3 = calcAverageHumanAge1([5, 2, 4, 1, 15, 8, 3]);
const avg4 = calcAverageHumanAge1([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg3, avg4);
// this will output:
// 44
// 47.333333333333336

// CODE CHALLENGE # 4
// Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
// Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range of 10% above and 10% below the recommended portion (see hint).

// 1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Formula: recommendedFood = weight ** 0.75 * 28.
// (the result is in grams of food, and the weight needs to be in kg).

// 2. Find Sarah's do and log to the consle whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owner's array, and so this one is a bit tricky.

// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Micheal's dogs eat too littl!."

// 5 . Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false).

// 6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false).

// 7. Create an array containing the dogs that are eating an OKAy amount of food (try to reuse the condition in 6.).

// 8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions inside the array's object).

// HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them

// HINT 2: Being within a range 10% above and 10% below the recommended portion means: current > (recommended * 0.99) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

// TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Micheal'] },
];

// 1.
dogs.forEach(dog => (dog.recFood = dog.weight ** 0.75 * 28));

// console.log(dogs);
// this will output:
// (4) [{…}, {…}, {…}, {…}]
// 0: {weight: 22, curFood: 250, owners: Array(2), recFood: 284.4297646615672}
// 1: {weight: 8, curFood: 200, owners: Array(1), recFood: 133.19119688030474}
// 2: {weight: 13, curFood: 275, owners: Array(2), recFood: 191.69710117664528}
// 3: {weight: 32, curFood: 340, owners: Array(1), recFood: 376.72159403366413}

// 2.
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));

// console.log(dogSarah);
// this will output:
// {weight: 13, curFood: 275, owners: Array(2), recFood: 191.69710117664528}
// curFood: 275
// owners: (2) ["Sarah", "John"]
// recFood: 191.69710117664528
// weight: 13

// console.log(
//   `Sarah's dog is eating too ${
// dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
//   }`
// this will output: Sarah's dog is eating too much
// );

// 3.
// const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recFood);

// console.log(ownersEatTooMuch);
// this will output:
// (2) [{…}, {…}]
// 0: {weight: 8, curFood: 200, owners: Array(1), recFood: 133.19119688030474}
// 1: {weight: 13, curFood: 275, owners: Array(2), recFood: 191.69710117664528}
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);

// console.log(ownersEatTooMuch);
// this will output:
// (3) ["Matilda", "Sarah", "John"]

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);

// console.log(ownersEatTooLittle);
// this will output:
// (3) ["Alice", "Bob", "Micheal"]

// 4.
// console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
// this will output:
// Matilda and Sarah and John's dogs eat too much!

// console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);
// this will output:
// Alice and Bob and Micheal's dogs eat too little!

// 5.
// console.log(dogs.some(dog => dog.curFood === dog.recFood));
// this will output: false

// 6.
const checkEatingOkay = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

// console.log(dogs.some(checkEatingOkay));
// this will output: true

// 7.
// console.log(dogs.filter(checkEatingOkay));
// this will output:
// [{…}]
// 0: {weight: 32, curFood: 340, owners: Array(1), recFood: 376.72159403366413}

// 8.
const dogSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);

// console.log(dogSorted);
// this will output:
// (4) [{…}, {…}, {…}, {…}]
// 0: {weight: 8, curFood: 200, owners: Array(1), recFood: 133.19119688030474}
// 1: {weight: 13, curFood: 275, owners: Array(2), recFood: 191.69710117664528}
// 2: {weight: 22, curFood: 250, owners: Array(2), recFood: 284.4297646615672}
// 3: {weight: 32, curFood: 340, owners: Array(1), recFood: 376.72159403366413}
