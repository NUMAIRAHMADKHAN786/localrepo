
let principal = 1000; 
let annualRate = 5;   
let timesCompounded = 4; 
let years = 3;       


let rate = annualRate / 100;


let amount = principal * Math.pow((1 + rate / timesCompounded), timesCompounded * years);
let compoundInterest = amount - principal;


console.log("The compound interest after " + years + " years is: " + compoundInterest.toFixed(2));
