// Array creation
const fruit=["apple","banana","orange","mango"];
fruit.push("grape");
fruit.pop();
fruit.unshift("pineapple");
fruit.shift();
 const index=fruit.indexOf("banana");
 const hasmango =fruits.includes("mango");
 const veggies=["carrot","parrot"];
 const food= fruit.concat(veggies);
 const fruitString=fruits.join(",");
 const someFruits=fruit.slice(1,3);
 fruits.splice(1,0,"pear");

fruits.splice(2,1);
// forEach -loop through array
fruits.forEach((fruit,i)=>{
    console.log(`Fruit${i}:${fruit}`)
});
fruits.forEach(fruit=>console.log(fruit));
const upperFruits=fruits.map(fruit => fruit.toUpperCase());
const longFruits=fruits.filter(fruit=>fruit.length>5);
const totalletters =fruits.reduce((sum,fruit)=>sum+fruit.length,0);
const firstLongFruit=fruits.find(fruit=>fruit.length>5);
