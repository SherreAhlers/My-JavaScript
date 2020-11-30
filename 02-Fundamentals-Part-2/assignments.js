function describeCountry(country, population, capitalCity) {
  return `${country} has ${population} miliion people and its capital city is ${capitalCity}.`;
}
const descFinland = describeCountry("Finland", 6, "Helsinki");

const descGermany = describeCountry("Germany", 10, "Lisbon");

const descUS = describeCountry("United States", 332, "Washington, DC");

// console.log(descFinland, descGermany, descUS);

// const percentageOfWorld1 = function(population) {
//     return (population / 7900) * 100;
// }
// OR
function percentageOfWorld1(population) {
  return (population / 7900) * 100;
}
const percUS = percentageOfWorld1(332);
const percFinland = percentageOfWorld1(6);
const percGermany = percentageOfWorld1(10);

// console.log(percUS, percFinland, percGermany);
// FUNCTION DECLARATIONS VS EXPRESSIONS
const percentageOfWorld2 = function (population) {
  return (population / 7900) * 100;
};

const percPortugal1 = percentageOfWorld1(10);
const percChina1 = percentageOfWorld1(1441);
const percUSA1 = percentageOfWorld1(332);

// console.log(percPortugal1, percChina1, percUSA1);

// ARROW FUNCTIONS
const percentageOfWorld3 = (population) => (population / 7900) * 100;
const calcPercentageOfWorld3 = percentageOfWorld3(6);

// console.log(calcPercentageOfWorld3);

// FUNCTIONS CALLING OTHER FUNCTIONS
// MY VERSION
function describePopulation(country, population) {
  const percent = percentageOfWorld1(population);
  const description = `${country} has ${population} million people, which is about ${percent}% of the world.`;
  return description;
}
describePopulation("china", 1441);
// console.log(describePopulation('china', 1441));

// TEACHER VERSION
// const describePopulation = function (country, population) { const percentage = percentageOfWorld1(population);
//     const description = `${country} has ${population} million people, which is about ${percentage}% of the world.`; console.log(description);
//     };
//     describePopulation('Portugal', 10);
//     describePopulation('China', 1441);
//     describePopulation('USA', 332);

//

// ARRAYS
const populations = [332, 6, 10, 1441];
// console.log(populations.length === 4);

const percentages = [
  percentageOfWorld1(populations[0]),
  percentageOfWorld1(populations[1]),
  percentageOfWorld1(populations[2]),
  percentageOfWorld1(populations[3]),
];

// console.log(percentages);

const neighbors = ["Mexico", "Canada"];

neighbors[2] = "Utopia";
// or
// neighbors.push('Utopia');
// console.log(neighbors);
neighbors.pop();
// console.log(neighbors);

if (!neighbors.includes("Germany")) {
  // console.log('Probably not a European country.')
}

neighbors[neighbors.indexOf("Sweden")] = "Republic of Sweden";
// console.log(neighbors);

// OBJECTS
// const myCountry = {
//     country: 'US',
//     capital: 'Washington D.C',
//     language: 'English',
//     population: 330,
//     neighbors: ['Mexico', 'Canada']
// };

// console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbors.length} neighboring countries and a captial called ${myCountry.capital}.`)

// myCountry.population += 2;
// console.log(myCountry.population);

// myCountry['population'] -= 2;
// console.log(myCountry.population);

// OBJECT METHODS
const myCountry = {
  country: "US",
  capital: "Washington D.C",
  language: "English",
  population: 330,
  neighbors: ["Mexico", "Canada"],
  describe: function () {
    // console.log(`${this.country} has ${this.population} million ${this.language}-speaking people, ${this.neighbors.length} neighboring countries and a capital called ${this.capital}.`)
  },
  checkIsIsland: function () {
    this.isIsland = this.neighbors.length === 0 ? true : false;
  },
};
myCountry.describe();
myCountry.checkIsIsland();
// console.log(myCountry);

// ITERATION: THE FOR LOOP
for (let voter = 1; voter <= 50; voter++) {
  // console.log(`Voter number ${voter} is currently voting.`)
}

// LOOPING ARRAYS - BREAKING AND CONTINUING
const populations1 = [332, 6, 10, 1441];
const percentages2 = [];
for (let i = 0; i < populations1.length; i++) {
  const perc = percentageOfWorld1(populations[i]);
  percentages2.push(perc);
}
// console.log(percentages2);

// LOOPING BACKWARDS and LOOPS IN LOOPS
const listOfNeighbors = [
  ["Canada", "Mexico"],
  ["Spain"],
  ["Norway", "Sweden", "Russia"],
];

for (let i = 0; i < listOfNeighbors.length; i++)
  for (let j = 0; j < listOfNeighbors[i].length; j++);
// console.log(`Neighbors: ${listOfNeighbors[i][j]}`);

// THE WHILE LOOP

const percentages3 = [];
let i = 0;
while (i < populations.length) {
  const perc1 = percentageOfWorld1(populations[i]);
  percentages3.push(perc1);
  i++;
}
// console.log(percentages3);
