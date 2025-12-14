// ============================================
// NAVIGATION
// ============================================
(function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    
    // Set navbar height CSS variable
    function updateNavHeight() {
        if (navbar) {
            const height = navbar.offsetHeight;
            document.documentElement.style.setProperty('--nav-height', height + 'px');
        }
    }
    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);
    
    // Mobile menu toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.contains('active');
            if (isOpen) {
                navLinks.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('no-scroll');
            } else {
                navLinks.classList.add('active');
                navToggle.setAttribute('aria-expanded', 'true');
                document.body.classList.add('no-scroll');
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('no-scroll');
                navToggle.focus();
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !navbar.contains(e.target)) {
                navLinks.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('no-scroll');
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
                    document.body.classList.remove('no-scroll');
                }
            }
        });
    });
})();

// ============================================
// ACTIVE NAVIGATION LINK
// ============================================
(function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (!sections.length || !navLinks.length) return;
    
    // Map sections to their main navigation items
    const sectionToNavMap = {
        'home': 'home',
        'about': 'about',
        'skills': 'about',
        'achievements': 'about',
        'experience': 'about',
        'projects': 'projects',
        'activities': 'projects',
        'connect': 'connect'
    };
    
    function updateActiveLink() {
        const scrollY = window.scrollY;
        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 64;
        const offset = navHeight + 100;
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollY + offset >= sectionTop && scrollY + offset < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });
        
        // If at bottom, select last section
        if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50) {
            currentSection = sections[sections.length - 1].id;
        }
        
        // Map current section to navigation item
        const currentNav = sectionToNavMap[currentSection] || currentSection;
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1); // Remove #
            if (href === currentNav) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink, { passive: true });
    window.addEventListener('resize', updateActiveLink);
    updateActiveLink();
})();

// ============================================
// RESEARCH PAPERS TOGGLE
// ============================================
(function() {
    document.querySelectorAll('.papers-toggle').forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const target = document.getElementById(targetId);
            if (!target) return;
            
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
                target.hidden = true;
                this.setAttribute('aria-expanded', 'false');
                this.textContent = 'View Research Papers';
            } else {
                target.hidden = false;
                this.setAttribute('aria-expanded', 'true');
                const count = target.querySelectorAll('.paper').length;
                this.textContent = `Hide Research Papers${count > 0 ? ` (${count})` : ''}`;
            }
        });
    });
})();

// ============================================
// IMAGE ERROR HANDLING
// ============================================
(function() {
    document.querySelectorAll('.project-image img').forEach(img => {
        img.addEventListener('error', function() {
            const container = this.closest('.project-image');
            if (container) {
                container.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #64748b;"><i class="fa-solid fa-image"></i></div>';
            }
        });
    });
})();

// ============================================
// PREVENT BODY SCROLL WHEN MENU OPEN
// ============================================
document.body.classList.remove('no-scroll');
