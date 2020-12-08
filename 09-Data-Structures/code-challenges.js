/*
CODING CHALLENGE # 1 
Data Structures, Modern Operators and Strings

We're building a football betting app (soccer for my American friends 😅)!
Suppose we get data from a web service about a certain game ('game' variable on next page). In this challenge we're gonna work with that data.
Your tasks:
1. Create one player array for each team(variables'players1'and 'players2')
2. The first player in any player array is the goal keeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game,Bayern Munich (team1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object,create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (not an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, without using an if/else statement or the ternary operator.

Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored
 
GOOD LUCK 😀
*/

// 1. Create one player array for each team(variables'players1'and 'players2')
// 2. The first player in any player array is the goal keeper and the others are field  players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1.
const [players1, players2] = game.players;
// console.log(players1, players2);
// this will output:
// (11) ["Neuer", "Pavard", "Martinez", "Alaba", "Davies", "Kimmich", "Goretzka", "Coman", "Muller", "Gnarby", "Lewandowski"] (11) ["Burki", "Schulz", "Hummels", "Akanji", "Hakimi", "Weigl", "Witsel", "Hazard", "Brandt", "Sancho", "Gotze"]
// which is a new array containing the values from both independant arrays

// 2.
const [gk, ...fieldPlayers] = players1;
// this will take the players1 array and will say the first value will be a goal keeper so store in gk variable, then next argument is the ...fieldPlayers, which will then add all the rest of the players in the array to a variable called fieldPlayers

// 3.
const allPlayers = [...players1, ...players2];
// console.log(allPlayers);
// this will output:
// (22) ["Neuer", "Pavard", "Martinez", "Alaba", "Davies", "Kimmich", "Goretzka", "Coman", "Muller", "Gnarby", "Lewandowski", "Burki", "Schulz", "Hummels", "Akanji", "Hakimi", "Weigl", "Witsel", "Hazard", "Brandt", "Sancho", "Gotze"]
// because it is using the spread operator - allPlayers will include all players from players1 and all players from players2 because of the ... before each array.

// 4.
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Periscic'];
// console.log(players1Final);
// this will output:
// 14) ["Neuer", "Pavard", "Martinez", "Alaba", "Davies", "Kimmich", "Goretzka", "Coman", "Muller", "Gnarby", "Lewandowski", "Thiago", "Coutinho", "Periscic"]
// because it is taking all the players1, and adding the 3 new players

// 5.
// nested destructuring
// const { odds } = game;
// this would create a variable called odds with the entire object in it.
// instead further destructure:
const {
  odds: { team1, x: draw, team2 },
} = game;
// console.log(team1, draw, team2);
// this will output:
// 1.33 3.25 6.5 because it is calling for all the odds in team1, x, and team2

// 6.
const printGoals = function (...players) {
  //   console.log(`${players.length} goals were scored.`);
  // this will output:
  // 4 goals were scored
  // 2 goals were scored
  // both outputs are based off of code
  // printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
  // printGoals('Davies', 'Muller');
};
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals('Davies', 'Muller');
// printGoals(game.scored); // this will not work the way we want it to, because we only passed in one argument.
// instead do:
printGoals(...game.scored);

// 7.
// team with lower odd is more likely to win
// print to console without ternery or console.log
// team1 < team2 && console.log('Team 1 is more likely to win');
// output will be:
// Team 1 is more likely to win
// because the part of argument before the && operator is true, so it is able to move on to the next argument which  is the console.log

// team1 > team2 && console.log('Team 2 is more likely to win');

/*
CODING CHALLENGE # 2
Let's continue with our football betting app! Keep using the 'game' variable from before.
Your tasks:
1. Loop over the game scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console,but in a nice formatted way,exactly like this:
Odd of victory Bayern Munich: 1.33 Odd of draw: 3.25
Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). Hint: Note how the odds and the game objects have the same property names 😉
4. Bonus: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
     {
       Gnarby: 1,
       Hummels: 1,
       Lewandowski: 2
}
GOOD LUCK 😀
*/

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

// 1.
// use destructuring
// console.log(`Goal ${i + 1}: ${player}.`);
// this will output:
// Goal 1: Lewandowski.
// Goal 2: Gnarby.
// Goal 3: Lewandowski.
// Goal 4: Hummels.

// 2.
// calculate the average of the three odds
for (const [i, player] of game.scored.entries()) {
  const odds = Object.values(game.odds);
  let average = 0;
  for (const odd of odds) average += odd;
  average /= odds.length;
}
// console.log(average);
// this will output:
// 3.693333333333334

// 3.
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `Victory ${game[team]}`;
  // console.log(`Odd of ${teamStr} ${odd}, `);
  // this will output:
  // Odd of Victory Bayern Munich 1.33,
  // Odd of draw 3.25,
  // Odd of Victory Borrussia Dortmund 6.5,
}

// console.log(team, odd);
// this will output:
// team1 1.33
// x 3.25
// team2 6.5

// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5

// CODING CHALLENGE # 3
// Let's continue with our football betting app! This time, we have a map called 'gameEvents' (see below) with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).
// Your tasks:
// 1. Createanarray'events'ofthedifferentgameeventsthathappened(no duplicates)
// 2. Afterthegamehasfinished,iswasfoundthattheyellowcardfromminute64 was unfair. So remove this event from the game events log.
// 3. Computeandlogthefollowingstringtotheconsole:"Aneventhappened,on average, every 9 minutes" (keep in mind that a game has 90 minutes)
// 4. Loopover'gameEvents'andlogeachelementtotheconsole,marking whether it's in the first half or second half (after 45 min) of the game, like this:
// [FIRST HALF] 17: ⚽   GOAL GOOD LUCK 😀

