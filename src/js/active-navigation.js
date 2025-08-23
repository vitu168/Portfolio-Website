/**
 * Active Navigation Manager
 * Handles section detection and navigation highlighting
 */

class ActiveNavigationManager {
    constructor() {
        this.sections = ['home', 'skills', 'projects', 'contact'];
        this.navLinks = {};
        this.currentSection = 'home';
        this.init();
    }

    init() {
        console.log('🧭 Active Navigation Manager initializing...');
        
        // Setup navigation links
        this.setupNavLinks();
        
        // Setup scroll detection
        this.setupScrollDetection();
        
        // Set initial active section
        this.setActiveSection('home');
        
        console.log('✅ Active Navigation Manager ready');
    }

    setupNavLinks() {
        this.sections.forEach(sectionId => {
            const link = document.querySelector(`a[href="#${sectionId}"]`);
            if (link) {
                this.navLinks[sectionId] = link;
                
                // Add click handler for smooth scrolling
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.scrollToSection(sectionId);
                });
                
                console.log(`📍 Found nav link for: ${sectionId}`);
            }
        });
    }

    setupScrollDetection() {
        let ticking = false;
        
        const updateActiveSection = () => {
            const scrollPosition = window.scrollY + 100; // Offset for navbar
            let activeSection = 'home';
            
            // Find the current section based on scroll position
            this.sections.forEach(sectionId => {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const elementTop = window.scrollY + rect.top;
                    
                    if (scrollPosition >= elementTop - 200) {
                        activeSection = sectionId;
                    }
                }
            });
            
            // Update active section if changed
            if (activeSection !== this.currentSection) {
                this.setActiveSection(activeSection);
            }
            
            ticking = false;
        };
        
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateActiveSection);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', onScroll);
        
        // Initial check
        setTimeout(updateActiveSection, 500);
    }

    setActiveSection(sectionId) {
        console.log(`📍 Setting active section: ${sectionId}`);
        
        // Remove active class from all links
        Object.values(this.navLinks).forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current section link
        if (this.navLinks[sectionId]) {
            this.navLinks[sectionId].classList.add('active');
        }
        
        this.currentSection = sectionId;
    }

    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop - 80; // Account for navbar height
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Immediately set as active (don't wait for scroll detection)
            this.setActiveSection(sectionId);
        }
    }

    // Public method to manually set active section
    activateSection(sectionId) {
        if (this.sections.includes(sectionId)) {
            this.setActiveSection(sectionId);
        }
    }

}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for other scripts to load
    setTimeout(() => {
        window.activeNavManager = new ActiveNavigationManager();
    }, 1000);
});

// Also make it available immediately for manual activation
window.ActiveNavigationManager = ActiveNavigationManager;
