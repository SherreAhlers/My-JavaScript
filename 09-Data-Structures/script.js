'use strict';
// Theme of this section: To simulate a foot delivery application.

// Topic - Array destructuring

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    // the above will return the content of the arrays based on given indexes - this(refers to restaurant array) - same with mainMenu at same index main is passed into.
  },

  // orderDelivery: function (obj) {
  // Instead:
  // console.log(obj); // this will output: {time: '22:30", address: 'Via del Sole, 21', mainIndex: 2, starterIndex: 2}
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    // we are passing an object into the function which will automatically destructure - must have exact property names as in object.
    // the properties don't have to be specified in order like with arrays.
    // console.log(
    //   `Order recieved! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    // ); // this will output: Order recieved! Garlic Bread and Risotto will be delivered to Via del Sole, 21 at 22:30
    // console.log(
    // `Order recieved! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    // ); // Now this will output: Order recieved! Bruschetta and Pizza will be delivered to Via del Sole, 21 at 20:00  - because of what we typed on line 53.
  },

  orderPasta: function (ingredient1, ingredient2, ingredient3) {
    // console.log(
    // `Here is your delcious pasta with ${ingredient1}, ${ingredient2} and ${ingredient3}.`
    // ); // this will output: Here is your delicious pasta with a, b and c.
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    // console.log(mainIngredient);
    // this will output: mushrooms because of line 113
    // console.log(otherIngredients);
    // this will output: (3) ['onion', 'olives', 'spinache']  because of line 113
  },
};

restaurant.numGuests = 0;
const guests3 = restaurant.numGuests || 10;
// console.log(guests3);
// output will be:
// 10 because the statement will not work if the numGuests are 0 because 0 is a falsy value. so it will cause it to output 10 instead of 0.

const guestCorrect = restaurant.numGuests ?? 10;
// console.log(guestCorrect);
// this will output: 0 because the  nullish coalescing operator (??) works with the concept of nullish values instead of falsy values.
// Nullish values are: null and undefined
// doesn't include 0 or the ''. - considers the 0 and '' as truthy... ONLY WHEN USE ?? operator

// && and || operator
// console.log(3 || 'Sherre1');
// this will output: 3 because the result of the || operator doesn't always have to be a boolean
// logical operators can use any data type
// logical operators can return a data type
// logical operators can short circuit - means that in || operator if first value is truthy than the other operand will not be evaluated
// console.log('' || 'Sherre1');
// this will output: Sherre1 -- (I was correct!)
// because the '' is a falsy value so second argument will be returned (which is the truthy value)
// console.log(true || 0);
// this will output: true -- (I was correct!)
// because the first value is truthy
// console.log(undefined || null);
// this will output: null -- (I was correct!)
// because undefined is a falsy value so it will go to second operand which is null.
// console.log(undefined || 0 || '' || 'Hello' || 23); // the output will be 'Hello' because the 'Hello' string is a truthy value when all the ones before it are falsy.
// in or operation if first operand is true then js will not have to look at values

// below will never work if numGuests is 0
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// the above is saying:
// check if restaurant.numGuests exists, if it does the result should be restaurant.numGuests but if doesn't exist set a default value of 10
// console.log(guests1); // the output will be:
// 10 -- because the property doesn't already exist so it will get the default value we set in line 82.
const guests2 = restaurant.numGuests || 10;
// console.log(guests2); // the output will be: 10
// because numGuests is undefined so the 2nd value will be the answer.
// ABOVE IS MUCH EASIER STATEMENT WITH SHORT CIRCUTING

// shor circuiting with the && operator
// && operand only works when both values are ture

// console.log('---- AND ----');
// && operator works in exact opposite way as || operator with shortcircuiting
// console.log(0 && 'Sherre1');
// will output: 0 -- because it short circuits if the first value is falsy
// console.log(7 && 'Sherre1');
// output will be: 'Sherre1'
// means entire result of the end operation will be false so there is no reason to continue looking at the rest of the arguments
// console.log('Hello' && 23 && null && 'sherre1');
// output will be: null -- (I was correct!)
// because 'Hello' is truthy so valuation continues, then 23 is truthy so valuation will continue, then null will be falsy so it will shortcircuit because it cannot be true is not all arguments are true so will stop at and output null

