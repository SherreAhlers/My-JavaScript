'use strict';
// Default values
// they can contain any expression, and can use values of other parameters that were set before it.

const bookings = [];
// ES5 way
// const createBooking = function (flightNum, numPassengers, price) {
//   numPassengers = numPassengers || 1;
// 1 will be the default value - whenever first argument is falsy value then the or operator will return the 2nd argument being 1.
//   price = price || 199;

// ES6 way
const createBooking = function(
    flightNum,
    numPassengers = 1,
    price = 199 * numPassengers
) {
    // the default parameters get set in the parameter description

    const booking = {
        flightNum,
        numPassengers,
        price,
    };
    // console.log(booking);
    // this will output:
    // {flightNum: "LH123", numPassengers: undefined, price: undefined}
    //   flightNum: 'LH123';
    //   numPassengers: undefined;
    //   price: undefined;
    //   __proto__: Object;
    // numPassengers and price are undefined because they haven't been specified yet.
    bookings.push(booking);
};

createBooking('LH123');
// this will output:
// {flightNum: "LH123", numPassengers: 1, price: 199}
createBooking('LH123', 2, 800);
// this will output:
// {flightNum: "LH123", numPassengers: 2, price: 800}
createBooking('LH123', 2);
// this will output:
// {flightNum: "LH123", numPassengers: 2, price: 398}
createBooking('LH123', 5);
// this will output:
// {flightNum: "LH123", numPassengers: 5, price: 995}
createBooking('LH123', undefined, 1000);
// this will output:
// {flightNum: "LH123", numPassengers: 1, price: 1000}
// we must say undefined if we do not want to input a value - cannot skip parameter unless specify undefined in its spot.

const flight = 'LH234';
const sherre = {
    name: 'Sherre Ahlers',
    passport: 24739479284,
};

const checkIn = function(flightNum, passenger) {
    flightNum = 'LH999';
    passenger.name = 'Ms. ' + passenger.name;

    if (passenger.passport === 24739479284) {
        // alert('Check in');
    } else {
        // alert('Wrong passport');
    }
};

// checkIn(flight, sherre);
// this will output:
// {name: "Ms. Sherre Ahlers", passport: 24739479284}
// console.log(flight);
// this will output:
// LH234
// console.log(sherre);
// Is the same as...
// this is copying a value to a variable
// whatever we change in the copy will change in the original.
// const flightNum = flight;
// const passenger = sherre;

// when pass a reference type to a function what is copied is the reference to object in memory HEAP

const newPassport = function(person) {
    person.passport = Math.trunc(Math.random() * 10000000000);
};

newPassport(sherre);
checkIn(flight, sherre);
// this will output:
// wrong passport because there are two functions manipulating the object.

// two terms when dealing with functions
// one - passing by reference - javascript can't do this.
// two - passing by value

// FIRST CLASS AND HIGHER-ORDER FUNCTIONS

// JavaScript has first class functions - means functions are treated as values.
// functions are just another "type" of object
// can store functions in variables or properties
// store functions in variables or properties
// pass functions as arguments to OTHER functions
// return functions from functions
// call methods on functions

// Higher-order functions
// a function that recieves another function as an argument, that returns a new function or both.
// This is only possible because of first-clas functions
// Function that recieves another function
// Function that returns a new function

// First class function - a feature that programming languages have - just a concept
// Higher-order functions are in practice possible because language supports first class functions.

// FUNCTIONS ACCEPTING CALLBACK FUNCTIONS
// using abstaction - hiding detail of code implementation because we don't really care about all the detail - hence called abstraction
const oneWord = function(str) {
    return str.replace(/ /g, '').toLowerCase();
    // this function will work on any of our code that has a string - takes in one string and returns a new one without any spaces in it.
};

const upperFirstWord = function(str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
    // this function will transform first word of input to upperCase
    // this code is using destructuring
    // first destructuring first word and then all other words
    // then return new array we will join at the spaces.
    // we use the spread operator in the first const statement
    // we use the rest operator on the return line
};

