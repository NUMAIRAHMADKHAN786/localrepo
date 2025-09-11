
const servicesData = [
    {
        id: 1,
        name: "Dry Cleaning",
        price: 200,
        icon: "🧹",
        description: "Professional dry cleaning service"
    },
    {
        id: 2,
        name: "Wash & Fold", 
        price: 100,
        icon: "🧺",
        description: "Regular wash and fold service"
    },
    {
        id: 3,
        name: "Ironing",
        price: 30,
        icon: "👕", 
        description: "Professional ironing service"
    },
    {
        id: 4,
        name: "Stain Removal",
        price: 500,
        icon: "🌟",
        description: "Specialized stain removal"
    },
    {
        id: 5,
        name: "Leather & Suede Cleaning",
        price: 999,
        icon: "👜",
        description: "Specialized leather and suede care"
    },
    {
        id: 6,
        name: "Wedding Dress Cleaning", 
        price: 2500,
        icon: "👰",
        description: "Delicate wedding dress cleaning"
    }
];

// Global variables
let cart = {};
let totalAmount = 0;

// DOM elements
let servicesListElement;
let cartItemsElement;
let totalAmountElement;
let bookingForm;
let newsletterForm;
let bookServiceBtn;

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('App initializing...');
    
    // Get DOM elements
    servicesListElement = document.getElementById('services-list');
    cartItemsElement = document.getElementById('cart-items');
    totalAmountElement = document.getElementById('total-amount');
    bookingForm = document.getElementById('booking-form');
    newsletterForm = document.getElementById('newsletter-form');
    bookServiceBtn = document.getElementById('book-service-btn');
    
    // Check if all elements are found
    if (!servicesListElement) console.error('Services list element not found');
    if (!cartItemsElement) console.error('Cart items element not found');
    if (!totalAmountElement) console.error('Total amount element not found');
    if (!bookingForm) console.error('Booking form element not found');
    if (!newsletterForm) console.error('Newsletter form element not found');
    if (!bookServiceBtn) console.error('Book service button element not found');
    
    // Initialize app functions
    renderServices();
    updateCartDisplay();
    setupEventListeners();
    
    console.log('App initialized successfully!');
});

// Render services list
function renderServices() {
    if (!servicesListElement) {
        console.error('Services list element not found');
        return;
    }
    
    servicesListElement.innerHTML = '';
    
    servicesData.forEach(service => {
        const serviceItem = document.createElement('div');
        serviceItem.className = 'service-item';
        serviceItem.innerHTML = `
            <div class="service-info">
                <div class="service-icon">${service.icon}</div>
                <div class="service-details">
                    <h4>${service.name}</h4>
                </div>
            </div>
            <div class="service-price">₹${service.price.toFixed(2)}</div>
            <div class="service-actions">
                <button class="btn-remove" data-id="${service.id}" ${(!cart[service.id] || cart[service.id].quantity === 0) ? 'disabled' : ''}>
                    Remove Item
                </button>
                <button class="btn-add" data-id="${service.id}">
                    Add Item
                </button>
            </div>
        `;
        servicesListElement.appendChild(serviceItem);
    });
    
    console.log('Services rendered successfully');
}

// Add item to cart
function addToCart(serviceId) {
    console.log('Adding service to cart:', serviceId);
    
    const service = servicesData.find(s => s.id === parseInt(serviceId));
    if (!service) {
        console.error('Service not found:', serviceId);
        return;
    }
    
    if (!cart[serviceId]) {
        cart[serviceId] = {
            ...service,
            quantity: 0
        };
    }
    
    cart[serviceId].quantity += 1;
    
    // Force update displays
    updateCartDisplay();
    updateServiceButtons();
    
    console.log('Cart updated:', cart);
}

// Remove item from cart
function removeFromCart(serviceId) {
    console.log('Removing service from cart:', serviceId);
    
    if (cart[serviceId]) {
        cart[serviceId].quantity -= 1;
        
        if (cart[serviceId].quantity <= 0) {
            delete cart[serviceId];
        }
        
        // Force update displays
        updateCartDisplay();
        updateServiceButtons();
        
        console.log('Cart after removal:', cart);
    }
}

