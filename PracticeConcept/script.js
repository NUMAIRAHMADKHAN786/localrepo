const coding=["JavaScript","Python","Java","C++","C#","PHP","Ruby","Swift","Go","Kotlin"];

const values= coding.forEaach((item) => {
    console.log(item);
}); 
// ye code coding array ke har element ko print karta hai.
const mynums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const newnums=mynums.filter((num)=>num>4);
console.log(newnum); // [5, 6, 7, 8, 9, 10]
const newnums2 = mynums.filter((num)=>{
    return num > 4;
});
console.log(newnums2); // [5, 6, 7, 8, 9, 10]
// ye code mynums array ke elements ko filter karta hai aur sirf un elements ko return karta hai jo 4 se bade hain.

const userbook = [
    { title: "Book 1", author: "Author 1" },
    { title: "Book 2", author: "Author 2" },
    { title: "Book 3", author: "Author 3" },
    { title: "Book 4", author: "Author 4" },
];
const newbook = userbook.filter((book) => {
    return book.author === "Author 2";
});
console.log(newbook); // [{ title: "Book 2", author: "Author 2" }]
// filter method filter karta hai jo condition true hoti hai unko

const m_ynums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const newnum= m_ynums.map((num) =>{return num+2} );
console.log(newnum); // [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
// // khud return kardeta hai 
// 
// map method har element par function apply karta hai aur naya array return karta hai
// jo har element ka result hota hai. Ye original array ko modify nahi karta hai.
// Ye naya array banata hai jo har element ke liye function ka result hota hai.
// chaining ka use karke hum ek hi line me multiple operations kar sakte hain.

const newfunc = mynums
.map((num) => num*2)
.map((num) => num+2)
.filter((num) => num > 10);
console.log(newfunc); // [12, 14, 16, 18, 20]
// chaining ka use karke hum ek hi line me multiple operations kar sakte hain.
// Ye code mynums array ke har element ko 2 se multiply karta hai, phir usme 2 add karta hai, aur phir sirf un elements ko filter karta hai jo 10 se bade hain.
// Ye ek naya array return karta hai jo sirf un elements ko contain karta hai jo 10 se bade hain.


// now its time to learn about reduce method
// reduce method array ke elements ko ek single value me reduce karta hai.
// Ye ek callback function ko har element par apply karta hai aur ek accumulator value ko update karta hai.
// Ye accumulator value har iteration me update hoti hai aur final result return hota hai.
// reduce method ka syntax ye hai:
// array.reduce(callback, initialValue)
// callback function ko do arguments milte hain: accumulator aur currentValue.
// Ye accumulator value hai jo har iteration me update hoti hai aur currentValue wo element hai jo abhi process ho raha hai.
// Ye function har element par apply hota hai aur final result return karta hai.
// initialValue wo value hai jo accumulator ki initial value hoti hai. Ye optional hai.
// Agar ye nahi diya gaya hai to pehli element ko accumulator ki initial value ke roop me use kiya jata hai.

 const gnumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const mytotal =gnumbers.reduce(function(accumulator,
currentValue) {
     accumulator + currentValue;
}
, 0);   
console.log(mytotal); // 55   
// ye code gnumbers array ke elements ko add karta hai aur final result return karta hai.
// Ye accumulator value ko har iteration me update karta hai aur final result return karta hai.
// Ye accumulator ki initial value ko 0 set karta hai.
// Ye final result 55 hai jo gnumbers array ke elements ka sum hai.
// reduce method ka use karke hum array ke elements ko ek single value me reduce kar sakte hain.
// now array function ka use karke reduce method ko use karte hain
const newtotal=gnumbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
}, 0); 
console.log(newtotal); // 55
// ye code gnumbers array ke elements ko add karta hai aur final result return karta hai.

console.log(newtotal); // 55    
const shppoingcart = [
    { item: "Shirt", price: 2000 },
    { item: "Pants", price: 3000 },
    { item: "Shoes", price: 5000 },
    { item: "Hat", price: 150 },
];
const totalprice=shppoingcart.reduce((accumulator, currentValue) => 
     accumulator + currentValue.price, 0);
console.log(totalprice); // 7150
const totalprice2=shppoingcart.reduce((accumulator, currentValue) =>
      {return accumulator + currentValue.price, 0});
console.log(totalprice2); // 7150
// ye code shoppingcart array ke elements ko add karta hai aur final result return karta hai.
// Ye accumulator value ko har iteration me update karta hai aur final result return karta hai.
// Ye accumulator ki initial value ko 0 set karta hai.
// Ye final result 7150 hai jo shoppingcart array ke elements ka sum hai.
// reduce method ka use karke hum array ke elements ko ek single value me reduce kar sakte hain.



//  same code likhna ata nhi hai baat karenge jhant barabar karenge aur even whateever jo bhi hoga ause shai karne ki koshisih karenge that is the only way to learn and grow.
//  jab tak koi nahi hai tab tak khud se hi karna padega aur khud se hi seekhna padega.
