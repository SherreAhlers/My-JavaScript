'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2021-01-16T07:42:02.383Z',
    '2021-01-28T09:15:04.904Z',
    '2021-01-17T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-01-19T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    // calling for each on movements
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each callback call, print the remaining time to user interface
    labelTimer.textContent = `${min}:${sec}`;

    // When time is at 0 (when timer expires) stop timer and logout user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started.';
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
    // this will show the timer value each time a second has passed
  };

  // Setting time to 5 minutes
  let time = 300; // 5 minutes

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// EXPERAMENTING with API - to get differecnt codes google iso language code table - click one that has lingos.net

// const now1 = new Date();
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'long', // long will give us the full name of month
//   year: 'numeric',
//   weekday: 'long', // this will spell out the whole name of week
//   // can also use short
// };
// const locale = navigator.language;
// console.log(locale);
// // this will output: en-US

// // for UK
// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now1);

// for US
// labelDate.textContent = new Intl.DateTimeFormat('en-Us').format(now1);
// the above will change date depending on where date is being requested

// for Syria
// for UK
// labelDate.textContent = new Intl.DateTimeFormat('ar-SY').format(now1);

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // in the above having a + before the value will automatically call on javascript type conversion to convert string into a number

    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // CREATE current date and time
    const now1 = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', // long will give us the full name of month
      year: 'numeric',
      // weekday: 'long', // this will spell out the whole name of week
      // can also use short
    };
    // const locale = navigator.language;
    // console.log(locale);
    // this will output: en-US

    // for UK
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now1);
    // this means right now as far as date goes
    // day/month/year - for user in Portugal
    // const day = `${now1.getDate()}`.padStart(2, 0);
    // const month = `${now1.getMonth() + 1}`.padStart(2, 0);
    // const year = now1.getFullYear();
    // const hour = `${now1.getHours()}`.padStart(2, 0);
    // const min = `${now1.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
    // console.log(labelDate);

    // month/day/year - for users in US
    // labelDate.textContent = `${month}/${day}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // TIMER
    if (timer) clearInterval(timer);
    // this says if log in and there is a timer - stop timer and then
    timer = startLogOutTimer();
    // now start timer

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  // in the above having a + before the value will automatically call on javascript type conversion to convert string into a number
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // ADD TRANSFER DATE
    currentAccount.movementsDates.push(new Date().toISOString());
    // javascript will format this date as a string
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // RESET TIMER
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);
  // this will round the amount requested for a loan to an int (whole number) no decimal places

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // ADD LOAN DATE
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // RESET TIMER
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
    // this will cause the loan to take 2.5 seconds to show up once requested
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
    // in the above having a + before the value will automatically call on javascript type conversion to convert string into a number
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// NUMBERS IN JAVASCRIPT
// all numbers are represented internally as floating point numbers (decimal numbers)
// console.log(23 === 23.0);
// this will output: true
// base 10 - 0 to 9   1/10 = 0.1    3/10 = 3.33333333(until infinity)

// Binary base 2 - 0 1
// numbers are always stored in binary form (0's & 1's)
// console.log(0.1 + 0.2);
// this will output:
// 0.30000000000000004
// javaScript has a hard time doing scientific problems or really percise financial calculations

// console.log(0.1 + 0.2 === 0.3);
// this will output: false   but it is true  this is the problem in JavaScript

// convert string to number
// console.log(Number('23'));

// easier way than above
// console.log(+'23');
// this will output: 23 as a number
// because of type conversion that javaScript uses

// parsing numbers from a string
// console.log(Number.parseInt('30px'));
// this will output: 30 the number, not string
// in order for it to work must have a number at the beginning of the string for example

// console.log(Number.parseInt('e23'));
// this will output: NaN  because the string does not start with a number
// better practice is to add the type of numbers using ex for base 10

// console.log(Number.parseInt('30px', 10));
// this will output the number 30

// or for binary use it like this:
// console.log(Number.parseInt('e23', 2));
// this will output: NaN because the string doesn't start with a number

// console.log(Number.parseFloat('2.5rem'));
// this will output:
// the number 2.5
// because the float references numbers that have decimal points in them... int will only return the whole number

// console.log(Number.parseInt('  2.5rem  '));
// this will output: 2  because int is a whole number

// console.log(Number.parseFloat('  2.5rem  '));
// this will output: 2.5   because float references decimal numbers

