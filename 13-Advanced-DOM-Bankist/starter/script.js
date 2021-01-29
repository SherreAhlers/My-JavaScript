'use strict';

// dom selectors
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

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

  const header = document.querySelector('.header');
  const allSections = document.querySelectorAll('.section');

  document.getElementById('section--1');
  const allButtons = document.getElementsByTagName('button');

  const message = document.createElement('div');

  message.classList.add('cookie-message');

  message.textContent =
    'We use cookies for improved functionality and analytics.';
  message.innerHTML =
    'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Agree</button>';

  header.prepend(message);

  document
    .querySelector('.btn--close-cookie')
    .addEventListener('click', function () {
      message.remove();

      message.style.backgroundColor = '#37383d';
      message.style.width = '120%';

      section1.scrollIntoView({ behavior: 'smooth' });
    });
});
///////////////////////////////////////
// Page Navigation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// TABBED COMPONENT

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  // remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Active tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
// use event delegation -find common parent of all links and logo
const handleHover = function (e) {
  // console.log(this, e.currentTarget);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// STICKY NAVIGATION: Intersection Observer API
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isintersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// REVEAL SECTIONS
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);
const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src attribute with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// Sliders - moving slides as we click buttons
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // FUNCTIONS
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // NEXT SLIDE
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // EVENT HANDLERS
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // console.log('DOT');
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();

//////////////////////////////////////////////////////////////////
// LECTURE

//   // DOM SELECTORS - SELECTING ELEMENTS

//   // console.log(document.documentElement);
//   // this will include entire html

//   // console.log(document.head);
//   // this will output the head elements of html

//   // console.log(document.body);
//   // this will output the body elements of html

//   const header = document.querySelector('.header');
//   const allSections = document.querySelectorAll('.section');
//   // console.log(allSections);
//   // this will output: A NodeList containing all the sections in the html

//   document.getElementById('section--1');
//   const allButtons = document.getElementsByTagName('button');
//   // console.log(allButtons);
//   // this will output: A HTMLCollection of all the buttons on the html

//   // console.log(document.getElementsByClassName('btn'));
//   // do not need the . selector just the name of the element
//   // this will output: A HTMLCollection of the btns

//   // CREATING AND INSERTING ELEMENTS
//   // .insertAdjacentHTML
//   const message = document.createElement('div');
//   // this creates a dom object that we can use to do something on it but it is not on the page - if want on page will need to manualy insert it into a page.
//   message.classList.add('cookie-message');
//   // this will display a small cookie message at the bottom of the screen  -- look at css file cookie-message
//   message.textContent =
//     'We use cookies for improved functionality and analytics.';
//   message.innerHTML =
//     'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Agree</button>';
//   // the above will be appended to header

//   header.prepend(message);
//   // this will show up at the top of the message section

//   // header.append(message);
//   // this will make it the last element in the message

//   // header.append(message.cloneNode(true));
//   // this will copy the header message in both places - top and bottom

//   // header.before(message);
//   // this will put the message before the header - a sibling element

//   // header.after(message);
//   // this will put the message after the header

//   // DELETE ELEMENTS
//   document
//     .querySelector('.btn--close-cookie')
//     .addEventListener('click', function () {
//       message.remove();
//       // we don't need a queryselector here because message is already stored in memory.

//       // message.parentElement.removeChild(message)
//       // this is a bit outdated way to do this  - it is called dom traversing
//     });

//   // STYLES, ATTRIBUTES, and CLASSES

//   // STYLES
//   message.style.backgroundColor = '#37383d';
//   message.style.width = '120%';
//   // the above are called inline styles
//   // we can console.log any style we set manually like

//   // console.log(message.style.backgroundColor);
//   // but we won't get a message if we did
//   // console.log(message.style.color);

//   // console.log(getComputedStyle(message));
//   // this will output a huge object of all the styles

//   // console.log(getComputedStyle(message).color);
//   // this will output the color we were trying to use on line 110

//   // message.style.height =
//   //   Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
//   // the result of this is a string - so added the Number.parseFloat() to turn it into a number

//   // CSS VARIABLES
//   // can change a value in many places of all CSS files

//   // :root  in CSS refers to the document element
//   // document.documentElement.style.setProperty('--color-primary', 'orangered');
//   // this is how we change style of page using javescript
//   // works on most css

//   // ATTRIBUTES
//   // ex: in html  - src, alt, class
//   // const logo = document.querySelector('.nav__logo');
//   // console.log(logo.alt);
//   // this will output: Bankist Logo  -- because alt is property of img logo

