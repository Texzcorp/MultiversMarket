// Header Component
class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <header>
        <div class="logo">
            <span class="logo-symbol">∞</span>
            <h1>MultiversMarket</h1>
        </div>
        <nav>
            <ul class="nav-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="marketplace.html">Dimensions</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
        <div class="nav-actions">
            <a href="cart.html" class="cart-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 22C8.55228 22 9 21.5523 9 21C9 20.4477 8.55228 20 8 20C7.44772 20 7 20.4477 7 21C7 21.5523 7.44772 22 8 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19 22C19.5523 22 20 21.5523 20 21C20 20.4477 19.5523 20 19 20C18.4477 20 18 20.4477 18 21C18 21.5523 18.4477 22 19 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2.05 2.05H4.05L6.71 14.47C6.82291 14.9716 7.0942 15.4263 7.48689 15.7536C7.87958 16.0808 8.37217 16.2641 8.88 16.27H18.4C18.9078 16.2641 19.4004 16.0808 19.7931 15.7536C20.1858 15.4263 20.4571 14.9716 20.57 14.47L22 6.24H5.19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="cart-count">0</span>
            </a>
            <button class="account-btn">Login</button>
        </div>
        <button class="mobile-menu-btn">
            <span></span>
            <span></span>
            <span></span>
        </button>
      </header>
    `;

    // Update cart count when the component is loaded
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.querySelector('.cart-count').textContent = cartItems.length;

    // Add mobile menu functionality
    const mobileMenuBtn = this.querySelector('.mobile-menu-btn');
    const navLinks = this.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
      });
    }
  }
}

// Define the custom element
customElements.define('header-component', Header);
