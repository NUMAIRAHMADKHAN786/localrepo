// Array creation
const fruits = ["apple", "banana", "orange", "mango"];

// push - add to end
fruits.push("grape");

// pop - remove from end
fruits.pop();

// unshift - add to start
fruits.unshift("kiwi");

// shift - remove from start
fruits.shift();

// indexOf - find index
const index = fruits.indexOf("banana");

// includes - check existence
const hasMango = fruits.includes("mango");

// concat - merge arrays
const veggies = ["carrot", "potato"];
const food = fruits.concat(veggies);

// join - array to string
const fruitString = fruits.join(", ");

// slice - get part of array
const someFruits = fruits.slice(1, 3);

// splice - add/remove at index
fruits.splice(1, 0, "pear"); // add "pear" at index 1
fruits.splice(2, 1); // remove 1 item at index 2

// forEach - loop through array
fruits.forEach((fruit, i) => {
  console.log(`Fruit ${i}: ${fruit}`);
});
 fruits.forEach(fruit => console.log(fruit));
// map - create new array
const upperFruits = fruits.map(fruit => fruit.toUpperCase());

// filter - filter array
const longFruits = fruits.filter(fruit => fruit.length > 5);

// reduce - accumulate values
const totalLetters = fruits.reduce((sum, fruit) => sum + fruit.length, 0);

// find - find first match
const firstLongFruit = fruits.find(fruit => fruit.length > 5);

// findIndex - index of first match
const firstLongFruitIndex = fruits.findIndex(fruit => fruit.length > 5);

// every - all elements match
const allHaveA = fruits.every(fruit => fruit.includes("a"));

// some - at least one matches
const someHaveO = fruits.some(fruit => fruit.includes("o"));

// reverse - reverse array
fruits.reverse();

// sort - sort array
fruits.sort();

console.log("fruits:", fruits);
console.log("index:", index);
console.log("hasMango:", hasMango);
console.log("food:", food);
console.log("fruitString:", fruitString);
console.log("someFruits:", someFruits);
console.log("upperFruits:", upperFruits);
console.log("longFruits:", longFruits);
console.log("totalLetters:", totalLetters);
console.log("firstLongFruit:", firstLongFruit);
console.log("firstLongFruitIndex:", firstLongFruitIndex);
console.log("allHaveA:", allHaveA);