////////////////////////////////////////////////////////////////
// LECTURES

// All modules are executed in strict mode by default

// IMPORTING MODULE
// import './shoppingCart.js';

// console.log('Importing module');
// this is logged second - modules in export are registered first

// console.log(shippingCost);
// this will give you an error - not defined - because they are from the shopping cart module - cannot be seen here

// can import variable from shoppingCart module like this:
// import {
//   addToCart,
//   totalPrice as price,
//   //   totalQuantity,
//   tq,
// } from './shoppingCart.js';

// console.log('Importing module');

// addToCart('bread', 5);
// this will output: 5 bread added to the cart.
// the output is coming from shoppingCart module

// console.log(totalPrice, totalQuantity);
// console.log(price, totalQuantity);
// console.log(price, tq);
// this will output: 237  23

// console.log('Importing module');

// import * as ShoppingCart from './shoppingCart.js';
// the * means import everything from module specified here
// as means you are changing name of import to whatever comes after as

// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);
// this will output: 237

// import add from './shoppingCart.js';
// this will import the default export

import add, { cart } from './shoppingCart.js';

// import add, { addToCart, totalPrice as price, tq}
// this can be done but it is not good to import named exports and default exports in same call.

add('pizza', 2);
// this will output: 2 pizza added to the cart.

add('bread', 5);
add('apples', 4);

// console.log(cart);
// this will output:
// (3) [{…}, {…}, {…}]
// 0: {product: "pizza", quantity: 2}
// 1: {product: "bread", quantity: 5}
// 2: {product: "apples", quantity: 4}

// COMMON JS MODULES
// been used in Node.js for all of its existance - a way of running a server outside the browser

// export.addToCart = function (product, quantity) {
//     cart.push({ product, quantity});
//     console.log(`${quantity} ${product} added to cart (shipping cost is ${shippingCost}).`
//     );
// };

// Import
// const { addToCart } = require('./shoppingCart.js')

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
// import cloneDeep from 'lodash-es';
// import cloneDeep from 'lodash';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state);
state.user.loggedIn = false;
console.log(stateClone);

const stateDeepClone = cloneDeep(state);
console.log(stateDeepClone);

if (module.hot) {
  module.hot.accept();
}
// the code above is something only Parcel understands
