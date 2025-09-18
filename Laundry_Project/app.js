// 
// app.js - Laundry Services App (EmailJS integrated)
// Services data from the provided JSON
const servicesData = {
    1: { name: "Dry Cleaning", price: 200.00, icon: "🧹" },
    2: { name: "Wash & Fold", price: 100.00, icon: "🧺" },
    3: { name: "Ironing", price: 30.00, icon: "👕" },
    4: { name: "Stain Removal", price: 500.00, icon: "🌟" },
    5: { name: "Leather & Suede Cleaning", price: 999.00, icon: "👜" },
    6: { name: "Wedding Dress Cleaning", price: 2500.00, icon: "👰"  }
};

// Cart state
let cart = {};
let totalAmount = 0;

// EmailJS configuration (from you)
const EMAILJS_SERVICE_ID = "laundry_service";
const EMAILJS_TEMPLATE_ID = "template_kn3rqop"; // updated template id as provided
const EMAILJS_PUBLIC_KEY = "2PK6mC6evd3Vqmii-";

// Initialize EmailJS
(function() {
    // emailjs.init is required if using the public key in the browser
    if (typeof emailjs !== 'undefined' && emailjs.init) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log('EmailJS initialized with public key.');
    } else {
        console.warn('EmailJS SDK not found. Make sure you included the SDK script in HTML.');
    }
})();

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    updateCartDisplay();
    updateButtonStates();

    // removed erroneous reference to undefined serviceId
    console.log('Laundry Services App initialized successfully');
}

// Setup all event listeners
function setupEventListeners() {
    // Service button event listeners using event delegation
    document.addEventListener('click', function(e) {
        // Handle Add Item buttons
        if (e.target.classList.contains('btn-add')) {
            e.preventDefault();
            const serviceItem = e.target.closest('.service-item');
            if (serviceItem) {
                const serviceId = parseInt(serviceItem.getAttribute('data-id'));
                addToCart(serviceId);
            }
        }
        
        // Handle Remove Item buttons
        if (e.target.classList.contains('btn-remove')) {
            e.preventDefault();
            const serviceItem = e.target.closest('.service-item');
            if (serviceItem) {
                const serviceId = parseInt(serviceItem.getAttribute('data-id'));
                removeFromCart(serviceId);
            }
        }
    });

    // Booking form submission
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmission);
    }

    // Newsletter subscription
    const newsletterBtn = document.querySelector('.newsletter-btn');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', subscribeNewsletter);
    }

    // Newsletter form Enter key
    const newsletterEmail = document.getElementById('newsletter-email');
    if (newsletterEmail) {
        newsletterEmail.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                subscribeNewsletter();
            }
        });
    }

    // Navigation smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero button scroll to services
    const heroBtn = document.querySelector('.hero-btn');
    if (heroBtn) {
        heroBtn.addEventListener('click', scrollToServices);
    }

    // Message overlay close handlers
    const messageOverlay = document.getElementById('message-overlay');
    if (messageOverlay) {
        messageOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeMessage();
            }
        });
    }

    // Escape key to close messages
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMessage();
        }
    });

    console.log('Event listeners setup completed');
}

