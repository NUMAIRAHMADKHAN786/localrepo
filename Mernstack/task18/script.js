// ...existing code...

// Q1 - square each element with map + arrow
const nums = [1, 2, 3, 4, 5];
const squares = nums.map(n => n * n);
console.log('Q1 squares:', squares); // [1,4,9,16,25]

// Q2 - grade using ternary operators
const getGrade = score =>
  score >= 90 ? 'A' :
  score >= 80 ? 'B' :
  score >= 70 ? 'C' :
  score >= 60 ? 'D' : 'F';

console.log('Q2 grade for 85:', getGrade(85)); // B

// Q3 - car object, change year, destructure model & year
const car = { company: 'Toyota', model: 'Corolla', year: 2018 };
function changeCarYear(obj, newYear) { obj.year = newYear; }
changeCarYear(car, 2023);
const { model, year } = car;
console.log('Q3 model & year:', model, year); // Corolla 2023

// Q4 - filter primes
function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}
const numbers = [2, 3, 4, 5, 6, 7, 11, 12, 13, 17];
const primes = numbers.filter(isPrime);
console.log('Q4 primes:', primes); // [2,3,5,7,11,13,17]

// Q5 - use cases (map, filter, reduce)
console.log('Q5 use-cases:');
console.log('- map: transform arrays (e.g., extract fields, compute values).');
console.log('- filter: select subset by predicate (e.g., active users, valid items).');
console.log('- reduce: aggregate to single value (sum, group by, build objects).');

// Q6 - async-await fetch (JSONPlaceholder)
async function fetchPosts() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    console.log('Q6 fetched posts:', data);
  } catch (err) {
    console.error('Q6 fetch error:', err);
  }
}
fetchPosts();

// Q7 - nested object + optional chaining
const person1 = {
  name: 'Aman',
  address: { city: 'Delhi', zip: '110001' },
  contact: { phone: '+91-99999-00000', email: 'aman@example.com' }
};
const person2 = { name: 'Ria', address: { city: 'Mumbai' } }; // no contact

// safely access phone with optional chaining
console.log('Q7 person1 phone:', person1.contact?.phone ?? 'Phone not available');
console.log('Q7 person2 phone:', person2.contact?.phone ?? 'Phone not available');

// ...existing code...

