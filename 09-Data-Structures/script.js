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

// ---------SETS-------------
const orderSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
// console.log(orderSet);
// this will output:
// Set(3) // size of 3
// [[Entries]]
// 0: "Pasta"
// 1: "Pizza"
// 2: "Risotto"
// size: (...)
// __proto__: Set
// all duplicates are gone, there are no key value pairs there are just values grouped together into a set
// Sets are different from Arrays - order in sets is irrelevant
// console.log(new Set('Sherre'));
// this will output:
// Set(4) {"S", "h", "e", "r"}
// it will only show one entry of duplicates
// so Sherre becomes 'S' 'h' 'e' 'r'
// console.log(orderSet.size);
// this will output:
// 3  -- because it will not show duplicates

// console.log(orderSet.has('Pizza'));
// this will output:
// true

// console.log(orderSet.has('Bread'));
// this will output:
// false
orderSet.add('Garlic Bread');
orderSet.add('Garlic Bread');
// console.log(orderSet);
// this will output:
// Set (4) {'Pasta', 'Pizza', 'Risotto', 'Garlic Bread'}
// because even though we wrote it twice, the set will still only allow one to show up because it is the same type
orderSet.delete('Risotto');
// console.log(orderSet);
// this will output:
// Set(3) {"Pasta", "Pizza", "Garlic Bread"}
// this is easy it just deletes from the array

// THERE ARE NO INDEXS IN SETS - no way of getting values out of sets.
// Will not need to get data out of a set because where it is in the set doesn't matter
// Sets are just for seeing what is in something.

// orderSet.clear();
// the above will delete all elements in the set.

// sets are iterable and we can loop over them
// for (const order of orderSet) console.log(order);
// this will output:
// Pasta
// Pizza
// Garlic Bread

// MAIN Use CASES for SETS
// to remove duplicate values of arrays

// EXAMPLE
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// we want a unique array without all the duplicates

// const staffUnique = new Set(staff);
// console.log(staffUnique);
// this will output:
// Set(3) {"Waiter", "Chef", "Manager"}

// NOW WE WANT THE ABOVE OUTPUT TO BE AN ARRAY INSTEAD OF OBJECT

const staffUnique = [...new Set(staff)];
// console.log(staffUnique);
// this will output:
// Set(3) {"Waiter", "Chef", "Manager"}

// console.log(
// new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
// );
// will output:
// 3 because it is telling us the size of the new array that doesn't have any duplicates

// console.log(new Set('sherreahlers').size);
// this will output:
// 6 because that is how many letters are in the string above
// sets are not the same as arrays!!
// they are not as important as arrays.

// ------- Map in JS -------

// maps can have keys with any types -- in objects keys are always strings.
const rest = new Map();
rest.set('name', 'Classico Italiano');
// the first string is the key name and the second string is the actual name of the restaurant
rest.set(1, 'Firenze, Italy');
rest.set(2, 'Lisbon, Portugal');
// console.log(rest.set(2, 'Lisbon, Portugal'));
// the output will be:
// Map(3) {"name" => "Classico Italiano", 1 => "Firenze, Italy", 2 => "Lisbon, Portugal"}

// set method returns a new set
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :)')
  .set(false, 'We are closed :(');
// the above is now the new set
// to read data from a map use the get method
// console.log(rest.get('name'));
// this will output:
// Classico Italiano

// console.log(rest.get(true));
// this will output:
// We are open :)
// console.log(rest.get(1));
// this will output:
// Firenze, Italy

const time = 21;
// 9pm
rest.get(time > rest.get('open') && time < rest.get('close'));
// if current time is between 23 - 11. first true false value and the last will be true or false.

// console.log(rest.get(time > rest.get('open') && time < rest.get('close')));
// this will output:
// We are open
// because 21 falls between 11-23

// console.log(rest.has('categories'));
// this will output:
// true
rest.delete(2);
// console.log(rest);
// this will output:
// Map(7) {"name" => "Classico Italiano", 1 => "Firenze, Italy", "categories" => Array(4), "open" => 11, "close" => 23, …}[[Entries]]0: {"name" => "Classico Italiano"}1: {1 => "Firenze, Italy"}2: {"categories" => Array(4)}3: {"open" => 11}4: {"close" => 23}5: {true => "We are open :)"}6: {false => "We are closed :("}size: (...)__proto__: Map

// console.log(rest.size);
// map has a size property
// the output will be: 7

rest.set([1, 2, 'Test']);
// console.log(rest);
// this will output:
// Map(8) {"name" => "Classico Italiano", 1 => "Firenze, Italy", "categories" => Array(4), "open" => 11, "close" => 23, …}

// console.log(rest.get([1, 2]));
// this will output:
// undefined

const arr3 = [1, 2];
rest.set(arr3, 'Test');
rest.set(document.querySelector('h1'), 'Heading');
// this will show up on the browser...

