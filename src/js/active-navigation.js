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
        
        // Create debug panel
        this.createDebugPanel();
        
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
        this.updateDebugPanel();
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

    createDebugPanel() {
        const debugPanel = document.createElement('div');
        debugPanel.className = 'debug-nav';
        debugPanel.innerHTML = `
            <h4>🧭 Navigation Debug</h4>
            <div>Current: <span class="current-section">${this.currentSection}</span></div>
            <div style="margin-top: 10px; font-size: 10px;">
                <div>Links found: ${Object.keys(this.navLinks).length}</div>
                <div>Sections: ${this.sections.join(', ')}</div>
            </div>
            <button onclick="window.activeNavManager.testUnderlines()" style="
                background: #2196F3;
                color: white;
                border: none;
                padding: 3px 6px;
                border-radius: 3px;
                font-size: 10px;
                margin-top: 5px;
                cursor: pointer;
            ">Test Underlines</button>
        `;
        
        document.body.appendChild(debugPanel);
        this.debugPanel = debugPanel;
    }

    updateDebugPanel() {
        if (this.debugPanel) {
            const currentSpan = this.debugPanel.querySelector('.current-section');
            if (currentSpan) {
                currentSpan.textContent = this.currentSection;
            }
        }
    }

    testUnderlines() {
        console.log('🧪 Testing navigation underlines...');
        
        // Test each nav link
        Object.entries(this.navLinks).forEach(([sectionId, link]) => {
            console.log(`Testing ${sectionId}:`, {
                element: link,
                hasActiveClass: link.classList.contains('active'),
                computedStyle: window.getComputedStyle(link, '::before'),
                position: link.style.position || 'default'
            });
            
            // Force hover simulation
            setTimeout(() => {
                link.style.background = 'rgba(59, 130, 246, 0.1)';
                link.classList.add('active');
                
                setTimeout(() => {
                    link.style.background = '';
                    if (sectionId !== this.currentSection) {
                        link.classList.remove('active');
                    }
                }, 1000);
            }, 500);
        });
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
