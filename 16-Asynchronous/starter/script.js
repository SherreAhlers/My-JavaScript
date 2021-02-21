// 'use strict';

// const btn = document.querySelector('.btn-country');
// const countriesContainer = document.querySelector('.countries');

// const renderCountry = function (data, className = '') {
//   const html = `
//         <article class="country ${className}">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 10000000
//             ).toFixed(1)} million people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[0].name
//             }</p>
//           </div>
//         </article>
//         `;

//   countriesContainer.insertAdjacentHTML('beforeend', html);
// };

// // MODERN WAY  -- PROMISES
// const renderError = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
// };

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

//     return response.json();
//   });
// };

// const getCountryData = function (country) {
//   // Country 1
//   getJSON(
//     `https://restcountries.eu/rest/v2/name/${country}`,
//     'Country not found.'
//   )
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) throw new Error('No neighbour found!');

//       // Country 2
//       return getJSON(
//         `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err}!!!`);
//       renderError(`Something went wrong!! ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('usa');
// });

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//     })
//     // second callback function will be error
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       // const neighbour = 'skjfdhksh';

//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err}!!!`);
//       renderError(`Something went wrong!!! ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('usa');
// });

// OUTDATED WAY TO CALL AJAX WITHOUT PROMISES

// const btn = document.querySelector('.btn-country');
// const countriesContainer = document.querySelector('.countries');

// const renderCountry = function (data, className = '') {
//   const html = `
//         <article class="country ${className}">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 10000000
//             ).toFixed(1)} million people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[0].name
//             }</p>
//           </div>
//         </article>
//         `;

//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// const getCountryAndNeighbor = function (country) {
//   // AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);

//     // Render country 1
//     renderCountry(data);

//     // Get neighbor country (2)
//     const [neighbor] = data.borders;

//     if (!neighbor) return;

//     // AJAX call counry 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbor}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);

//       //   console.log(data2);
//       // this will be a Spain object -- because that is a neighbor of Portugal

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbor('portugal');
// getCountryAndNeighbor('usa');

// THIS IS EXAMPLE OF CALLBACK HELL!!
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

///////////////////////////////////////
// LECTURES

// Synchronous code runs is executed line by line.
// Each line of code waits for previous line of code to finish executing before it moves on.

// Asynchronous code is executed afrer a task that runs in the "background" finishes.
// Asychronous code is non-blocking  -- rest of code can keep running
// Execution doesn't wait for an asynchronous task to finish its work.

// Build UI to show two cards: 1 for Portugal 1 for US
// const request = new XMLHttpRequest();
// this is XMLHTTPRequest -- outdated
// request.open('GET', 'https://restcountries.eu/rest/v2/name/portugal');
// look in github for public free apis
// CORS -- cross origin resource sharing -- need this to access API's

// request.send();
// this is where we send off request - this request fetches data in background then will emit load event

// request.addEventListener('load', function () {
//   console.log(this.responseText);
// this keyword is linked to request
// responseText -- holds the response -- will only be set once the data has arrived.
// the above creates a big string of text we need to convert

//   const data = JSON.parse(this.responseText);

//   console.log(data);
// this will output the Portugal object
//[{…}]
// 0:
// alpha2Code: "PT"
// alpha3Code: "PRT"
// altSpellings: (4) ["PT", "Portuguesa", "Portuguese Republic", "República Portuguesa"]
// area: 92090
// borders: ["ESP"]
// callingCodes: ["351"]
// capital: "Lisbon"
// cioc: "POR"
// currencies: [{…}]
// demonym: "Portuguese"
// flag: "https://restcountries.eu/data/prt.svg"
// gini: 38.5
// languages: [{…}]
// latlng: (2) [39.5, -8]
// name: "Portugal"
// nativeName: "Portugal"
// numericCode: "620"
// population: 10374822
// region: "Europe"
// regionalBlocs: [{…}]
// subregion: "Southern Europe"
// timezones: (2) ["UTC-01:00", "UTC"]
// topLevelDomain: [".pt"]
// translations: {de: "Portugal", es: "Portugal", fr: "Portugal", ja: "ポルトガル", it: "Portogallo", …}
// __proto__: Object
// length: 1
// __proto__: Array(0)

//   const [data] = JSON.parse(this.responseText);
//   console.log(data);
// this will output: the Portugal object
//   {name: "Portugal", topLevelDomain: Array(1), alpha2Code: "PT", alpha3Code: "PRT", callingCodes: Array(1), …}
// because we destructured the data variable

//   const html = `
//         <article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 10000000
//             ).toFixed(1)} people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[0].name
//             }</p>
//           </div>
//         </article>
//         `;

//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// });
// once load event happens this will run

// --------------THIS IS OUTDATED VERSION-----------
// const request1 = new XMLHttpRequest();
// request1.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
// request.send();

// -----------THIS IS MODERN VERSION--------------------
// const request1 = fetch('https://restcountries.eu/rest/v2/name/portugal');

// console.log(request1);
// this will output:
// Promise {<pending>}
// __proto__: Promise
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: Response

// Promise -- an object that is used as a placeholder for the future result of an asynchronous operation.

