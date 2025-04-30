document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const successModal = document.getElementById('success-modal');
    const closeBtns = document.querySelectorAll('.close');
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    const reportLostBtn = document.getElementById('report-lost-btn');
    const reportFoundBtn = document.getElementById('report-found-btn');
    const backToTopBtn = document.getElementById('back-to-top');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const categoryFilter = document.getElementById('category-filter');
    const lostLocationBtn = document.getElementById('lost-location-btn');
    const foundLocationBtn = document.getElementById('found-location-btn');
    const lostImageInput = document.getElementById('lost-image');
    const foundImageInput = document.getElementById('found-image');
    const lostImagePreview = document.getElementById('lost-image-preview');
    const foundImagePreview = document.getElementById('found-image-preview');
    const registerPassword = document.getElementById('register-password');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('.nav-link');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Sample data for lost and found items
    const lostItems = [
        {
            id: 1,
            name: 'MacBook Pro',
            category: 'electronics',
            location: 'Library, 2nd floor',
            date: '2023-10-15',
            description: 'Space Gray MacBook Pro 13" with Touch Bar. Has a sticker of a cat on the back.',
            image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
        },
        {
            id: 2,
            name: 'Student ID Card',
            category: 'ids',
            location: 'Cafeteria',
            date: '2023-10-14',
            description: 'Student ID card with name "John Doe". ID number starts with 2023.',
            image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
        },
        {
            id: 3,
            name: 'Wireless Headphones',
            category: 'electronics',
            location: 'Gym',
            date: '2023-10-13',
            description: 'Black Sony wireless headphones in a blue case.',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
        },
        {
            id: 4,
            name: 'Textbook: Calculus',
            category: 'books',
            location: 'Math Building, Room 205',
            date: '2023-10-12',
            description: 'Calculus textbook by James Stewart, 8th edition. Has notes on some pages.',
            image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
        }
    ];
    
    const foundItems = [
        {
            id: 1,
            name: 'Apple Watch',
            category: 'electronics',
            location: 'Student Center',
            date: '2023-10-15',
            description: 'Silver Apple Watch Series 5 found near the food court.',
            image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
        },
        {
            id: 2,
            name: 'Backpack',
            category: 'other',
            location: 'Bus Stop',
            date: '2023-10-14',
            description: 'Black Jansport backpack with notebooks and pens inside.',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D3D&auto=format&fit=crop&w=600&q=80'
        },
        {
            id: 3,
            name: 'Water Bottle',
            category: 'other',
            location: 'Gym',
            date: '2023-10-13',
            description: 'Blue Hydro Flask with stickers on it.',
            image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
        },
        {
            id: 4,
            name: 'Glasses',
            category: 'other',
            location: 'Library',
            date: '2023-10-12',
            description: 'Black rectangular glasses in a black case.',
            image: 'https://images.unsplash.com/photo-1591076482161-42ce6ba69f9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
        }
    ];
    
    // Initialize the page
    function init() {
        renderItems();
        setupEventListeners();
        animateElements();
        startCounterAnimation();
    }
    
    // Render lost and found items
    function renderItems(filter = '', category = 'all') {
        const lostItemsGrid = document.getElementById('lost-items-grid');
        const foundItemsGrid = document.getElementById('found-items-grid');
        
        lostItemsGrid.innerHTML = '';
        foundItemsGrid.innerHTML = '';
        
        // Filter and render lost items
        const filteredLostItems = lostItems.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(filter.toLowerCase()) || 
                                item.description.toLowerCase().includes(filter.toLowerCase());
            const matchesCategory = category === 'all' || item.category === category;
            return matchesSearch && matchesCategory;
        });
        
        filteredLostItems.forEach(item => {
            lostItemsGrid.appendChild(createItemCard(item, 'lost'));
        });
        
        // Filter and render found items
        const filteredFoundItems = foundItems.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(filter.toLowerCase()) || 
                                item.description.toLowerCase().includes(filter.toLowerCase());
            const matchesCategory = category === 'all' || item.category === category;
            return matchesSearch && matchesCategory;
        });
        
        filteredFoundItems.forEach(item => {
            foundItemsGrid.appendChild(createItemCard(item, 'found'));
        });
    }
    
    // Create an item card element
    function createItemCard(item, type) {
        const card = document.createElement('div');
        card.className = 'item-card animate-up';
        
        const statusClass = type === 'lost' ? 'status-lost' : 'status-found';
        const statusText = type === 'lost' ? 'Lost' : 'Found';
        
        card.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-content">
                <span class="item-status ${statusClass}">${statusText}</span>
                <h3>${item.name}</h3>
                <div class="item-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${item.location}</span>
                    <span><i class="far fa-calendar-alt"></i> ${formatDate(item.date)}</span>
                </div>
                <span class="item-category">${getCategoryName(item.category)}</span>
                <p class="item-description">${item.description}</p>
                <button class="btn-outline">View Details</button>
            </div>
        `;
        
        return card;
    }
    
    // Format date for display
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }
    
    // Get category name for display
    function getCategoryName(category) {
        const categories = {
            'electronics': 'Electronics',
            'books': 'Books',
            'ids': 'IDs/Cards',
            'clothing': 'Clothing',
            'other': 'Other'
        };
        return categories[category] || category;
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Modal controls
        loginBtn.addEventListener('click', () => openModal(loginModal));
        registerBtn.addEventListener('click', () => openModal(registerModal));
        reportLostBtn.addEventListener('click', () => {
            document.querySelector('[data-tab="lost-tab"]').click();
            document.getElementById('report').scrollIntoView({ behavior: 'smooth' });
        });
        reportFoundBtn.addEventListener('click', () => {
            document.querySelector('[data-tab="found-tab"]').click();
            document.getElementById('report').scrollIntoView({ behavior: 'smooth' });
        });
        
        closeBtns.forEach(btn => {
            btn.addEventListener('click', closeModal);
        });
        
        switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(loginModal);
            openModal(registerModal);
        });
        
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(registerModal);
            openModal(loginModal);
        });
        
        // Search and filter
        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
        
        categoryFilter.addEventListener('change', handleSearch);
        
        // Location buttons
        lostLocationBtn.addEventListener('click', () => {
            simulateLocationDetection('lost-location');
        });
        
        foundLocationBtn.addEventListener('click', () => {
            simulateLocationDetection('found-location');
        });
        
        // Image preview
        lostImageInput.addEventListener('change', (e) => handleImageUpload(e, lostImagePreview));
        foundImageInput.addEventListener('change', (e) => handleImageUpload(e, foundImagePreview));
        
        // Password strength
        registerPassword.addEventListener('input', checkPasswordStrength);
        
        // Form submissions
        document.getElementById('login-form').addEventListener('submit', handleLogin);
        document.getElementById('register-form').addEventListener('submit', handleRegister);
        document.getElementById('lost-form').addEventListener('submit', handleLostForm);
        document.getElementById('found-form').addEventListener('submit', handleFoundForm);
        document.getElementById('newsletter-form').addEventListener('submit', handleNewsletter);
        
        // Back to top button
        window.addEventListener('scroll', toggleBackToTop);
        backToTopBtn.addEventListener('click', scrollToTop);
        
        // Mobile menu
        hamburger.addEventListener('click', toggleMobileMenu);
        
        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
        
        // Tab switching
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                switchTab(tabId);
            });
        });
        
        // Modal close when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                closeModal();
            }
        });
    }
    
    // Modal functions
    function openModal(modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }
    
    // Search and filter
    function handleSearch() {
        const searchTerm = searchInput.value.trim();
        const category = categoryFilter.value;
        renderItems(searchTerm, category);
    }
    
    // Simulate location detection
    function simulateLocationDetection(inputId) {
        const locations = [
            'Library Entrance',
            'Cafeteria',
            'Student Center',
            'Main Quad',
            'Science Building',
            'Gym',
            'Parking Lot A',
            'Computer Lab'
        ];
        
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        document.getElementById(inputId).value = randomLocation;
        
        // Show success message
        showSuccessMessage('Location detected successfully!');
    }
    
    // Handle image upload preview
    function handleImageUpload(event, previewElement) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewElement.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                previewElement.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    }
    
    // Check password strength
    function checkPasswordStrength() {
        const password = registerPassword.value;
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength += 1;
        
        // Contains lowercase
        if (/[a-z]/.test(password)) strength += 1;
        
        // Contains uppercase
        if (/[A-Z]/.test(password)) strength += 1;
        
        // Contains number
        if (/[0-9]/.test(password)) strength += 1;
        
        // Contains special char
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        // Update UI
        const strengthBars = document.querySelectorAll('.strength-bar');
        strengthBars.forEach(bar => {
            bar.style.width = `${strength * 20}%`;
            
            if (strength <= 2) {
                bar.style.backgroundColor = var(--danger-color);
                strengthText.textContent = 'Weak';
            } else if (strength === 3) {
                bar.style.backgroundColor = var(--warning-color);
                strengthText.textContent = 'Medium';
            } else {
                bar.style.backgroundColor = var(--success-color);
                strengthText.textContent = 'Strong';
            }
        });
    }
    
    // Form handlers
    function handleLogin(e) {
        e.preventDefault();
        // In a real app, you would validate and send to server
        showSuccessMessage('Login successful! Redirecting...');
        setTimeout(() => {
            closeModal();
        }, 1500);
    }
    
    function handleRegister(e) {
        e.preventDefault();
        // In a real app, you would validate and send to server
        showSuccessMessage('Registration successful! You can now login.');
        setTimeout(() => {
            closeModal();
            openModal(loginModal);
        }, 1500);
    }
    
    function handleLostForm(e) {
        e.preventDefault();
        // In a real app, you would send data to server
        showSuccessMessage('Lost item reported successfully! We will notify you if it is found.');
        e.target.reset();
        lostImagePreview.innerHTML = '';
        lostImagePreview.style.display = 'none';
    }
    
    function handleFoundForm(e) {
        e.preventDefault();
        // In a real app, you would send data to server
        showSuccessMessage('Found item reported successfully! Thank you for your honesty.');
        e.target.reset();
        foundImagePreview.innerHTML = '';
        foundImagePreview.style.display = 'none';
    }
    
    function handleNewsletter(e) {
        e.preventDefault();
        showSuccessMessage('Thank you for subscribing to our newsletter!');
        e.target.reset();
    }
    
    // Show success message
    function showSuccessMessage(message) {
        document.getElementById('success-message').textContent = message;
        openModal(successModal);
        
        document.getElementById('success-ok-btn').addEventListener('click', closeModal, { once: true });
    }
    
    // Back to top button
    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
            
            // Add sticky header effect
            if (window.pageYOffset > 100) {
                document.querySelector('header').classList.add('sticky-header');
            } else {
                document.querySelector('header').classList.remove('sticky-header');
            }
        } else {
            backToTopBtn.classList.remove('visible');
            document.querySelector('header').classList.remove('sticky-header');
        }
    }
    
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Mobile menu
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
    
    // Tab switching
    function switchTab(tabId) {
        // Update tab buttons
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        
        // Update tab contents
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
    }
    
    // Animate elements on scroll
    function animateElements() {
        const animateElements = document.querySelectorAll('.animate-up');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Animate counter numbers
    function startCounterAnimation() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(startCounterAnimation, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Initialize the application
    init();
});