const transfromer = function(str, fn) {
    // this will take in a function so it is a higher order function
    // console.log(`Original string: ${str}`);
    // this will output:
    // Original string: JavaScript is the best!
    // console.log(`Transformed string: ${fn(str)}`);
    // this is where we will call the function
    // this will output:
    // Transformed string: JAVASCRIPT is the best!
    // console.log(`Transformed by: ${fn.name}`);
    // this is where we use a function property - one of them is the name property so call fn which is the function and on that we read the name property.
    // this will output:
    // Transformed by: upperFirstWord
};

transfromer('JavaScript is the best!', upperFirstWord);
// the transformer function will now transform the string using the function upperFirstWord
// we only passing in the value of function not function itself
// this will output:
// Transformed string: JAVASCRIPT is the best!
// Transformed by: upperFirstWord
transfromer('JavaScript is the best!', oneWord);
// this will output:
// Transformed string: javascriptisthebest!
// Transformed by: oneWord

// above we are calling the transformer function and passing the callback function - onWord and upperFirstWord

// JS uses callbacks all the time!
const high5 = function() {
    // console.log('🙋‍♀️');
};
// document.body.addEventListener('click', high5);
// here we are passing in a callback function in the addEventListener function called high5.

['Sherre', 'Cameron', 'Mark'].forEach(high5);
// this method says for each element in array return callback function of high5 for all three.

// FUNCTIONS RETURNING OTHER FUNCTIONS
const greet = function(greeting) {
    return function(name) {
        // console.log(`${greeting} ${name}`);
    };
};
const greeterHey = greet('Hey');
// now greeterHey is a function
greeterHey('Sherre');
// this will output:
// Hey Sherre
greeterHey('Cameron');
// this will output:
// Hey Cameron
greet('Hello')('Sherre');
// this will output: Hello Sherre
// this works because we are calling the greet function with both parameters - greeting and name

// arrow function version

// const greetArr = greeting => name => console.log(`${greeting} ${name}`);
// I am naming a new variable that will hold an arrow function
// greeting => means call the greeting function
// name => means call the name function then return the console.log info.

// greetArr('Hi')('Sherre');
// this will output: Hi Sherre

// THE CALL AND APPLY METHODS
const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    // book: function() {} // this is old syntax
    book(flightNum, name) {
        // console.log(
        // `${name} booked a seat on ${this.airline} flight ${this.iataCode} ${flightNum}`
        // );
        // this is the new sytax
        // we are using the this keyword to access the object which will return the value based off the key provided i.e  airline or iataCode.
        this.bookings.push({ flight: `${this.iataCode}${flightNum}, name` });
    },
};
// the this keyword above is points to lufthansa object itself
lufthansa.book(239, 'Sherre Ahlers');
// this will output:
// Sherre Ahlers booked a seat on Lufthansa flight LH 239
lufthansa.book(635, 'Cameron Baker');
// this will output:
// Cameron Baker booked a seat on Lufthansa flight LH 635
// console.log(lufthansa);
// this will output:
// {airline: "Lufthansa", iataCode: "LH", bookings: Array(2), book: ƒ}

const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
};

const book = lufthansa.book;
// herer we are creating a new variable which will hold the lufthansa.book  object and function.

// the below doesn't work.
// book(23, 'Sara Smith');
// here we will get an error - cannot read property 'airline' of undefined.
// this book function is no longer the above method it is now a function so this is a regular function call.

// there are 3 function methods that will tell javascript when to use the this keyword
// 1. call method is one of them
// the first argument is what we want the this keyword to point to.
book.call(eurowings, 23, 'Sara Smith');
// this will output:
// {airline: "Lufthansa", iataCode: "LH", bookings: Array(2), book: ƒ}
// console.log(eurowings);
// this will output:
// {name: "Eurowings", iataCode: "EW", bookings: Array(1)}