// Promise -- A container for an asynchronously delivered value.

// Promise -- A container for future value.

// EXAMPLR OF FUTURE VALUE -- response from the AJAX call

// ADVANTAGE OF USING PROMISES  -- ES6 feature
// We no longer need to rely on events and callbacks passed into asynchronous functions to handle asynchronous results.

// Instead of nesting callbacks, we can chain promises for a sequence of asynchronous operations: escaping CALLBACK HELL

// Promises are time sensitive  -- can be in different states -- lifecycle of promise  -- pending  -- settled (fulfilled) or (rejected) --

// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
// this will output:
//     Response {type: "cors", url: "https://restcountries.eu/rest/v2/name/portugal", redirected: false, status: 200, ok: true, …}
// body: (...)
// bodyUsed: false
// headers: Headers {}
// ok: true
// redirected: false
// status: 200
// statusText: ""
// type: "cors"
// url: "https://restcountries.eu/rest/v2/name/portugal"
// __proto__: Response

//   return response.json();
// the json() is a method on all response values
// the json() is also asynchronous so it will also return a promise
// })
// .then(function (data) {
//   console.log(data);
// [{…}]
// 0: {name: "Portugal", topLevelDomain: Array(1), alpha2Code: "PT", alpha3Code: "PRT", callingCodes: Array(1), …}
// length: 1
// __proto__: Array(0)
//   renderCountry(data[0]);
// });
// the then keyword is a built in method for promises
// the response is a response of the AJAX call
// };
// getCountryData('portugal');

// HOW TO HANDLE ERRORS IN PROMISES
// -- how to handle promise rejections

// fetch only rejects when user loses internet connection

// console.log('Test start');
// this will run 1st

// setTimeout(() => console.log('0 sec timer'), 0);
// both timer and promise will finish after 0 sec
// this will run 4th
// cannot do high precision js with setTimeOut

// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// this allows us to create a promise that is immediatly resolved
// this will run 3rd

// Promise.resolve('Resolved promise 2').then(res => {
// for (let i = 0; i < 1000000; i++) {
// the above simulates that this promise's the micro-task will take a long time
// }

// console.log(res);
// });
// console.log('Test end');
// this will run 2nd

// BUILDING MY OWN PROMISE -- SIMULATE LOTTERY -- reject promise means to lose, fulfilled promises mean to win.

// ----------------CODE CHALLENGE---------------------------

// const btn = document.querySelector('.btn-country');
// const countriesContainer = document.querySelector('.countries');

// const renderCountry1 = function (data, className = '') {
//   const html = `
//         <article class="country ${className}">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 10000000
//             ).toFixed(1)} million people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${
//               data.currencies[0].name
//             }</p>
//           </div>
//         </article>
//         `;

//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

// const renderError1 = function (msg) {
//   countriesContainer.insertAdjacentText('beforeend', msg);
//   countriesContainer.style.opacity = 1;
// };

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

//     return response.json();
//   });
// };

// -------------CODE CHALLENGE #1------------------------

// Part 1
// 1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).

// 2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningul location, like a city and country name. Use this API to do reverse geocoding:
// https://geocode.xyz/api
// The AJAX call will be done to a URL with this format:
// https://geocode.xyz/52.508,13.3817geoit=json
// Use fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating :)

// 3. Once you have the DataCue, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a message to the console: 'You are in Berlin, Germany'

// 4. Chain a .catch method to the end of the promise chain and log errors to the console.error

// 5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

// Part 2
// 6. Now it's time to use the recieved data to render a country. So take the relevant attribute from the geocoding API that we have been using.

// 7. Render the country and catch any errors, just like we have done in the last lecture (you can even copu this code, no need to type the same code.)

// TEST COORDIDINATES 1: 52.508, 13.381 (Latitude, Longitude)
// TEST COORDINATES 2: 19.037, 72.873
// TEST COORDINATES 3: -33.933, 18.474

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat}, ${lng}?geoit=json`)
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${status.code}`);
//       return res.json();
//     })
//     .then(data => {
//       //   console.log(data);
//       //   console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);

//       return res.json();
//     })
//     .then(data => renderCountry1(data[0]))
//     .catch(err => console.error(`${err.message}!!`));
// };

// whereAmI(52.508, 13.381);
// this will bring up the object for Berlin, Germany

// whereAmI(19.037, 72.873);
// this will bring up the object for Mumbai, India

// whereAmI(-33.933, 18.474);
// this will bring up the object for Cape Town, South Africa

// const lotteryPromise = new Promise(function (resolve, reject) {
// this function is called the executer function
// this will create a new promise
// executer function will produce a value
// console.log('Lottery draw is happening!!');
// setTimeout(function () {
//   if (Math.random() >= 0.5) {
//     // the above means we win lottery which means it is a fulfilled promise by calling the resolve method below
//     resolve('You WIN $');
//     // in resolve method we pass the fulfilled value - the result of the promise that will be available in the then handler
//   } else {
//     reject(new Error('You lose $ :('));
//     // in the reject method we place the message we want in the catch() method
//     // creating a new Error()  is a best practice
//   }
// }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
// this will output: You WIN $
// if keep reloading it will throw the error (reject()) = You lose $ :( )