// console.log(rest);
// this will output:
// Map(9) {"name" => "Classico Italiano", 1 => "Firenze, Italy", "categories" => Array(4), "open" => 11, "close" => 23, …}

// console.log(rest.get(arr3));
// this will output:
// Test

//

// LOOPING OBJECTS
// propety names

const properties = Object.keys[openingHours];
// console.log(properties);
// this will output:
// (3) ['thu', 'fri', 'sat']
// console.log(`We are open on ${properties.length} days.`);
// this will output:
// We are open on 3 days.

let openStr = `We are open on ${properties.length} days:`;
for (const day of properties) {
  openStr += `${day}, `;
}
// console.log(openStr);
// this will output:
// We are open on 3 days: thu, fri, sat

// for (const day of Object.keys(openingHours)) {
// console.log(day);
// this will output:
// thu
// fri
// sat
// {thu: {...}, fri: {...}, sat: {...}}
// }

// Property Values
const values = Object.values(openingHours);
// console.log(values);
// This will output:
// (3) [{...}, {...}, {...}]

// we need entries
// Entire Object
// Object.entries(openingHours);
// OR
const entries = Object.entries(openingHours);
// console.log(entries);
// this will output:
// (3) [Array(2), Array(2), Array(2)]
// for (const x of entries) {
// console.log(x);
// this will output:
// (2) ['thu', {...}]
// (2) ['fri', {...}]
// (2) ['sat', {...}]
// console.log(`On ${key} we open at ${open} and close at ${close}.`);
// will output: KEY is not defined.

// INSTEAD DO with destructuring.......
for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}.`);
  // this will output:
  // On thu we open at 12 and close at 22
  // On fri we open at 11 and close at 23
  // On sat we open at 0 and close at 24
}
// }
// console.log(restaurant.openingHours.mon);
// this will output undefined
// console.log(restaurant.openingHours.mon.open);
// this will output: TypeError: Cannot read property 'open' of undefined.

// if (restaurant.openingHours.mon) {
// console.log(restaurant.openingHours.mon.open);
// this will output: nothing because mon doesn't exist and there is no default value for it to fall back on.
// }
if (restaurant.openingHours && restaurant.openingHours.mon)
  // console.log(restaurant.openingHours.mon.open);

  // WITH optional chaining

  // console.log(restaurant.openingHours.mon?.open);
  // the above is saying if the property before the ? exits than it will run the statement, if it doesn't exits
  // the output will be: undefined

  console.log(restaurant.openingHours?.mon?.open);
// the above says if opeiningHours doesn't exist then stop running and don't go to mon, if it does exist check if monday exists next.

// Example

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  // console.log(day);
  // this will output:
  // mon
  // tue
  // wed
  // thu
  // fri
  // sat
  // sun
  // const open = restaurant.openingHours[day]?.open;
  // we used the bracket notation because we are declaring the variable days instead of the property name.
  // this will also check if open exists
  // console.log(`On ${day}, we open at ${open}.`);
  // this will output:
  // On mon, we open at undefined.
  // On tue, we open at undefined.
  // On wed, we open at undefined.
  // On thu, we open at 12.
  // On fri, we open at 11.
  // On sat, we open at 0.
  // On sun, we open at undefined.
  // WE DO NOT LIKE THE UNDEFINEDS ABOVE
  // const open = restaurant.openingHours[day]?.open || 'closed';
  // console.log(`On ${day}, we open at ${open}.`);
  // this will output:
  // On mon, we open at closed.
  // On tue, we open at closed.
  // On wed, we open at closed.
  // On thu, we open at 12.
  // On fri, we open at 11.
  // On sat, we open at closed. // here we have an error because the restaurant is open on sat but it is listed at 0 which is a falsy value so it is saying it is closed.
  // On sun, we open at closed.
  // TO FIX ABOVE ERROR ON SAT
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  // use the ?? instead of || because we need the 0 on saturday to be a truthy value.
  // console.log(`On ${day}, we open at ${open}.`);
  // the output will be the same as above example only now sat will read like this:
  // On sat, we open at 0.

  // if (restaurant.openingHours.fri) {
  // console.log(restaurant.openingHours.fri.open);
  // this will output: 11 because fri exists and has an opening time.
  // }
}

// OPTIONAL CHANING ON METHODS!
// console.log(restaurant.order?.(0, 1) ?? 'Method does not exist.');
// the output will be:
// (2) ["Focaccia", "Pasta"]

// console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist.');
// this will output:
// Method does not exist. because there is no orderRisotto method created previously

// Optional CHAINGING ON ARRAYS
const users = [{ name: 'Sherre', email: 'sherre.ahlers@gmail.com' }];
console.log(users[0]?.name ?? 'User array empty.');
// this will output: Sherre because there is a name in the users array, if there wasn't it would output 'User array empty.'

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
