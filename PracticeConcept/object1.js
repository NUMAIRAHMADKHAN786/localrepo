// Function Declaration
function greet(name) {
    return `Hello, ${name}!`;
  }
  
  console.log(greet('World'));
  function message(sms){
   return 'Hello,'+sms;
  }
  console.log(message('Developers'));
  // Function Expression
  const add = function(a, b) {
    return a + b;
  };
  
  console.log('2 + 3 =', add(2, 3));
  
  // Arrow Functions
  const multiply = (a, b) => a * b;
  console.log('4 × 5 =', multiply(4, 5));
  
  // Default Parameters
  function welcome(name = 'Guest') {
    return `Welcome, ${name}!`;
  }
  
  console.log(welcome());
  console.log(welcome('John'));
  
  // Rest Parameters
  function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
  }
  
  console.log('Sum:', sum(1, 2, 3, 4, 5));
  
  // Callback Functions
  function processUser(name, callback) {
    const user = { name, id: Math.floor(Math.random() * 100) };
    return callback(user);
  }
  
  const formatUser = user => `User ${user.name} has ID: 
  ${user.id}`;
  console.log(processUser('Alice', formatUser));
  
  // Higher-Order Functions
  function multiply2(factor) {
    return function(number) {
      return number * factor;
    };
  }
  
  
  const double = multiply2(2);
  const triple = multiply2(3);
  
  console.log('Double 5:', double(5));
  console.log('Triple 5:', triple(5));
  
  // Method Functions
  const calculator = {
    value: 0,
    add(n) {
      this.value += n;
      return this.value;
    },
    subtract(n) {
      this.value -= n;
      return this.value;
    },
    getValue() {
      return this.value;
    }
  };
  
  console.log('Calculator:');
  console.log('Add 5:', calculator.add(5));
  console.log('Subtract 2:', calculator.subtract(2));
  console.log('Final value:', calculator.getValue());
  
  // Immediately Invoked Function Expression (IIFE)
  const counter = (() => {
    let count = 0;
    return {
      increment() {
        return ++count;
      },
      decrement() {
        return --count;
      },
      getCount() {
        return count;
      }
    };
  })();
  
  console.log('\nCounter:');
  console.log('Increment:', counter.increment());
  console.log('Increment:', counter.increment());
  console.log('Decrement:', counter.decrement());
  console.log('Final count:', counter.getCount());
  
  // Function Currying
  const curriedAdd = a => b => a + b;
  const add5 = curriedAdd(5);
  console.log('\nCurrying:');
  console.log('add5(3):', add5(3));
  
  // Generator Functions
  function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
  }
  
  console.log('\nGenerator:');
  const gen = numberGenerator();
  console.log(gen.next().value);
  console.log(gen.next().value);
  console.log(gen.next().value);
  
  // Async Functions
  async function fetchUser(id) {
    // Simulating API call
    const user = await new Promise(resolve => {
      setTimeout(() => {
        resolve({ id, name: 'John Doe' });
      }, 100);
    });
    return `User: ${user.name}`;
  }
  
  // Execute async function
  fetchUser(1).then(result => {
    console.log('\nAsync result:', result);
  });
  fetchUser(2).then(result=>{
    console.log('\nAync result:',result);
  })
  // async function  