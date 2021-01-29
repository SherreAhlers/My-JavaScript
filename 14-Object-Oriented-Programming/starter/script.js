'use strict';

// LECTURES
////////////////////////////////////////////////////////////////

// OBJECT ORIENTED PROGRAMMING
// - uses Class - like a blueprint from which we can create new objects
// -- all objects created through a class Instances of Class (instance is real object we can use in code itself)
// -- can use Class instances multiple times

// 4 principals of OPP:

// 1. Abstraction -- really impoortant - create and use abstractions all the time!
// Ignoring or hiding details that don't matter, allowing us to get an overview perspective of the thing we're implementing, instead of messing with details that don't really matter to our implementation.

// 2. Encapsulation
// Keeping properties and methods private inside the class, so they are not accessible from outside the class. Some methods can be exposed as a public interface(API) -- public interface is essentially all the methods that are not private (not encapsulated)

// 3. Inheritance
// In OOP when we have two classes that are closely related like User and Admin we can have one class Inherit from the other  - one parent and one child class - child class extends the parent class
// Child class inherits all properties from its parent class.
// Child ends up with methods from parent class and some of its own methods the parent doesn't have.

// 4. Polymorphism
// A child class can overwrite a method it Inherited from a parent class
// inherit all properties and methods from parent class (User)

// OOP in JavaScript
// Objects (instances - are objects created from Classes) are instantiated from a class, which functions like a blue print (Class Instance Model)
// Behavior (methods) is copied from class to all instances

// In JavaScript
// Prototype - all objects in JavaScript are linked to a prototype object.  - Prototype- contains methods   Object- can access methods
// This behavior is called prototypal inheritance: The prototype contains methods (behavior) that are accessible to all objects linked to that prototpye.
// Behavior (methods) is delegated to the linked prototype object.

// 3 ways of doing above in Javascript
// 1. Constructor functions  - Technique to create objects from a function  -- This is how built-in objects like Arrays, Maps or Sets are actually implemented

// 2. ES6 Classes - Modern alternative to constructor function syntax -- "Syntactic sugar": behind the scenes, ES6 classes work exactly like constructor functions --- ES6 classed do NOT behave like classes in "classical OPP".  -- Use protoypal inheritance

// 3. Object.create() -- not as used as the other two methods
// -- The easiest an most straighforward way of linking an Object to prototype object.

// can use constructor functions to build an object using a function -- only difference is call constructor function with new keyword
// Constructor functions start with capital letter
// Arrow functions will not work because it doesn't have its own this keyword and we need to be able to access the this keyword with OPP
const Person = function (firstName, birthYear) {
  //   console.log(this);
  // this will output: Person {}
  // Person is name of constructor function
  // at end of function the this keyword will be returned
  this.firstName = firstName;
  // above I am taking the firstName parameter (the value we recieve) and create a property on the this keyword with same name and then set it to that value
  // doesn't have to be the same name but it is convention
  this.birthYear = birthYear;

  //   this.calcAge = function () {
  //       // this is really bad practice -- never do this
  //     console.log(2037 - this.birthYear);
  //   };
};

// only difference between a regular function and a constructor function is new key word
const sherre = new Person('Sherre', 1987);
// behind the scences of calling the new keyword
// 1. new empty object is created
// 2. then function is called and this keyword will be new empty object   this = {}
// 3. newly created object is linked to a prototype
// 4. Object created in beginning is automatically returned from constructor object

// console.log(Sherre);
// this will output:
// Person {firstName: "Sherre", birthYear: 1987}

const jonas = new Person('Jonas', 1991);
const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);

// console.log(jonas, matilda, jack);
// this will output:
// Person {firstName: "Jonas", birthYear: 1991}
// Person {firstName: "Matilda", birthYear: 2017}
// Person {firstName: "Jack", birthYear: 1975}

// console.log(jonas instanceof Person);
// this will output: true  - because jonas is an instance of the class Person

const jay = 'Jay';
// console.log(jay instanceof Person);
// this will output: false  - because jay was not created using a constructor (new keyword)

// PROTOTYPES
//  each and every function in javaScript automatically has a property called prototype that includes constructor functions
// every object created by a certain constructor function will get access to all methods and properties we defined on constructors prototype property

// console.log(Person.prototype);
// this will output:
// constructor: ƒ}
// calcAge: ƒ ()
// constructor: ƒ (firstName, birthYear)
// __proto__: Object

Person.prototype.calcAge = function () {
  2037 - this.birthYear;
};

sherre.calcAge();
// this will output: 50  -- because 2037 - 1987 = 50

// console.log(sherre.__proto__);
// this will output:
// {calcAge: ƒ, constructor: ƒ}
// calcAge: ƒ ()
// constructor: ƒ (firstName, birthYear)
// __proto__: Object

// console.log(sherre.__proto__ === Person.prototype);
// this will output: true

// console.log(Person.prototype.isPrototypeOf(sherre));
// this will output: true

// console.log(Person.prototype.isPrototypeOf(jonas));
// this will output: true

// console.log(Person.prototype.isPrototypeOf(Person));
// this will output: false

// can set properties on prototype not just methods
Person.prototype.species = 'Homo Sapiens';

// console.log(sherre.species, jonas.species);
// this will output:
// Homo Sapiens Homo Sapiens

// console.log(sherre.hasOwnProperty('firstName'));
// this will output: true

