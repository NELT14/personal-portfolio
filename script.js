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

// Remove active classes on page load, scroll, and after any interaction
function removeAllActiveClasses() {
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        link.blur(); // Remove focus as well
    });
}

window.addEventListener('load', removeAllActiveClasses);
window.addEventListener('scroll', removeAllActiveClasses, { passive: true });
window.addEventListener('touchstart', removeAllActiveClasses, { passive: true });

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        
        // Remove active class from all nav links immediately
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Remove focus to prevent browser from highlighting
        this.blur();
        
        const target = document.querySelector(href);
        
        if (target) {
            // Navbar scrolls with page now, so no offset needed
            const targetPosition = target.offsetTop;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Remove active class again after scroll completes
            setTimeout(() => {
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                });
            }, 500);
        }
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