if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}
// here we are pretending we do not know if orderPizza exists
// can use and && operator if want to avoid an if statement if we don't know if it exists.
restaurant.orderPizza && restaurant;
// this is saying if restaurant.orderPizza exists than it is a truthy value so check if restaurant exists.
// if restaurant.orderPizza doesn't exist then the whole statement will be false and will not continue running.
// INSTEAD DO THIS:
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
// this says if restaurant. orderPizza exists then order pizza with these arguments
// restaurant.orderPizza('mushrooms', 'spinach')

// Rest pattern and rest parameters
// uses the exact same syntax as spread operator but it is the opposite of the spread operator
const arr2 = [1, 2, ...[3, 4]]; // we are using the spread operator because it is on the right side of the assignment operator

const [a, b, ...others] = [1, 2, 3, 4, 5];
// above it would be the rest operator because it is on the left side of the equals sign
// console.log(a, b, others);
// this above will output: 1 2 (3) [3, 4, 5]

// the first and the second element become the first and second variables then there is the rest pattern - called rest because it will take the remaining elements of the array and put them into a new array.... collects the elements that are unused in the destructuring assignemnt

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
]; // this will be a big array with entire menu in it.
// console.log(pizza, risotto, otherFood);
// the output will be:
// Pizza Risotto (4) ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"]
// this happens because we selected pizza and rissoto and then the rest of the elements - doesn't include any skipped elements. should be used at the end because it is collecting the rest of the elements nothing should come after it. can only be one rest in a destructuring assignments

// OBJECTS
const { sat, ...weekdays } = restaurant.openingHours;
// console.log(weekdays); // this will output:
// script.js:80 {thu: {…}, fri: {…}}
// because we first took sat and assigned it first then added all the rest of the elements into new array called weekdays.

// Rest operator and Functions
const add = function (...numbers) {
  // console.log(numebrs); // will output:
  // (2) [2, 3]
  // (4) [5, 3, 7, 2]
  // (7) [8, 2, 5, 3, 2, 1, 4]
  // rest syntax takes multiple values and compress
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  // console.log(sum);
  // this will output:
  // 5
  // 17
  // 25
};
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinache');
// restaurant.orderPizza('mushroons');

// SPREAD OPERATOR (...)
const arr = [7, 8, 9]; // this is an array literal
// want to create a new array based on above array but with some new elements at the beginning
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArr); // this will output: (5) [1, 2, 7, 8, 9]  - this works but there is a better way --- insert spread operator.

const newArr = [1, 2, ...arr]; // this will expanx array and show all elements
// console.log(newArr); // The output will be: (5) [1, 2, 7, 8, 9]

// if we wrote the above like this:
// const newArr = [1, 2, arr];
// the output would be:
// (3) [1, 2, Array(3)]
// the spread operator is like taking all elements out of the array and putting them into a new array that shows them all

// console.log(...newArr); // this will output:
// 1 2 7 8 9
// which would be the same as writing
// console.log(1, 2, 7, 8, 9); // writing them out individually...
const newMenu = [...restaurant.mainMenu, 'Gnocci']; // here we are adding a new array... expanding on the old array and adding to it.

// console.log(newMenu); // this will output a completely new array: (4) ['Pizza', 'Pasta', 'Risotto', 'Gnocci']

// can only use spread operator in places where we would otherwise write values seperated by commas.

// IMPORTANT USE CASES FOR SPREAD OPERATOR
const mainMenuCopy = [...restaurant.mainMenu];
// here we created a shallow copy of the restaurant main menu array

// Join 2 arrays or more together
const menu1 = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu1); // this will output: (7) ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad", "Pizza", "Pasta", "Risotto"] because we are taking all elements out of starterMenu and mainMenu and combining them into a new array called menu1

// spread operator works on all iteranbles: things like all arrays, strings, maps, sets but NOT objects

// we can use spread operator on strings
const str = 'Sherre1';
const letters = [...str, ' ', 's.'];
// console.log(letters); // will output: (9) ["S", "h", "e", "r", "r", "e", "1", " ", "s."] becuase of the spread operator the above has taken every letter in the string and returned each one into a new array
// console.log(...str); // output will be: (9) ["S", "h", "e", "r", "r", "e", "1", " ", "s."])

