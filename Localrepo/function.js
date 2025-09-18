function sum (a,b){
    const add=a+b;
    return add;
}
sum(2,3);


const square=function(num){
    return num*num;
};

console.log(square(5));

// nested function 
function addsquare(a,b){
    const sa=square(a);
    const sb=square(b);

    function square(num){
        return num*num;
    }
    return sa+sb;

}

console.log(addsquare(3,4));

// arrow function
const multiply=(x,y)=>x*y;

console.log(multiply(4,5));