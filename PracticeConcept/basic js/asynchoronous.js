const hitechie= function(){
console.log("Hrllo Nmmiocode");
}
const hiteche1 =function()
{document.querySelector("h1").innerHTML="Hello this asynchoronous code of javscript by nummicode";}

const changeme =setTimeout(hiteche1,2000);

document.querySelector("#stop").addEventListener("click",function(){
    clearTimeout(changeme);
    console.log("Timeout cleared");
})
// document.queryselector("#start").addEventListner("click",
//     function(){ set timeout(hiteche1,2000);