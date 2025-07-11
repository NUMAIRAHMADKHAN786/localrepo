// --- Day 2: Arrays & Objects ---

// Array methods
const numbers = [1, 2, 3, 4, 5];

// push, pop, shift, unshift
numbers.push(6);         // [1,2,3,4,5,6]
numbers.pop();           // [1,2,3,4,5]
numbers.unshift(0);      // [0,1,2,3,4,5]
numbers.shift();         // [1,2,3,4,5]

// map, filter, reduce, forEach
const doubled = numbers.map(n => n * 2); // [2,4,6,8,10]
const evens = numbers.filter(n => n % 2 === 0); // [2,4]
const sum = numbers.reduce((acc, n) => acc + n, 0); // 15
numbers.forEach(n => console.log("Number:", n));

// Object creation, properties, methods
const user = {
  name: "Aman",
  age: 21,
  email: "aman@example.com",
  isActive: true,
  greet() {
    return `Hello, ${this.name}!`;
  }
};

// CRUD operations on object
user.location = "Jaipur"; // Create
user.age = 22;            // Update
delete user.isActive;     // Delete

console.log(user.greet());
console.log(user);

// --- Day 3: Advanced JS Concepts ---

// Scope, Hoisting, Closures
function outer() {
  let outerVar = "I am outer";
  function inner() {
    console.log(outerVar); // Closure: inner "remembers" outerVar
  }
  return inner;
}
const closureFunc = outer();
closureFunc(); // "I am outer"

// Hoisting example
console.log(hoistedVar); // undefined (var is hoisted)
var hoistedVar = "Hoisted!";

// 'this' keyword, call/apply/bind
const person = {
  name: "Ilfa",
  sayHello: function() {
    console.log(`Hello, ${this.name}`);
  }
};
person.sayHello();

const anotherPerson = { name: "ChatGPT" };
person.sayHello.call(anotherPerson); // "Hello, ChatGPT"

// ES6 features: destructuring, spread/rest, template literals
const arr = [10, 20, 30];
const [first, ...rest] = arr; // first=10, rest=[20,30]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // {a:1, b:2, c:3}

function sumAll(...nums) {
  return nums.reduce((acc, n) => acc + n, 0);
}
console.log(`Sum is: ${sumAll(1,2,3,4)}`); // Template literal

// Practice: Write functions using these concepts
function greetUser({ name, email }) {
  return `Welcome, ${name}! Your email is ${email}.`;
}
console.log(greetUser(user));