//   // console.log(logo.src);
//   // this will output: http://127.0.0.1:8080/13-Advanced-DOM-Bankist/starter/img/logo.png
//   // which is the physical location of the logo image file

//   // console.log(logo.className);
//   // this will output: the class name nav__logo

//   // NON STANDARD ATTRIBUTES
//   // console.log(logo.designer);
//   // this below will work, the above will not
//   // console.log(logo.getAttribute('designer'));

//   // console.log(logo.setAttribute('company', 'Bankist'));
//   // this will set the company attribute to Bankist

//   // console.log(logo.getAttribute('src'));
//   // this will output: img/log.png

//   // const link = document.querySelector('.twitter-link');
//   // console.log(link.href);
//   // this will output: the litteral link to twitter account

//   // console.log(link.getAttribute('href'));

//   // DATA ATTRIBUTES
//   // console.log(logo.dataset.versionNumeber);
//   // reference line 25 of html  = data-version-number="3.0"
//   // this  can be very useful

//   // CLASSES

//   // logo.classList.add('c', 'j');
//   // can use multiple classnames with use of ,
//   // logo.classList.remove('c');
//   // logo.classList.toggle('c');
//   // logo.classList.contains('c'); // not includes like array

//   // SHOULD NOT USE - will override whatever was originally there
//   // logo.className = 'jonas'

//   // btnScrollTo.addEventListener('click', function (e) {
//   //   const s1cords = section1.getBoundingClientRect();

//   // console.log(s1cords);
//   // this will output:
//   //   DOMRect {x: 0, y: 61, width: 825, height: 1736, top: 61, …}
//   // bottom: 1797
//   // height: 1736
//   // left: 0
//   // right: 825
//   // top: 61
//   // width: 825
//   // x: 0  // measured from the left side
//   // y: 61 // measured from the top

//   // console.log(e.target.getBoundingClientRect());
//   // this will output:
//   // DOMRect {x: 30, y: 295, width: 112.46875, height: 29, top: 295, …}
//   // x and y will change with a scroll

//   // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
//   // this will output:
//   // Current scroll (X/Y) 0 380

//   // console.log(
//   //   'height/width viewport',
//   //   document.documentElement.clientHeight,
//   //   document.documentElement.clientWidth
//   // );
//   // this will output: height/width viewport 330 825

//   // SCROLLING
//   // window.scrollTo(
//   //   s1cords.left + window.pageXOffset,
//   //   s1cords.top + window.pageYOffset
//   // );
//   // this is global function available on window object

//   // OUTDATED WAY
//   // window.scrollTo({
//   //   left: s1cords.left + window.pageXOffset,
//   //   top: s1cords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });

//   // MORE MODERN WAY
//   section1.scrollIntoView({ behavior: 'smooth' });
//   // only works in modern browsers
// });

// ///////////////////////////////////////
// // Page Navigation

// // document.querySelectorAll('.nav__link').forEach(function (el) {
// //   el.addEventListener('click', function (e) {
// //     e.preventDefault();
// //     const id = this.getAttribute('href');
// //     console.log(id);
// //     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
// //   });
// // });

// // 1. Add event listener to common parent element
// // 2. Determine what element originated the event
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   e.preventDefault();
//   // console.log(e.target);

//   // Matching strategy
//   if (e.target.classList.contains('nav__link')) {
//     const id = e.target.getAttribute('href');
//     // console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   }
//   // used the matching strategy because we wanted to only allow click on relevent elements inside container
// });

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
// const h1 = document.querySelector('h1');

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

// TABBED COMPONENT
// const tabs = document.querySelectorAll('.operations__tab');
// const tabsContainer = document.querySelector('.operations__tab-container');
// const tabsContent = document.querySelectorAll('.operations__content');

// this is a bad practice because if we had 200 tabs it would slow down the page. so instead we use event delegation
// tabs.forEach(t=>t.addEventListener('click', () => console.log('TAB')))
// tabsContainer.addEventListener('click', function (e) {
//   const clicked = e.target.closest('.operations__tab');
// this will find the closest parent with .operations__tab name
// console.log(clicked);

// if(clicked) {
//   clicked.classList.add('operations__tab--active');
// }
// the above is more outdated version see below for newest version
// if (!clicked) return;
// this is called a guard clause -- will return early
// null is falsey value so the ! makes it truthy

// remove active classes
// tabs.forEach(t => t.classList.remove('operations__tab--active'));
// tabsContent.forEach(c => c.classList.remove('operations__content--active'));

