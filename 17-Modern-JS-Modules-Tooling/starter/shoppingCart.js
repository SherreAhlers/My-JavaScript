// EXPORTING MODULE
// console.log('Exporting module');

const shippingCost = 10;
// const cart = [];
// these are scoped to this module - is private inside the variables

// here we are exporting an empty array named cart
export const cart = [];

// const addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product} added to the cart.`);
// };

// this will only be available inside this module.
// if want it to not be private write like below

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  //   console.log(`${quantity} ${product} added to the cart.`);
};

// this will create a named export from this module.
// exports always need to happen in top level export

// if(true) {
//     export const addToCart = function(product, quantity) {
//         cart.push({ product, quantity });
//         console.log(`${quantity} ${product} added to the cart.`);
//     }
// }
// this will not work because it is not top level

// NAMED EXPORTS
// can export multiple things at a time using named exports
const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };
// this will export both variables above and can be used in other modules

// DEFAULT EXPORTS
// use when only want to import one thing per module
// this will export the value -- see below

export default function (product, quantity) {
  cart.push({ product, quantity });
  //   console.log(`${quantity} ${product} added to the cart.`);
}
// this is exporting the value not the variable
// here we are manipulating the array

// imports are not copies of the export - they are live

// MODULE PATTERN
// IIFE -- Immediatly Invoked Function Expression
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    // console.log(
    //   `${quantity} ${product} added to the cart. Shipping cost is ${shippingCost}.`
    // );
  };

  const orderStock = function (product, quantity) {
    // console.log(`${quantity} ${product} ordered from supplier.`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

// ShoppingCart2.addToCart('apple', 4);
// this will output: 4 apple added to the cart. Shippig cost is 10.

// ShoppingCart2.addToCart('pizza', 2);
// this will output: 2 pizza added to the cart. Shippig cost is 10.

// console.log(ShoppingCart2);
// this will output:
// {cart: Array(2), totalPrice: 237, totalQuantity: 23, addToCart: ƒ}
// addToCart: ƒ (product, quantity)
// cart: (2) [{…}, {…}]
// totalPrice: 237
// totalQuantity: 23

// console.log(ShoppingCart2.shippingCost);
// this willl output: undefined  because shippingCost is private