// console.log(sherre.hasOwnProperty('species'));
// this will output: false  - because this is not technically a property of sherre but of Person.prototype

// PROTOTYPAL INHERITANCE ON BUILT-IN OBJECTS
// console.log(sherre.__proto__);
// this will output:
// {species: "Homo Sapiens", calcAge: ƒ, constructor: ƒ}
// calcAge: ƒ ()
// species: "Homo Sapiens"
// constructor: ƒ (firstName, birthYear)
// __proto__: Object

// console.log(sherre.__proto__.__proto__);
// this will output:
// {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
// constructor: ƒ Object()
// hasOwnProperty: ƒ hasOwnProperty()
// isPrototypeOf: ƒ isPrototypeOf()
// propertyIsEnumerable: ƒ propertyIsEnumerable()
// toLocaleString: ƒ toLocaleString()
// toString: ƒ toString()
// valueOf: ƒ valueOf()
// __defineGetter__: ƒ __defineGetter__()
// __defineSetter__: ƒ __defineSetter__()
// __lookupGetter__: ƒ __lookupGetter__()
// __lookupSetter__: ƒ __lookupSetter__()
// get __proto__: ƒ __proto__()
// set __proto__: ƒ __proto__()

// console.log(sherre.__proto__.__proto__.__proto__);
// this will output: null -- because the very top of the prototype chain is null

// console.log(Person.prototype.constructor);
// this will output  the function itself
// (firstName, birthYear) {
//   //   console.log(this);
//   // this will output: Person {}
//   // Person is name of constructor function
//   // at end of function the this keyword will be returned
//   this.firstN…

const arr = [3, 6, 4, 5, 6, 9, 3, 6, 9]; // this is same as doing new Array == []

// console.log(arr.__proto__);
// this will output:
// [constructor: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, find: ƒ, …]
// concat: ƒ concat()
// constructor: ƒ Array()
// copyWithin: ƒ copyWithin()
// entries: ƒ entries()
// every: ƒ every()
// fill: ƒ fill()
// filter: ƒ filter()
// find: ƒ find()
// findIndex: ƒ findIndex()
// flat: ƒ flat()
// flatMap: ƒ flatMap()
// forEach: ƒ forEach()
// includes: ƒ includes()
// indexOf: ƒ indexOf()
// join: ƒ join()
// keys: ƒ keys()
// lastIndexOf: ƒ lastIndexOf()
// length: 0
// map: ƒ map()
// pop: ƒ pop()
// push: ƒ push()
// reduce: ƒ reduce()
// reduceRight: ƒ reduceRight()
// reverse: ƒ reverse()
// shift: ƒ shift()
// slice: ƒ slice()
// some: ƒ some()
// sort: ƒ sort()
// splice: ƒ splice()
// toLocaleString: ƒ toLocaleString()
// toString: ƒ toString()
// unshift: ƒ unshift()
// values: ƒ values()
// Symbol(Symbol.iterator): ƒ values()
// Symbol(Symbol.unscopables): {copyWithin: true, entries: true, fill: true, find: true, findIndex: true, …}
// __proto__: Object

// each array will inheirt these methods from the prototype
// console.log(arr.__proto__ === Array.prototype);
// this will output: true

// console.log(arr.__proto__.__proto__);
// this will output:
// {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
// constructor: ƒ Object()
// hasOwnProperty: ƒ hasOwnProperty()
// isPrototypeOf: ƒ isPrototypeOf()
// propertyIsEnumerable: ƒ propertyIsEnumerable()
// toLocaleString: ƒ toLocaleString()
// toString: ƒ toString()
// valueOf: ƒ valueOf()
// __defineGetter__: ƒ __defineGetter__()
// __defineSetter__: ƒ __defineSetter__()
// __lookupGetter__: ƒ __lookupGetter__()
// __lookupSetter__: ƒ __lookupSetter__()
// get __proto__: ƒ __proto__()
// set __proto__: ƒ __proto__()

// any array inherits its methods from prototype
Array.prototype.unique = function () {
  return [...new Set(this)];
};

// console.log(arr.unique());
// this will output:
// (5)[(3, 6, 4, 5, 9)];
// above we extended the prototype -- shouldn't do this often

// ES6 CLASSES
// more modern syntax

// class expression
// const PersonCl = class {};

// this is a class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    // this is a method of this class - class PersonCl
    // when we use new keyword this constructor will automatically run
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // Methods will be added to the prototype property of the Person class
  calcAge() {
    // console.log(2037 - this.birthYear);
    // this is a method written in the class outside the constructor will be on prototype of Object and not on objects themselves - protypal inheritance
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }
}

const jessica = new PersonCl('Jessica', 1996);
// when create a new instance here it is the above constructor that will be called an a new object will be stored into jessica

// console.log(jessica);
// this will output:
// PersonCl {firstName: "Jessica", birthYear: 1996}
// birthYear: 1996
// firstName: "Jessica"
// __proto__: Object

jessica.calcAge();
// this will output: 41  due to the calcAge method

// console.log(jessica.__proto__ === PersonCl.prototype);
// this will output: true

// manually adding a method to prototype
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
// the above works the same as lines 275-277

jessica.greet();
// this will output: Hey Jessica

// 1. Classes are NOT hoisted (we cannot use them before they are declared in the code)
// 2. Classes are first-class citizens - we can pass them into functions and return them from functions
// 3. Classes are executed in strict mode - all code inside class is in strict mode (like at the top of this page)
