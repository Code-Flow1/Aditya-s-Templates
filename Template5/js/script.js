// Global variables
let currentSlide = 0;
let currentTestimonial = 0;
let orderItems = [];
let orderTotal = 0;
let currentLightboxImage = 0;
let lightboxImages = [];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCarousels();
    initializeTestimonials();
    initializeMenuFunctionality();
    initializeOrderSystem();
    initializeReservationForm();
    initializeContactForm();
    initializeGallery();
    initializeLightbox();
    initializeNewsletterForms();
    initializeScrollAnimations();
});

// Navigation Functions
function initializeNavigation() {
    const navToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(139, 38, 53, 0.98)';
        } else {
            navbar.style.background = 'rgba(139, 38, 53, 0.95)';
        }
    });
}

// Carousel Functions
function initializeCarousels() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slides = document.querySelectorAll('.carousel-slide');

    if (prevBtn && nextBtn && slides.length > 0) {
        prevBtn.addEventListener('click', () => changeSlide(-1));
        nextBtn.addEventListener('click', () => changeSlide(1));

        // Auto-advance carousel
        setInterval(() => changeSlide(1), 5000);
    }
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    
    if (slides.length === 0) return;

    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Testimonials Functions
function initializeTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');

    if (testimonials.length > 0 && dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showTestimonial(index));
        });

        // Auto-advance testimonials
        setInterval(() => {
            showTestimonial((currentTestimonial + 1) % testimonials.length);
        }, 6000);
    }
}

function showTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');

    if (testimonials.length === 0 || dots.length === 0) return;

    testimonials[currentTestimonial].classList.remove('active');
    dots[currentTestimonial].classList.remove('active');

    currentTestimonial = index;

    testimonials[currentTestimonial].classList.add('active');
    dots[currentTestimonial].classList.add('active');
}

// Menu Functions
function initializeMenuFunctionality() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            showMenuCategory(category);
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function showMenuCategory(category) {
    const categories = document.querySelectorAll('.menu-category');
    
    categories.forEach(cat => {
        cat.classList.remove('active');
        if (cat.id === category) {
            cat.classList.add('active');
        }
    });
}

// Order System Functions
function initializeOrderSystem() {
    const addToOrderBtns = document.querySelectorAll('.add-to-order');
    const orderToggle = document.getElementById('orderToggle');
    const orderSummary = document.getElementById('orderSummary');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const clearOrderBtn = document.getElementById('clearOrderBtn');

    addToOrderBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const dish = this.getAttribute('data-dish');
            const price = parseFloat(this.getAttribute('data-price'));
            addToOrder(dish, price);
        });
    });

    if (orderToggle && orderSummary) {
        orderToggle.addEventListener('click', function() {
            orderSummary.classList.toggle('open');
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (orderItems.length > 0) {
                alert('Proceeding to checkout... (This would integrate with a payment system)');
            } else {
                alert('Your order is empty. Please add some items first.');
            }
        });
    }

    if (clearOrderBtn) {
        clearOrderBtn.addEventListener('click', clearOrder);
    }
}

function addToOrder(dish, price) {
    const existingItem = orderItems.find(item => item.dish === dish);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        orderItems.push({ dish, price, quantity: 1 });
    }
    
    updateOrderDisplay();
    
    // Show brief confirmation
    showNotification(`${dish} added to order!`);
}

function removeFromOrder(dish) {
    const itemIndex = orderItems.findIndex(item => item.dish === dish);
    if (itemIndex > -1) {
        if (orderItems[itemIndex].quantity > 1) {
            orderItems[itemIndex].quantity--;
        } else {
            orderItems.splice(itemIndex, 1);
        }
        updateOrderDisplay();
    }
}

function clearOrder() {
    if (orderItems.length > 0 && confirm('Are you sure you want to clear your order?')) {
        orderItems = [];
        updateOrderDisplay();
        showNotification('Order cleared!');
    }
}

function updateOrderDisplay() {
    const orderItemsContainer = document.getElementById('orderItems');
    const orderTotalElement = document.getElementById('orderTotal');
    const orderCountElement = document.getElementById('orderCount');

    if (!orderItemsContainer || !orderTotalElement || !orderCountElement) return;

    // Calculate total
    orderTotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Update count
    const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);
    orderCountElement.textContent = totalItems;

    // Update total
    orderTotalElement.textContent = orderTotal.toFixed(2);

    // Update items display
    if (orderItems.length === 0) {
        orderItemsContainer.innerHTML = '<p class="empty-order">No items added yet</p>';
    } else {
        orderItemsContainer.innerHTML = orderItems.map(item => `
            <div class="order-item">
                <div>
                    <strong>${item.dish}</strong><br>
                    <small>$${item.price.toFixed(2)} x ${item.quantity}</small>
                </div>
                <div>
                    <button class="btn btn-sm" onclick="removeFromOrder('${item.dish}')">-</button>
                    <button class="btn btn-sm" onclick="addToOrder('${item.dish}', ${item.price})">+</button>
                </div>
            </div>
        `).join('');
    }
}

// Reservation Form Functions
function initializeReservationForm() {
    const reservationForm = document.getElementById('reservationForm');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', handleReservationSubmit);
        
        // Set minimum date to today
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
    }

    // Modal functionality
    const modal = document.getElementById('successModal');
    const modalClose = document.getElementById('modalClose');
    const modalOkBtn = document.getElementById('modalOkBtn');

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    if (modalOkBtn) {
        modalOkBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
}

function handleReservationSubmit(event) {
    event.preventDefault();
    
    if (validateReservationForm()) {
        const formData = new FormData(event.target);
        const reservationData = Object.fromEntries(formData.entries());
        
        // Show success modal with reservation details
        showReservationSuccess(reservationData);
        
        // Reset form
        event.target.reset();
    }
}

