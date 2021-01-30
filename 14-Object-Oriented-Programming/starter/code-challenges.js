// CODE CHALLENGE # 1

// 1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;

// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console.

// 3. Implement a 'brake' method that will decrease the car's speed by 5, and lof the new speed to the console.

// 4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

// DATA CAR 1: 'BMW' going at 120 km/h
// DATA CAR 2: 'Mercedes' going at 95 km/h

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  //   console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  //   console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
// this will output: BMW is going at 130 km/h

bmw.accelerate();
// this will output: BMW is going at 140 km/h

bmw.brake();
// this will output: BMW is going at 135 km/h

bmw.accelerate();
// this will output:  BMW is going at 145 km/h

// CODE CHALLENGE # 2

// 1. Re-create challenge # 1, but this time using an ES6 class;

// 2. Add a getter called 'speedUS'. which returns the current speed in mi/h (divide 1.6)

// 3. Add a setter called 'sppedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value by multiplying the input by 1.6)

// 4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

// DATA CAR 1: 'Ford going at 120 km/h

class CarCL {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}
const ford = new Car('Ford', 120);
ford.speedUS;
ford.accelerate();
ford.accelerate();
ford.brake();
ford.speedUs = 50;
// console.log(ford);
// this will output:
// Car {make: "Ford", speed: 135, speedUs: 50}

// CODE CHALLENGE # 3

// 1. Use a constructor function to implement an Electric Car ( called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property)

// 2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo'

// 3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%

// 4. Create an electric car object and experiment with calling the 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate!

// HINT:
// Review the definition of polymorphism.

// DATA CAR 1: 'Tesla going at 120 km/h, with a charge of 23%

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// Link to the prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  // console.log(
  //   `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}.`
  // );
};

const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
// console.log(tesla);
// this will output:
// EV {make: "Tesla", speed: 120, charge: 90}
// charge: 89
// make: "Tesla"
// speed: 135
// __proto__: Car

tesla.brake();
tesla.accelerate();
// this will output:
// Tesla is going at 135 km/h, with a charge of 89.

// CODE CHALLENGE # 4

// 1. Re-create challenge # 3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class

// 2. Make the 'charge' property private;

// 3. Implement the ability to chain the 'accelerate' and 'chargeBattery; methods of this class, and also update the 'brake' method in teh 'CarCl' class. They experiment with chaining!

// DATA CAR 1: 'Rivian' going 120 km/h, with a charge of 23%

class CarCl1 {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going ${this.speed} km/h.`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going ${this.speed} km/h.`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}
class EVCl extends CarCL {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going ${this.speed} km/h, with a charge of ${
        this.#charge
      }.`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
// console.log(rivian);
// // this will output:
// EVCl {make: "Rivian", speed: 120, #charge: 23}
// make: "Rivian"
// speed: 120
// #charge: 23
// speedUS: (...)
// __proto__: CarCL

// console.log(rivian.#charge);
// this will output an error: Private field #charge' must be declared in an enclosing class

// Chaining methods
rivian.accelerate().accelerate().accelerate().brake();
// .chargeBattery(50)
// this will output:
// Rivian is going 140 km/h, with a charge of 22.
// Rivian is going 160 km/h, with a charge of 21.
// Rivian is going 180 km/h, with a charge of 20.
// Rivian is going at 175 km/h

// console.log(rivian.speedUS);
// this will output: 109.375