// Scroll to services section
function scrollToServices() {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        const offsetTop = servicesSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add item to cart
function addToCart(serviceId) {
    console.log('Adding service to cart:', serviceId);
    
    const service = servicesData[serviceId];
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
    
    console.log('Cart updated:', cart);
    updateCartDisplay();
    updateButtonStates();

    // Change Add button text to "Added"
    const serviceItem = document.querySelector(`.service-item[data-id="${serviceId}"]`);
    if (serviceItem) {
        const addBtn = serviceItem.querySelector('.btn-add');
        if (addBtn) {
            addBtn.textContent = "Added";
        }
    }
}

// Remove item from cart
function removeFromCart(serviceId) {
    console.log('Removing service from cart:', serviceId);
    
    if (cart[serviceId] && cart[serviceId].quantity > 0) {
        cart[serviceId].quantity -= 1;
        
        if (cart[serviceId].quantity <= 0) {
            delete cart[serviceId];
        }
        
        console.log('Cart after removal:', cart);
        updateCartDisplay();
        updateButtonStates();

        // Reset Add button text back to "Add Item"
        const serviceItem = document.querySelector(`.service-item[data-id="${serviceId}"]`);
        if (serviceItem) {
            const addBtn = serviceItem.querySelector('.btn-add');
            if (addBtn) {
                addBtn.textContent = "Add Item";
            }
        }
    }
}

// Update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-amount');
    
    if (!cartItemsContainer || !totalAmountElement) {
        console.error('Cart display elements not found');
        return;
    }

    // Clear current cart display
    cartItemsContainer.innerHTML = '';
    totalAmount = 0;
    
    const cartKeys = Object.keys(cart).filter(serviceId => cart[serviceId].quantity > 0);
    
    if (cartKeys.length === 0) {
        cartItemsContainer.innerHTML = '<div style="text-align: center; color: #666; padding: 20px; grid-column: 1/-1;">No items added yet</div>';
    } else {
        cartKeys.forEach((serviceId, index) => {
            const item = cart[serviceId];
            const itemTotal = item.price * item.quantity;
            totalAmount += itemTotal;
            
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <div>${index + 1}</div>
                <div>${item.name} x${item.quantity}</div>
                <div>₹${itemTotal.toFixed(2)}</div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
    }
    
    totalAmountElement.textContent = totalAmount.toFixed(2);
    console.log('Cart display updated. Total amount:', totalAmount);
}

// Update button states
function updateButtonStates() {
    // Update all service items
    for (let serviceId = 1; serviceId <= 6; serviceId++) {
        const serviceItem = document.querySelector(`.service-item[data-id="${serviceId}"]`);
        if (!serviceItem) continue;
        
        const removeBtn = serviceItem.querySelector('.btn-remove');
        const addBtn = serviceItem.querySelector('.btn-add');
        
        if (!removeBtn || !addBtn) continue;
        
        const hasItems = cart[serviceId] && cart[serviceId].quantity > 0;
        
        if (hasItems) {
            // Show remove button, hide add button
            removeBtn.style.display = 'inline-block';
            removeBtn.classList.remove('hidden');
            addBtn.style.display = 'none';
        } else {
            // Show add button, hide remove button  
            removeBtn.style.display = 'none';
            removeBtn.classList.add('hidden');
            addBtn.style.display = 'inline-block';
        }
    }
    
    console.log('Button states updated');
}

// Handle booking form submission
async function handleBookingSubmission(e) {
    e.preventDefault();
    console.log('Booking form submitted');
    
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    // Validation
    if (!fullName || !email || !phone) {
        showMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    if (Object.keys(cart).length === 0 || totalAmount === 0) {
        showMessage('Please add some services to your cart before booking.', 'error');
        return;
    }
    
    // Show loading state
    const bookBtn = document.querySelector('.book-btn');
    const originalText = bookBtn.textContent;
    bookBtn.textContent = 'Booking...';
    bookBtn.disabled = true;
    
    try {
        // Prepare booking details
        const bookingDetails = {
            customerName: fullName,
            customerEmail: email,
            customerPhone: phone,
            services: Object.keys(cart).map(serviceId => {
                const item = cart[serviceId];
                return {
                    name: item.name,
                    quantity: item.quantity,
                    unitPrice: item.price,
                    total: item.price * item.quantity
                };
            }).filter(service => service.quantity > 0),
            totalAmount: totalAmount,
            bookingDate: new Date().toLocaleDateString('en-IN'),
            bookingTime: new Date().toLocaleTimeString('en-IN')
        };
        
        // Send email using EmailJS
        const emailResult = await sendBookingEmail(bookingDetails);
        
        if (emailResult.success) {
            showMessage('Thank you for booking! We will contact you soon to confirm your pickup time.', 'success');
            
            // Reset form and cart
            document.getElementById('booking-form').reset();
            cart = {};
            updateCartDisplay();
            updateButtonStates();
            
            console.log('Booking completed successfully');
        } else {
            throw new Error('Email sending failed');
        }
        
    } catch (error) {
        console.error('Booking error:', error);
        showMessage('Sorry, there was an error processing your booking. Please try again or contact us directly.', 'error');
    } finally {
        // Reset button state
        bookBtn.textContent = originalText;
        bookBtn.disabled = false;
    }
}


// Send booking confirmation email using EmailJS
async function sendBookingEmail(bookingDetails) {
    try {
        console.log('Sending booking email:', bookingDetails);
        
        // Format services for email (each on new line)
        const servicesText = bookingDetails.services
            .map(service => `${service.name} x${service.quantity} - ₹${service.total.toFixed(2)}`)
            .join("\n");

        // Prepare email template parameters
        const templateParams = {
            customer_name: bookingDetails.customerName,
            customer_email: bookingDetails.customerEmail,
            customer_phone: bookingDetails.customerPhone,
            services_list: servicesText,
            total_amount: `₹${bookingDetails.totalAmount.toFixed(2)}`,
            booking_date: bookingDetails.bookingDate,
            booking_time: bookingDetails.bookingTime,
            to_email: bookingDetails.customerEmail,     // customer
            admin_email: "info@laundryservice.com"      // admin copy (change to your business email)
        };

        // Actual EmailJS call
        // Note: we pass the public key as the 4th argument for compatibility with the library usage in some builds
        const result = await emailjs.send(
            EMAILJS_SERVICE_ID,        // Service ID
            EMAILJS_TEMPLATE_ID,       // Template ID (updated)
            templateParams,
            EMAILJS_PUBLIC_KEY         // Public Key
        );

        console.log("EmailJS result:", result);
        return { success: true };
    } catch (error) {
        console.error("Email sending error:", error);
        return { success: false, error };
    }
}



// Newsletter subscription (now sends real EmailJS email using same template)
function subscribeNewsletter() {
    const emailInput = document.getElementById('newsletter-email');
    const email = (emailInput && emailInput.value) ? emailInput.value.trim() : '';

    if (!email) {
        showMessage('Please enter your email address.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const subscribeBtn = document.querySelector('.newsletter-btn');
    const originalText = subscribeBtn ? subscribeBtn.textContent : 'Subscribe';
    if (subscribeBtn) {
        subscribeBtn.textContent = 'Subscribing...';
        subscribeBtn.disabled = true;
    }
    
    // Prepare params for newsletter template: using same template (you can create separate template later)
    const templateParams = {
        subscriber_email: email,
        date: new Date().toLocaleDateString('en-IN'),
        admin_email: "info@laundryservice.com" // change as needed
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
    .then(() => {
        console.log('Newsletter subscription for:', email);
        showMessage('Thank you for subscribing to our newsletter!', 'success');
        if (emailInput) emailInput.value = '';
    })
    .catch((err) => {
        console.error("Newsletter error:", err);
        showMessage('Subscription failed, try again.', 'error');
    })
    .finally(() => {
        if (subscribeBtn) {
            subscribeBtn.textContent = originalText;
            subscribeBtn.disabled = false;
        }
    });
}

// Show message overlay
function showMessage(message, type) {
    const messageOverlay = document.getElementById('message-overlay');
    const messageText = document.getElementById('message-text');
    
    if (!messageOverlay || !messageText) {
        console.error('Message overlay elements not found');
        alert(message); // Fallback to alert
        return;
    }
    
    messageText.textContent = message;
    messageOverlay.classList.remove('hidden');
    
    // Apply styling based on type
    const messageContent = messageOverlay.querySelector('.message-content');
    if (type === 'success') {
        messageContent.style.borderLeft = '5px solid #4CAF50';
        messageText.style.color = '#4CAF50';
    } else if (type === 'error') {
        messageContent.style.borderLeft = '5px solid #FF1744';
        messageText.style.color = '#FF1744';
    } else {
        // reset
        messageContent.style.borderLeft = '';
        messageText.style.color = '';
    }
    
    console.log(`Message displayed: ${type} - ${message}`);
}

// Close message overlay
function closeMessage() {
    const messageOverlay = document.getElementById('message-overlay');
    if (messageOverlay) {
        messageOverlay.classList.add('hidden');
    }
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

// Debug logging
console.log('Laundry Services App loaded successfully');
console.log('Available services:', servicesData);
console.log('EmailJS initialized with provided configuration.');
