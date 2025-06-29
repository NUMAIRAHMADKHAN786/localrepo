let s1=document.getElementById("sq1");
s1.addEventListener("mouseenter", function() {
s1.style.backgroundColor = "red";
})
s1.addEventListener("mouseleave", function() {
s1.style.backgroundColor = "white";
})
let s2=document.getElementById("sq2");
let color="green";
s2.addEventListener("mouseenter", function() {
    if(color==="green"){
        s2.style.backgroundColor="green";
        color="blue"
    }
    else if(color==="blue"){
        s2.style.backgroundColor="yellow"; 
        color="red"}
    else{
        s2.style.backgroundColor="blue";
        color="green"
    }
})
s2.addEventListener("mouseleave", function() {
    s2.style.backgroundColor = "white";
})
let s3=document.getElementById("sq3");
s3.addEventListener("mouseenter", function() {
   let r1=Math.floor(Math.random()*256);
   let g1=Math.floor(Math.random()*256);    
    let b1=Math.floor(Math.random()*256);
    s3.style.backgroundColor = `rgb(${r1}, ${g1}, ${b1})`;
})
s3.addEventListener("mouseleave", function() {
    s3.style.backgroundColor = "white";
})
let s4=document.getElementById("sq4");
s4.addEventListener("mouseenter", function() {
let r1=Math.floor(Math.random()*256);
let g1=Math.floor(Math.random()*256);
let b1=Math.floor(Math.random()*256);
s1.style.backgroundColor =  `rgb(${r1}, 255, 255)`;
s2.style.backgroundColor =  `rgb(255, ${g1}, 255)`;    
s3.style.backgroundColor = `rgb(255, 255, ${b1})`;
})
s4.addEventListener("mouseleave", function() {
    s1.style.backgroundColor = "white";
    s2.style.backgroundColor = "white";     
    s3.style.backgroundColor = "white";
})  
let s5=addEventListener("click",function(){
    
})