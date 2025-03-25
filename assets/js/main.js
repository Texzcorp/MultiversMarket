// Main.js - Main JavaScript for MultiversMarket

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize functionalities
    initParticles();
    initMobileMenu();
    initScrollAnimations();
    loadFeaturedDimensions();
    
    // Handler for the newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Thank you for subscribing! You will soon receive interdimensional news.', 'success');
            newsletterForm.reset();
        });
    }
});

// Create background particles
function initParticles() {
    const universeElement = document.querySelector('.universe-bg');
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        
        // Slightly random color
        const hue = Math.random() * 60 + 240; // Blue to purple
        particle.style.backgroundColor = `hsl(${hue}, 100%, 70%)`;
        
        universeElement.appendChild(particle);
    }
}

// Mobile menu
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Create a mobile menu if needed
            let mobileMenu = document.querySelector('.mobile-menu');
            
            if (!mobileMenu) {
                mobileMenu = document.createElement('div');
                mobileMenu.classList.add('mobile-menu');
                
                // Clone navigation links and actions
                const navLinksClone = navLinks.cloneNode(true);
                const navActionsClone = navActions.cloneNode(true);
                
                mobileMenu.appendChild(navLinksClone);
                mobileMenu.appendChild(navActionsClone);
                
                // Add after the header
                const header = document.querySelector('header');
                header.parentNode.insertBefore(mobileMenu, header.nextSibling);
            }
            
            // Show/hide the menu
            mobileMenu.classList.toggle('active');
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    // Add class to sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('section-enter');
    });
    
    // Observe sections to trigger animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Dimension data (would normally come from an API)
const dimensions = [
    {
        id: 1,
        name: "Crystalline Nexus",
        description: "A world where everything is made of living crystals that react to human emotions.",
        price: "8.5 ETH",
        image: "assets/svg/dimension1.svg",
        category: "Harmonic"
    },
    {
        id: 2,
        name: "Inverted Voltaic",
        description: "Dimension where electricity is visible and flows like water in all directions.",
        price: "12.7 ETH",
        image: "assets/svg/dimension2.svg",
        category: "Energetic"
    },
    {
        id: 3,
        name: "Quantum Biosphere",
        description: "Ecosystem where plants and animals exist simultaneously in multiple states.",
        price: "15.3 ETH",
        image: "assets/svg/dimension3.svg",
        category: "Biological"
    },
    {
        id: 4,
        name: "Fractal Gravity",
        description: "World where gravity changes according to predictable but complex fractal patterns.",
        price: "9.8 ETH",
        image: "assets/svg/dimension4.svg",
        category: "Altered Physics"
    }
];

// Load featured dimensions on the homepage
function loadFeaturedDimensions() {
    const featuredGrid = document.querySelector('.featured-grid');
    if (!featuredGrid) return;
    
    // Clear the container
    featuredGrid.innerHTML = '';
    
    // Display dimensions
    dimensions.forEach(dimension => {
        const card = createDimensionCard(dimension);
        featuredGrid.appendChild(card);
    });
}

// Create a dimension card
function createDimensionCard(dimension) {
    const card = document.createElement('div');
    card.classList.add('dimension-card');
    card.dataset.id = dimension.id;
    
    card.innerHTML = `
        <div class="dimension-img">
            <object data="${dimension.image}" type="image/svg+xml"></object>
        </div>
        <div class="dimension-info">
            <h3 class="dimension-title">${dimension.name}</h3>
            <p class="dimension-desc">${dimension.description}</p>
            <div class="dimension-meta">
                <span class="dimension-category">${dimension.category}</span>
                <span class="dimension-price">${dimension.price}</span>
            </div>
            <div class="dimension-actions mt-2">
                <button class="btn btn-primary add-to-cart" data-id="${dimension.id}">Acquire</button>
                <a href="dimension.html?id=${dimension.id}" class="btn btn-secondary">Details</a>
            </div>
        </div>
    `;
    
    // Add event listener for the purchase button
    const addToCartBtn = card.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        addToCart(dimension.id);
    });
    
    return card;
}

