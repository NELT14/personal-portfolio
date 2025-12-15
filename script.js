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
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        
        // Add 'clicked' class to remove hover effect after click
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.add('clicked');
            link.classList.remove('active');
            link.blur();
        });
        
        // Clear URL hash to prevent browser from highlighting based on hash
        if (window.history && window.history.replaceState) {
            window.history.replaceState(null, null, ' ');
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            // Navbar scrolls with page now, so no offset needed
            const targetPosition = target.offsetTop;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Remove clicked class after a delay to allow hover again
            setTimeout(() => {
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('clicked');
                });
            }, 300);
        }
    });
    
    // Remove 'clicked' class on hover to restore hover effect
    anchor.addEventListener('mouseenter', function() {
        this.classList.remove('clicked');
    });
    
    anchor.addEventListener('touchstart', function() {
        // On mobile touch, allow hover effect
        this.classList.remove('clicked');
    });
});

// Active navigation link highlighting removed - navbar scrolls with page

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