// more real world example of promisifying setTimeOut
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(1)
//   .then(() => {
//     // console.log('1 second passed');
//     return wait(1);
//   })
//   .then(() => {
//     // console.log('2 seconds passed');
//     return wait(1);
//   })
//   .then(() => {
//     // console.log('3 seconds passed');
//     return wait(1);
//   });

// .then(() => console.log('4 seconds passed'));
// the above is a chain of promises without callback hell
// below is the same code - with callback hell

// THIS IS EXAMPLE OF CALLBACK HELL!!
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// Promise.resolve('abc').then(x => console.log(x));
// this will resolve immediately because of the .resolve
// Promise.reject(new Error('Problem')).catch(x => console.error(x));

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // can use above to mark promise as fulfilled or rejected
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );

//     // OR LIKE BELOW
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// // getPosition().then(pos => console.log(pos));

// const whereAmI2 = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       // console.log(pos.coords);

//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       // console.log(data);
//       // console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);

//       return res.json();
//     })
//     .then(data => renderCountry(data[0]));
//   // .catch(err => console.error(`${err.message}!!`));
// };

// btn.addEventListener('click', whereAmI2);

// ---------- Async await--------------------
// this is a function that will perform code in the background while performing code that is inside of it. When function is done it will automatically return a promise.

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function (country) {
//   try {
//     // Geolocation
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     // Reverse geocoding
//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     if (!resGeo.ok) throw new Error('Problem getting location data');

//     const dataGeo = await resGeo.json();
//     // console.log(dataGeo);

//     // Country data
//     // fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res => console.log(res))

//     // the above is exactly the same as below (below is more efficient)

//     const res = await fetch(
//       `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
//     );
//     if (!resGeo.ok) throw new Error('Problem getting country');
//     // fetch is the promise
//     // await will stop the code execution at this point of the function until the promise has been fulfilled (until data has been fetched)

//     const data = await res.json();
//     renderCountry(data[0]);

//     return `You are in ${dataGeo.city}, ${dataGeo.country}`;
//   } catch (err) {
//     // console.error(`${err} !!`);
//     renderError(`${err.message}`);

//     // Reject promise returned from async function
//     throw err;
//   }
// };

// console.log('1: WILL GET LOCATION');
// const city = whereAmI();
// console.log(city);
// console.log('FIRST');

// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} !!`))
//   .finally(() => console.log(`Finished getting location`));
// console.log('3: FINISHED GETTING LOCATION');

// the above code is same as below code

// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(`2: ${city}`);
//   } catch (err) {
//     console.error(`2: ${err.message} !!`);
//   }
//   console.log(`3: Finished getting location`);
// })();
// --------TRY CATCH---------------------

// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message);
//   // this will pop up : Assignment to constant variable  -- which is the catch block
// }

// const get3Countries = async function (c1, c2, c3) {
// try {
// const [data1] = await getJSON(
//   `https://restcountries.eu/rest/v2/name/${c1}`
// );
// const [data2] = await getJSON(
//   `https://restcountries.eu/rest/v2/name/${c2}`
// );
// const [data3] = await getJSON(
//   `https://restcountries.eu/rest/v2/name/${c3}`
// );

// COMBINATOR FUNCTION
// const data = await Promise.all([
//   getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
//   getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
//   getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
// ]);
// Promise.all recieves an array and returns a new promise
// console.log(data.map(d => d[0].capital));

// console.log([data1.capital, data2.capital, data3.capital]);
// console.log(data);
// } catch (err) {
// console.error(err);
// }
// };

// get3Countries('portugal', 'canada', 'tanzania');
// this will output: (3) ["Lisbon", "Ottawa", "Dodoma"]

// COMBINATORS
// 1. Promise.race()  -- recieves an array of promises and returns a promise
// settled as soon as one of imput promises settled -- means a value is available -- doesn't matter if promise was rejected or fulfilled.
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.eu/rest/v2/name/italy`),
//     getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
//     getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
//   ]);
// console.log(res[0]);
// this will outpus: {name: "Italy", topLevelDomain: Array(1), alpha2Code: "IT", alpha3Code: "ITA", callingCodes: Array(1), …}
// })();

// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('Request took too long!'));
//     }, sec * 1000);
//   });
// };

// Promise.race([
//   getJSON(`http://restcountries.eu/rest/v2/name/tanzania`),
//   timeout(0.1),
// ]);
// .then(res => console.log(res[0]))
// .catch(err => console.error(err));

// 2. Promise.allSettled()
// will return array of all settled promises - whether rejected or not -- never short circuits
// Promise.allSettled([
//   Promise.resolve('Sucess'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another success'),
// ]);
// .then(res => console.log(res))
// this will output:
// (3) [{…}, {…}, {…}]
// 0: {status: "fulfilled", value: "Sucess"}
// 1: {status: "rejected", reason: "ERROR"}
// 2: {status: "fulfilled", value: "Another success"}
// .catch(err => console.error(err));
