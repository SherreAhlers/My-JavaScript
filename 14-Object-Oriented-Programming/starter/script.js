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

Person.hey = function () {
  // console.log('Hey there!');
  // console.log(thiis);
  // this will output the constructor function - whatever object is calling the method will be the this keyword
};
Person.hey();
// this will output: Hey there!
// cannot do
// sherre.hey();
// this will throw an error because it is not inherited - it is not is prototype of sherre object

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
  constructor(fullName, birthYear) {
    // this is a method of this class - class PersonCl
    // when we use new keyword this constructor will automatically run
    this.fulName = fullName;
    this.birthYear = birthYear;
  }

  // Methods will be added to the prototype property of the Person class

  // INSTANCE METHODAS
  calcAge() {
    // console.log(2037 - this.birthYear);
    // this is a method written in the class outside the constructor will be on prototype of Object and not on objects themselves - protypal inheritance
  }

  greet() {
    // console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // SET A PROPERTY THAT ALREADY EXISTS
  set fullName(name) {
    if (name.inculdes(' ')) this._fullName = name;
    // the understore is to avoid naming conflict - create a new variable
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  // STATIC METHODS
  static hey() {
    // console.log('Hey there!!');
    // useful to implement helper function
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
// console.log(jessica.age);
// this will ouput: 41

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

// GETTERS AND SETTERS

const walter = new PersonCl('Walter White', 1965);

PersonCl.hey();
// this will output: Hey there!!

const account = {
  // this is an object literal
  owner: 'Sherre',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
  // only need a getter or a setter
};

// console.log(account.latest);
// write latest as if it was a property like above not a latest()
// this will ouput: 300

account.latest = 50;
// console.log(account.movements);
// this will output:
// (5) [200, 530, 120, 300, 50]
// 0: 200
// 1: 530
// 2: 120
// 3: 300
// 4: 50

// IN CONSOLE
// Array.from(document.querySelectorAll('h1))
// this will give you an array - from method is a method attached to array constructor
// [1, 2, 3].from()   -- this will not work because the from is not attached to the prototype it is attached to constructor itself.
// the from method is in the array namespace
// static methods are related to a certain constructor

// Object.create
// no prototype properties involved, no constructor functions and no new operator
// instead use Object.create to manually set prototype to any object we want
const PersonProto = {
  calcAge() {
    // console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
    // this looks like a constructor function but it has nothing to do with a constructor funtion because we are not calling the new keyword
  },
};

const steven = Object.create(PersonProto);
// this object will be prototype of Person Object
// this will return brand new object that is linked to the PersonProto Object  - for now object is empty = add some properties on object
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();
// this will output: 35

// console.log(steven.__proto__ === PersonProto);
// this is PersonProto because that is what we set it to
// this will output: true

const sara = Object.create(PersonProto);
sara.init('Sarah', 1984);
sara.calcAge();

// Inheritance  -- child classes share properties of parent class
// person class would be the parent
// student class would be the child because it is more specific type of person

const Person1 = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
// this is the parent class  above

Person1.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;

  // instead of using duplicate code like above do:
  Person1.call(this, firstName, birthYear);
  this.course = course;
};
// this is the child class  above

// LINKING PROTOTYPES
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  // console.log(`My name is ${this.firstName} and I study ${this.course}.`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
// console.log(mike);
// this will output:
// Student {firstName: "Mike", birthYear: 2020, course: "Computer Science"}
// birthYear: 2020
// course: "Computer Science"
// firstName: "Mike"
// __proto__: Object

mike.introduce();
// this will output:
// My name is Mike and I study Computer Science.
mike.calcAge();
// this will output: 17

// console.log(mike.__proto__);
// console.log(mike.__proto__.__proto__);

// console.log(mike instanceof Student);
// this will output: true

// console.log(mike instanceof Person);
// this will output: true

// console.log(mike instanceof Object);
// this will output: true

Student.prototype.constructor = Student;
// console.dir(Student.prototype.constructor);
// this will output:
// Student(firstName, birthYear, course)
// arguments: (...)
// caller: (...)
// length: 3
// name: "Student"
// prototype: Person {introduce: ƒ, constructor: ƒ}
// __proto__: ƒ ()
// [[FunctionLocation]]: script.js:433
// [[Scopes]]: Scopes[2]

// ES CLASSES
// reference PersonCl class above
class StudentCl extends PersonCl {
  // to inherit we need extends keyword
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear);
    // super is constructor function of the parent class so it gets the methods in the parent class = fullName and birthYear
    // we will not need to specify name of parent class again because it is in the line extends
    // THE SUPER MUST HAPPEN FIRST - this call is resonsible for creating the this keyword of the subclass
    this.course = course;
  }

  introduce() {
    // console.log(`My name is ${this.fullName} and I study ${this.course}.`);
  }

  calcAge() {
    // console.log(
    //   `I'm ${
    //     2020 - this.birthYear
    //   } years old, but as a student I feel more like ${
    //     2037 - this.birthYear + 10
    //   }`
    // );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();
// this will output: I'm 8 years old, but as a student I feel more like 35

// INHERITANCE WITH Object.create
const PersonProto1 = {
  calcAge() {
    // console.log(2020 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const stephen = Object.create(PersonProto1);

const StudentProto = Object.create(PersonProto1);

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto1.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  // console.log(`My name is ${this.fulName} and I study ${this.course}.`);
};
const jay1 = Object.create(StudentProto);
jay1.init('Jay', 2010, 'Computer Science');
jay1.introduce(); // this will output: My name is Jay and I study Computer Science.
jay1.calcAge(); // this will output: 10

// ANOTHER CLASS EXAMPLE
class Account {
  // this is how you define a public field

  // 1. Public fields (instances)
  locale = navigator.language;
  // these will be present on all the instances that we are creating through the Class they are not on the prototype

  // 2. Private fields (instances)
  #movements = [];
  // we cannot access this outside the class now because it is private
  #pin;
  // this is esentially like creating an empty variable

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // this is a protected property below
    // this._pin = pin;
    this.#pin = pin; // now this is a private field
    // this._movements = [];
    // we want to protect the movements array so we put a _ in front of it

    // this.locale = navigator.language;
    // console.log(`Thanks for opening a new account, ${this.owner}!`);
  }

  // 3. Public interface
  // these methods will be added to prototypes
  getMovements() {
    return this.#movements;
  }
  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  // _approveLoan(val) {
  //   // this is a protected method
  //   return true;
  // }
  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      // console.log(`Loan approved!`);
      return this;
    }
  }

  static helper() {
    // console.log('Helper');
  }
  // 4. Private methods - don't exist yet
  // #approveLoan(val) {
  _approveLoan(val) {
    // above is protected not private because it doesn't exist yet
    return true;
  }
}

