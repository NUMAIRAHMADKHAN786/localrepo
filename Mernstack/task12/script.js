   // Input Number
var number = 153; // Change this value to test with other numbers
var n = 10; // Variable for first n numbers and table calculation

// Task 1: Find the sum of first n numbers
var sumOfFirstN = 0;
for (var i = 1; i <= n; i++) {
    sumOfFirstN += i;
}
console.log("Sum of first " + n + " numbers: " + sumOfFirstN);

// Task 2: Print the table of n
console.log("Table of " + n + ":");
for (var i = 1; i <= 10; i++) {
    console.log(n + " x " + i + " = " + (n * i));
}
                                                                                                                                                                 
// Task 3: Check if the number is prime
var isPrime = true;
if (number < 2) isPrime = false;
for (var i = 2; i < number; i++) {
    if (number % i === 0) {
        isPrime=true;
        break;
    }
}
console.log("Is " + number + " a prime number? " + (isPrime ? "Yes" : "No"));

// Task 4: Print all its factors
var factors = [];
for (var i = 1; i <= number; i++) {
    if (number % i === 0) {
        factors.push(i);
    }
}
console.log("Factors of " + number + ": " + factors.join(", "));

// Task 5: Find the sum of all digits of the number
var sumOfDigits = 0;
var tempNumber = number;
while (tempNumber > 0) {
    var digit = tempNumber % 10;
    sumOfDigits += digit;
    tempNumber = (tempNumber - digit) / 10; // Remove the last digit
}
console.log("Sum of the digits of " + number + ": " + sumOfDigits);

// Task 6: Check if the number is an Armstrong number
var armstrongSum = 0;
tempNumber = number;
while (tempNumber > 0) {
    var digit = tempNumber % 10;
    armstrongSum += digit * digit * digit; // Cubing each digit
    tempNumber = (tempNumber - digit) / 10; // Remove the last digit
}
console.log("Is " + number + " an Armstrong number? " + (armstrongSum === number ? "Yes" : "No"));
