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
    
    // Track previous zoom state to detect changes
    let previousCanHide = null;
    
    // Check if viewport is narrow (for hide/show functionality)
    // Enable hide/show for narrow screens (zoomed in), but disable for very small mobile screens
    function shouldHideNav() {
        const viewportWidth = window.innerWidth;
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const smallestScreenDimension = Math.min(screenWidth, screenHeight);
        
        // Detect if it's a very small mobile device (physical screen < 480px)
        const isVerySmallMobile = smallestScreenDimension < 480;
        
        // Calculate zoom level (approximate)
        const zoomLevel = screenWidth / viewportWidth;
        
        // Enable hide/show when:
        // 1. Not a very small mobile device
        // 2. Viewport is narrow (zoomed in) OR actual narrow screen
        // Use dynamic threshold: if screen is large but viewport is narrow (zoomed), enable it
        const isNarrowViewport = viewportWidth < Math.min(1200, screenWidth * 0.8);
        const isZoomedIn = zoomLevel > 1.2; // More than 20% zoom
        
        return !isVerySmallMobile && (isNarrowViewport || isZoomedIn);
    }
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNav() {
        const canHide = shouldHideNav();
        
        // If hide/show capability changed (e.g., due to zoom), update nav state immediately
        if (previousCanHide !== null && previousCanHide !== canHide) {
            // Capability changed - re-evaluate current scroll position
            const currentScrollY = window.scrollY;
            if (!canHide || currentScrollY < 50) {
                nav.classList.remove('hidden');
            } else if (currentScrollY > 100) {
                // Only hide if already scrolled down enough
                nav.classList.add('hidden');
            }
        }
        previousCanHide = canHide;
        
        // Only enable hide/show for narrow screens (zoomed desktop views)
        if (!canHide) {
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
    
    // Initialize previous state
    previousCanHide = shouldHideNav();
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNav);
            ticking = true;
        }
    }, { passive: true });
    
    // Re-check on resize to handle zoom changes and orientation changes
    let resizeTicking = false;
    function handleResize() {
        if (!resizeTicking) {
            window.requestAnimationFrame(() => {
                const canHide = shouldHideNav();
                
                // If capability changed, update nav state
                if (previousCanHide !== null && previousCanHide !== canHide) {
                    const currentScrollY = window.scrollY;
                    if (!canHide || currentScrollY < 50) {
                        nav.classList.remove('hidden');
                    } else if (currentScrollY > 100) {
                        nav.classList.add('hidden');
                    }
                    previousCanHide = canHide;
                }
                
                setBodyPadding(); // Recalculate padding on resize
                resizeTicking = false;
            });
            resizeTicking = true;
        }
    }
    
    window.addEventListener('resize', handleResize);
    
    // Also listen for zoom changes (some browsers fire this)
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleResize);
    }
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
