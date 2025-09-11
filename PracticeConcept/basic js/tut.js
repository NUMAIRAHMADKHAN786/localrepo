const { StatementSync } = require("node:sqlite");

function myFunction(p1,p2){
    return p1* p2;
}
console.log(myFunction(4,3));

function toCelcius(fahrenheit){
    return(5/9)*(fahrenheit-32);
}
console.log(toCelcius(77));

const fruit=function(a,b){
    return a*b;
}
console.log(fruit(4,3));

const fruit1=(a,b) => a*b;
console.log(fruit1(5,5));

const greet=()=>"hello world";
console.log(greet());


let hello=()=>{
    return "hello world";
}
console.log(hello());

let hello1=(val)=>"Hello world"+val;
console.log(hello1(5));


// basic foundation
// control Statement
// function and dom 
