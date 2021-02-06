'use strict';

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in minutes
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April','May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

///////////////////////////////////////////////////////////////
// APPLICATION ARCHITECTURE

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map; // the # makes these private instances of the class
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];

  constructor() {
    // Get user's position
    this._getPosition();

    // Get data from locak storage
    this._getLocalStorage();

    // Attach event handlers
    form.addEventListener('submit', this._newWorkout.bind(this));

    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
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

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    // Empty fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value =
      '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    const validInputs = (
      ...inputs // the ..inputs means many inputs can be used
    ) => inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // Check if data is valid

    // If workout is running, create running object
    if (type === 'running') {
      // Check if data is valid  -- should be a number
      const cadence = +inputCadence.value;
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout is cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);

    // Render workout on map as marker
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkout(workout);

    // Hide form + clear input fields
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
          `;

    if (workout.type === 'running')
      html += `
           <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
        `;

    if (workout.type === 'cycling')
      html += `
      <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
        `;
    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    // console.log(workoutEl);

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );
    // console.log(workout);

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    // console.log(data);

    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();

////////////////////////////////////////////////////////////////
// LECTURE;

// class Workout {
//   date = new Date();
//   id = (Date.now() + '').slice(-10);

//   constructor(coords, distance, duration) {
//     // this.date = date;  -- don't need because we called outside the constructor above
//     // this.id = id;   -- don't need because we called outside the constructor above
//     this.coords = coords; // [lat, lng]
//     this.distance = distance; // in km
//     this.duration = duration; // in minutes
//   }
// }

// class Running extends Workout {
//   constructor(coords, distance, duration, cadence) {
//     super(coords, distance, duration);
//     this.cadence = cadence;
//     this.calcPace();
//   }

//   calcPace() {
//     // min/km
//     this.pace = this.duration / this.distance;
//     return this.pace;
//   }
// }

// class Cycling extends Workout {
//   constructor(coords, distance, duration, elevationGain) {
//     super(coords, distance, duration);
//     this.elevationGain = elevationGain;
//     this.calcSpeed();
//   }

//   calcSpeed() {
//     // km/h
//     this.speed = this.distance / (this.duration / 60);
//     return this.speed;
//   }
// }
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

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);

// console.log(run1, cycling1);
// this will output:
// Running {date: Fri Feb 05 2021 16:30:49 GMT-0600 (Central Standard Time), id: "dard Time)", coords: Array(2), distance: 5.2, duration: 24, …} Cycling {date: Fri Feb 05 2021 16:30:49 GMT-0600 (Central Standard Time), id: "dard Time)", coords: Array(2), distance: 27, duration: 95, …}

//  _newWorkout(e) {
//     const validInputs = (
//       ...inputs // the ..inputs means many inputs can be used
//     ) => inputs.every(inp => Number.isFinite(inp));
//     const allPositive = (...inputs) => inputs.every(inp => inp > 0);

//     e.preventDefault();

//     // Get data from form
//     const type = inputType.value;
//     const distance = +inputDistance.value;
//     const duration = +inputDuration.value;
//     const { lat, lng } = this.#mapEvent.latlng;
//     let workout;

//     // Check if data is valid

//     // If workout is running, create running object
//     if (type === 'running') {
//       // Check if data is valid  -- should be a number
//       const cadence = +inputCadence.value;
//       if (
//         // !Number.isFinite(distance) ||
//         // !Number.isFinite(duration) ||
//         // !Number.isFinite(cadence)
//         !validInputs(distance, duration, cadence) ||
//         !allPositive(distance, duration, cadence)
//       )
//         return alert('Inputs have to be positive numbers!');
//       // here we are using a guard clause -- means check for opposite of what we are intereseted in if true return function immediatly
//       // if is not a number return immediatly

//       workout = new Running([lat, lng], distance, duration, cadence);
//     }

// console.log(workout);
// this will output: Running {date: Fri Feb 05 2021 17:08:24 GMT-0600 (Central Standard Time), id: "2566504975", coords: Array(2), distance: 5, duration: 5, …}
// cadence: 5
// coords: (2) [29.55240386633142, -98.40471267700197]
// date: Fri Feb 05 2021 17:08:24 GMT-0600 (Central Standard Time) {}
// distance: 5
// duration: 5
// id: "2566504975"
// pace: 1
// __proto__: Workout

//     // If workout is cycling, create cycling object
//     if (type === 'cycling') {
//       const elevation = +inputElevation.value;

//       if (
//         !validInputs(distance, duration, elevation) ||
//         !allPositive(distance, duration)
//       )
//         return alert('Inputs have to be positive numbers!');

//       workout = new Cycling([lat, lng], distance, duration, elevation);
//     }

//     // Add new object to workout array
//     this.#workouts.push(workout);
//     console.log(workout);

//     // Render workout on map as marker
//     L.marker([lat, lng])
//       .addTo(this.#map)
//       .bindPopup(
//         L.popup({
//           maxWidth: 250,
//           minWidth: 100,
//           autoClose: false,
//           closeOnClick: false,
//           className: 'running-popup',
//         })
//       )
//       .setPopupContent('Workout')
//       .openPopup();

//     // Render workout on list

//     // Hide form + clear input fields
//     inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value =
//       '';
//   }
// }
