// 
setTimeout(function(){
  console.log("hello");
},2*1000);
setTimeout(function(){
  console.log("world");
},1*1000);
setTimeout(function(){
  console.log("technovation");
  },5*1000);

 for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log("i is: " + i);
  },3*1000+i*1000);
}