// Update cart display
function updateCartDisplay() {
    if (!cartItemsElement || !totalAmountElement) {
        console.error('Cart elements not found');
        return;
    }
    
    const cartKeys = Object.keys(cart);
    
    // Clear the current cart display
    cartItemsElement.innerHTML = '';
    totalAmount = 0;
    
    if (cartKeys.length === 0) {
        cartItemsElement.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    } else {
        let serialNumber = 1;
        
        cartKeys.forEach(serviceId => {
            const item = cart[serviceId];
            if (item && item.quantity > 0) {
                const itemTotal = item.price * item.quantity;
                totalAmount += itemTotal;
                
                // Create entries for each quantity
                for (let i = 0; i < item.quantity; i++) {
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.innerHTML = `
                        <div>${serialNumber}</div>
                        <div>${item.name}</div>
                        <div>₹${item.price}</div>
                    `;
                    cartItemsElement.appendChild(cartItem);
                    serialNumber++;
                }
            }
        });
        
        // If no valid items, show empty cart
        if (totalAmount === 0) {
            cartItemsElement.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        }
    }
    
    totalAmountElement.textContent = totalAmount.toFixed(0);
    console.log('Cart display updated, total:', totalAmount);
}

// Update service buttons based on cart state
function updateServiceButtons() {
    const removeButtons = document.querySelectorAll('.btn-remove');
    
    removeButtons.forEach(button => {
        const serviceId = button.getAttribute('data-id');
        const hasItems = cart[serviceId] && cart[serviceId].quantity > 0;
        
        button.disabled = !hasItems;
        button.style.opacity = hasItems ? '1' : '0.5';
        button.style.cursor = hasItems ? 'pointer' : 'not-allowed';
        button.style.backgroundColor = hasItems ? '#FF1744' : '#cccccc';
    });
}

// Setup event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Service buttons - using event delegation for better performance
    if (servicesListElement) {
        servicesListElement.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (e.target.classList.contains('btn-add')) {
                const serviceId = e.target.getAttribute('data-id');
                console.log('Add button clicked for service:', serviceId);
                addToCart(serviceId);
            } else if (e.target.classList.contains('btn-remove') && !e.target.disabled) {
                const serviceId = e.target.getAttribute('data-id');
                console.log('Remove button clicked for service:', serviceId);
                removeFromCart(serviceId);
            }
        });
    }
    
    // Book service button (scroll to services) - Fixed implementation
    if (bookServiceBtn) {
        bookServiceBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Book service button clicked');
            
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                console.log('Scrolling to services section');
                servicesSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                console.error('Services section not found');
            }
        });
        console.log('Book service button event listener added');
    } else {
        console.error('Book service button not found');
    }
    
    // Booking form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmission);
    }
    
    // Newsletter form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmission);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    console.log('Event listeners setup complete');
}

// Handle booking form submission
function handleBookingSubmission(e) {
    e.preventDefault();
    console.log('Booking form submitted');
    
    // Get form data
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    // Validate form data
    if (!fullName || !email || !phone) {
        showBookingMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showBookingMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    if (!isValidPhone(phone)) {
        showBookingMessage('Please enter a valid phone number.', 'error');
        return;
    }
    
    if (Object.keys(cart).length === 0) {
        showBookingMessage('Please add some services to your cart before booking.', 'error');
        return;
    }
    
    // Show loading state
    const bookNowBtn = document.querySelector('.btn-book-now');
    const originalText = bookNowBtn.textContent;
    bookNowBtn.textContent = 'Processing...';
    bookNowBtn.disabled = true;
    
    // Simulate booking process
    setTimeout(() => {
        try {
            // Create booking details
            const bookingDetails = {
                customerName: fullName,
                customerEmail: email,
                customerPhone: phone,
                services: Object.values(cart).map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    total: item.price * item.quantity
                })),
                totalAmount: totalAmount,
                bookingDate: new Date().toLocaleDateString(),
                bookingTime: new Date().toLocaleTimeString()
            };
            
            console.log('Booking details:', bookingDetails);
            
            // Show success message
            showBookingMessage('Thank you for booking! We will contact you soon to confirm your pickup time.', 'success');
            
            // Reset form and cart
            bookingForm.reset();
            cart = {};
            updateCartDisplay();
            renderServices();
            
            console.log('Booking completed successfully');
            
        } catch (error) {
            console.error('Booking error:', error);
            showBookingMessage('Sorry, there was an error processing your booking. Please try again.', 'error');
        } finally {
            // Reset button state
            bookNowBtn.textContent = originalText;
            bookNowBtn.disabled = false;
        }
    }, 2000);
}