// can only use spread operator when building an array or when we pass values into a function
// ex:
// console.log(`${...str} Ahlers`); // this will not work will throw an error: SyntaxError: Unexpected token '...'

const ingredients = [
  //   prompt("Let's make pasta! Ingredient 1?"),
  //   prompt("Let's make pasta! Ingredient 2?"),
  //   prompt("Let's make pasta! Ingredient 3?"),
];
// console.log(ingredients); // this will output: (3) ['a', 'b', 'c']

// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[3]);
// INSTEAD OF ABOVE
restaurant.orderPasta(...ingredients);

// spread operator works on objects in ES2018
// Objects
const newRestaurant = { foundIn: 1998, ...restaurant, founder: 'Guiseppe' }; // this will take original restaurant array and in a new array add all elements from original restaruant array and then will add foundIn: 1998, and founder: 'Guiseppe

// console.log(newRestaurant);
// this will output: {foundIn: 1998, name: "Classico Italiano", location: "Via Angelo Tavanti 23, Firenze, Italy", categories: Array(4), starterMenu: Array(4), …}

const restaruantCopy = { ...restaurant };
restaruantCopy.name = 'Ristorante Roma';
// console.log(restaruantCopy.name);
// this will output: Ristorante Roma
// console.log(restaurant.name);
// this will output: Classico Italiano
// this proves we created a completely new array and added to the new array without effecting the original array.

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});

// DESTRUCTURING OBJECTS
const { name, openingHours, categories } = restaurant;
//in object order of elements doesn't matter will not need to skip elements like with arrays
// Must specify the properties
// console.log(name, openingHours, categories); // this will output: Classico Italiano - {thurs: {}...}, fri: {...}, sat: {...}}
// (4) ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']

// what if we want variable names to be different from the property names?
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
// now the variables we created are restaurantName, hours and tags.
// console.log(restaurantName, hours, tags); // this will output: Classico Italiano - {thurs: {...}, fri: {...}, sat: {...}}
// (4) ['Italian', 'Pizzeria', 'Vegetarian', 'Organic']
// default values are great for when we are dealing with 3rd party data ex: API call - really useful to have a default value unless the property exists.

// DEFAULT Values

const { menu = [], starterMenu: starters = [] } = restaurant;
// if we did not have the empty array as default value in above const then we would get undefined... putting a default in there lets you know there is no data for that point...

// console.log(menu, starters); // this will output: [] (4) ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

// Mutating variables

let d = 111;
let e = 999;
const obj = { d: 23, e: 7, f: 14 };

// {d, e} = obj; // this will not work, must wrap with parenthesis.
({ d, e } = obj);
// console.log(d, e); // this will output: 23 7
// we overwrote the original d, and e properties.

// Nested Objects
// const { fri } = openingHours;
// console.log(fri); // will output will be: {open: 11, close: 23}

// const {
//   fri: { open, close },
// } = openingHours;
// console.log(open, close); // this will output: 11 23

const {
  fri: { open: o, close: c },
} = openingHours;
// console.log(open, close); // this will output: f open() { [native code] } f close() { [native code] }
// console.log(o, c); // this will output: 11 23

// PRACTICAL EXAMPLE OF DESTRUCTURING
// have functions with a lot of parameters, can be hard to know the order of parameters, instead of defining manually can just pass object into the function as an argument function will immediatly destructure object

// Previous lesson...
// const arr = [2, 3, 4];
// const a = [0];
// const b = [1];
// const c = [2];

// array destucturing will allow us to declare all three variables at the same time.
// const [x, y, z] = arr;
// we are destruturing the array from the right side. looks like an array but it is just a destrucuturing - must declare variables using const.

// console.log(x, y, z); // this will output: 2 3 and 4. Original array is not affected - it is being unpacked.
// console.log(arr); // will output (3) [2, 3, 4]

// const [first, second] = restaurant.categories;
// if you want to call the first and third can do:
// const [first, , second] = restaurant.categories; // this would output Italian Vegetarian
// OR
let [main, secondary] = restaurant.categories;
// console.log(main, secondary); // will output Italian Pizzeria

// console.log(first, second); // will output: Italian Pizzeria

// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary); // will output:
// Italian Pizzeria, and  Pizzeria Italian
// OR DESTRUCTURING
[main, secondary] = [secondary, main]; // we will not use const or let here because we are just reassigning the variables not calling new ones
// console.log(main, secondary); // will output:
// Pizzeria Italian (in array that is index 1-Pizzaria and index 0 - Italian)

