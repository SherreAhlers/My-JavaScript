'use strict';

function calcAge(birthYear) {
  const age = 2020 - birthYear;
  // console.log(firstName);

  function printAge() {
    let output = `${firstName}, you are ${age}, and were born in ${birthYear}.`;
    // console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      // var millenial = true;
      // variables with var are function scoped...
      // const firstName = 'Sara'; // this is in same scope so JS will use this variable on line 16. but only inside this block, in the printAge function it will be firstName = 'Sherre. because not in current scope of function.
      // here we are creating a new block and will be a block scope
      const str = `Oh, and you're a millenial, ${firstName}.`;
      // console.log(str);

      function add(a, b) {
        return a + b;
      }

      output = 'New Output.';
    }

    // console.log(str); // will get an error because this is outside the block it was created unlike the above which works.
    // console.log(millenial); // this will work because it is inside this function because it was started with the var keyword.
    // add(2, 3); // this will only work if not in strict mode
    // console.log(add(2, 3)); // this will only work if not in strict mode
    // console.log(output); // this will log 'New Output' because we just redefined output instead of saying const output again.
  }
  printAge();

  return age;
}
// calcAge is declared in global scope because it is at the top.

const firstName = 'Sherre';
// firstName is a global variable
calcAge(1987);
// console.log(age); // here you will get an error because we cannot have access to a variable of a child scope.
// printAge(); // this will give error because it is outside the function it was called in.

// HOISTING

// Hoisting with variables
// console.log(me); // this will output undefined.
// console.log(job); // this will give an error: Cannot access 'job' before initialization.
// console.log(year); // this will output an error: Cannot access 'year' before initialization

var me = 'Sherre';
let job = 'Software Engineer';
const year = 1987;

// Hoisting with functions
// console.log(addDecl(2, 3)); // will output 5 - we were able to call the function before it was defined
// console.log(addExpr(2, 3)); // this will output an error: Cannot access 'addExpr' before initialization
// console.log(addArrow(2, 3)); // will output an error: TypeError: Cannot access 'addArrow' before initialization
//

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

// now if the above was called with var
// console.log(addExpr(2, 3)); // this will output an error: TypeError: addExpr is not a function
// console.log(addArrow(2, 3)); // this will output an error: TypeError: addArrow is not a function

// var addExpr = function (a, b) {
//   return a + b;
// };

// var addArrow = (a, b) => a + b;

// Example

// if (!numProducts) deleteShoppingCart9();
// above reads when there are no products we want to deleteShoppingCart
// output will be 'All products deleted.' Even though there is a variable below of 10, but because of hosting it is reading as undefined.
// Undefined is a falsey value so that will trigger the execution of the above code block because of the !numProducts

// var numProducts = 10;

// function deleteShoppingCart() {
// console.log('All products deleted.');
// }

// DON'T USE VAR - USE CONST MOSTLY UNLESS VARIABLE NEEDS TO CHANGE - DECLARE ALL VARIABLES AT TOP OF CODE FOR CLEANER CODE

var x = 1;
let y = 2;
const z = 3;
// typing window into the console in devtools will show you only the x value in the object, but not the y or z
// console.log(x === window.x); // this will output: true;
// console.log(y === window.y); // this will output: false;
// console.log(z === window.z); // this will output: false

// THE KEYWORD: ---- THIS ------
// console.log(this); // output will be the windowObject

const calcAge1 = function (birthYear) {
  // console.log(2020 - birthYear); // this will output the total 2020 - 1987 = 33
  // console.log(this); // this will output: undefined
};
calcAge1(1987);

const calcAgeArrow = birthYear => {
  // console.log(2020 - birthYear); // this will output: the calculation of 2020 - 1988 = 32
  // console.log(this); // this will output: windowObject  this happens because arrow function doesn't get its out 'this' keyword - it uses the this of the parent scope.
};
calcAgeArrow(1988);

const sherre = {
  year: 1987,
  calcAge1: function () {
    // console.log(this); // this will output the sherre object which is the object that is calling the method.
    // console.log(2020 - this.year); // this will output: the calculation above total = 33
  },
};
sherre.calcAge1();

const cameron = {
  year: 1983,
};

