// ============================================
// NAVIGATION - Set current page indicator (unified function)
// ============================================
// Helper function to normalize page name (remove .html for comparison)
function normalizePageName(page) {
    if (!page) return 'index';
    if (page === 'index.html' || page === 'index' || page === '/' || page === '') return 'index';
    // Remove .html extension if present
    return page.replace('.html', '');
}

function setCurrentPageIndicator() {
    // Get current page from URL
    const currentPath = window.location.pathname;
    let currentPage = '';
    
    if (!currentPath || currentPath === '/' || currentPath.endsWith('/')) {
        currentPage = 'index';
    } else {
        // Extract filename from path, filtering out empty segments
        const parts = currentPath.split('/').filter(part => part);
        currentPage = parts[parts.length - 1] || 'index';
    }
    
    // Normalize currentPage - remove .html if present
    currentPage = normalizePageName(currentPage);
    
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

// Helper function to clean initial URL on page load
function cleanInitialUrl() {
    const path = window.location.pathname;
    // If URL ends with .html, replace with clean URL
    if (path.endsWith('.html')) {
        const cleanPath = path.replace('.html', '') || '/';
        window.history.replaceState({ path: cleanPath }, '', cleanPath);
    }
}

// Clean URL on page load
cleanInitialUrl();

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
// SMOOTH PAGE TRANSITIONS (SPA-like behavior)
// ============================================
(function() {
    let isTransitioning = false;
    
    // Use the unified setCurrentPageIndicator function instead of separate updateCurrentPageIndicator
    
    function initAllEventListeners() {
        // Re-initialize smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
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
        
        // Re-initialize research papers toggle
        document.querySelectorAll('.papers-toggle').forEach(button => {
            // Remove old listeners by cloning
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('click', function(e) {
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

        // Re-initialize image error handling
        document.querySelectorAll('.project-image img').forEach(img => {
            img.addEventListener('error', function() {
                this.style.display = 'none';
                const placeholder = document.createElement('div');
                placeholder.className = 'project-image-placeholder';
                placeholder.innerHTML = '<i class="fas fa-image"></i>';
                this.parentElement.appendChild(placeholder);
            });
        });
    }
    
    // Helper function to convert file path to clean URL (remove .html)
    function toCleanUrl(path) {
        if (!path) return '';
        if (path === 'index.html' || path === '/' || path === '') return '/';
        if (path.endsWith('.html')) {
            return path.replace('.html', '');
        }
        return path;
    }
    
    // Helper function to convert clean URL to file path (add .html if needed)
    function toFilePath(path) {
        if (!path) return 'index.html';
        if (path === '/' || path === '' || path === 'index') return 'index.html';
        if (path.endsWith('.html')) return path;
        return path + '.html';
    }
    
    function handleNavigationClick(e) {
        const href = this.getAttribute('href');
        if (!href || href.includes('#') || isTransitioning) return;
        
        e.preventDefault();
        isTransitioning = true;
        
        // Convert href to file path for fetching
        const filePath = toFilePath(href);
        // Convert to clean URL for browser
        const cleanUrl = toCleanUrl(href);
        
        // Add fade-out animation (faster transition)
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.15s ease';
        
        // Load new page using file path
        fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error('Failed to load page');
                return response.text();
            })
            .then(html => {
                // Parse the HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                // Get new content (everything except script tags and nav)
                const newBody = doc.body;
                const newContent = Array.from(newBody.children).filter(el => 
                    el.tagName !== 'SCRIPT' && !el.classList.contains('nav')
                );
                
                // Wait for fade-out, then replace content (reduced delay)
            setTimeout(() => {
                    // Replace body content (keep nav)
                    const currentContent = Array.from(document.body.children).filter(el => 
                        el.tagName !== 'SCRIPT' && !el.classList.contains('nav')
                    );
                    currentContent.forEach(el => el.remove());
                    
                    // Add new content
                    newContent.forEach(el => {
                        if (el.tagName !== 'SCRIPT' && !el.classList.contains('nav')) {
                            document.body.appendChild(el);
                        }
                    });
                    
                    // Update URL with clean format (no .html)
                    window.history.pushState({ path: cleanUrl }, '', cleanUrl);
                    
                    // Update current page indicator using unified function (after URL update)
                    setCurrentPageIndicator();
                    
                    // Re-initialize all event listeners
                    initAllEventListeners();
                    
                    // Re-initialize scroll animations
                    initScrollAnimations();
                    
                    // Scroll to top
                    window.scrollTo({ top: 0, behavior: 'instant' });
                    
                    // Fade in new content
                    setTimeout(() => {
                        document.body.style.opacity = '1';
                        isTransitioning = false;
                        // Ensure indicator is set after fade-in completes
                        setCurrentPageIndicator();
                    }, 50);
                }, 150); // Reduced from 300ms to 150ms
            })
            .catch(err => {
                console.error('Error loading page:', err);
                // Fallback to normal navigation
                isTransitioning = false;
                window.location.href = filePath;
            });
    }
    
    // Attach navigation listeners
    function attachNavigationListeners() {
        document.querySelectorAll('.nav-menu a[href$=".html"], .nav-brand a[href$=".html"]').forEach(link => {
            // Remove old listeners by cloning
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            newLink.addEventListener('click', handleNavigationClick);
        });
    }
    
    // Initial attachment
    attachNavigationListeners();
    
    // Re-attach after page transitions
    const originalAttachNavigationListeners = attachNavigationListeners;
    window.attachNavigationListeners = originalAttachNavigationListeners;
    
    // Handle browser back/forward
    window.addEventListener('popstate', function(e) {
        if (isTransitioning) return;
        
        const path = window.location.pathname;
        // Get clean URL path (without .html)
        let cleanPath = path.endsWith('/') ? '/' : path.split('/').pop();
        if (!cleanPath || cleanPath === '') cleanPath = '/';
        
        // Convert to file path for fetching
        const filePath = toFilePath(cleanPath);
        
        isTransitioning = true;
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.15s ease'; // Faster transition
        
        fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error('Failed to load page');
                return response.text();
            })
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newBody = doc.body;
                const newContent = Array.from(newBody.children).filter(el => 
                    el.tagName !== 'SCRIPT' && !el.classList.contains('nav')
                );
                
                setTimeout(() => {
                    const currentContent = Array.from(document.body.children).filter(el => 
                        el.tagName !== 'SCRIPT' && !el.classList.contains('nav')
                    );
                    currentContent.forEach(el => el.remove());
                    
                    newContent.forEach(el => {
                        if (el.tagName !== 'SCRIPT' && !el.classList.contains('nav')) {
                            document.body.appendChild(el);
                        }
                    });
                    
                    // Ensure URL is clean (no .html)
                    const currentPath = window.location.pathname;
                    const expectedCleanPath = cleanPath === '/' ? '/' : '/' + cleanPath;
                    if (currentPath !== expectedCleanPath) {
                        window.history.replaceState({ path: cleanPath }, '', cleanPath);
                    }
                    
                    setCurrentPageIndicator();
                    initAllEventListeners();
                    initScrollAnimations();
                    window.scrollTo({ top: 0, behavior: 'instant' });
                    
                    setTimeout(() => {
                        document.body.style.opacity = '1';
                        isTransitioning = false;
                        attachNavigationListeners();
                        // Ensure indicator is set after everything completes
                        setCurrentPageIndicator();
                    }, 50);
                }, 150); // Reduced from 300ms to 150ms
            })
            .catch(err => {
                console.error('Error loading page:', err);
                isTransitioning = false;
                window.location.href = filePath;
            });
    });
})();

// ============================================
// SCROLL ANIMATIONS FOR SECTIONS
// ============================================
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
    let scrollTimeout;
    const scrollHandler = function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    section.classList.add('visible');
                }
            });
        }, 100);
    };
    
    // Remove old scroll listeners and add new one
    window.removeEventListener('scroll', scrollHandler);
    window.addEventListener('scroll', scrollHandler, { passive: true });
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
