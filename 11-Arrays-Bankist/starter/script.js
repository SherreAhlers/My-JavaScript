'use strict';

// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  // this function will recieve on array of movements to work with
  containerMovements.innerHTML = '';
  // this empties the container and only allows new data to be added.
  // innerHTML will return all html tags
  // here we are using innerHTML as a setter.
  // textContent will return the text itself
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  // here I am creating a copy of movements array
  movs.forEach(function (mov, i) {
    // this starts with first movement on top and the rest shown underneath the previous
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
        `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
    // this method takes two strings
    // look at MDN docs for javaScript afterbegin is a particular position name of where the element should be places.
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      // the name of user comes from account array key owner value - name
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
    // this created an array of only initials of account holders
  });
};
createUsernames(accounts);
// console.log(accounts);
// the output will be:
// 0: {owner: "Jonas Schmedtmann", movements: Array(8), interestRate: 1.2, pin: 1111, username: "js"}
// 1: {owner: "Jessica Davis", movements: Array(8), interestRate: 1.5, pin: 2222, username: "jd"}
// 2: {owner: "Steven Thomas Williams", movements: Array(8), interestRate: 0.7, pin: 3333, username: "stw"}
// 3: {owner: "Sarah Smith", movements: Array(5), interestRate: 1, pin: 4444, username: "ss"}

// console.log(createUsernames('Steven Thomas Williams'));
// this will output: stw
const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};

// EVENT HANDLERS

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  // this will prevent form from reloading
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
    // find will return undefined if cannot find condition
  );
  //   console.log(currentAccount);
  // once type login info
  // this will output:
  // {owner: "Jonas Schmedtmann", movements: Array(8), interestRate: 1.2, pin: 1111, username: "js"}
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // the question mark means optional chaining - pin property will only be read if currentAccount exists
    // console.log('LOGIN');

    // Display UI and message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // CLEAR INPUT FIELDS
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // UPDATE UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // here we are looking for an account with the username that we input, select if from account using find method.
  //   console.log(amount, recieverAcc);
  // this will output:
  // 100 {owner: "Jessica Davis", movements: Array(8), interestRate: 1.5, pin: 2222, username: "jd"}
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.username
  ) {
    // DOING THE TRANSFER
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // ADD MOVEMENT
    currentAccount.movements.push(amount);
    // UPDATE UP
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log('Delete');
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // I passed in a condition that will return true or false, findIndex will find first element in array where condition is true.

    // DELETE ACCOUNT
    accounts.splice(index, 1);
    // HIDE UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
// in the beginning array is not sorted
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
  // this is what allows everything to work, each time click change false to true then to false then to true and so on and so forth.
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//     ['USD', 'United States dollar'],
//     ['EUR', 'Euro'],
//     ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// methods are functions we can call on objects
// arrays are themselves also objects
// arrays use methods all arrays have access to the methods.

// SLICE METHOD
let arr = ['a', 'b', 'c', 'd', 'e'];
// slice method we can extract part of any array without changing the original array

arr.slice(2);
// we will start extracting at c all the way to the end of array
// slice will return a new array - it does not mutate the original array
// console.log(arr.slice(2));
// this will output:
// (3)[('c', 'd', 'e')];

// console.log(arr.slice(2, 4));
// this is saying start at index 2 and end at index 4
// this will output:
// (2) ["c", "d"]

// console.log(arr.slice(-2));
// this will take out the 2nd to last element of the array to the end of array
// this will output:
// (2) ["d", "e"]

// console.log(arr.slice(-1));
// this is how you access the last element in the array
// this will output:
// ["e"]

// console.log(arr.slice(1, -2));
// this will extact element at index 1 up to the last two in the array
// this will output:
// (2) ["b", "c"]

// console.log(arr.slice);
// this will output:
// ƒ slice() { [native code] }

// ONLY TIME NEED TO USE SLICE IS WHEN YOU ARE CHAINING METHODS TOGETHER.

// SPLICE METHOD
// console.log(arr.splice(2));
// this will output:
// (3)[('c', 'd', 'e')];

// console.log(arr);
// this will output:
// (3) ["c", "d", "e"]
// because splice manipulates the original array it doesn't make a copy.

// splice is used to delete one or more elements from the array
arr.splice(-1);
// this will delete the last element in the array
// console.log(arr);
// now this original array is missing last element
// this will output:
// (4) ["a", "b", "c", "d"]
arr.splice(1, 2);
// this will take the element at index 1 and the next element because we are taking away two elements
// console.log(arr);
// this will output:
// (2) ["a", "d"]  - because we took away 'b' and 'c'

// REVERSE METHOD
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// this will output:
// (5) ["f", "g", "h", "i", "j"]
// because it takes the whole array and reverses it.

// CONCAT METHOD
const letters = arr.concat(arr2);
// console.log(letters);
// this will output:
// (10) ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]0: "a"1: "b"2: "c"3: "d"4: "e"5: "f"6: "g"7: "h"8: "i"9: "j"l
// the order you specify the concat matters, here I am joining the first array with the 2nd array.
// this will mutate the original array

// OR CAN DO:
// console.log(...arr, ...arr2);
// this will output:
// a b c d e f g h i j
// the above will not mutate the original arrays.

// JOIN METHOD
// console.log(letters.join(' - '));
// this will output:
// a - b - c - d - e - f - g - h - i - j
// because I specified in the join at every space to add a -

// -----LOOPING ARRAYS: FOREACH ----------
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// the positive values are deposits and the negative values are withdraws
for (const movement of movements) {
  if (movement > 0) {
    // console.log(`You deposited ${movement}`);
  } else {
    // console.log(`You withdrew ${Math.abs(movement)}`);
    // the Math.abs means to take the absolute value (removing the negative sign)
  }
  // this will output:
  // You deposited 200
  // You deposited 450
  // You withdrew 400
  // You deposited 3000
  // You withdrew 650
  // You withdrew 130
  // You deposited 70
}
// ------OR LIKE THIS!!-----
// console.log('============================');
// movements.forEach(function(movement, index, array) {
//     // forEach is a higher order function which requires a callback function that tells it what to do
//     // forEach loops over array at each iteration will call callback function and will pass in current element of array as argument
//     if (movement > 0) {
//         // console.log(`You deposited ${movement}`);
//     } else {
//         // console.log(`You withdrew ${Math.abs(movement)}`);
//     }
//     // this will output:
//     // You deposited 200
//     // You deposited 450
//     // You withdrew 400
//     // You deposited 3000
//     // You withdrew 650
//     // You withdrew 130
//     // You deposited 70
// });

for (const [i, movement] of movements.entries())
  if (movement > 0) {
    // console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    // console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
// this will output:
// Movement 1: You deposited 200
// Movement 2: You deposited 450
// Movement 3: You withdrew 400
// Movement 4: You deposited 3000
// Movement 5: You withdrew 650
// Movement 6: You withdrew 130
// Movement 7: You deposited 70
// Movement 8: You deposited 1300

movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    // console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    // console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
  // this will output:
  // You deposited 200
  // You deposited 450
  // You withdrew 400
  // You deposited 3000
  // You withdrew 650
  // You withdrew 130
  // You deposited 70
});

// YOU CANNOT USE CONTINUE OR BREAK STATEMENTS WITH forEach method.

// ----forEach() with Maps and Sets------
// --------Map---------------
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
// in this array of arrays each of the array elements will be one entry of the map where the first element will be the key and the second element will be the value
currencies.forEach(function (value, key, map) {
  // console.log(`${key}: ${value}`);
  // this will output:
  // USD: United States dollar
  // EUR: Euro
  // GBP: Pound sterling
});

// ---------SET-----------
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// this will output:
// Set(3) {"USD", "GBP", "EUR"}

// currenciesUnique.forEach(function(value, key, map) {
currenciesUnique.forEach(function (value, _, map) {
  // console.log(`${key}: ${value}`);
  // this will output:
  // USD: USD
  // GBP: GBP
  // EUR: EUR
  // the key is the same as the value
  // this is because sets do not have a keys or indexes so there is no value that would make sense for key
  // instead of making key a parameter just use  _ (it is a default setting for javascript)
});

// converting a euro to dollar
const euroToUSD = 1.1;

// functional programming
// const movementsUSD = movements.map(function(mov) {
//     return mov * euroToUSD;
//     // will return a brand new array
// });

// OR LIKE THIS
const movementsUSD = movements.map(mov => mov * euroToUSD);
// the above is the arrow function version.
// we are returning the value which is described with the => in the above code.

// console.log(movements);
// this will output:
// (8) [200, 450, -400, 3000, -650, -130, 70, 1300]

// console.log(movementsUSD);
// this will output:
// (8) [220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]

// will use above more often - its the modern way.
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * euroToUSD);
// console.log(movementsUSDfor);
// this will output:
// // (8) [220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
// if (mov > 0) {
//     return `Movement ${i + 1}: You deposited ${mov}`;
// } else {
//     return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
// }
// });
// console.log(movementsDescriptions);
// this will output:
// (8) ["Movement 1: You deposited 200", "Movement 2: You deposited 450", "Movement 3: You withdrew 400", "Movement 4: You deposited 3000", "Movement 5: You withdrew 650", "Movement 6: You withdrew 130", "Movement 7: You deposited 70", "Movement 8: You deposited 1300"]

// FILTER METHOD

const deposits = movements.filter(function (mov) {
  // with filter all we need is current element not index, key etc.
  return mov > 0;
  // this says only positive values (deposits) will be in array
});
// console.log(movements);
// this will output:
// (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
// 0: 200
// 1: 450
// 2: -400
// 3: 3000
// 4: -650
// 5: -130
// 6: 70
// 7: 1300
// console.log(deposits);
// this will output:
// (5) [200, 450, 3000, 70, 1300]
// 0: 200
// 1: 450
// 2: 3000
// 3: 70
// 4: 1300

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
// console.log(depositsFor);
// this will output:
// (5) [200, 450, 3000, 70, 1300]
// 0: 200
// 1: 450
// 2: 3000
// 3: 70
// 4: 1300

//     const withdrawals = movements.filter(function(mov) {
//         return mov < 0;
//     });

// const withdrawalsFor = [];
// for (const mov of movements)
//     if (mov < 0) withdrawalsFor.push(mov);
// console.log(withdrawalsFor);
// this will output:
// (3) [-400, -650, -130]
// 0: -400
// 1: -650
// 2: -130
// OR LIKE THIS
const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);
// this will output:
// (3) [-400, -650, -130]
// 0: -400
// 1: -650
// 2: -130

//  REDUCE METHOD -- most powerful method on arrays in javascript
// console.log(movements);

// arrow function version
// const balance = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(balance2);

// function expression version
const balance = movements.reduce(function (acc, cur, i, arr) {
  // first parameter is called the accumultor
  // this will add all elements of array together to give sum which is what will be output.
  // console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
  // accumulator will be current sum of all values before it
  // each loop iteration we return the updated accumulator
}, 0);
// the above says we want to start adding from position 0
// console.log(balance);
// this will output: 3840 because that is the total of adding all elements in the array together.
// Iteration 0: 0
// Iteration 1: 200
// Iteration 2: 650
// Iteration 3: 250
// Iteration 4: 3250
// Iteration 5: 2600
// Iteration 6: 2470
// Iteration 7: 2540

let balance2 = 0;
//the above 0 is the inital accumulator value
// need an external variable whenever we want to use a for loop - fine if you only need one loop - cumbersome if using more than one loop.
for (const mov of movements) balance2 += mov;
// console.log(balance2);

// Get Maximum value of movements array
const max = movements.reduce((acc, mov) => {
  // acc here will represent current max number
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
// console.log(max);
// this will output: 3000  -- because that is the highest positive number in the array

// PIPELINE of METHODS
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  //   .map(mov => mov * euroToUSD)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * euroToUSD;
  })
  .reduce((acc, mov) => acc + mov, 0);
// the result of the above will be a new array and converted euro to usd
// console.log(totalDepositsUSD);
// this will output: 5522.000000000001

// DO NOT CHAIN SPLICE OR REVERSE METHOD

// THE FIND METHOD
// can use find to retrieve one element of array
// find takes callback method
// find result will come in form of boolean
// will return the first element in array where operation becomes true not whole array - just the one element
const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements);
// tbis will output:
// (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
// 0: 200
// 1: 450
// 2: -400
// 3: 3000
// 4: -650
// 5: -130
// 6: 70
// 7: 1300

// console.log(firstWithdrawal);
// this will output:
// -400
// because this is the first negative number in the array.

// console.log(accounts);
// this will output:
// (4) [{…}, {…}, {…}, {…}]
// 0: {owner: "Jonas Schmedtmann", movements: Array(8), interestRate: 1.2, pin: 1111, username: "js"}
// 1: {owner: "Jessica Davis", movements: Array(8), interestRate: 1.5, pin: 2222, username: "jd"}
// 2: {owner: "Steven Thomas Williams", movements: Array(8), interestRate: 0.7, pin: 3333, username: "stw"}
// 3: {owner: "Sarah Smith", movements: Array(5), interestRate: 1, pin: 4444, username: "ss"}

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);
// this will output:
// {owner: "Jessica Davis", movements: Array(8), interestRate: 1.5, pin: 2222, username: "jd"}

// FIND INDEX METHOD
// different from find method in that it looks for a particular index not element
// gets access to index and current array
// added in ES6 - will not work in old browsers

// SOME METHOD
// with some method we can specify a condition where as the includes method will return boolean - true or false
const anyDeposits = movements.some(mov => mov > 0);
// console.log(anyDeposits);
// this will output: TRUE

// EVERY METHOD
// only returns true if all elements in array are true

// console.log(movements.every(mov => mov > 0));
// this will output; FALSE

// console.log(account4.movements.every(mov => mov > 0));
// this will output: TRUE

// SEPERATE CALLBACK
const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// this will output: TRUE

// console.log(movements.every(deposit));
// this will output: FALSE

// console.log(movements.filter(deposit));
// this will output:
// (5) [200, 450, 3000, 70, 1300]
// 0: 200
// 1: 450
// 2: 3000
// 3: 70
// 4: 1300

// FLAT METHOD
// only goes one level deep when flattening array
const arr1 = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr1.flat());
// this will output:
// (8) [1, 2, 3, 4, 5, 6, 7, 8] --- because it flattens everything into one array instead of multiple

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat());
// this will output:
// (6) [Array(2), 3, 4, Array(2), 7, 8]
// 0: (2) [1, 2]
// 1: 3
// 2: 4
// 3: (2) [5, 6]
// 4: 7
// 5: 8

// console.log(arrDeep.flat(2));
// this will output:
// (8) [1, 2, 3, 4, 5, 6, 7, 8]  -- because we specified to go 2 levels deep in the parenthesis

const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// this will output an array with all the movements from all accounts

const allMovements = accountMovements.flat();
// console.log(allMovements);
// this will output:
// (29) [200, 450, -400, 3000, -650, -130, 70, 1300, 5000, 3400, -150, -790, -3210, -1000, 8500, -30, 200, -200, 340, -300, -20, 50, 400, -460, 430, 1000, 700, 50, 90]

// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);
// this will output the sum of all the movements in allMovements array

// --------OR LIKE THIS!!----------
const overallBalance = accounts
  .map(acc => acc.movements)
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);
// the output will be: 17840

// FLATMAP METHOD
// works on not nested arrays - if nested array will need a seperate flat method.
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance2);
// the output will be: 17840

// SORTING ARRAYS
// tons of algorithms and methods for sorting values
// javascript has a built in sort method.
// SORTING WITH STRINGS
const owners = ['Jonas', 'Zach', 'Adam', 'Matha'];
// console.log(owners.sort());
// this will output:
// (4) ["Adam", "Jonas", "Matha", "Zach"]

// console.log(owners);
// this mutates the original array - so be careful using it

// SORTING NUMBERS
// console.log(movements);
// console.log(movements.sort());
// sorting numbers is more complicated
// sort wants to return a string so doesn't sort numbers properly
// refactor like this:

movements.sort((a, b) => {
  // if we return a negative value b will be sorted  before a
  // if we return a positive value a will be sorted first.
  //ASCENDING NUMBERS

  //   if (a > b) return 1;
  //   // means switch order
  //   if (a < b) return -1;
  //   // keep order
  //   console.log(movements);

  // OR LIKE THIS
  movements.sort((a, b) => a - b);
  //   console.log(movements);
  // this will output: (8) [-130, -400, -650, 1300, 200, 3000, 450, 70]
  // which is the correct sort in acending order

  // DESCENDING ORDER
  //   movements.sort((a, b) => {
  //       if(a < b) return -1;
  //       if(a > b) return 1;
  //   })

  // OR LIKE TIS
  movements.sort((a, b) => b - a);
  //   console.log(movements);
  // this will output:
  // (8) [3000, 1300, 450, 200, 70, -130, -400, -650]
});

// Ways to create arrays

// console.log([1, 2, 3, 4, 5, 6, 7]);
// const arr = [1, 2, 3, 4, 5, 6, 7];

// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

const x = new Array(7);
// this will create a new array with 7 empty elements
// console.log(x);
// (7) [empty x 7]

// console.log(x.map(() => 5));
// this will output: (7) [empty x 7]

x.fill(1);
// this will fill entire array with the value in parentheses
// console.log(x);
// this will output: (7) [1, 1, 1, 1, 1, 1, 1]

// x.fill(1, 3);
// this will fill at index 3 and to the end

x.fill(1, 3, 5);
// this will fill at index 3 and end at index 5
// console.log(x);
// this will output: (7) [empty × 3, 1, 1, empty × 2]

// empty array + fill method
arr.fill(23, 2, 6);
// fill will always create a brand new array
// console.log(arr);
// this will output: (5) [1, 2, 23, 23, 23, 23, 7]

const y = Array.from({ length: 7 }, () => 1);
// this will call the object length and arrow function calls the 1
// console.log(y);
// this will output: (7) [1, 1, 1, 1, 1, 1, 1]

const z = Array.from({ length: 7 }, (_, i) => i + 1);
// the second argunment (callback function) is just like using the map method, the first parameter is an _ because we are not using that feature of the map method.
// console.log(z);
// this will output: (7) [1, 2, 3, 4, 5, 6, 7]

const dice = Array.from({ length: 100 }, (_, i) => Math.random() * 100);
// console.log(dice);

// strings, maps, sets are all iterable
// querySelectorAll() returns a node list - something like an array that contains all selected elements but it is not a real array cannot use methods on it.

// const movementsUI = Array.from(document.querySelectorAll('.movements__value'));
// this will take the document.querySelectorAll elements and put them into an array that I can use methods on.

// console.log(movementsUI);
// this will output:
// (2) [div.movements__value, div.movements__value]0: div.movements__value1: div.movements__valuelength: 2__proto__: Array(0)

labelBalance.addEventListener('click', function () {
  // use Array.from to create an array from the result of querySelectorAll - a node list that is array like structure
  // gets converted to array using ARray.from
  // then we included a mapping function that transforms initial array into exact array we want it.
  // converting the raw element to textContent and replacing €
  // with nothing
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  // console.log(movementsUI.map(el => Number(el.textContent.replace('€', ''))));
  // console.log(movementsUI);
  // this will output:
  // 8) [1300, 70, -130, -650, 3000, -400, 450, 200]

  // movementsUI2 = [...document.querySelectorAll('.movements__value')];
  // the above is another way to create an array but then we would have to do mapping seperatly instead of doing it all with Array.from
});

/////////////////////////////////////////////////
