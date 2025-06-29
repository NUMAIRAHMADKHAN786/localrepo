// Arrow function to perform division using Promises
const divide = (num1, num2) => {
    return new Promise((resolve, reject) => {
        if (num2 === 0) {
            reject("Error: Division by zero is not allowed.");
        } else {
            resolve(num1 / num2);
        }
    });
};

// Test cases
const testCases = [
    { num1: 10, num2: 2 },
    { num1: 10, num2: 0 },
    { num1: 15, num2: 3 },
    { num1: 20, num2: 5 },
    { num1: 7, num2: -1 }
];

// Running test cases
testCases.forEach(({ num1, num2 }) => {
    console.log(`Dividing ${num1} by ${num2}...`);
    divide(num1, num2)
        .then(result => console.log(`Result: ${result}`))
        .catch(error => console.log(error));
});