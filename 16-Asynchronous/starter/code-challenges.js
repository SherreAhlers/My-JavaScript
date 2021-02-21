'use strict';
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

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat}, ${lng}?geoit=json`)
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${status.code}`);
//       return res.json();
//     })
//     .then(data => {
//   console.log(data);
//   console.log(`You are in ${data.city}, ${data.country}`);

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

// CODE CHALLENGE # 2
// Build the image loading functionality that I just showed you on the screen

// Part 1.
// 1. Create a function 'createImage' which recieves imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

// Part 2
// 2. Consume the promise using .then and also add an error handler;

// 3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier.

// 4. After the 2 seconds have passed, hide the current image (set display to 'none), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that).

// 5. After the second image has loaded, pause execution for 2 seconds again.

// 6. After the 2 seconds have passed, hide the current image.

// TEXT DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab. otherwise images load too fast.

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('Image not found.'));
//     });
//   });
// };

// let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded.');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded.');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

// CODING CHALLENGE # 3

// Part 1
// Write an async function 'loadPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more. Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

// Part 2
// 1. Create an asynce function 'loadAll' that recieves an array of image paths 'imgArr'.

// 2. Use .map to loop over the array, to load all the images with the 'vreateImage' function (call the resulting array 'imgs').

// 3. Check out the 'imgs' array in the console. Is it like you expected?

// 4. Use a promise combinator function to actually get the images from teh array.

// 5. Add the 'paralell' class to all the images (it has some CSS styles).

// TEST DATA: ['img/img-1.jng', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadPause' function.

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found.'));
    });
  });
};

let currentImg;

// createImage('img/img-1.png')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded.');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

// Part 1
const loadNPause = async function () {
  try {
    // Load image 1
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded.');
    await wait(2);
    img.style.display = 'none';

    // Load image 2
    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded.');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};
// loadNPause();

// Part 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    // console.log(imgs);
    const imgsEl = await Promise.all(imgs);
    // console.log(imgsEl);
    // this will output: 3) [img, img, img]

    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
