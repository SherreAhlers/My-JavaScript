// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// const x = 23;
// if (x === 23) console.log(23);

// const calcAge3 = birthYear => 2020 - 1987;
// all need to do is type cl and enter and will write console.log(); for me.

// console.log(x);
// console.log(calcAge3());

// words I can type to highlight - helpful!
// BUG FIXME LEC TODO

// if want to "go Live" click on bottom of vs code
// once go live will open browser, make sure on html page before click go live

// 2nd way to go live is to
// type live-server in vs code terminal... and control + c to quit

// Problem:
//  We work for a company building smart home thermometer. Out most recent task is this:
// "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error."

const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

// 1) Understanding the problem
// - What is the temp amplitude?
// Answer:
// The difference between the highest and the lowest temperature.
// - How to compute max and min temperatures?
// - What is a sensor error? What to do with error?

// 2) Breaking up into sub-problems
// - How to ignore errors?
// - Find max value in temperature array.
// - Find the min value in temperature array.
// - Subtract min from max (amplitude) and return it
const calcTempAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  //   console.log(max, min);
  return max - min;
};
calcTempAmplitude([3, 7, 4, 1, 8]);
// max will be first element of array: 3, then we ask is 3 > 3: no, then ask is 7 > 3: yes, so 7 becomes new max, then ask is 7 > 4: no. End result: max = 7;
const amplitude = calcTempAmplitude(temperatures);

// console.log(amplitude);

// Problem 2
// Function should now recieve 2 arrays of temps

// 1) Understanding the problem
// - With 2 arrays, should we implement functionality twice?
// Answer: No! Just merge two arrays

// 2) Breaking up into sub-problems
// - Merge 2 arrays
const calcTempAmplitudeNew = function (t1, t2) {
  const temps = t1.concat(t2);
  //   console.log(temps);

  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  //   console.log(max, min);
  return max - min;
};
const amplitudeNew = calcTempAmplitudeNew([3, 5, 1], [9, 0, 5]);

// console.log(amplitudeNew);

// DEBUGGING AND FIXING ERRORS
// using console
const measureKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'celcius',

    // C) FIX
    // value: Number(prompt('Degrees celcius:')),
    value: 10,
    // adding the Number() before the prompt() will return a number instead of a string.
  };
  //   console.log(measurement); // the problem is the value is a string - the reason why is because the prompt() will always return a string.

  //   console.log(measurement.value); // this looks normal - output = 10
  //   console.warn(measurement.value);
  //   console.error(measurement.value);
  //   console.table(measurement);
  const kelvin = measurement.value + 273;
  return kelvin;
};
// console.log(measureKelvin());
// output 10273
// output wanted: 283

// BIGGER BUG IN CODE - USE DEBUGGER
const calcTempAmplitudeBug = function (t1, t2) {
  const temps = t1.concat(t2);
  //   console.log(temps);

  let max = 0;
  let min = 0;

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue;

    // debugger; // this is javascript built in debugger
    // look at it in console
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  //   console.log(max, min);
  return max - min;
};
const amplitudeBug = calcTempAmplitudeBug([3, 5, 1], [9, 4, 5]);
// Identified the bug - go back to debugger.

// console.log(amplitudeBug);
