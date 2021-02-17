'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry1 = function (data, className = '') {
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
  countriesContainer.style.opacity = 1;
};

const renderError1 = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// CODE CHALLENGE #1

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

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat}, ${lng}?geoit=json`)
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${status.code}`);
      return res.json();
    })
    .then(data => {
      //   console.log(data);
      //   console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry1(data[0]))
    .catch(err => console.error(`${err.message}!!`));
};

// whereAmI(52.508, 13.381);
// this will bring up the object for Berlin, Germany

// whereAmI(19.037, 72.873);
// this will bring up the object for Mumbai, India

// whereAmI(-33.933, 18.474);
// this will bring up the object for Cape Town, South Africa
