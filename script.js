// ============================================
// HIDE/SHOW NAVIGATION ON SCROLL
// ============================================
(function() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    
    // Set body padding to match navbar height
    function setBodyPadding() {
        const navHeight = nav.offsetHeight;
        document.body.style.paddingTop = navHeight + 'px';
    }
    setBodyPadding();
    window.addEventListener('resize', setBodyPadding);
    
    // Check if device is mobile (disable hide/show on mobile)
    function isMobile() {
        return window.innerWidth <= 768 || 'ontouchstart' in window;
    }
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNav() {
        // Don't hide/show nav on mobile devices
        if (isMobile()) {
            nav.classList.remove('hidden');
            return;
        }
        
        const currentScrollY = window.scrollY;
        
        // Always show at top of page
        if (currentScrollY < 50) {
            nav.classList.remove('hidden');
        } 
        // Hide when scrolling down, show when scrolling up
        else if (currentScrollY > lastScrollY && currentScrollY > 100) {
            nav.classList.add('hidden');
        } else if (currentScrollY < lastScrollY) {
            nav.classList.remove('hidden');
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNav);
            ticking = true;
        }
    }, { passive: true });
    
    // Re-check on resize to handle orientation changes
    window.addEventListener('resize', () => {
        if (isMobile()) {
            nav.classList.remove('hidden');
        }
    });
})();

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// ACTIVE NAVIGATION LINK
// ============================================
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (!sections.length || !navLinks.length) return;
    
    const scrollPosition = window.scrollY + 150; // Offset for better detection
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // Handle bottom of page
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sections[sections.length - 1].getAttribute('id')}`) {
                link.classList.add('active');
            }
        });
    }
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// ============================================
// RESEARCH PAPERS TOGGLE
// ============================================
document.querySelectorAll('.papers-toggle').forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const target = document.getElementById(targetId);
        
        if (!target) return;
        
        const isHidden = target.hasAttribute('hidden');
        
        if (isHidden) {
            target.removeAttribute('hidden');
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
