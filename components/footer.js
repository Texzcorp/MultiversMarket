// Footer Component
class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <footer>
        <div class="footer-content">
            <div class="footer-logo">
                <span class="logo-symbol">∞</span>
                <h2>MultiversMarket</h2>
            </div>
            <div class="footer-links">
                <div class="footer-column">
                    <h3>Navigation</h3>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="marketplace.html">Dimensions</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>Legal</h3>
                    <ul>
                        <li><a href="terms.html">Terms of Use</a></li>
                        <li><a href="privacy.html">Privacy Policy</a></li>
                        <li><a href="regulations.html">Dimensional Regulation</a></li>
                        <li><a href="licenses.html">Licenses</a></li>
                    </ul>
                </div>
                <div class="footer-column">
                    <h3>Support</h3>
                    <ul>
                        <li><a href="faq.html">FAQ</a></li>
                        <li><a href="support.html">Technical Support</a></li>
                        <li><a href="guide.html">Dimension Guide</a></li>
                        <li><a href="security.html">Security</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-newsletter">
                <h3>Stay Informed</h3>
                <p>Subscribe to receive the latest dimensional discoveries</p>
                <form class="newsletter-form">
                    <input type="email" placeholder="Your email" required>
                    <button type="submit" class="btn btn-primary">Subscribe</button>
                </form>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 MultiversMarket - All interdimensional rights reserved</p>
        </div>
      </footer>
    `;
  }
}

// Define the custom element
customElements.define('footer-component', Footer);