// Function to add to cart
function addToCart(dimensionId) {
    // Get current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Check if the dimension is already in the cart
    const existingItem = cart.find(item => item.id === dimensionId);
    
    if (existingItem) {
        // Show notification that item is already in cart
        showNotification('This dimension is already in your cart.', 'info');
    } else {
        // Find the dimension in our data
        let dimension = dimensions.find(dim => dim.id === dimensionId);
        
        // If not found in main dimensions, check for additional dimensions in dimension.js
        if (!dimension) {
            const additionalDimensions = [
                {
                    id: 5,
                    name: "Suspended Chronos",
                    description: "Dimension where time is not linear but folds like fabric, creating pockets of past and future.",
                    price: "19.2 ETH",
                    image: "assets/svg/dimension5.svg",
                    category: "Temporal"
                },
                {
                    id: 6,
                    name: "Stellar Ocean",
                    description: "A world entirely composed of luminous water where stars are born and die beneath the surface.",
                    price: "13.7 ETH",
                    image: "assets/svg/dimension6.svg",
                    category: "Harmonic"
                },
                {
                    id: 7,
                    name: "Nano-Civilization",
                    description: "Miniature dimension where an entire civilization exists at a microscopic scale.",
                    price: "7.9 ETH",
                    image: "assets/svg/dimension7.svg",
                    category: "Biological"
                },
                {
                    id: 8,
                    name: "Inverted Terra",
                    description: "World where inside and outside are reversed - people live inside a hollow sphere.",
                    price: "11.4 ETH",
                    image: "assets/svg/dimension8.svg",
                    category: "Altered Physics"
                },
                {
                    id: 9,
                    name: "Magnetic Pulse",
                    description: "Dimension dominated by immense visible magnetic fields that sculpt the landscape.",
                    price: "14.8 ETH",
                    image: "assets/svg/dimension9.svg",
                    category: "Energetic"
                },
                {
                    id: 10,
                    name: "Terra Cognita",
                    description: "World where thoughts materialize instantly, creating a constantly evolving landscape.",
                    price: "22.5 ETH",
                    image: "assets/svg/dimension10.svg",
                    category: "Harmonic"
                },
                {
                    id: 11,
                    name: "Eternal Echo",
                    description: "Dimension where sound is visible and permanent, creating complex architectural structures.",
                    price: "16.3 ETH",
                    image: "assets/svg/dimension11.svg",
                    category: "Energetic"
                },
                {
                    id: 12,
                    name: "Stable Antimatter",
                    description: "Universe composed exclusively of stabilized antimatter, offering infinite energy possibilities.",
                    price: "25.0 ETH",
                    image: "assets/svg/dimension12.svg",
                    category: "Altered Physics"
                }
            ];
            dimension = additionalDimensions.find(dim => dim.id === dimensionId);
        }
        
        if (dimension) {
            // Add to cart
            cart.push({
                id: dimension.id,
                name: dimension.name,
                price: dimension.price,
                image: dimension.image,
                category: dimension.category
            });
            
            // Save to localStorage
            localStorage.setItem('cartItems', JSON.stringify(cart));
            
            // Update cart counter
            updateCartCounter();
            
            // Show success notification
            showNotification(`"${dimension.name}" has been added to your cart.`, 'success');
        }
    }
}

// Update cart counter
function updateCartCounter() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartCount.textContent = cart.length;
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('notification', `notification-${type}`);
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('visible'), 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('visible');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize cart counter on load
updateCartCounter();

// Add styles for mobile menu and notifications
const style = document.createElement('style');
style.textContent = `
    .mobile-menu {
        position: fixed;
        top: 80px;
        left: 0;
        width: 100%;
        background: rgba(10, 10, 30, 0.95);
        backdrop-filter: blur(10px);
        padding: 20px;
        z-index: 100;
        transform: translateY(-100%);
        opacity: 0;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    
    .mobile-menu.active {
        transform: translateY(0);
        opacity: 1;
    }
    
    .mobile-menu .nav-links {
        flex-direction: column;
        gap: 15px;
    }
    
    .mobile-menu .nav-actions {
        flex-direction: column;
        align-items: center;
    }
    
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 20px;
        background: rgba(21, 21, 56, 0.9);
        backdrop-filter: blur(10px);
        border-radius: 8px;
        color: white;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        max-width: 300px;
    }
    
    .notification.visible {
        transform: translateY(0);
        opacity: 1;
    }
    
    .notification-success {
        border-left: 4px solid #00f2ff;
    }
    
    .notification-error {
        border-left: 4px solid #ff4d4d;
    }
    
    .notification-info {
        border-left: 4px solid #6e00ff;
    }
`;

document.head.appendChild(style);

// Function to get URL parameters (used in the detail page)
function getUrlParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split('&');
    
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    
    return params;
}

// Export for use in other scripts
window.multiversMarket = {
    dimensions,
    createDimensionCard,
    addToCart,
    showNotification,
    getUrlParams
};
