'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map; // the # makes these private instances of the class
  #mapEvent;
  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));
    // will have to bind event listeners to have this keyword point to the object

    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          // this is the error callback
          alert('Could not get your position');
        }
      );
  }
  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];

    // console.log(this);
    this.#map = L.map('map').setView(coords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    // Clear input fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value =
      '';

    // Display marker
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Workout')
      .openPopup();
  }
}

const app = new App();

////////////////////////////////////////////////////////////////
// LECTURE;

// if (navigator.geolocation)
// the above is saying if navigator.geolocation exist do the code below
//   navigator.geolocation.getCurrentPosition(
//     function (position) {
// this is the success callback function which takes an argument

//   console.log(position);
// this will output:
//   GeolocationPosition {coords: GeolocationCoordinates, timestamp: 1612545956626}
// coords: GeolocationCoordinates {latitude: 29.553277500000004, longitude: -98.39896159999999, altitude: null, accuracy: 20, altitudeAccuracy: null, …}
// timestamp: 1612545956626
// __proto__: GeolocationPosition

// const { latitude } = position.coords;
// we are using destructuring instead of writing above like:
// const latitude = position.coords.latitude

// const { longitude } = position.coords;

//   console.log(latitude, longitude);
// this will output: 29.553289600000003 -98.3989904

//   console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);
// this will output:
// https://www.google.pt/maps/@29.5532813,-98.3990014
// which is my google maps location based off of geolocator

//   const coords = [latitude, longitude];

//   const map = L.map('map').setView(coords, 13); // we can add event listener to map object created with const map
// the L is what leaflet gives us as an entry namespace
// the L has some methods we can use on it
// the second argument is the zoom on the map

//   console.log(map);
// this will output:
// i {options: {…}, _handlers: Array(6), _layers: {…}, _zoomBoundLayers: {…}

// the map on page is a bunch of tiles that come from the URL below

//   L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//     attribution:
//       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//   }).addTo(map);

//   // Handling clicks on map
//   map.on('click', function (mapE) {
//     mapEvent = mapE;
//     form.classList.remove('hidden');
//     inputDistance.focus();
//   });
// },
//     function () {
//       // this is the error callback
//       alert('Could not get your position');
//     }
//   );

// cannot use add event listener function because we need to be specific where clicked on map
// so use map.on()  instead

// form.addEventListener('submit', function (e) {
//   e.preventDefault();
// Clear input fields

//   inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

// Display marker
// when leaflet calls this function it will use map created by leaflet.
// console.log(mapEvent);
// this will output the coordinates at the spot clicked on browser.

//   const { lat, lng } = mapEvent.latlng;
//   L.marker([lat, lng])
//     .addTo(map)
//     .bindPopup(
//       L.popup({
//         maxWidth: 250,
//         minWidth: 100,
//         autoClose: false,
//         closeOnClick: false,
//         className: 'running-popup',
//       })
//     )
//     .setPopupContent('Workout')
//     .openPopup();
// above we are creating the marker, then add it to the map
// bind popup will bind the popup to the marker
// inputType.addEventListener('change', function () {
//   inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
//   inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
// });