// above we didn't call book method myself, instead i passed the call method - which will call the book function with the this keyword set to eurowings - this allows us to explicitly call the this keyword on the object we want
book.call(lufthansa, 239, 'Mark Koehler');
// this will output:
// Mark Koehler booked a seat on Lufthansa flight LH 239
// console.log(lufthansa);
// this will output:
// {airline: "Lufthansa", iataCode: "LH", bookings: Array(3), book: ƒ}

const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: [],
};

book.call(swiss, 583, 'Rhonda Johnson');
// this will output:
// Rhonda Johnson booked a seat on Swiss Air Lines flight LX 583
// console.log(swiss);
// this will output:
// {airline: "Swiss Air Lines", iataCode: "LX", bookings: Array(1)}

// APPLY METHOD
// like the call method
// apply does not recieve a list of arguments
// but instead it will take an array of arguments
// not used very often in modern javascript
const flightData = [583, 'Dan Carroll'];
book.apply(swiss, flightData);
// this will output:
// Dan Carroll booked a seat on Swiss Air Lines flight LX 583

// console.log(swiss);
// this will output:
// {airline: "Swiss Air Lines", iataCode: "LX", bookings: Array(2)}

book.call(swiss, ...flightData);

// BIND METHOD
// book.call(eurowings, 23, 'Rhonda Johnson');
const bookEW = book.bind(eurowings);
// this is saying that the this keyword is bound to bookEW.
const bookLH = book.bind(lufthansa);
// this is saying that the this keyword is bound to bookLH.
const bookLX = book.bind(swiss);
// this is saying that the this keyword is bound to bookLX.
// all the above arguments are set in stone
bookEW(23, 'Steven Williams');
// the name of parameters is back to being flightNum and passenger
const bookEW23 = book.bind(eurowings, 23);
// this binds the this keyword to make flightNum always be 23
bookEW23('Sherre Ahlers');
// this will output:
// Sherre Ahlers booked a seat on Eurowings flight EW 23
bookEW23('Cameron Baker');
// this will output:
// Cameron Baker booked a seat on Eurowings flight EW 23

// specifying parts of an argument beforehand is a common patter called partial application - part of the argument of the original function are already applied.

// bind is useful with event listeners
lufthansa.planes = 300;
// this is saying that the lufthansa object has 300 planes
lufthansa.buyPlane = function() {
    // console.log(this);
    // this will output:
    // <button class="buy">Buy new plane</button>
    // the button is the this keyword because it is lufthansa.buyplane being called inside the addEventListener
    this.planes++;
    // the above will add a new plane whenever we click on the button
    // console.log(this.planes);
    // this will output:
    // NaN
};
document
    .querySelector('.buy')
    .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
// each time we click it will increase it by 1
// bind returns a new function

// PARTIAL APPLICATION
// big use case for bind method
// partial application means we can preset parameters
const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));
// the output will be: 220

// this will be a tax we use all the time
const addVAT = addTax.bind(null, 0.23);
// this will set the rate value to 0.23
// the rate will no longer change because it is not preset
// addVat = value => value + value * 0.23;
// console.log(addVAT(100));
// this will output:
//123

// console.log(addVAT(23));
// this will output:
// 28.29

// CHALLENGE
// rewrite above by creating a functiont that will return a function.

// TEACHER VERSION
const addTaxRate = function(rate) {
    return function(value) {
        return value + value * rate;
    };
};
const addVAT2 = addTaxRate(0.23);
// console.log(addVAT2(100));
// console.log(addVAT2(23));

// My version - wrong
// const addTax2 = function(rate) {
//     return function(value) {
//         return value + value * rate;
//     };
// };
// const addVAT2 = addTax2(0.23);
// addVAT2(0.23)(100);
// console.log(addVAT2);

// IMMEDIATELY INVOKED FUNCTION EXPRESSIONS
// (IIFE) -- not widely used anymore.

// run once and never get called again
// write function itself without assigning it to a variable
// (function() {
// console.log('This will never run again.');
// })();
// by wrapping the above function in parenthesis it will make it a function expression
// the end parenthesis is how you immidiately call the function.
// all data defined in the above code scope is hidden from all other scopes

