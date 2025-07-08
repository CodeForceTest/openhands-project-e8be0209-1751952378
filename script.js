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

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .step, .testimonial, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for hero stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// Animate counters when hero section is visible
const heroObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                let target;
                
                if (text.includes('K')) {
                    target = parseInt(text.replace('K+', '')) * 1000;
                    stat.textContent = '0';
                    animateCounter(stat, target);
                    setTimeout(() => {
                        stat.textContent = text;
                    }, 2000);
                } else if (text.includes('M')) {
                    target = parseInt(text.replace('M+', '')) * 1000000;
                    stat.textContent = '0';
                    animateCounter(stat, target);
                    setTimeout(() => {
                        stat.textContent = text;
                    }, 2000);
                } else if (text.includes('%')) {
                    target = parseFloat(text.replace('%', ''));
                    stat.textContent = '0%';
                    animateCounter(stat, target);
                    setTimeout(() => {
                        stat.textContent = text;
                    }, 2000);
                }
            });
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Form handling for CTA buttons
document.querySelectorAll('.btn-primary, .cta-button, .pricing-button').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.textContent.includes('Start') || this.textContent.includes('Get Started')) {
            e.preventDefault();
            showModal('signup');
        } else if (this.textContent.includes('Demo') || this.textContent.includes('Watch Demo')) {
            e.preventDefault();
            showModal('demo');
        } else if (this.textContent.includes('Contact Sales')) {
            e.preventDefault();
            showModal('contact');
        }
    });
});

// Modal functionality
function showModal(type) {
    let modalContent = '';
    
    switch(type) {
        case 'signup':
            modalContent = `
                <div class="modal-overlay">
                    <div class="modal">
                        <div class="modal-header">
                            <h3>Start Your Free Trial</h3>
                            <button class="modal-close">&times;</button>
                        </div>
                        <div class="modal-body">
                            <form class="signup-form">
                                <input type="email" placeholder="Enter your email" required>
                                <input type="text" placeholder="Full Name" required>
                                <input type="text" placeholder="Company (optional)">
                                <button type="submit" class="btn-primary">Start Free Trial</button>
                            </form>
                            <p class="modal-note">No credit card required. 14-day free trial.</p>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'demo':
            modalContent = `
                <div class="modal-overlay">
                    <div class="modal">
                        <div class="modal-header">
                            <h3>Schedule a Demo</h3>
                            <button class="modal-close">&times;</button>
                        </div>
                        <div class="modal-body">
                            <form class="demo-form">
                                <input type="email" placeholder="Work Email" required>
                                <input type="text" placeholder="Full Name" required>
                                <input type="text" placeholder="Company" required>
                                <select required>
                                    <option value="">Team Size</option>
                                    <option value="1-10">1-10 developers</option>
                                    <option value="11-50">11-50 developers</option>
                                    <option value="51-200">51-200 developers</option>
                                    <option value="200+">200+ developers</option>
                                </select>
                                <button type="submit" class="btn-primary">Schedule Demo</button>
                            </form>
                        </div>
                    </div>
                </div>
            `;
            break;
        case 'contact':
            modalContent = `
                <div class="modal-overlay">
                    <div class="modal">
                        <div class="modal-header">
                            <h3>Contact Sales</h3>
                            <button class="modal-close">&times;</button>
                        </div>
                        <div class="modal-body">
                            <form class="contact-form">
                                <input type="email" placeholder="Work Email" required>
                                <input type="text" placeholder="Full Name" required>
                                <input type="text" placeholder="Company" required>
                                <input type="tel" placeholder="Phone Number">
                                <textarea placeholder="Tell us about your needs" rows="4"></textarea>
                                <button type="submit" class="btn-primary">Contact Sales</button>
                            </form>
                        </div>
                    </div>
                </div>
            `;
            break;
    }
    
    document.body.insertAdjacentHTML('beforeend', modalContent);
    
    // Add modal styles if not already added
    if (!document.querySelector('#modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'modal-styles';
        modalStyles.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal {
                background: white;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                animation: slideIn 0.3s ease;
            }
            
            .modal-header {
                padding: 2rem 2rem 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #e2e8f0;
            }
            
            .modal-header h3 {
                margin: 0;
                color: #1e293b;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #64748b;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-body {
                padding: 2rem;
            }
            
            .modal form {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            .modal input,
            .modal select,
            .modal textarea {
                padding: 1rem;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                font-size: 1rem;
                transition: border-color 0.3s ease;
            }
            
            .modal input:focus,
            .modal select:focus,
            .modal textarea:focus {
                outline: none;
                border-color: #6366f1;
            }
            
            .modal .btn-primary {
                margin-top: 1rem;
            }
            
            .modal-note {
                text-align: center;
                color: #64748b;
                font-size: 0.9rem;
                margin-top: 1rem;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(modalStyles);
    }
    
    // Close modal functionality
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Form submission
    const form = document.querySelector('.modal form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        alert('Thank you! We\'ll be in touch soon.');
        closeModal();
    });
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add loading animation to buttons
document.querySelectorAll('button, .btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function() {
        if (this.type === 'submit') {
            this.style.position = 'relative';
            this.style.pointerEvents = 'none';
            this.innerHTML = '<span style="opacity: 0.5;">' + this.innerHTML + '</span><div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 20px; height: 20px; border: 2px solid transparent; border-top: 2px solid currentColor; border-radius: 50%; animation: spin 1s linear infinite;"></div>';
            
            // Add spin animation
            if (!document.querySelector('#spin-animation')) {
                const spinStyles = document.createElement('style');
                spinStyles.id = 'spin-animation';
                spinStyles.textContent = `
                    @keyframes spin {
                        0% { transform: translate(-50%, -50%) rotate(0deg); }
                        100% { transform: translate(-50%, -50%) rotate(360deg); }
                    }
                `;
                document.head.appendChild(spinStyles);
            }
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effects to cards
document.querySelectorAll('.feature-card, .testimonial, .pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

console.log('OpenHands Marketing Website Loaded Successfully! 🚀');