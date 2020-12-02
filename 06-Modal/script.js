'use strict';
// first find everything you need in html to use here. (all the classes and ids.)
// const modal = document.querySelector('.modal');
// const overlay = document.querySelector('.overlay');
// const btnCloseModal = document.querySelector('.close-modal');
// const btnsOpenModal = document.querySelectorAll('.show-modal');

// console.log(btnsOpenModal); // will output Node lis - will be all 3 buttons - looks similar to an array

// for (let i = 0; i < btnsOpenModal.length; i++) {
//   //   console.log(btnsOpenModal[i].textContent)
//   btnsOpenModal[i].addEventListener('click', function () {
//     console.log('Buttons clicked.');
//     modal.classList.remove('hidden');
//     // or for line above could do:
//     // modal.style.dispay = 'block; - would only use if only one hidden property on html not many...
//     overlay.classList.remove('hidden');
//   });
// do not use the . before hidden becasue only for selector not for 2nd class.
// this function is attached to all 3 buttons.

// in html file. there is a hidden class on model on line 15, this is what hides modal till called here with javascript.

// each i is one element, each i gets the textConent added to it... will output Show Modal 1, Show Modal 2, and Show Modal 3 (the text in the html tag associated with class of btnsOpenModal.)
// }

// Working Code BUT NOT DRY!

// btnCloseModal.addEventListener('click', function () {
//   modal.classList.add('hidden');
//   overlay.classList.add('hidden');
// });

// overlay.addEventListener('click', function () {
//   modal.classList.add('hidden');
//   overlay.classList.add('hidden');
// });

// -------TO MAKE ABOVE DRY!-----------

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

const openModal = function () {
  console.log('Button Clicked.');
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal);
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  // the e lets javascript know to listen for an event...
  //   console.log(e.key); // this will output whatever keyboard key was pressed to trigger event (ex: enter button will output the word enter)

  //   if (e.key === 'Escape') console.log('Esc was pressed.'); // this will output Esc was pressed when Escape is pushed on keyboard.

  //   if (e.key === 'Escape') {
  //     // the above says if e.key is same as 'Escape' and if modal doesn't contain class 'hidden then closeModal.
  //     if (!modal.classList.contains('hidden'))
  //       // the above reads if modal doesn't have class list containing hidden
  //       closeModal(); // here we are calling the above function to close the modal
  //   }

  // the above is good code but it isn't DRY!!

  // ------Code below is DRYER than code above----
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
  // the above reads: if the keyboard key pressed is Escape and modal doesn't contain the class hidden, then closeModal.
});
