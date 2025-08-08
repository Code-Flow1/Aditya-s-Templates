// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const searchTabs = document.querySelectorAll('.search-tab');
const packageFilters = document.querySelectorAll('.filter-btn');
const packageCards = document.querySelectorAll('.package-card');
const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialDots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');
const contactForm = document.getElementById('contactForm');
const scrollProgress = document.getElementById('scrollProgress');
const topBtn = document.getElementById('topBtn');
const chatBtn = document.getElementById('chatBtn');
const callBtn = document.getElementById('callBtn');

// Navigation functionality
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        if (navbar) navbar.classList.add('scrolled');
    } else {
        if (navbar) navbar.classList.remove('scrolled');
    }
    
    // Update scroll progress bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = scrolled + '%';
});

// Floating action buttons
if (topBtn) {
  topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

if (chatBtn) {
  chatBtn.addEventListener('click', () => {
      showNotification('Chat feature coming soon! For now, please use our contact form.', 'info');
  });
}

if (callBtn) {
  callBtn.addEventListener('click', () => {
      showNotification('Calling +1 (555) 123-4567...', 'info');
  });
}

// Mobile menu toggle
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
  });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    });
});

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

// Search tabs functionality
searchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        searchTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Add subtle animation
        tab.style.transform = 'scale(0.95)';
        setTimeout(() => {
            tab.style.transform = 'scale(1)';
        }, 150);
    });
});

// Package filtering functionality
packageFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        const filterValue = filter.getAttribute('data-filter');
        
        // Update active filter
        packageFilters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        
        // Filter packages with animation
        packageCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.classList.add('hidden');
                }, 300);
            }
        });
    });
});

// Destination card hover effects
document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.03)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Package card interactions
document.querySelectorAll('.package-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Show booking confirmation (placeholder)
        showNotification('Package selected! Redirecting to booking...', 'success');
    });
});

// Testimonials slider
let currentTestimonial = 0;
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const totalTestimonials = testimonialSlides.length;

function updateTestimonial() {
    if (!totalTestimonials) return;
    // Remove active class from all slides and dots
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    testimonialSlides[currentTestimonial].classList.add('active');
    if (testimonialDots[currentTestimonial]) {
      testimonialDots[currentTestimonial].classList.add('active');
    }
    
    // Update transform for smooth sliding
    if (testimonialTrack) {
      const translateX = -currentTestimonial * 100;
      testimonialTrack.style.transform = `translateX(${translateX}%)`;
    }
}

function nextTestimonial() {
    if (!totalTestimonials) return;
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    updateTestimonial();
}

function prevTestimonialFunc() {
    if (!totalTestimonials) return;
    currentTestimonial = currentTestimonial === 0 ? totalTestimonials - 1 : currentTestimonial - 1;
    updateTestimonial();
}

// Testimonial navigation
if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
if (prevBtn) prevBtn.addEventListener('click', prevTestimonialFunc);

// Testimonial dots
if (testimonialDots && testimonialDots.length) {
  testimonialDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
          currentTestimonial = index;
          updateTestimonial();
      });
  });
}

// Auto-advance testimonials
if (totalTestimonials) setInterval(nextTestimonial, 5000);

// Contact form functionality
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const formValues = Object.fromEntries(formData);
      
      // Basic validation
      if (!formValues.name || !formValues.email || !formValues.subject || !formValues.message) {
          showNotification('Please fill in all required fields.', 'error');
          return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formValues.email)) {
          showNotification('Please enter a valid email address.', 'error');
          return;
      }
      
      // Simulate form submission
      const submitBtn = this.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          this.reset();
          showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
      }, 2000);
  });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// Search form functionality
const searchBtnEl = document.querySelector('.search-btn');
if (searchBtnEl) {
  searchBtnEl.addEventListener('click', function(e) {
      e.preventDefault();
      
      const destination = document.getElementById('destination')?.value;
      const departure = document.getElementById('departure')?.value;
      const returnDate = document.getElementById('return')?.value;
      const travelers = document.getElementById('travelers')?.value || '1';
      
      if (!destination) {
          showNotification('Please enter a destination.', 'error');
          return;
      }
      
      // Simulate search
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
      
      setTimeout(() => {
          this.innerHTML = '<i class="fas fa-search"></i> Search';
          showNotification(`Searching for trips to ${destination} for ${travelers} traveler(s)...`, 'info');
      }, 1500);
  });
}

// Set default dates (if fields exist)
const depEl = document.getElementById('departure');
const retEl = document.getElementById('return');
if (depEl && retEl) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const weekFromNow = new Date(today);
  weekFromNow.setDate(weekFromNow.getDate() + 7);
  depEl.value = tomorrow.toISOString().split('T')[0];
  retEl.value = weekFromNow.toISOString().split('T')[0];
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '24px',
        backgroundColor: type === 'success' ? '#27AE60' : type === 'error' ? '#E74C3C' : '#3498DB',
        color: 'white',
        padding: '16px 24px',
        borderRadius: '12px',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        maxWidth: '350px',
        fontSize: '14px',
        fontWeight: '500'
    });
    
    notification.querySelector('.notification-content').style.display = 'flex';
    notification.querySelector('.notification-content').style.alignItems = 'center';
    notification.querySelector('.notification-content').style.justifyContent = 'space-between';
    notification.querySelector('.notification-content').style.gap = '16px';
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.color = 'white';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.fontSize = '18px';
    closeBtn.style.padding = '0';
    closeBtn.style.width = '20px';
    closeBtn.style.height = '20px';
    closeBtn.style.display = 'flex';
    closeBtn.style.alignItems = 'center';
    closeBtn.style.justifyContent = 'center';
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeNotification = () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    };
    
    closeBtn.addEventListener('click', closeNotification);
    
    // Auto remove after 5 seconds
    setTimeout(closeNotification, 5000);
}

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation to destination cards
document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('click', function() {
        const destination = this.getAttribute('data-destination');
        showNotification(`Loading ${destination} details...`, 'info');
        
        // Simulate loading
        setTimeout(() => {
            showNotification(`${destination} details loaded! Check out our packages.`, 'success');
        }, 2000);
    });
});

