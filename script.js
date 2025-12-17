// ============================================
// IN-PAGE INTERACTIONS (no URL rewriting / no SPA navigation)
// ============================================
// Smooth scrolling for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const targetPosition = target.offsetTop;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// ============================================
// SCROLL ANIMATIONS FOR SECTIONS
// ============================================
let scrollHandlerRef = null;
let scrollTimeoutRef = null;

function initScrollAnimations() {
    const sections = document.querySelectorAll('.section, .section-alt, .hero, .contact');
    
    // Remove visible class from all sections first
    sections.forEach(section => {
        section.classList.remove('visible');
    });
    
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        // Make visible immediately if already in viewport
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            section.classList.add('visible');
        } else {
            observer.observe(section);
        }
    });
    
    // Also check on scroll for sections that might have been missed
    const scrollHandler = function() {
        clearTimeout(scrollTimeoutRef);
        scrollTimeoutRef = setTimeout(() => {
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    section.classList.add('visible');
                }
            });
        }, 100);
    };
    
    // Remove old scroll listener (stable function reference) and add a new one
    if (scrollHandlerRef) {
        window.removeEventListener('scroll', scrollHandlerRef);
    }
    scrollHandlerRef = scrollHandler;
    window.addEventListener('scroll', scrollHandlerRef, { passive: true });
}

// Initialize animations on page load
window.addEventListener('load', function() {
    initScrollAnimations();
});
window.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
});

// ============================================
// RESEARCH PAPERS TOGGLE (initial setup)
// ============================================
document.querySelectorAll('.papers-toggle').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const targetId = this.getAttribute('data-target');
        if (!targetId) return;
        
        const target = document.getElementById(targetId);
        if (!target) return;
        
        const isHidden = target.hasAttribute('hidden');
        if (isHidden) {
            target.removeAttribute('hidden');
            target.offsetHeight;
            this.textContent = 'Hide Research Papers';
            this.setAttribute('aria-expanded', 'true');
        } else {
            target.setAttribute('hidden', '');
            this.textContent = 'View Research Papers';
            this.setAttribute('aria-expanded', 'false');
        }
    });
});

// ============================================
// IMAGE ERROR HANDLING (initial setup)
// ============================================
document.querySelectorAll('.project-image img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        const placeholder = document.createElement('div');
        placeholder.className = 'project-image-placeholder';
        placeholder.innerHTML = '<i class="fas fa-image"></i>';
        this.parentElement.appendChild(placeholder);
    });
});
