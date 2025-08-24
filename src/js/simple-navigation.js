/**
 * Simple Navigation Active State Manager
 * Just handles which section is currently active
 */

class SimpleNavigationManager {
    constructor() {
        this.sections = ['home', 'skills', 'projects', 'knowledges', 'contact'];
        this.navLinks = {};
        this.currentSection = 'home';
        this.init();
    }

    init() {
        // Get all navigation links
        this.sections.forEach(sectionId => {
            const link = document.querySelector(`a[href="#${sectionId}"]`);
            if (link) {
                this.navLinks[sectionId] = link;
                
                // Add smooth scroll click handler
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.smoothScrollToSection(sectionId);
                });
            }
        });

        // Setup scroll detection for active section
        this.setupScrollDetection();
        
        // Set home as initially active
        this.setActiveSection('home');
    }

    setupScrollDetection() {
        let ticking = false;
        
        const checkActiveSection = () => {
            const scrollPosition = window.scrollY + 100;
            let activeSection = 'home';
            
            // Check which section is currently in view
            this.sections.forEach(sectionId => {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const elementTop = window.scrollY + rect.top;
                    
                    if (scrollPosition >= elementTop - 150) {
                        activeSection = sectionId;
                    }
                }
            });
            
            // Update if section changed
            if (activeSection !== this.currentSection) {
                this.setActiveSection(activeSection);
            }
            
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(checkActiveSection);
                ticking = true;
            }
        });
    }

    setActiveSection(sectionId) {
        // Remove active class from all links
        Object.values(this.navLinks).forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current section
        if (this.navLinks[sectionId]) {
            this.navLinks[sectionId].classList.add('active');
        }
        
        this.currentSection = sectionId;
    }

    smoothScrollToSection(sectionId) {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            const navbarHeight = 80; // Account for fixed navbar
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            // Fast smooth scroll animation
            this.animateScrollTo(targetPosition, 400); // Reduced to 400ms (0.4 seconds)
            
            // Immediately set as active
            this.setActiveSection(sectionId);
        }
    }

    animateScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        // Faster easing function for more responsive feel
        const easeOutQuart = (t) => {
            return 1 - (--t) * t * t * t;
        };

        const animationStep = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            const easedProgress = easeOutQuart(progress);
            const currentPosition = startPosition + (distance * easedProgress);
            
            window.scrollTo(0, currentPosition);
            
            if (progress < 1) {
                requestAnimationFrame(animationStep);
            }
        };

        requestAnimationFrame(animationStep);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new SimpleNavigationManager();
});