// also works for arrow functions
// (() => console.log('This will ALSO never run again.'))();
// again we call the function immidiatly at the end of the expression with parenthesis.

// Closures - complex mechanism
// hardest to understand
const secureBooking = function() {
    // this function will create the closure
    // closure is not a feature we explicitly used - we do not create closure like we do arrays.
    let passsengerCount = 0;
    // this starts at 0 but we are able to manipulate it.

    return function() {
        passsengerCount++;
        // here I am updating the passenger count variable with each use.
        // console.log(`${passsengerCount} passengers`);
    };
};

// global scope contains secureBooking
// secureBooking() has a variable environment of passengerCount = 0;
// a new function is returned and will be stored in booker variable.
// secureBooking has done job and finished execution so now it is gone.
const booker = secureBooking();
// booker will now be a function

booker();
// it doesn't need arguments because it has no parameters.
// this will output: 1 passengers
booker();
// this will output: 2 passengers
booker();
// this will output: 3 passengers
// what makes it keep counting passengers is the fact that there is a closure.

// booker() is globally scoped so it still has access to variables that existed when it was created.

// closure - how it works
// a new execution context is created an put at the top of the call stack - the context is empty because there are no parameters
//---------IMPORTANT!!------------------
// any function always has access to variable environment of execution context in which function was created
// in case of booker() it was created in the execution context of secure booking.
// therefore booker function will get access to this variable environment which contains the passengerCount variable - its this connection we call closure.
// CLOSURE - Variable environment attached to the function, exactly as it was at the time and place the function was created.
// closure has priority over the scope chain.

// console.dir(booker);
// ƒ anonymous()
// arguments: (...)
// caller: (...)
// length: 0
// name: ""
// prototype: {constructor: ƒ}
// __proto__: ƒ ()
// [[FunctionLocation]]: script.js:397
// [[Scopes]]: Scopes[3]
// 0: Closure (secureBooking) {passsengerCount: 3}
// 1: Script {bookings: Array(5), flight: "LH234", sherre: {…}, createBooking: ƒ, checkIn: ƒ, …}
// 2: Global {window: Window, self: Window, document: document, name: "", location: Location, …}

// this part is variable environment of secureBooking function

// CLOSURE EXAMPLES
let f;
// f is defined in global scope
const g = function() {
    // he we assign g a function which inculdes the a variable
    const a = 23;
    // variable environment goes away
    f = function() {
        // here we assign f a function
        // console.log(a * 2);
    };
};

const h = function() {
    const b = 777;
    f = function() {
        // console.log(b * 2);
    };
};

g();
f();
// the above will output: 46

// Re-assinging f function
h();
f();
// the h() and f() will output: 1554 after they run which is 777*2

// console.dir(f);

// this will output:
// f f()
// arguments: (...)
// caller: (...)
// length: 0
// name: "f"
// prototype: {constructor: ƒ}
// __proto__: ƒ ()
// [[FunctionLocation]]: script.js:462
// [[Scopes]]: Scopes[3]
// 0: Closure (h) {b: 777}
// 1: Script {bookings: Array(5), flight: "LH234", sherre: {…}, createBooking: ƒ, checkIn: ƒ, …}
// 2: Global {window: Window, self: Window, document: document, name: "", location: Location, …}

// EXAMPLE @
const boardPassengers = function(num, wait) {
    const perGroup = num / 3;

    setTimeout(function() {
        // console.log(`We are now boarding all ${num} passengers`);
        //this will output: We are now boarding all 180 passengers
        // console.log(`There are 3 groups, each with ${perGroup} passengers.`);
    }, wait * 1000);
    // whatever code is inside function parameter above will timeout after 1000 (1 second)
    // this will output: There are 3 groups, each with 60 passengers.
    // console.log(`Will start boarding in ${wait} seconds.`);
    // this will output: Will start boarding in 3 seconds.
};

const perGroup = 1000;
// this does not get used because it is out of scope -- will run perGroup on line 494 because that was the locally scoped variable.
boardPassengers(180, 3);