const acc1 = new Account('Sherre', 'USD', 1212);
// console.log(acc1);
// this will output:
// Account {owner: "Sherre", currency: "USD", pin: 1212, movements: Array(0), locale: "en-US"}
// currency: "USD"
// locale: "en-US"
// movements: []
// owner: "Sherre"
// pin: 1212
// __proto__: Object

// acc1._movements.push(250);
// this is a deposit

// acc1._movements.push(-250);
// this is a withdrawal

acc1.deposit(250);
// this is example of abstraction
acc1.withdraw(140);

// console.log(acc1);
// this will output:
// Account {owner: "Sherre", currency: "USD", pin: 1212, movements: Array(2), locale: "en-US"}
// currency: "USD"
// locale: "en-US"
// movements: (2) [250, -140]
// owner: "Sherre"
// pin: 1212
// __proto__: Object

acc1.requestLoan(1000);
// acc1.approveLoan(1000);
// we should not be able to request this method only the request loan should be able to use the approveLoan()

// console.log(acc1.pin);
// this shouldn't be accessible from outside the class...

// Encapsulation means to keep some methods private from other classes
// 1. prevent code from outside a class to accidentially manipulate data within the class
// 2. When expose only a small API - we can change external with more confidence because we can be sure external code does not rely on these private methods so therefore our code will not break when we do internal changes

// console.log(acc1.getMovements());
// this will allow them to see getMovements but not alter them
// only way to access one to change would be to add the _movements
// this will output: (3) [250, -140, 1000]

// THIS IS NOT A PART OF JS LANGUAGE YET IT IS STILL IN PART 3 -- will be a part of language when it is in Part 4
// properties are usually called fields

// 1. PUBLIC FIELDS
// fields are properties that are on all instances
// these would be like the movements and locale from above because we do not pass any of the values in

// 2. PRIVATE FIELDS
// these will be designated with a # before the name of the field

// PUBLIC METHODS
// we already wrote a bunch of public methods above

// PRIVATE METHODS
// usefull to hide implementation features

// there is also the static methods
// use this by saying static before the method name -- will not be available on instances but on method itself

Account.helper();

// Chaining methods
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);

// console.log(acc1.getMovements());
// this will output:
// (8) [250, -140, 1000, 300, 500, -35, 25000, -4000]
// 0: 250
// 1: -140
// 2: 1000
// 3: 300
// 4: 500
// 5: -35
// 6: 25000
// 7: -4000
// length: 8
// __proto__: Array(0)