cameron.calcAge1 = sherre.calcAge1;
// the above is called method borrowing - we borrowed one object from another so we didn't have to write it twice.
cameron.calcAge1(); // this will output: 37

const f = sherre.calcAge1;
f(); // the this keyword will be undefined because this f function here is just a regular function call so nothing for the this to attach to.
// will also now get an error from line 123 because the this keyword is no longer attached to anything.

// THIS - ARROW FUNCTIONS & THIS - REGULAR FUNCTIONS
// var firstName1 = 'Gabe';

const sara = {
  firstName1: 'Sara',
  year: 1984,
  calcAge1: function () {
    // console.log(this);
    // console.log(2020 - this.year);

    const self = this; // if use self like this  then change console.log on line 153 to console.log(self)
    // const isMillenial = function () {
    // console.log(self);
    // console.log(this); // this will output: undefined because it is just a regular function call that is inside a method.
    // console.log(this.year >= 1981 && this.year <= 1996); // if call self = this on line 150 then use below code.
    // console.log(self.year >= 1981 && self.year <= 1996); // will output error: TypeError: Cannot read property 'year' of undefined at isMillenial
    // };
    // OR ARROW FUNCTON
    const isMillenial = () => {
      // console.log(this);
      // console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
    // the const self = this will allow an arrow function to use the this key word by calling self instead.
  },

  greet: () => {
    // console.log(this); // this will output: windowObject
    // console.log(`Hey ${this.firstName1}`); // this will output: Hey undefined because the arrow funciton doesn't have its own this so will use the global scope this which is the windowObject
  },
};
sara.greet();
sara.calcAge1();
// console.log(this.firstName); // this will output: undefined

// NEVER USE AN ARROW FUNCTION AS A METHOD!!!!

const addExpr1 = function (a, b) {
  // console.log(arguments);
  return a + b;
};
addExpr1(2, 5);
// can add more arguments than parameters...
// EX:
addExpr1(2, 5, 8, 12); // these will appear but do not have a name
// would use a loop to access the arguments

var addArrow1 = (a, b) => {
  // console.log(arguments); // this will output error: ReferenceError: arguments is not defined at addArrow1
  return a + b;
};
addArrow1(2, 5, 8);

// PRIMATIVE VS OBJECTS
// primative values = 'strings', numbers and boolean values, etc
let age1 = 32;
let oldAge = age1;
age1 = 33;
// console.log(age1);
// console.log(oldAge);

const me1 = {
  name: 'Sherre',
  age1: 33,
};
const friend = me1;
friend.age1 = 37;
// console.log('Friend:', friend); // This will output: { name: 'Sherre', age: 33 }
// console.log('Me:', me1); // This will output: { name: 'Sherre', age: 37 }

// Why the above outputs the way it does:
// Primatives: number, string, boolean, undefined, null, symbol, bigInt... - Primative Types - stored in call stack

// Objects: Object literal, arrays, functions, and many more... - these are considered Reference Types - stored in the HEAP

// Whenever you copy an object it is actually just saved to another variable.

// Primative types
// we are starting by mutating a primative value
let lastName = 'Ahlers';
let oldLastName = lastName;
lastName = 'Baker';
// console.log(lastName, oldLastName);

// Reference Types
// now with an object
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

const marriedJessica = jessica;
// here it looks like we are copying the jessica object but we are just copying the reference to it.
marriedJessica.lastName = 'Davis';
// console.log('Before marriage:', jessica);
// console.log('After marriage:', marriedJessica);
// both variables are just two different names for the same thing.
// marriedJessica = {}; // cannot change this value to a new memory address because of the const on line 230. the above code will produce an error: TypeError: Assignment to constant variable.

// Copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Mother', 'Father', 'Brother'],
};

const jessicaCopy = Object.assign({}, jessica2);
// when use Object.assign({}) will copy properties in the first level
jessicaCopy.lastName = 'Davis';
// console.log('Before marriage:', jessica2);
// console.log('After marriage:', jessicaCopy);

jessicaCopy.family.push('Sister');
jessicaCopy.family.push('Child');

// console.log('Before marriage:', jessica2);
// console.log('After marriage:', jessicaCopy);