function validateReservationForm() {
    const form = document.getElementById('reservationForm');
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        const errorElement = input.parentNode.querySelector('.error-message');
        
        if (!input.value.trim()) {
            showFieldError(input, 'This field is required');
            isValid = false;
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            showFieldError(input, 'Please enter a valid email address');
            isValid = false;
        } else if (input.type === 'tel' && input.value && !isValidPhone(input.value)) {
            showFieldError(input, 'Please enter a valid phone number');
            isValid = false;
        } else if (input.type === 'date' && new Date(input.value) < new Date()) {
            showFieldError(input, 'Please select a future date');
            isValid = false;
        } else {
            clearFieldError(input);
        }
    });

    return isValid;
}

function showReservationSuccess(data) {
    const modal = document.getElementById('successModal');
    const summaryElement = document.getElementById('reservationSummary');
    
    if (modal && summaryElement) {
        const formatDate = new Date(data.date).toLocaleDateString();
        const formatTime = convertTo12Hour(data.time);
        
        summaryElement.innerHTML = `
            <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
            <p><strong>Date:</strong> ${formatDate}</p>
            <p><strong>Time:</strong> ${formatTime}</p>
            <p><strong>Guests:</strong> ${data.guests}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            ${data.occasion ? `<p><strong>Occasion:</strong> ${data.occasion}</p>` : ''}
            ${data.seating ? `<p><strong>Seating Preference:</strong> ${data.seating}</p>` : ''}
        `;
        
        modal.classList.add('show');
        modal.style.display = 'flex';
    }
}

function closeModal() {
    const modal = document.getElementById('successModal') || document.getElementById('contactModal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
}

function convertTo12Hour(time24) {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
}

// Contact Form Functions
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Modal functionality
    const modal = document.getElementById('contactModal');
    const modalClose = document.getElementById('contactModalClose');
    const modalOkBtn = document.getElementById('contactModalOkBtn');

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    if (modalOkBtn) {
        modalOkBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
}

function handleContactSubmit(event) {
    event.preventDefault();
    
    if (validateContactForm()) {
        // Show success modal
        const modal = document.getElementById('contactModal');
        if (modal) {
            modal.classList.add('show');
            modal.style.display = 'flex';
        }
        
        // Reset form
        event.target.reset();
    }
}

function validateContactForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            showFieldError(input, 'This field is required');
            isValid = false;
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            showFieldError(input, 'Please enter a valid email address');
            isValid = false;
        } else if (input.type === 'tel' && input.value && !isValidPhone(input.value)) {
            showFieldError(input, 'Please enter a valid phone number');
            isValid = false;
        } else {
            clearFieldError(input);
        }
    });

    return isValid;
}

// Gallery Functions
function initializeGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterGalleryItems(filter);
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Initialize lightbox for gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const imageSrc = item.getAttribute('data-image');
            const caption = item.querySelector('.overlay-content h3')?.textContent || '';
            openLightbox(imageSrc, caption);
        });
    });

    // Initialize lightbox for about gallery
    const aboutGalleryItems = document.querySelectorAll('#aboutGallery .gallery-item');
    aboutGalleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const imageSrc = item.getAttribute('data-image');
            openLightbox(imageSrc, '');
        });
    });
}

function filterGalleryItems(filter) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Lightbox Functions
function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => navigateLightbox(1));
    }

    // Close lightbox when clicking outside image
    if (lightbox) {
        lightbox.addEventListener('click', function(event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (lightbox && lightbox.classList.contains('show')) {
            if (event.key === 'Escape') {
                closeLightbox();
            } else if (event.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (event.key === 'ArrowRight') {
                navigateLightbox(1);
            }
        }
    });
}

function openLightbox(imageSrc, caption = '') {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');

    if (lightbox && lightboxImage) {
        lightboxImage.src = imageSrc;
        
        if (lightboxCaption && caption) {
            lightboxCaption.textContent = caption;
        }

        lightbox.classList.add('show');
        lightbox.style.display = 'flex';
        
        // Populate lightbox images array for navigation
        lightboxImages = Array.from(document.querySelectorAll('.gallery-item'))
            .filter(item => item.style.display !== 'none')
            .map(item => ({
                src: item.getAttribute('data-image'),
                caption: item.querySelector('.overlay-content h3')?.textContent || ''
            }));
        
        currentLightboxImage = lightboxImages.findIndex(img => img.src === imageSrc);
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('show');
        lightbox.style.display = 'none';
    }
}

function navigateLightbox(direction) {
    if (lightboxImages.length === 0) return;

    currentLightboxImage = (currentLightboxImage + direction + lightboxImages.length) % lightboxImages.length;
    
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    if (lightboxImage) {
        lightboxImage.src = lightboxImages[currentLightboxImage].src;
    }
    
    if (lightboxCaption) {
        lightboxCaption.textContent = lightboxImages[currentLightboxImage].caption;
    }
}

// Newsletter Forms
function initializeNewsletterForms() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (isValidEmail(email)) {
                showNotification('Thank you for subscribing to our newsletter!');
                this.reset();
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.menu-item, .chef-card, .value-card, .award-card, .gallery-item').forEach(el => {
        observer.observe(el);
    });
}

// Utility Functions
function showFieldError(input, message) {
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
    }
    input.style.borderColor = '#dc3545';
}

function clearFieldError(input) {
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
    }
    input.style.borderColor = '#dee2e6';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#dc3545' : '#28a745'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth scrolling for anchor links
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

// Parallax effect for hero sections
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'https://images.pexels.com/photos/1833349/pexels-photo-1833349.jpeg?auto=compress&cs=tinysrgb&w=1920',
        'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

// Performance optimization: Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Add to initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeLazyLoading();
});