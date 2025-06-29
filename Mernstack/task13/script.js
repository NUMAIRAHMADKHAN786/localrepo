//Maximum number 
let array1 =  [4, 8, 2, 11, 6, 7, 10]
newarray(array1);

function newarray(array1) {
    const maxNumber = Math.max(...array1);
    console.log("Maximum number is", maxNumber);
}
//Sum of numbers
let array2 =  [4, 8, 2, 11, 6, 7, 10]
newarray1(array1);
    
function newarray1(array2){
    let sum = 0;
    for (let i = 0; i < array2.length; i++) {
        sum += array2[i]; 
      
}
console.log("sum of number is ",sum)
}
//Oddnumbers 
let array3 =  [4, 8, 2, 11, 6, 7, 10]
 newarray2(array1);

function newarray2(array3){
    let oddNumbers = [];
    for (let i = 0; i < array3.length; i++) {
        if (array3[i] % 2 !== 0) { 
            oddNumbers.push(array3[i]);
        }
         }
            console.log("Odd numbers are:", oddNumbers)
}
let array5=["hello","css","world"];
let str=array5.tostring(array5);
consol.log(str);