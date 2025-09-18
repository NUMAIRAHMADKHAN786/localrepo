// Arrow Function
const greet=(count)=>{
    for (let i = 0; i < count; i++)
    console.log("Hello, welcome to the callback function example!");

}
greet();


const square=(num)=>num*num;
console.log(square(5));

// Callback Function
const calculate=(a,b,operation)=>{
    return operation(a,b);
}
const addition=calculate(3,4,function(num1,num2){
    return num1+num2;
});

console.log(addition);
// method 2
const subtraction=(a,b)=>a-b;
const subresult=calculate(8,3,subtraction);
console.log(subresult);
// method 3 

function multiply(a,b){
    return a*b;
}

const mulresult =calculate(4,5,multiply);
console.log(mulresult);
