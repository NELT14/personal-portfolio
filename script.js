// ============================================
// NAVIGATION - Set current page indicator
// ============================================
// Detect the site's base path (Jekyll `baseurl`) at runtime.
// On GitHub Pages this is typically "/repo-name", while locally it may be "".
function getBasePath() {
    // Prefer the canonical home link if present (we generate it via `relative_url`)
    const homeLink = document.querySelector('.nav-menu a[href], .nav-brand a[href]');
    if (homeLink) {
        try {
            const p = new URL(homeLink.getAttribute('href') || '/', window.location.origin).pathname || '';
            // Normalize trailing slash: "/personal-portfolio/" -> "/personal-portfolio"
            return p.replace(/\/+$/, '');
        } catch {
            // fall through
        }
    }

    // Fallback: infer from the stylesheet URL (also generated via `relative_url`)
    const cssLink = document.querySelector('link[rel="stylesheet"][href]');
    if (cssLink) {
        try {
            const cssPath = new URL(cssLink.getAttribute('href') || '/', window.location.origin).pathname || '';
            // "/personal-portfolio/style.css" -> "/personal-portfolio"
            return cssPath.replace(/\/style\.css$/i, '').replace(/\/+$/, '');
        } catch {
            // fall through
        }
    }

    return '';
}

// Normalize a link/path into a page key: "index" | "about" | "activities" | ...
// Works with pretty URLs (e.g. /personal-portfolio/about/) and legacy .html (e.g. about.html).
function normalizePageName(input) {
    if (!input) return 'index';

    // Turn href into an absolute URL so we can reliably read pathname.
    // This handles absolute links, root-relative links, and relative links.
    let pathname = '';
    try {
        pathname = new URL(input, window.location.origin).pathname || '';
    } catch {
        pathname = String(input);
    }

    // Remove query/hash if any (defensive when input isn't a proper URL)
    pathname = pathname.split('?')[0].split('#')[0];

    // Handle legacy direct filenames
    pathname = pathname.replace(/\.html$/i, '');

    // Treat baseurl root (e.g. "/personal-portfolio/" or "/personal-portfolio") as index
    const basePath = getBasePath();
    const normalizedPath = pathname.replace(/\/+$/, '');
    if (basePath && normalizedPath === basePath) return 'index';

    // Split into segments, drop empties
    const parts = pathname.split('/').filter(Boolean);

    // If we're at site root (or baseurl root), treat as index
    if (parts.length === 0) return 'index';

    // Use the last segment as the page key (e.g. ["personal-portfolio","about"] -> "about")
    const last = parts[parts.length - 1];
    if (!last || last.toLowerCase() === 'index') return 'index';
    return last.toLowerCase();
}

function setCurrentPageIndicator() {
    // Get current page from URL
    const currentPath = window.location.pathname;
    let currentPage = '';
    
    // Normalize current page from full path (supports baseurl + pretty URLs)
    currentPage = normalizePageName(currentPath);
    
    // Get nav links - if not ready, retry
    const navLinks = document.querySelectorAll('.nav-menu a');
    if (navLinks.length === 0) {
        // Nav not ready yet, try again after a short delay
        setTimeout(setCurrentPageIndicator, 50);
        return;
    }
    
    // Update all navigation links
    navLinks.forEach(link => {
        link.classList.remove('current');
        const linkHref = link.getAttribute('href');
        
        // Normalize link href - remove .html for comparison
        const linkPage = normalizePageName(linkHref);
        
        // Match and add current class (compare normalized names)
        if (linkPage === currentPage) {
            link.classList.add('current');
        }
    });
}

// Set on page load
window.addEventListener('load', setCurrentPageIndicator);
window.addEventListener('DOMContentLoaded', setCurrentPageIndicator);

// Also set it immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setCurrentPageIndicator);
} else {
    setCurrentPageIndicator();
}

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
