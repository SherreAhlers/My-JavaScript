// CODING CHALLENGE # 1
// MY VERSION
/* 
Given an array of forcasted maximum temperatures, the thermometer displays a string with these temperatures.

Example: [17, 21, 23]  will print "... 17 C in 1 days ... 21 C in 2 days ... 23 C in 3 days ..."

Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.

Use the problem-solving framework: Understanding the problem and break it up into sub-problems!

Test Data 1: [17, 21, 23]
Test Data 2: [12, 5, -5, 0, 4]
*/
// 1) Understanding the problem
// - Array transformed into string, seperated by ...
// - What is the X days? index + 1

// 2) Breaking up into sub-problems
// - Transoform array into string
// - Transorm each element to string with •C
// - Strings need to contain day (index + 1)
// - Add ... between elements and start at end of string

const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];

// console.log(
//   `... ${data1[0]}•C in 1 days ... ${data1[1]}•C in 2 days ... ${data1[2]}•C in 3 days ...`
// );

const printForecast = function (arr) {
  let str = '';

  for (let i = 0; i < arr.length; i++) {
    str = str + ` ${arr[i]}•C in ${i + 1} days ... `;
  }
  //   console.log('...' + str);
};
printForecast(data1);