// CHECKING IF VALUE IS NaN (not a number)
// console.log(Number.isNaN(20));
// this is saying is 20 not a number - which is false -  it is a number

// console.log(Number.isNaN('20'));
// this will output: false because it is a string

// console.log(Number.isNaN(+'20px'));
// this will output: true   because of javascript using type conversion behind the scenes due to the placement of the + however the string has characters that are not numbers so isNan would be true.

// console.log(Number.isNaN(23 / 0));
// dividing by 0 is not allowed mathematically
// the output will be:
// false   because it is a number because when you divide by 0 it becomes 0 which is a number

// CHECKING IF VALUE IS A NUMBER
// console.log(Number.isFinite(20));
// this will output: true because it is finite

// console.log(Number.isFinite('20'));
// this will output: false  because this is not a number therefore it cannot be finite or not finite.
// best way to check if value is a real number not a string

// console.log(Number.isFinite(+'20px'));
// this will output: false  because even though trying to use type conversion there are characters that are not numbers therefore it cannot be finite or not finite

// console.log(Number.isFinite(23 / 0));
// this will output: false  because the number above if Infinite because you cannot divide by 0 in math

// console.log(Number.isInteger(23));
// this would output: true    because this is a whole number

// console.log(Number.isInteger(23.0));
// this will output: true because even though there is a decimal point the number following it is 0

// console.log(Number.isInteger(23 / 0));
// this will output: false   because the number above is considered Infinite

// MATH AND ROUNDING
// console.log(Math.sqrt(25));
// this is asking for the square root of a number
// this will output: 5

// console.log(25 ** (1 / 2));
// this is another way of asking for the square root of 25
// this will output: 5

// console.log(8 ** (1 / 3));
// this is how you look for the cubic of a number
// this will output: 2

// console.log(Math.max(5, 18, 23, 11, 2));
// this will give us a max of the numbers available
// this will output:  23

// console.log(Math.max(5, 18, '23', 11, 2));
// this will output: 23 as a number because of type conversion

// console.log(Math.max(5, 18, '23px', 11, 2));
// this will output: NaN because there are characters that are not a number but a string so the max cannot be determined

// console.log(Math.min(5, 18, 23, 11, 2));
// this will output: 2

// console.log(Math.min(5, 18, '23', 11, 2));
// this will output: 2  because of type conversion on the string

// console.log(Math.PI);
// this will calculate the radius
// this will output: 3.141592653589793

// console.log(Math.PI * Number.parseFloat('10px') ** 2);
// this will output: 314.1592653589793
// because we parseFloat so we called for a decimal version of the above equation

// console.log(Math.random());
// this will calculate a random number every time it is used

// console.log(Math.trunc(Math.random() * 6));
// this will give a random integer (whole number) within range of 1-6
// the Math.trunc() removes the decimals and makes the integer

const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;
// 0...1 -> 0..(max-min) -> min...min)
// Math.random() will give us a number between 0-1
// if multiple by (max - min)
// then end up with a number always between min and max

// console.log(randomInt(10, 20));
// this will output a random number between 10 - 20 every time run

// ROUNDING INTEGERS
// console.log(Math.trunc(23.3));
// this will remove decimal and create an integer
// this will output: 23

// console.log(Math.round(23.9));
// this will always round to the nearest integer
// this will output: 24

// console.log(Math.ceil(23.3));
// this will always round up to nearest int
// this will output: 24

// console.log(Math.ceil(23.9));
// this will output: 24  because it always rounds up to the nearest int

// console.log(Math.round(23.3));
// this will round to nrearest int
// this will output: 23

// console.log(Math.round(23.9));
// this will round to nearest int
// this will output: 24

// console.log(Math.floor(23.3));
// this will round down to the nearest int
// this will output: 23

// console.log(Math.trunc(-23.3));
// this will output: -23

// console.log(Math.floor(-23.3));
// this will output: -24   because with negative numbers it will round in opposite direction

// all the above work with type conversion

// ROUNDING DECIMALS
// console.log((2.7).toFixed(0));
// this will output: 3   because it will round and remove the decimal point   but it is a string not a number

// console.log((2.7).toFixed(3));
// this will output: 2.700   because it will add as many 0 as it needs to get to the 3rd decimal space
// but it is a string not a number

// console.log((2.345).toFixed(2));
// this will output: 2.35   because we asked it to only give us 2 decimal places  but it is a string not a number