// Enhanced hover effects for interactive elements
document.querySelectorAll('.package-card, .destination-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = this.classList.contains('destination-card') ? 'scale(1.03)' : 'translateY(-8px)';
        this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = this.classList.contains('destination-card') ? 'scale(1)' : 'translateY(0)';
    });
});

// Add random moving effects to feature icons
document.querySelectorAll('.feature-icon').forEach((icon, index) => {
    setInterval(() => {
        if (!icon.matches(':hover')) {
            icon.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.9 + Math.random() * 0.2})`;
            setTimeout(() => {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }, 1000);
        }
    }, 5000 + index * 1000);
});

// Add conveyor belt interaction
document.querySelectorAll('.conveyor-item').forEach(item => {
    item.addEventListener('click', function() {
        const destination = this.querySelector('h4').textContent;
        showNotification(`Exploring ${destination} packages...`, 'info');
    });
});

// Random floating animation for moving shapes
function animateShapes() {
    document.querySelectorAll('.moving-shape').forEach(shape => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomScale = 0.5 + Math.random() * 0.5;
        const randomDuration = 3 + Math.random() * 4;
        
        shape.style.transition = `all ${randomDuration}s ease-in-out`;
        shape.style.transform = `translate(${randomX}px, ${randomY}px) scale(${randomScale})`;
    });
}

// Start shape animation
setInterval(animateShapes, 6000);

// Add pulsing effect to search button periodically
setInterval(() => {
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn && !searchBtn.matches(':hover')) {
        searchBtn.style.animation = 'pulse 1s ease-in-out';
        setTimeout(() => {
            searchBtn.style.animation = '';
        }, 1000);
    }
}, 8000);

// Add wave effect to navigation logo periodically
setInterval(() => {
    const navLogo = document.querySelector('.nav-logo i');
    if (navLogo) {
        navLogo.style.animation = 'wave 2s ease-in-out';
        setTimeout(() => {
            navLogo.style.animation = 'wave 3s ease-in-out infinite';
        }, 2000);
    }
}, 10000);

// Add subtle movement to testimonial cards
document.querySelectorAll('.testimonial-slide').forEach((slide, index) => {
    setInterval(() => {
        if (slide.classList.contains('active')) {
            slide.style.transform = 'translateX(0) translateY(-2px)';
            setTimeout(() => {
                slide.style.transform = 'translateX(0) translateY(0)';
            }, 500);
        }
    }, 7000 + index * 1000);
});

// Add random gentle movement to package cards
document.querySelectorAll('.package-card').forEach((card, index) => {
    setInterval(() => {
        if (!card.matches(':hover') && !card.classList.contains('hidden')) {
            const randomMove = Math.random() * 4 - 2;
            card.style.transform = `translateY(${randomMove}px)`;
            setTimeout(() => {
                card.style.transform = 'translateY(0)';
            }, 1000);
        }
    }, 12000 + index * 2000);
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in class to hero elements
    setTimeout(() => {
        document.querySelectorAll('.hero .fade-in').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 200);
        });
    }, 500);
    
    // Start initial shape animation
    setTimeout(animateShapes, 2000);
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

console.log('Wanderlust Travel Agency website loaded successfully! 🌍✈️');

// ===== Dark Mode Toggle =====
(function () {
  const THEME_KEY = 'wanderlust_theme';

  function getSystemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function getSavedTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    updateToggleIcon(isDark);
  }

  function currentTheme() {
    return document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  }

  function createToggleButton() {
    const btn = document.createElement('button');
    btn.className = 'nav-theme-toggle';
    btn.id = 'themeToggle';
    btn.title = 'Toggle dark mode';
    btn.setAttribute('aria-label', 'Toggle dark mode');
    btn.innerHTML = '<i class="fas fa-moon"></i>';
    btn.addEventListener('click', () => {
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      saveTheme(next);
    });
    return btn;
  }

  function updateToggleIcon(isDark) {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  }

  function injectIntoNavbar() {
    const navContainer = document.querySelector('.navbar .nav-container');
    if (!navContainer) return;
    if (document.getElementById('themeToggle')) return;
    const toggleBtn = createToggleButton();
    const hamburger = navContainer.querySelector('.hamburger');
    if (hamburger && hamburger.parentElement === navContainer) {
      navContainer.insertBefore(toggleBtn, hamburger);
    } else {
      navContainer.appendChild(toggleBtn);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme from saved preference or system
    const saved = getSavedTheme();
    const initial = saved ? saved : (getSystemPrefersDark() ? 'dark' : 'light');
    applyTheme(initial);

    // Place toggle in navbar (right side)
    injectIntoNavbar();
  });
})();