
    // Sample services data
    const services = [
      {
        id: 1,
        name: "Home Cleaning",
        price: 499,
        img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: 2,
        name: "AC Repair",
        price: 799,
        img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: 3,
        name: "Car Wash",
        price: 299,
        img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: 4,
        name: "Plumbing",
        price: 599,
        img: "https://images.unsplash.com/photo-1503389152951-9c3d8b6e9c94?auto=format&fit=crop&w=400&q=80"
      }
    ];

    let cart = [];

    // Render services
    function renderServices() {
      const servicesList = document.getElementById('servicesList');
      servicesList.innerHTML = '';
      services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
          <img src="${service.img}" alt="${service.name}">
          <h4>${service.name}</h4>
          <div class="price">₹${service.price}</div>
          <button class="add-btn" onclick="addToCart(${service.id})">Add Item</button>
          <button class="skip-btn" onclick="skipService(${service.id})">Skip Item</button>
        `;
        servicesList.appendChild(card);
      });
    }

    // Add to cart
    function addToCart(serviceId) {
      const service = services.find(s => s.id === serviceId);
      if (!cart.some(item => item.id === serviceId)) {
        cart.push(service);
        renderCart();
      } else {
        alert("Service already added!");
      }
    }

    // Skip service (just disables the card)
    function skipService(serviceId) {
      const cards = document.querySelectorAll('.service-card');
      cards.forEach(card => {
        if (card.querySelector('h4').innerText === services.find(s => s.id === serviceId).name) {
          card.style.opacity = 0.4;
          card.querySelector('.add-btn').disabled = true;
          card.querySelector('.skip-btn').disabled = true;
        }
      });
    }

    // Render cart
    function renderCart() {
      const cartList = document.getElementById('cartList');
      cartList.innerHTML = '';
      if (cart.length === 0) {
        cartList.innerHTML = '<li id="emptyCartMsg">No items added yet.</li>';
      } else {
        cart.forEach((item, idx) => {
          const li = document.createElement('li');
          li.innerHTML = `
            <span>${item.name} - ₹${item.price}</span>
            <button onclick="removeFromCart(${item.id})" style="background:#e53935;color:#fff;border:none;padding:2px 8px;border-radius:3px;cursor:pointer;">Remove</button>
          `;
          cartList.appendChild(li);
        });
      }
      updateTotal();
    }

    // Remove from cart
    function removeFromCart(serviceId) {
      cart = cart.filter(item => item.id !== serviceId);
      renderCart();
    }

    // Update total
    function updateTotal() {
      const total = cart.reduce((sum, item) => sum + item.price, 0);
      document.getElementById('totalAmount').innerText = total;
    }

    // Booking form submit
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
      e.preventDefault();
      if (cart.length === 0) {
        alert("Please add at least one service to book.");
        return;
      }
      const name = document.getElementById('fullName').value;
      alert(`Thank you, ${name}! Your booking for ${cart.length} service(s) is confirmed.`);
      cart = [];
      renderCart();
      this.reset();
    });

    // Logout
    function logout() {
      alert("Logged out!");
      // Redirect or clear session here
    }

    // Initial render
    renderServices();
    renderCart();
  