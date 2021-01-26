'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button scrolling

btnScrollTo.addEventListener('click', function (e) {
  const s1cords = section1.getBoundingClientRect();

  ////////////////////////////////////////////////////////////////
  // LECTURE

  // DOM SELECTORS - SELECTING ELEMENTS

  // console.log(document.documentElement);
  // this will include entire html

  // console.log(document.head);
  // this will output the head elements of html

  // console.log(document.body);
  // this will output the body elements of html

  const header = document.querySelector('.header');
  const allSections = document.querySelectorAll('.section');
  // console.log(allSections);
  // this will output: A NodeList containing all the sections in the html

  document.getElementById('section--1');
  const allButtons = document.getElementsByTagName('button');
  // console.log(allButtons);
  // this will output: A HTMLCollection of all the buttons on the html

  // console.log(document.getElementsByClassName('btn'));
  // do not need the . selector just the name of the element
  // this will output: A HTMLCollection of the btns

  // CREATING AND INSERTING ELEMENTS
  // .insertAdjacentHTML
  const message = document.createElement('div');
  // this creates a dom object that we can use to do something on it but it is not on the page - if want on page will need to manualy insert it into a page.
  message.classList.add('cookie-message');
  // this will display a small cookie message at the bottom of the screen  -- look at css file cookie-message
  message.textContent =
    'We use cookies for improved functionality and analytics.';
  message.innerHTML =
    'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Agree</button>';
  // the above will be appended to header

  header.prepend(message);
  // this will show up at the top of the message section

  // header.append(message);
  // this will make it the last element in the message

  // header.append(message.cloneNode(true));
  // this will copy the header message in both places - top and bottom

  // header.before(message);
  // this will put the message before the header - a sibling element

  // header.after(message);
  // this will put the message after the header

  // DELETE ELEMENTS
  document
    .querySelector('.btn--close-cookie')
    .addEventListener('click', function () {
      message.remove();
      // we don't need a queryselector here because message is already stored in memory.

      // message.parentElement.removeChild(message)
      // this is a bit outdated way to do this  - it is called dom traversing
    });

  // STYLES, ATTRIBUTES, and CLASSES

  // STYLES
  message.style.backgroundColor = '#37383d';
  message.style.width = '120%';
  // the above are called inline styles
  // we can console.log any style we set manually like

  // console.log(message.style.backgroundColor);
  // but we won't get a message if we did
  // console.log(message.style.color);

  // console.log(getComputedStyle(message));
  // this will output a huge object of all the styles

  // console.log(getComputedStyle(message).color);
  // this will output the color we were trying to use on line 110

  // message.style.height =
  //   Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
  // the result of this is a string - so added the Number.parseFloat() to turn it into a number

  // CSS VARIABLES
  // can change a value in many places of all CSS files

  // :root  in CSS refers to the document element
  // document.documentElement.style.setProperty('--color-primary', 'orangered');
  // this is how we change style of page using javescript
  // works on most css

  // ATTRIBUTES
  // ex: in html  - src, alt, class
  // const logo = document.querySelector('.nav__logo');
  // console.log(logo.alt);
  // this will output: Bankist Logo  -- because alt is property of img logo

  // console.log(logo.src);
  // this will output: http://127.0.0.1:8080/13-Advanced-DOM-Bankist/starter/img/logo.png
  // which is the physical location of the logo image file

  // console.log(logo.className);
  // this will output: the class name nav__logo

  // NON STANDARD ATTRIBUTES
  // console.log(logo.designer);
  // this below will work, the above will not
  // console.log(logo.getAttribute('designer'));

  // console.log(logo.setAttribute('company', 'Bankist'));
  // this will set the company attribute to Bankist

  // console.log(logo.getAttribute('src'));
  // this will output: img/log.png

  // const link = document.querySelector('.twitter-link');
  // console.log(link.href);
  // this will output: the litteral link to twitter account

  // console.log(link.getAttribute('href'));

  // DATA ATTRIBUTES
  // console.log(logo.dataset.versionNumeber);
  // reference line 25 of html  = data-version-number="3.0"
  // this  can be very useful

  // CLASSES

  // logo.classList.add('c', 'j');
  // can use multiple classnames with use of ,
  // logo.classList.remove('c');
  // logo.classList.toggle('c');
  // logo.classList.contains('c'); // not includes like array

  // SHOULD NOT USE - will override whatever was originally there
  // logo.className = 'jonas'

  // btnScrollTo.addEventListener('click', function (e) {
  //   const s1cords = section1.getBoundingClientRect();

  // console.log(s1cords);
  // this will output:
  //   DOMRect {x: 0, y: 61, width: 825, height: 1736, top: 61, …}
  // bottom: 1797
  // height: 1736
  // left: 0
  // right: 825
  // top: 61
  // width: 825
  // x: 0  // measured from the left side
  // y: 61 // measured from the top

  // console.log(e.target.getBoundingClientRect());
  // this will output:
  // DOMRect {x: 30, y: 295, width: 112.46875, height: 29, top: 295, …}
  // x and y will change with a scroll

  // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  // this will output:
  // Current scroll (X/Y) 0 380

  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  // this will output: height/width viewport 330 825

  // SCROLLING
  // window.scrollTo(
  //   s1cords.left + window.pageXOffset,
  //   s1cords.top + window.pageYOffset
  // );
  // this is global function available on window object

  // OUTDATED WAY
  // window.scrollTo({
  //   left: s1cords.left + window.pageXOffset,
  //   top: s1cords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // MORE MODERN WAY
  section1.scrollIntoView({ behavior: 'smooth' });
  // only works in modern browsers
});