// Handle newsletter subscription
function handleNewsletterSubmission(e) {
    e.preventDefault();
    console.log('Newsletter form submitted');
    
    const emailInput = newsletterForm.querySelector('.newsletter-input');
    const email = emailInput.value.trim();
    
    if (!email) {
        showNewsletterMessage('Please enter your email address.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNewsletterMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const subscribeBtn = newsletterForm.querySelector('.newsletter-btn');
    const originalText = subscribeBtn.textContent;
    subscribeBtn.textContent = 'Subscribing...';
    subscribeBtn.disabled = true;
    
    // Simulate subscription process
    setTimeout(() => {
        console.log('Newsletter subscription for:', email);
        showNewsletterMessage('Thank you for subscribing to our newsletter!', 'success');
        newsletterForm.reset();
        
        // Reset button state
        subscribeBtn.textContent = originalText;
        subscribeBtn.disabled = false;
    }, 1500);
}

// Show booking message
function showBookingMessage(message, type) {
    const messageElement = document.getElementById('booking-message');
    if (!messageElement) {
        console.error('Booking message element not found');
        return;
    }
    
    messageElement.textContent = message;
    messageElement.className = `booking-message ${type}`;
    messageElement.classList.remove('hidden');
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageElement.classList.add('hidden');
    }, 5000);
    
    console.log('Booking message shown:', message, type);
}

// Show newsletter message
function showNewsletterMessage(message, type) {
    const messageElement = document.getElementById('newsletter-message');
    if (!messageElement) {
        console.error('Newsletter message element not found');
        return;
    }
    
    messageElement.textContent = message;
    messageElement.className = `newsletter-message ${type}`;
    messageElement.classList.remove('hidden');
    
    // Hide message after 4 seconds
    setTimeout(() => {
        messageElement.classList.add('hidden');
    }, 4000);
    
    console.log('Newsletter message shown:', message, type);
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation helper
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Format currency helper
function formatCurrency(amount) {
    return `₹${amount.toLocaleString('en-IN')}`;
}

// Smooth scroll to top function (bonus feature)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add some visual feedback for button interactions
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') {
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = 'scale(1)';
        }, 100);
    }
});

// Log when page is fully loaded
window.addEventListener('load', function() {
    console.log('Page fully loaded and ready!');
    
    // Add a subtle animation to the hero section
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        setTimeout(() => {
            heroTitle.style.transition = 'all 0.8s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    // Adjust layout if needed on resize
    console.log('Window resized to:', window.innerWidth, 'x', window.innerHeight);
});

// Basic error handling for missing elements
function checkRequiredElements() {
    const requiredElements = [
        'services-list',
        'cart-items', 
        'total-amount',
        'booking-form',
        'newsletter-form',
        'book-service-btn'
    ];
    
    requiredElements.forEach(id => {
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`Warning: Required element with id '${id}' not found`);
        } else {
            console.log(`Found element: ${id}`);
        }
    });
}

// Run element check when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add a delay to ensure all elements are rendered
    setTimeout(checkRequiredElements, 100);
});

console.log('Laundry Service App JavaScript loaded successfully!');