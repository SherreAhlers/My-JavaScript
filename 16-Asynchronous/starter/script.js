'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
        <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 10000000
            ).toFixed(1)} million people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>
        `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

// MODERN WAY  -- PROMISES
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => response.json())
    // second callback function will be error
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      // Country 2
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}!!!`);
      renderError(`Something went wrong!!! ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('usa');
});

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
