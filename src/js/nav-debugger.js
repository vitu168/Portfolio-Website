/**
 * Navigation Debug Tool
 * Helps identify navigation flow issues
 */

class NavigationDebugger {
    constructor() {
        this.trackClicks();
        this.logSections();
        this.addDebugPanel();
    }

    trackClicks() {
        // Track all navigation clicks
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a, button');
            if (!target) return;

            const href = target.getAttribute('href');
            const text = target.textContent?.trim();
            const classes = target.className;

            if (href && href.startsWith('#')) {
                console.group('🔗 Navigation Click Detected');
                console.log('Element:', target);
                console.log('Text:', text);
                console.log('Target:', href);
                console.log('Classes:', classes);
                console.log('Position:', this.getSectionPosition(href.slice(1)));
                console.groupEnd();
            }
        });
    }

    logSections() {
        const sections = ['home', 'skills', 'projects', 'contact'];
        console.group('📍 Section Positions');
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const rect = section.getBoundingClientRect();
                const offsetTop = window.pageYOffset + rect.top;
                console.log(`${sectionId}:`, {
                    element: section,
                    offsetTop: offsetTop,
                    height: rect.height,
                    inView: rect.top >= 0 && rect.bottom <= window.innerHeight
                });
            }
        });
        console.groupEnd();
    }

    getSectionPosition(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return 'Section not found';
        
        const rect = section.getBoundingClientRect();
        return {
            offsetTop: window.pageYOffset + rect.top,
            height: rect.height,
            visible: rect.top < window.innerHeight && rect.bottom > 0
        };
    }

    addDebugPanel() {
        const panel = document.createElement('div');
        panel.id = 'nav-debug-panel';
        panel.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(0,0,0,0.9);
                color: white;
                padding: 15px;
                border-radius: 8px;
                font-family: monospace;
                font-size: 12px;
                z-index: 10000;
                max-width: 300px;
                border: 1px solid #333;
            ">
                <h4 style="margin: 0 0 10px 0; color: #4CAF50;">🐛 Navigation Debug</h4>
                <div id="nav-debug-content">
                    <button onclick="window.navDebugger.testFlow()" style="
                        background: #2196F3;
                        color: white;
                        border: none;
                        padding: 5px 10px;
                        border-radius: 4px;
                        cursor: pointer;
                        margin: 2px;
                        font-size: 11px;
                    ">Test Flow</button>
                    <button onclick="window.navDebugger.logSections()" style="
                        background: #FF9800;
                        color: white;
                        border: none;
                        padding: 5px 10px;
                        border-radius: 4px;
                        cursor: pointer;
                        margin: 2px;
                        font-size: 11px;
                    ">Log Sections</button>
                    <button onclick="window.navDebugger.findBrokenLinks()" style="
                        background: #F44336;
                        color: white;
                        border: none;
                        padding: 5px 10px;
                        border-radius: 4px;
                        cursor: pointer;
                        margin: 2px;
                        font-size: 11px;
                    ">Find Issues</button>
                    <div style="margin-top: 10px; font-size: 10px;">
                        <div>Current: <span id="current-section">-</span></div>
                        <div>Last Click: <span id="last-click">-</span></div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        this.updateCurrentSection();
        
        // Update current section on scroll
        window.addEventListener('scroll', () => {
            this.updateCurrentSection();
        });
    }

    updateCurrentSection() {
        const sections = ['home', 'skills', 'projects', 'contact'];
        let currentSection = 'none';
        
        for (const sectionId of sections) {
            const section = document.getElementById(sectionId);
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom > 100) {
                    currentSection = sectionId;
                    break;
                }
            }
        }
        
        const display = document.getElementById('current-section');
        if (display) {
            display.textContent = currentSection;
        }
    }

    testFlow() {
        console.group('🧪 Testing Navigation Flow');
        
        // Test hero buttons
        const heroProjectBtn = document.querySelector('.cta-secondary[href="#projects"]');
        const heroContactBtn = document.querySelector('.cta-primary[href="#contact"]');
        
        console.log('Hero "View My Work" button:', heroProjectBtn);
        console.log('Hero "Let\'s Work Together" button:', heroContactBtn);
        
        // Test all #contact links
        const contactLinks = document.querySelectorAll('a[href="#contact"]');
        console.log(`Found ${contactLinks.length} links to #contact:`);
        contactLinks.forEach((link, i) => {
            console.log(`  ${i + 1}. "${link.textContent.trim()}" (${link.className})`);
        });
        
        // Test all #projects links
        const projectLinks = document.querySelectorAll('a[href="#projects"]');
        console.log(`Found ${projectLinks.length} links to #projects:`);
        projectLinks.forEach((link, i) => {
            console.log(`  ${i + 1}. "${link.textContent.trim()}" (${link.className})`);
        });
        
        console.groupEnd();
    }

    findBrokenLinks() {
        console.group('🔍 Checking for Navigation Issues');
        
        const allLinks = document.querySelectorAll('a[href^="#"]');
        const issues = [];
        
        allLinks.forEach(link => {
            const href = link.getAttribute('href');
            const targetId = href.slice(1);
            const target = document.getElementById(targetId);
            
            if (!target) {
                issues.push({
                    link: link,
                    text: link.textContent.trim(),
                    href: href,
                    issue: 'Target section not found'
                });
            }
        });
        
        if (issues.length === 0) {
            console.log('✅ No broken internal links found');
        } else {
            console.warn(`❌ Found ${issues.length} issues:`);
            issues.forEach(issue => {
                console.log('Issue:', issue);
            });
        }
        
        console.groupEnd();
    }
}

// Initialize debugger
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.navDebugger = new NavigationDebugger();
        console.log('🐛 Navigation Debugger initialized. Check the debug panel in top-right corner.');
    }, 1000);
});
