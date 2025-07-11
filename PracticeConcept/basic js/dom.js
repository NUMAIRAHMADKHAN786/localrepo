// Example 1: Using getElementById to change text content
document.getElementById("example1").textContent = "Text updated using getElementById";

// Example 2: Using getElementById to change style
document.getElementById("example2").style.color = "red";

// Example 3: Using getElementsByClassName to change text color for multiple elements
const elements = document.getElementsByClassName("example3");
for (let i = 0; i < elements.length; i++) {
  elements[i].style.color = "blue";
}

// Example 4: Using getElementsByClassName to hide elements
const hideElements = document.getElementsByClassName("example4");
for (let i = 0; i < hideElements.length; i++) {
  hideElements[i].style.display = "none";
}

// Example 5: Using getElementById to add a CSS class
document.getElementById("example5").classList.add("highlight");

// Example 6: Using getElementsByClassName to add a border to multiple elements
const borderedElements = document.getElementsByClassName("example6");
for (let i = 0; i < borderedElements.length; i++) {
  borderedElements[i].style.border = "2px solid black";
}

// Example 7: Using getElementById to set an attribute
document.getElementById("example7").setAttribute("title", "This is a tooltip");

// Example 8: Using getElementsByClassName to change background color
const bgElements = document.getElementsByClassName("example8");
for (let i = 0; i < bgElements.length; i++) {
  bgElements[i].style.backgroundColor = "yellow";
}

// Example 9: Using getElementById to remove an element
const elementToRemove = document.getElementById("example9");
elementToRemove.parentNode.removeChild(elementToRemove);

// Example 10: Using getElementsByClassName to append text to multiple elements
const appendElements = document.getElementsByClassName("example10");
for (let i = 0; i < appendElements.length; i++) {
  appendElements[i].textContent += " - Appended text";
}

// Example 11: Using querySelector to change text content
document.querySelector("#example11").textContent = "Text updated using querySelector";

// Example 12: Using querySelector to change style
document.querySelector(".example12").style.fontSize = "20px";

// Example 13: Using querySelector to add a CSS class
document.querySelector(".example13").classList.add("new-class");

// Example 14: Using querySelector to set an attribute
document.querySelector("#example14").setAttribute("data-info", "Additional info");

// Example 15: Using querySelector to hide an element
document.querySelector(".example15").style.display = "none";
// 
let x=document.querySelector("h2");
setTimeout (function() {
  x.style.color="green";
  x.style.fontFamily = "Arial";
}, 2000);


let y=document.querySelector("h1");
setTimeout(function(){
  y.innerHTML="This is a new heading";
}, 3000);


let z=document.getElementById(".para");
x.style.color="blue";
x.style.backgroundColor="yellow"; 

let set=document.getElementById("set");
set.addEventListener("click", function() {
  set.style.color = "purple";
  set.style.fontSize = "24px";});

let set1=document.getElementById("set1");
set1.addEventListener("mouseenter",function(){
  x.style.color="orange";
  x.style.backgroundColor="lightblue";
});

set3=document.getElementById("set3");
set1.addEventListener("click",function(){
  set3.style.color="pink";
  set3.style.backgroundColor="purple";
});
 
set3.addEventListener("click", function() {
  x.style.color = "red";
  x.style.backgroundColor = "lightgreen";
  x.innerHTML = "This is a modified heading";
});