// console.log(+(2.345).toFixed(2));
// this will output: 2.35 the number because of type conversion started by the +

// REMAINDER OPERATOR %
// has some special use cases

// returns the remainder of a division equation
// console.log(5 % 2);
// this will output: 1 because 1 is the remaining part that cannot be divided

// console.log(5 / 2);
// this will output: 2.5   // 5 = 2 * 2 + 1

// console.log(8 % 3);
// this will output: 2 because there are 2 that couldn't be divided

// console.log(8 / 3); // 8 = 2 * 3 + 2
// this will output: 2.666666666666666665

// is even if divisible by 2  = remainder 0
// console.log(6 % 2);
// this will output: 0 because there is nothing remaining, everything can be divided

// console.log(7 % 2);
// this will output: 1  because 1 is what was left over

// console.log(7 / 2);
// this will output: 3.5

// to check whether number is even or odd
const isEven = n => n % 2 === 0;
// console.log(isEven(8));
// this will output: true  because it is an even number

// console.log(isEven(23));
// this will output: false   because it is an odd number

// console.log(isEven(514));
// this will output: true  because it is an even number

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});
// the above will paint every second row of movements because of the (i % 2 === 0) statement
// the above statement will paint every 3rd row blue because of if (i % 3 === 0)

// BigInt
// special type of integer
// 64 bits  there are exactly 64 1's or 0's
// only 53 bits store the number

// console.log(2 ** 53 - 1);
// this will output:
// 9007199254740991
// this is the largest number that javaScript is able to represent

// console.log(Number.MAX_SAFE_INTEGER);
// this will output: 9007199254740991
// this is the largest number that javaScript is able to represent

// console.log(2 ** 53 + 1);
// console.log(2 ** 53 + 2);
// console.log(2 ** 53 + 3);
// console.log(2 ** 53 + 4);
// the above are unsafe numbers unless you use them with bigInt

// console.log(2345678902345671234567);
// this will output: 2.345678902345671e+21
// because the number is bigger that the MAX_SAFE_INTEGER

// console.log(2345678902345671234567n);
// this will output: 2345678902345671234567n
// because the n at the end represents BigInt

// console.log(BigInt(2345678902345671234567));
// this will output:
// 2345678902345671114752n
// this number is off a bit because of the way javaScript has to internalize the number

// console.log(BigInt(48384302));
// this will output: 48384302n

// OPERATIONS WITH BigInt numbers
// console.log(10000n + 10000n);
// this will output: 20000n
// this represents that the operators still act the same with BigInt

// console.log(12345678901234562345n * 1234567891234567898234567n);
// this will output:
// 15241578766956250882716094152042488395579615n

// NOT POSSIBLE to mix BigInt with regular numbers

const huge = 2028983023728378237n;
const num = 23;
// console.log(huge * BigInt(num));
// this will output:
// 46666609545752699451n

// console.log(20n > 15);
// this will still work with a normal number and will return true

// console.log(20n === 20);
// this will output: false   because when use === will not do type conversion because it is looking for an exact match
// however this will work because type coersion is possible

// console.log(20n == 20);
// this will output: true  because it converted it to the same type

// console.log(huge + ' is REALLY BIG!!!');
// this will output: 2028983023728378237 is REALLY BIG!!!

// DIVISION WITH BigInt
// console.log(11n / 3n);
// this will output: 3n

// CREATING DATES IN JAVASCRIPT
const now = new Date();
// console.log(now);
// this will output:
// Mon Jan 18 2021 16:26:13 GMT-0600 (Central Standard Time)

// parse in date
// console.log(new Date('Jan 18 2021 18:05:41'));
// Mon Jan 18 2021 18:05:41 GMT-0600 (Central Standard Time)

// console.log(new Date('January 18, 2021'));
// the above can be tricky if manually inputing information
// Mon Jan 18 2021 00:00:00 GMT-0600 (Central Standard Time)

// console.log(new Date(account1.movementsDates[0]));
// this will output: Mon Nov 18 2019 15:31:17 GMT-0600 (Central Standard Time)

// console.log(new Date(2037, 10, 19, 15, 23, 5));
// this will output:
// Thu Nov 19 2037 15:23:05 GMT-0600 (Central Standard Time)
// the month in javaScript is 0 based so november will be 10 instead of 11

// console.log(new Date(2037, 10, 31));
// this will output:
// Tue Dec 01 2037 00:00:00 GMT-0600 (Central Standard Time)
// this outputs December because there is not 31 days in november

