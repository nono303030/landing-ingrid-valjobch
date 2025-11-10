// Main JavaScript for Professional Landing Page

// Wow emoji effect function
function createWowEffect() {
    const emojis = ['🤩', '😲', '🚀', '🎉', '✨', '⚡', '💪', '🔥', '🌟', '💯'];
    const emojiCount = 40;
    
    for (let i = 0; i < emojiCount; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'emoji-fall';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.animationDelay = Math.random() * 0.5 + 's';
        emoji.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(emoji);
        
        setTimeout(() => emoji.remove(), 4000);
    }
}

// Sad effect function
function createSadEffect() {
    const emojis = ['😕', '😐', '😑', '🤔', '😶'];
    const emojiCount = 30;
    
    for (let i = 0; i < emojiCount; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'emoji-fall';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.animationDelay = Math.random() * 0.5 + 's';
        emoji.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(emoji);
        
        setTimeout(() => emoji.remove(), 4000);
    }
    
    // Also shake the wrapper
    const toggleWrapper = document.querySelector('.toggle-wrapper');
    if (toggleWrapper) {
        toggleWrapper.classList.add('shake');
        setTimeout(() => toggleWrapper.classList.remove('shake'), 500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Toggle Sans/Avec functionality
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const comparisons = document.querySelectorAll('.comparison');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Hide all comparisons
            comparisons.forEach(comp => comp.classList.remove('active'));
            
            // Show the selected comparison
            const view = button.getAttribute('data-view');
            const selectedComparison = document.querySelector(`.comparison.${view}`);
            if (selectedComparison) {
                selectedComparison.classList.add('active');
            }
            
            // Add fun effects
            if (view === 'avec') {
                createWowEffect();
            } else {
                createSadEffect();
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Header height
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Elements to animate on scroll
    const animatedElements = [
        '.benefit-card',
        '.check-item',
        '.workflow-detail > div',
        '.visual-card'
    ];
    
    animatedElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Add hover effect to cards
    document.querySelectorAll('.skill-card, .check-item, .highlight-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = card.classList.contains('highlight-card') ? 'translateX(5px)' : 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = card.classList.contains('highlight-card') ? 'translateX(0)' : 'translateY(0)';
        });
    });
    
    // Animate metrics on scroll
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            const current = Math.floor(progress * (end - start) + start);
            if (element.textContent.includes('%')) {
                element.textContent = (current > 0 ? '+' : '') + current + '%';
            } else if (element.textContent.includes('h')) {
                element.textContent = current + 'h';
            } else {
                element.textContent = (current > 0 ? '-' : '') + current + '%';
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };
    
    // Observe metrics for animation
    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const value = entry.target.textContent;
                
                if (value === '-65%') {
                    animateValue(entry.target, 0, -65, 1000);
                } else if (value === '+47%') {
                    animateValue(entry.target, 0, 47, 1000);
                }
            }
        });
    }, observerOptions);
    
    const metricElements = document.querySelectorAll('.metric-value');
    if (metricElements.length > 0) {
        metricElements.forEach(metric => {
            metricsObserver.observe(metric);
        });
    }
    
    // Dynamic year for copyright (if needed)
    const year = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(element => {
        element.textContent = year;
    });
    
    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Any scroll-based logic here
        }, 100);
    });
    
});

// Log page load
window.addEventListener('load', () => {
    console.log('Landing page loaded successfully');
});

// Preload images to improve performance
const preloadImages = () => {
    const images = [
        'photo.svg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    preloadImages();
});
