console.log(a); // undefined (not error)
var a = 5;


var a;
console.log(a); // undefined
a = 5;


console.log(b); // ReferenceError
let b = 10;


greet(); // Works fine
function greet() {
  console.log("Hello");
}


sayHi(); // TypeError: sayHi is not a function
var sayHi = function() {
  console.log("Hi");
};
