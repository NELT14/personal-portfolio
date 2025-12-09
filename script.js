// ===========================
// Smooth Scrolling Navigation
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// ===========================
// Mobile Navigation Toggle
// ===========================
const navToggleBtn = document.querySelector('.nav-toggle');
const navLinksList = document.querySelector('.nav-links');
if (navToggleBtn && navLinksList) {
    navToggleBtn.addEventListener('click', () => {
        navLinksList.classList.toggle('active');
    });
}

// ===========================
// Intersection Observer for Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply observer to elements
document.querySelectorAll('.skill-item, .achievement, .social-card, .info-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ===========================
// Active Navigation Link Indicator
// ===========================
function highlightActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Call on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', highlightActiveLink);
} else {
    highlightActiveLink();
}

// ===========================
// Mobile Menu Toggle (if needed in future)
// ===========================
function setupMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');

    // Add mobile menu functionality if needed
    if (window.innerWidth <= 768) {
        console.log('Mobile menu support ready');
    }
}

setupMobileMenu();

// ===========================
// Social Links Tracking (optional analytics)
// ===========================
document.querySelectorAll('.social-card').forEach(card => {
    card.addEventListener('click', function(e) {
        const platform = this.querySelector('h3').textContent;
        console.log(`Clicked on ${platform} link`);
        // You can add analytics tracking here
    });
});

// ===========================
// Email Mailto Handler
// ===========================
const emailCard = document.querySelector('.social-card.email');
if (emailCard) {
    emailCard.addEventListener('click', function(e) {
        // Prevents default action, mailto already works
        e.preventDefault();
        window.location.href = 'mailto:ali_aliyev@hotmail.com';
    });
}

// ===========================
// Add CSS for Active Nav Links
// ===========================
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--accent-color) !important;
        font-weight: 700;
    }
`;
document.head.appendChild(style);

// ===========================
// Expandable Research Papers Toggle
// ===========================
document.querySelectorAll('.papers-toggle').forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        if (isExpanded) {
            // Collapse
            targetElement.style.display = 'none';
            this.setAttribute('aria-expanded', 'false');
            this.textContent = 'View Research Papers';
        } else {
            // Expand
            targetElement.style.display = 'block';
            this.setAttribute('aria-expanded', 'true');
            this.textContent = 'Hide Research Papers';
        }
    });
});
