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