// Active tab
// clicked.classList.add('operations__tab--active');

// Activate content area
// console.log(clicked.dataset.tab);
// document
//   .querySelector(`.operations__content--${clicked.dataset.tab}`)
//   .classList.add('operations__content--active');
// everytime we click a button it is stored in clicked variable
// });

// Passing "argument" into handler

// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });
// the above can be done better see below
// nav.addEventListener('mouseover', handleHover.bind(0.5));

// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });
// the above can be done better see below
// nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation
// const initialCords = section1.getBoundingClientRect();
// console.log(initialCords);
// this will output:
// DOMRect {x: 0, y: 540, width: 825, height: 1736, top: 540, …}

// window.addEventListener('scroll', function (e) {
// generally this is bad practice because of all the times the scroll event happens

// console.log(e);
// console.log(window.scrollY);

// a point of view point from start to top of page
//   if (window.scrollY > initialCords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Sticky navigation

// const initialCords = section1.getBoundingClientRect();
// // console.log(initialCords);

// window.addEventListener('scroll', function (e) {
//   if (window.scrollY > initialCords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// STICKY NAVIGATION: Intersection Observer API

// const obsCallback = function (entries, observer) {
//   // whenever section1 is intersecting viewport at 10% (viewport = root) (10% = threshold)
//   // will get called with 2 arguments
//   // entries are array of threshold entries
//   entries.forEach(entry => {
//     console.log(entry);
//     // this will output:
//     // IntersectionObserverEntry {time: 1099.1999999969266, rootBounds: DOMRectReadOnly, boundingClientRect: DOMRectReadOnly, intersectionRect: DOMRectReadOnly, isIntersecting: true, …}
//   });
// };

// const obsOptions = {
//   root: null,
//   // with null we will be able to see our intersecting view on entire view port
//   threshold: [0, 0.2],
//   // will target as soon as moves out of view (0) and when moving out of view (.2)
// };

// // to use start by creating:
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

// want navigation to become sticky when the header moves out of view
// const header = document.querySelector('.header');
// const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);
// this will output:
// DOMRect {x: 30, y: 0, width: 765, height: 90, top: 0, …}bottom: 90height: 90left: 30right: 795top: 0width: 765x: 30y: 0__proto__: DOMRect

// const stickyNav = function (entries) {
//   const [entry] = entries;
//   // console.log(entry);
//   if (!entry.isintersecting) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// };

// const headerObserver = new IntersectionObserver(stickyNav, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navHeight}px`,
// });
// headerObserver.observe(header);

// Lazy Loading Images
// const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);
// this will output: NodeList(3)
// 0: img.features__img.lazy-img
// 1: img.features__img.lazy-img
// 2: img.features__img.lazy-img
// length: 3
// const loadImg = function (entries, observer) {
// const [entry] = entries;
// console.log(entry);

// if (!entry.isIntersecting) return;

// Replace src attribute with data-src
// entry.target.src = entry.target.dataset.src;

// entry.target.addEventListener('load', function () {
// entry.target.classList.remove('lazy-img');
// });

// observer.unobserve(entry.target);
// };

// const imgObserver = new IntersectionObserver(loadImg, {
// root: null,
// threshold: 0,
// rootMargin: '200px',
// });

// imgTargets.forEach(img => imgObserver.observe(img));

// DOM CONTENT LOADED EVENT
// happens on document

// document.addEventListener('DOMContentLoaded', function (e) {
// just javascript and html need to be loaded

// console.log('HTML parsed and DOM tree built!', e);
// this will output:
// HTML parsed and DOM tree built!
// Event {isTrusted: true, type: "DOMContentLoaded", target: document, currentTarget: document, eventPhase: 2, …}bubbles: truecancelBubble: falsecancelable: falsecomposed: falsecurrentTarget: nulldefaultPrevented: falseeventPhase: 0isTrusted: truepath: (2) [document, Window]returnValue: truesrcElement: documenttarget: documenttimeStamp: 3136.9250000025204type: "DOMContentLoaded"__proto__: Event

// do not have to listen to DOMContentLoaded if you have the script tag above the end of body in HTML
// });

// window.addEventListener('load', function (e) {
// console.log('Page fully loaded', e);
// will get first event then when everything is loaded will get another event
// });

// window.addEventListener('beforeunload', function(e) {
// this event is created immediatly before a user is about to close the page
// can use event to ask users if 100% sure want to leave page
// e.preventDefault();

// console.log(e);

// e.returnValue = '';
// now when try to close page, will get pop up asking if want to leave site

// })