// console.log(new Date(0));
// this will output: Wed Dec 31 1969 18:00:00 GMT-0600 (Central Standard Time)

// console.log(new Date(3 * 24 * 60 * 60 * 1000));
// this is how we convert from days to miliseconds
// 3 days times 24 hours times 60 minutes in an hour times 60 number of seconds in minutes times 1000 = miliseconds
// this will output:
// Sat Jan 03 1970 18:00:00 GMT-0600 (Central Standard Time)

// WORKING WITH DATES
const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// this will output:
// Thu Nov 19 2037 15:23:00 GMT-0600 (Central Standard Time)

// console.log(future.getFullYear());
// this will output: 2037

// console.log(future.getMonth());
// this will output: 10

// console.log(future.getDay());
// this is referencing the day of week
// this will output: 4

// console.log(future.getHours());
// this will output: 15

// console.log(future.getMinutes());
// this will output: 23

// console.log(future.getSeconds());
// this will output: 0

// console.log(future.toISOString());
// this follows an international standard
// this will output: 2037-11-19T21:23:00.000Z

// console.log(future.getTime());
// this will output: 2142278580000
// how much time has passed since date above in miliseconds

// console.log(new Date(2142256980000));
// this will output:
// Thu Nov 19 2037 09:23:00 GMT-0600 (Central Standard Time)

// console.log(Date.now());
// this will output: 1611010655845

future.setFullYear(2040);
// console.log(future);
// this will output: Mon Nov 19 2040 15:23:00 GMT-0600 (Central Standard Time)

// OPERATIONS WITH DATES
// CALCULATIONS
const future1 = new Date(2037, 10, 19, 15, 23);
// console.log(+future1);
// this will output:
// 2142278580000

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
// console.log(days1);
// this will output:
// 10

// INTERNATIONALIZING NUMBERS
const num1 = 3884764.23;

const options = {
  // style: 'unit',
  // style: 'percent'
  style: 'currency',

  // unit: 'mile-per-hour', // there are numerous format options to choose from look up in docs
  unit: 'celsius', // the will add Celcius
  currency: 'EUR', // this will add the €
  // have to set currency because it is not defined by locale
  useGrouping: false, // this will print a number without the seperators ex: 123456 instead of 123,456
};

// FOR UNITED STATES
// console.log('US:   ', new Intl.NumberFormat('en-US', options).format(num1));
// this will output: US:    3,884,764.23 mph

// because the US uses commas to seperate numbers and a period to show cents

// FOR GERMANY
// console.log(
// 'Germany:   ',
// new Intl.NumberFormat('de-DE', options).format(num1)
// );
// this will output: Germany:    3.884.764,23 mi/h

//FOR SYRIA
// console.log('Syria:   ', new Intl.NumberFormat('ar-SY', options).format(num1));
// this will output: Syria:    ٣٬٨٨٤٬٧٦٤٫٢٣ ميل/س

// LOCALE FROM BROWSER
// console.log(
// navigator.language,
// new Intl.NumberFormat(navigator.language, options).format(num1)
// );
// this will output: en-US 3,884,764.23 mph

// TIMERS IN JAVASCRIPT

// setTimeout(() => console.log('Here is your pizza!'), 3000);

// this call back is the argument being set for setTimeOut function, second argument is the time that we want to pass in miliseconds
// the code execution does not stop when it reaches it point it will continue until it is called later

// console.log('Waiting...');
// the Waiting will pop up first even though the setTimer code is first - this is called asyncronous javascript

// any argument passeed after delay will be considered arguments of function
// const ingredients = ['olives', 'spinach'];
// setTimeout(
//   (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}!`),
//   3000,
//   'olive',
//   'spinach'
// );
// this will output:
// Here is your pizza with olive and spinach!    - after 3 seconds of loading the page

const ingredients = ['olives', 'apples'];
// const pizzaTimer = setTimeout(
//   (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}!`),
//   3000,
//   ...ingredients
// );
// console.log('Waiting... ');

if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);
// if the above does contain spinach it won't output anything into console.
// if spinace is not there it will print to the console.

// SetTimeOut FUNCTION
// setInterval(function () {
// const now2 = new Date();
// console.log(now2);
// this will output: Thu Jan 21 2021 16:17:41 GMT-0600 (Central Standard Time)
// once every 10 seconds
// }, 10000);

// IMPLEMENT setInterval Timer
