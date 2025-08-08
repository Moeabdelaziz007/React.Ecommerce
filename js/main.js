// React Ecommerce - Main JavaScript
class EcommerceApp {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.products = [];
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }

    init() {
        console.log('Initializing EcommerceApp...');
        this.loadProducts();
        this.setupEventListeners();
        this.updateCartCount();
        this.applyTheme();
        this.addScrollAnimations();
        console.log('EcommerceApp initialization complete');
    }

    // Load sample products
    loadProducts() {
        this.products = [
            {
                id: 1,
                name: "Wireless Headphones",
                price: 99.99,
                category: "electronics",
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
                rating: 4.5,
                description: "High-quality wireless headphones with noise cancellation"
            },
            {
                id: 2,
                name: "Smart Watch",
                price: 199.99,
                category: "electronics",
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
                rating: 4.8,
                description: "Feature-rich smartwatch with health tracking"
            },
            {
                id: 3,
                name: "Running Shoes",
                price: 79.99,
                category: "clothing",
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
                rating: 4.3,
                description: "Comfortable running shoes for all terrains"
            },
            {
                id: 4,
                name: "Laptop Backpack",
                price: 49.99,
                category: "clothing",
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
                rating: 4.6,
                description: "Durable laptop backpack with multiple compartments"
            },
            {
                id: 5,
                name: "Programming Book",
                price: 29.99,
                category: "books",
                image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
                rating: 4.7,
                description: "Comprehensive guide to modern programming"
            },
            {
                id: 6,
                name: "Design Book",
                price: 39.99,
                category: "books",
                image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
                rating: 4.4,
                description: "Complete guide to UI/UX design principles"
            }
        ];

        this.renderProducts();
    }

    // Setup event listeners
    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterProducts();
            });
        }

        // Category filter
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => {
                this.filterProducts();
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Render products
    renderProducts(productsToRender = this.products) {
        const productsGrid = document.getElementById('products-grid');
        if (!productsGrid) return;

        productsGrid.innerHTML = productsToRender.map(product => `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="product-card glass-card fade-in-up">
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <h5 class="product-title">${product.name}</h5>
                    <div class="product-rating">
                        ${this.generateStars(product.rating)}
                        <span class="ms-2">(${product.rating})</span>
                    </div>
                    <div class="product-price">$${product.price}</div>
                    <p class="text-muted small mb-3">${product.description}</p>
                    <button class="btn btn-primary w-100" onclick="app.addToCart(${product.id})">
                        <i class="fas fa-cart-plus me-2"></i>Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Generate star rating
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    }

    // Filter products
    filterProducts() {
        const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
        const categoryFilter = document.getElementById('category-filter')?.value || '';

        let filteredProducts = this.products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                                product.description.toLowerCase().includes(searchTerm);
            const matchesCategory = !categoryFilter || product.category === categoryFilter;
            
            return matchesSearch && matchesCategory;
        });

        this.renderProducts(filteredProducts);
    }

    // Add to cart
    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartCount();
        this.showNotification('Product added to cart!', 'success');
    }

    // Remove from cart
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
    }

    // Update cart quantity
    updateCartQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
            this.renderCart();
        }
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    // Update cart count
    updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    // Render cart modal
    renderCart() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        
        if (!cartItems || !cartTotal) return;

        if (this.cart.length === 0) {
            cartItems.innerHTML = '<p class="text-center text-muted">Your cart is empty</p>';
            cartTotal.textContent = '0.00';
            return;
        }

        cartItems.innerHTML = this.cart.map(item => `
            <div class="d-flex align-items-center mb-3 p-3 border-bottom">
                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover;" class="rounded me-3">
                <div class="flex-grow-1">
                    <h6 class="mb-1">${item.name}</h6>
                    <p class="text-muted mb-0">$${item.price}</p>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-sm btn-outline-secondary me-2" onclick="app.updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary me-2" onclick="app.updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="btn btn-sm btn-outline-danger" onclick="app.removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);
    }

    // Toggle cart modal
    toggleCart() {
        this.renderCart();
        const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
        cartModal.show();
    }

    // Checkout function
    checkout() {
        if (this.cart.length === 0) {
            this.showNotification('Your cart is empty!', 'warning');
            return;
        }

        this.showNotification('Checkout functionality would be implemented here!', 'info');
        // In a real app, this would redirect to a checkout page or payment processor
    }

    // Toggle theme
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.currentTheme);
        this.applyTheme();
    }

    // Apply theme
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        const themeIcon = document.querySelector('.btn-primary i');
        if (themeIcon) {
            themeIcon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    // Add scroll animations
    addScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.glass-card').forEach(card => {
            observer.observe(card);
        });
    }

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-${this.getNotificationIcon(type)} me-2"></i>
                <span>${message}</span>
                <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // Get notification icon
    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // Scroll to section
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // AI Demo Functions
    demoSmartSearch() {
        this.showNotification('AI Search: "running shoes under $100" - Found 3 products!', 'success');
    }

    demoDynamicPricing() {
        this.showNotification('Dynamic pricing updated based on demand!', 'info');
    }

    demoRecommendations() {
        this.showNotification('AI Recommendations: Based on your browsing history', 'success');
    }

    // Blockchain Functions
    connectWallet(walletType) {
        const networkStatus = document.getElementById('network-status');
        if (networkStatus) {
            networkStatus.textContent = `Connected to ${walletType}`;
            networkStatus.className = 'badge bg-success';
        }
        this.showNotification(`${walletType} wallet connected successfully!`, 'success');
    }
}

// Global functions for HTML onclick handlers
function toggleCart() {
    app.toggleCart();
}

function toggleTheme() {
    app.toggleTheme();
}

function scrollToSection(sectionId) {
    app.scrollToSection(sectionId);
}

function demoSmartSearch() {
    app.demoSmartSearch();
}

function demoDynamicPricing() {
    app.demoDynamicPricing();
}

function demoRecommendations() {
    app.demoRecommendations();
}

function connectWallet(walletType) {
    app.connectWallet(walletType);
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing EcommerceApp...');
    try {
        app = new EcommerceApp();
        console.log('EcommerceApp initialized successfully');
    } catch (error) {
        console.error('Error initializing EcommerceApp:', error);
    }
});