///////////////////////////////////////
// Page Navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
  // used the matching strategy because we wanted to only allow click on relevent elements inside container
});

// EVENTS - MOUSE ENTER EVENT
// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
// alert('addEventListener: Great! You are reading the heading.');

// h1.removeEventListener('mouseenter', alertH1);
// the above makes it so we can only listen to the event just once not multiple times
// };

// h1.addEventListener('mouseenter', alertH1);
//   alert('addEventListener: Great you are reading the heading');
// });
// the above will work as soon as the mouse is hovering over element selected
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
// the above will remove the event handler after 3 seconds

// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great you are reading the heading');
// };
// the above is an oldschool way to do things = use addEventListener is more popular
// addEventListener will allow us to change multiple

// can remove addEventListener - export function into a named function

// EVENT - BUBBLING AND CAPTURING
// click event starts at document root and travels down the tree through every parent element until it reaches its target where the target phase will begin
// event listeners wait for event to happen on certain elements then runs the callback funtions

// EVENT PROPAGATION AND BUBBLING
// rgb(255,255,255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// console.log('LINK', e.target, currentTarget);
// e.target is where the click happened
// currentTarget is the element on which e.target is attached
// currentTarget === 'this' keyword - this keyword gets whole element

// STOP PROPAGATION
// e.stopPropagation();
// now the two parent elements did not change background colors because we stopped it before it got to parent element
// in general not a good Idea to stop propagation of events
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// console.log('CONTAINER', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
// this.style.backgroundColor = randomColor();
// console.log('NAV', e.target, e.currentTarget);
// });

// EVENTS  are captured when they come down from the root
// capturing is rarely used anymore

// DOM TRAVERSING
const h1 = document.querySelector('h1');

// GOING DOWNWARDS
//selecting child elements

// console.log(h1.querySelectorAll('.highlight'));
// this will select all elements of highlight class inside the h1 element (the highlight class is a child of the h1)

// console.log(h1.childNodes);
// this will output: text, comment, elements, etc.

// console.log(h1.children);
// this will output an HTML collections (a live collection)
// works only for direct children

// h1.firstElementChild.style.color = 'white';
// this will make first child element of h1 be a white colored

// h1.lastElementChild.style.color = 'orangered';
// this will make the last child element of h1 be orangered

// GOING UPWARDS
// console.log(h1.parentNode);
// this will output: the direct parent of h1 is the  class="header__title"

// console.log(h1.parentElement);
// this will output: div class="header__title"
// <h1></h1>  <h4>text in here</h4>  button and img all inside the div class="header__title"

// h1.closest('.header').style.background = 'var(--gradient-secondary';
// this will tell you the closes parent element to h1 that has the class --gradient-secondary

// h1.closest('h1').style.background = 'var(--gradient-primary)';

// GOING SIDEWAYS
//selecting siblings (can only access direct siblings)

// console.log(h1.previousElementSibling);
// this will be null because there is no previous sibling because it is the first element

// console.log(h1.nextElementSibling);
// this will output: <h4>text in here</h4>   because this is the element that comes after the first element

// console.log(h1.previousSibling);
// this will output: #text because that is the first sibling to the selected element

// console.log(h1.nextSibling);
// this will output: #text because that is the next elemnt after this one

// console.log(h1.parentElement.children);
// this will output:
// HTMLCollection(4) [h1, h4, button.btn--text.btn--scroll-to, img.header__img]

// [...h1.parentElement.children].forEach(function (el) {
// if (el !== h1) el.style.transform = 'scale(0.5)';
// this will change the style of all siblings of one element
// });
