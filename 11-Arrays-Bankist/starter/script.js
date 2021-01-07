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

const displayMovements = function(movements) {
    // this function will recieve on array of movements to work with
    containerMovements.innerHTML = '';
    // this empties the container and only allows new data to be added.
    // innerHTML will return all html tags
    // here we are using innerHTML as a setter.

    // textContent will return the text itself
    movements.forEach(function(mov, i) {
        // this starts with first movement on top and the rest shown underneath the previous
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>
        `;

        containerMovements.insertAdjacentHTML('afterbegin', html);
        // this method takes two strings
        // look at MDN docs for javaScript afterbegin is a particular position name of where the element should be places.
    });
};

displayMovements(account1.movements);

const calcDisplayBalance = function(movements) {
    const balance = movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${balance} EUR`;
};
calcDisplayBalance(account1.movements);

const createUsernames = function(accounts) {
    accounts.forEach(function(account) {
        account.username = account.owner
            // the name of user comes from account array key owner value - name
            .toLowerCase()
            .split(' ')
            .map(name => name[0])
            .join('');
        // this created an array of only initials of account holders
    });

    // const username = user
    //     .toLowerCase()
    //     .split(' ')
    //     // .map(function(name) {
    //     //     return name[0];
    //     // });
    //     // OR LIKE THIS
    //     .map(name => name[0])
    //     .join('');
    // return username;
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

movements.forEach(function(mov, i, arr) {
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
currencies.forEach(function(value, key, map) {
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
currenciesUnique.forEach(function(value, _, map) {
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

const deposits = movements.filter(function(mov) {
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
for (const mov of movements)
    if (mov > 0) depositsFor.push(mov);
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
const balance = movements.reduce(function(acc, cur, i, arr) {
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

/////////////////////////////////////////////////