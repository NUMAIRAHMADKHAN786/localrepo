const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const subscribe= document.querySelector(".subscribe");
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    subscribe.classList.toggle("active");
});

// Close menu when link is clicked
document.querySelectorAll(".nav-links a .subscribe").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    subscribe.classList.remove("active");
}));

// // Initialize emailjs
emailjs.init("numairahmadkhan813@gmail.com");

// Sample services data
const services = [
    { id: 1, name: "Wash & Fold", price: 299 },
    { id: 2, name: "Dry Cleaning", price: 499 },
    { id: 3, name: "Ironing", price: 199 },
    { id: 4, name: "Stain Removal", price: 399 }
];

let cart = [];

// Render services
function renderServices() {
    const servicesList = document.getElementById('servicesList');
    servicesList.innerHTML = services.map(service => `
        <div class="service-item">
            <div>
                <h4>${service.name}</h4>
                <p>₹${service.price}</p>
            </div>
            <button onclick="addToCart(${service.id})" class="add-btn">Add Item</button>
        </div>
    `).join('');
}

// Add to cart

function addToCart(serviceId) {
    
    const service = services.find(s => s.id === serviceId);
    cart.push(service);
    updateCart();
}

// Update cart display
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">No items added yet</p>';
        totalPrice.textContent = '0';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <span>${item.name} - ₹${item.price}</span>
                <button onclick="removeFromCart(${item.id})" class="remove-btn">Remove</button>
            </div>
        `).join('');
        totalPrice.textContent = cart.reduce((sum, item) => sum + item.price, 0);
    }
}

// Remove from cart
function removeFromCart(serviceId) {
    cart = cart.filter(item => item.id !== serviceId);
    updateCart();
}

// Handle booking form submission
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (cart.length === 0) {
        alert('Please add at least one service to book');
        return;
    }
    
    const templateParams = {
        to_name: document.getElementById('fullName').value,
        to_email: document.getElementById('email').value,
        message: `Booking confirmed for: ${cart.map(item => item.name).join(', ')}\nTotal: ₹${cart.reduce((sum, item) => sum + item.price, 0)}`
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function() {
            document.getElementById('bookingMessage').innerHTML = 
                '<span class="success">Thank you for booking the service! We will get back to you soon!</span>';
            cart = [];
            updateCart();
            this.reset();
        }, function(error) {
            console.log('Error:', error);
            document.getElementById('bookingMessage').innerHTML = 
                '<span class="error">Sorry, there was an error. Please try again.</span>';
        });
});

// Initialize
renderServices();