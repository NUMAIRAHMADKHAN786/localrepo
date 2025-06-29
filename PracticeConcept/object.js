// //Singelton
// //Object Literals
// const mysym=Symbol("Key1")
// const jsuser={
//     name:"aman",
//     [mysym]:"key1",
//     age:20,
//     location:"jaipur",
//     email:"aman@google.com",
//     isloggedIn:false,
//     LastLoginDays:["Monday","Tuesday"]
// }
// console.log(jsuser.name);
// console.log(jsuser["email"]);
// console.log(jsuser["age"]);
// console.log(jsuser[mysym]);

// jsuser.email="ilfa@chatgpt.com"
// Object.freeze(jsuser)
// jsuser.email="ilfa@micro.com"
// console.log(jsuser);

// jsuser.greeting=function(){
//     console.log("Hello js user ");
// }
// console.log(jsuser.greeting());
// jsuser.greetingtwo=function(){
//     console.log(`Hello Js user,${this.name}`);
// }
// console.log(jsuser.greetingtwo());


const add=function(a,b){
    return a+b;
}
const sub=function(a,b){
    return a-b;     
}
console.log(add(2,3));
console.log(sub(5,2));
/// Arrow function
const add1=(a,b)=>a+b;
const sub3=(c,d)=>c-d;
console.log(add1(2,3));
console.log(sub3(5,2));
// // Default Parameters
 