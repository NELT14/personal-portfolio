// ============================================
// NAVIGATION - Scrolls with page (no hide/show)
// ============================================
(function() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    
    // Navbar scrolls with page, so no body padding needed
    document.body.style.paddingTop = '0px';
    
    // Remove any active classes from navigation links
    const navLinks = nav.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
})();

// Remove active classes on page load
function removeAllActiveClasses() {
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
        link.blur();
    });
}

window.addEventListener('load', removeAllActiveClasses);
window.addEventListener('DOMContentLoaded', removeAllActiveClasses);

// ============================================
// SMOOTH SCROLLING (only for anchor links on same page, like #contact)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        // Only handle if target is on current page
        const target = document.querySelector(href);
        if (!target) return; // Let browser handle if target doesn't exist (different page)
        
        e.preventDefault();
        
        // Navbar scrolls with page now, so no offset needed
        const targetPosition = target.offsetTop;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// ============================================
// RESEARCH PAPERS TOGGLE
// ============================================
document.querySelectorAll('.papers-toggle').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        
        const targetId = this.getAttribute('data-target');
        if (!targetId) return;
        
        const target = document.getElementById(targetId);
        if (!target) return;
        
        // Only toggle the specific target element
        const isHidden = target.hasAttribute('hidden');
        
        if (isHidden) {
            // Remove hidden attribute to trigger animation
            target.removeAttribute('hidden');
            // Force reflow to ensure transition starts
            target.offsetHeight;
            this.textContent = 'Hide Research Papers';
            this.setAttribute('aria-expanded', 'true');
        } else {
            // Add hidden attribute to trigger close animation
            target.setAttribute('hidden', '');
            this.textContent = 'View Research Papers';
            this.setAttribute('aria-expanded', 'false');
        }
    });
});

// ============================================
// SCROLL ANIMATIONS FOR SECTIONS
// ============================================
(function() {
    const sections = document.querySelectorAll('.section, .section-alt, .hero, .contact');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once visible for performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        // Make visible immediately if already in viewport (for page load)
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            section.classList.add('visible');
        } else {
            observer.observe(section);
        }
    });
    
    // Also check on scroll for sections that might have been missed
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    section.classList.add('visible');
                }
            });
        }, 100);
    }, { passive: true });
})();

// ============================================
// IMAGE ERROR HANDLING
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