// Write a function to order food.
restaurant.order(2, 0);
// console.log(restaurant.order(2, 0)); // output will be:
// ['Garlic Bread', 'Pizza']

// Now destructuring
const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse); // will output: Garlic Bread Pizza

// WHAT if we have a nested array?
const nested = [2, 4, [5, 6]];
// how do we get the first and second array as outputs?
// const [i, , j] = nested;
// console.log(i, j); // output will be: 2 (2) [5, 6]

// Now with 3 variables
const [i, , [j, k]] = nested;
// console.log(i, j, k); // this will output: 2 5 6
// the above is example of nested destructuring...

// can set default for values for variables when we are extracting them - good for when we don't know how long arrays are

// Default values
// const [p, q, r] = [8, 9];
// console.log(p, q, r); // this will output 8 9 undefined because the element at r doesn't exist
// instead can set default values
// const [p = 1, q = 1, r = 1] = [8];
// console.log(p, q, r); // will output: 8 1 1 because there is an element 8 and there are no elements for q and r but we set them as default in the statement, so q and r will get the default 1

const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r);
// this will output: 8, 9, 1 because there is no r but it is set to a default of 1

// FOR OF LOOP
const menu2 = [...restaurant.starterMenu, ...restaurant.mainMenu];
// to loop over array with a regular for loop would need to set up a counter a condition and update counter - lot of work - so use for of loop
for (const item of menu2) {
  //   console.log(item);
}
// the above will output:
// Focaccia
// Bruschetta
// Garlic Bread
// Caprese Salad
// Pizza
// Pasta
// Risotto

// this for of loop is called for the item of menu - this loop will automatically loop over all items in the array and will give us access to current array element which we can specifiy after the of

// for of you are able to use continue and break
// if we also want current index and not just current element. bit of a pain in for of loop when we need the index
// you can get both but must be done like this:

for (const item of menu2.entries()) {
  //   console.log(item);
  // this will output:
  // (2) [0, "Focaccia"]
  // (2) [1, "Bruschetta"]
  // (2) [2, "Garlic Bread"]
  // (2) [3, "Caprese Salad"]
  // (2) [4, "Pizza"]
  // (2) [5, "Pasta"]
  // (2) [6, 'Risotto]
}
// console.log(menu.entries());
// this will output:
// Array Iterator {}

// Instead do:
// console.log([...menu2.entries()]);
// this will output:
// (7) [Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2)]

for (const [i, el] of menu2.entries()) {
  // console.log(`${i + 1}: ${el}`);
  // the output will be:
  // 1: Foraccia
  // 2: Bruschetta
  // 3: Garlic Bread
  // 4: Caprese Salad
  // 5: Pizza
  // 6: Pasta
  // 7: Risotto
}

// ENHANCED OBJECT LITERALS
// above restaurant object is an object literal because the object was written using the {}

// const openingHours1 = {
//   thu: {
//     open: 12,
//     close: 24,
//   },
//   fri: {
//     open: 11,
//     close: 23,
//   },
//   sat: {
//     open: 0, // Open 24 Hrs.
//     close: 24,
//   },
// };

const restaurant1 = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
};
// would need to add:

// openingHours: openingHours,
// the above can be annoying because the variable name is the same as the value name

// INSTEAD WRITE:
// ES6 enhanced object literals

// hours,
// OR
// openingHours1,

// don't have to write out the word function

// order(starterIndex, mainIndex) {
//   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
// }
// the above is an enhancement of ES6 - we do not need to write functions like this anymore unless we want to:
//   order: function (starterIndex, mainIndex) {
//   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]
// }

const weekdays1 = ['mon', 'tue', 'wed', 'thurs', 'fri', 'sat', 'sun'];
const openingHours1 = {
  [weekdays1[3]]: {
    open: 12,
    close: 24,
  },
  [weekdays1[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays1[5]]: {
    open: 0, // Open 24 Hrs.
    close: 12 + 12,
  },
};

// console.log(openingHours1);
// this will output:
// {thurs: {…}, fri: {…}, sat: {…}}
// console.log(weekdays1);
// this will output all values in array of weekdays1
