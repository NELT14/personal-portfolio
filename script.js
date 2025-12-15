// ============================================
// NAVIGATION - Set current page indicator (unified function)
// ============================================
function setCurrentPageIndicator() {
    // Get current page from URL
    const currentPath = window.location.pathname;
    let currentPage = '';
    
    if (!currentPath || currentPath === '/' || currentPath.endsWith('/')) {
        currentPage = 'index.html';
    } else {
        // Extract filename from path, filtering out empty segments
        const parts = currentPath.split('/').filter(part => part);
        currentPage = parts[parts.length - 1] || 'index.html';
    }
    
    // Normalize currentPage - ensure it's a valid filename
    if (currentPage === '' || currentPage === '/' || !currentPage) {
        currentPage = 'index.html';
    }
    
    // Update all navigation links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('current');
        const linkHref = link.getAttribute('href');
        
        // Normalize link href
        let linkPage = '';
        if (!linkHref || linkHref === '/' || linkHref === '' || linkHref === 'index.html') {
            linkPage = 'index.html';
        } else {
            // Extract filename from href, filtering out empty segments
            const parts = linkHref.split('/').filter(part => part);
            linkPage = parts[parts.length - 1] || 'index.html';
        }
        
        // Match and add current class
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
    
    function handleNavigationClick(e) {
        const href = this.getAttribute('href');
        if (!href || href.includes('#') || isTransitioning) return;
        
        e.preventDefault();
        isTransitioning = true;
        
        // Add fade-out animation
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        
        // Load new page
        fetch(href)
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
                
                // Wait for fade-out, then replace content
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
                    
                    // Update current page indicator using unified function
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
                    }, 50);
                    
                    // Update URL without refresh
                    window.history.pushState({ path: href }, '', href);
                }, 300);
            })
            .catch(err => {
                console.error('Error loading page:', err);
                // Fallback to normal navigation
                isTransitioning = false;
                window.location.href = href;
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
        let page = path.endsWith('/') ? 'index.html' : path.split('/').pop();
        if (!page || page === '') page = 'index.html';
        
        isTransitioning = true;
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        
        fetch(page)
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
                    
                    setCurrentPageIndicator();
                    initAllEventListeners();
                    initScrollAnimations();
                    window.scrollTo({ top: 0, behavior: 'instant' });
                    
                    setTimeout(() => {
                        document.body.style.opacity = '1';
                        isTransitioning = false;
                        attachNavigationListeners();
                    }, 50);
                }, 300);
            })
            .catch(err => {
                console.error('Error loading page:', err);
                isTransitioning = false;
                window.location.href = page;
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
