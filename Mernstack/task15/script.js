
document.getElementById('greetButton').addEventListener('click', () => {
    const name = document.getElementById('nameInput').value;
    const greeting = document.getElementById('greeting');
    greeting.textContent = name ? `Hello, ${name}` : 'Hello';
  });
  
 
  document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('click', () => {
      const color = box.id; 
      box.style.backgroundColor = color;
    });
  });