const gameEvents = new Map([
  [17, 'GOAL'],
  [36, 'Substitution'],
  [47, 'GOAL'],
  [61, 'Substitution'],
  [64, 'Yellow card'],
  [69, 'Red card'],
  [70, 'Substitution'],
  [72, 'Substitution'],
  [76, 'GOAL'],
  [80, 'GOAL'],
  [92, 'Yellow card'],
]);

// 1.
// console.log(gameEvents.values());
// this will output:
// MapIterator {"GOAL", "Substitution", "GOAL", "Substitution", "Yellow card", …}
// [[Entries]]
// 0: "GOAL"
// 1: "Substitution"
// 2: "GOAL"
// 3: "Substitution"
// 4: "Yellow card"
// 5: "Red card"
// 6: "Substitution"
// 7: "Substitution"
// 8: "GOAL"
// 9: "GOAL"
// 10: "Yellow card"
// __proto__: Map Iterator
// [[IteratorHasMore]]: true
// [[IteratorIndex]]: 0
// [[IteratorKind]]: "values"

// const events = new Set(gameEvents.values());

// console.log(events);
// this will output:
// Set(4) {"GOAL", "Substitution", "Yellow card", "Red card"}
// [[Entries]]
// 0: "GOAL"
// 1: "Substitution"
// 2: "Yellow card"
// 3: "Red card"
// size: (...)
// __proto__: Set
// add: ƒ add()
// clear: ƒ clear()
// constructor: ƒ Set()
// delete: ƒ delete()
// entries: ƒ entries()
// forEach: ƒ forEach()
// has: ƒ has()
// keys: ƒ values()
// size: (...)
// values: ƒ values()
// Symbol(Symbol.iterator): ƒ values()
// Symbol(Symbol.toStringTag): "Set"
// get size: ƒ size()
// __proto__: Object
// for (const [key, value] of gameEvents)

// NOW CONVERT ABOVE INTO ARRAY:
const events = [...new Set(gameEvents.values())];
// console.log(events);
// this will output:
// (4) ["GOAL", "Substitution", "Yellow card", "Red card"]
// 0: "GOAL"
// 1: "Substitution"
// 2: "Yellow card"
// 3: "Red card"
// length: 4
// __proto__: Array(0)

// 2.
// delete an event that was deemed unfair...
gameEvents.delete(64);

// 3.
// console.log(
//   `An event happended, on average, every ${time1 / gameEvents.size} minutes.`
// );
// this will output:
// An event happened, on average, every 9 minutes.

// BONUS
// const time1 = [...gameEvents.keys()];
// console.log(time1);
// this will output:
// (10) [17, 36, 47, 61, 69, 70, 72, 76, 80, 92]
const time1 = [...gameEvents.keys()].pop();
// console.log(time1);
// this will output:
// 92 because 92 is the last element in the array which pop has now removed

// 3.
// console.log(
// `An event happended, on average, every ${time1 / gameEvents.size} minutes.`
// );
// this will output:
// An event happened, on average, every 9.2 minutes

// 4.
// loop through map
for (const [min, event] of gameEvents) {
  const half = min <= 45 ? 'FIRST' : 'SECOND';
  // console.log(`[${half} HALF] ${min}: ${event}.`);
  // this will output:
  // [FIRST HALF] 17: GOAL.
  // [FIRST HALF] 36: Substitution.
  // [SECOND HALF] 47: GOAL.
  // [SECOND HALF] 61: Substitution.
  // [SECOND HALF] 69: Red card.
  // [SECOND HALF] 70: Substitution.
  // [SECOND HALF] 72: Substitution.
  // [SECOND HALF] 76: GOAL.
  // [SECOND HALF] 80: GOAL.
  // [SECOND HALF] 92: Yellow card.
}

/*
CODING CHALLENGE # 4

Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.
The input will come from a textarea inserted into the DOM (see code below to insert the elements), and conversion will happen when the button is pressed.
Test data (pasted to textarea, including spaces):
underscore_case
 first_name
Some_Variable
  calculate_AGE
delayed_departure

Should produce this output (5 separate console.log outputs): 
underscoreCase ✅
firstName ✅✅
someVariable ✅✅✅
calculateAge ✅✅✅✅
delayedDeparture ✅✅✅✅✅

Hints:
§ Remember which character defines a new line in the textarea 😉
§ The solution only needs to work for a variable made out of 2 words, like a_b
§ Start without worrying about the ✅. Tackle that only after you have the variable
name conversion working 😉
§ This challenge is difficult on purpose, so start watching the solution in case
you're stuck. Then pause and continue!
Afterwards, test with your own test data! GOOD LUCK 😀
*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');

  // console.log(rows);
  // this will output:
  // (5) ["underscore_case", "first_name", "Some_Variable", "calculate_Age", "delayed_departure"]
  // 0: "underscore_case"
  // 1: "first_name"
  // 2: "Some_Variable"
  // 3: "calculate_Age"
  // 4: "delayed_departure"
  // length: 5

  // console.log(text);
  // this will output:
  // underscore_case
  // first_name
  // Some_Variable
  // calculate_Age
  // delayed_departure

  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');
    // console.log(row, first, second);

    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;

    // console.log(output);

    // this will output:
    // underscoreCase
    // firstName
    // someVariable
    // calculateAge
    // delayedDepartures

    // console.log(`${output.padEnd(20)}✅`);

    // the output will be:
    // underscoreCase ✅
    // firstName ✅
    // someVariable ✅
    // calculateAge ✅
    // delayedDepartures ✅

    // console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
    // this will output:
    // underscoreCase ✅
    // firstName ✅✅
    // someVariable ✅✅✅
    // calculateAge ✅✅✅✅
    // delayedDeparture ✅✅✅✅✅
  }
});
