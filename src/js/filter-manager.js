/**
 * Advanced Filter Manager for Skills and Projects
 * Handles category filtering with smooth animations and accessibility features
 */

class FilterManager {
    constructor() {
        this.activeFilters = {
            skills: 'all',
            projects: 'all'
        };
        
        this.animationQueue = [];
        this.isAnimating = false;
        
        this.init();
    }

    init() {
        console.log('🔍 FilterManager: Initializing...');
        
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.setupSkillsFilter();
        this.setupProjectsFilter();
        this.addKeyboardSupport();
        
        // Initialize with 'all' filter active
        this.showAllItems();
        
        console.log('✅ FilterManager: Setup complete');
    }

    setupSkillsFilter() {
        const filterContainer = document.querySelector('.skills-filter');
        const filterBtns = document.querySelectorAll('.skills-filter .filter-btn');
        const skillCards = document.querySelectorAll('.skill-card');

        if (!filterContainer || filterBtns.length === 0) {
            console.warn('⚠️ Skills filter elements not found');
            return;
        }

        console.log(`🎯 Skills: ${filterBtns.length} filter buttons, ${skillCards.length} cards`);

        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const category = btn.getAttribute('data-category');
                this.filterSkills(category, btn, filterBtns);
            });

            // Add hover effects
            btn.addEventListener('mouseenter', () => {
                if (!btn.classList.contains('active')) {
                    btn.style.transform = 'translateY(-2px) scale(1.02)';
                }
            });

            btn.addEventListener('mouseleave', () => {
                if (!btn.classList.contains('active')) {
                    btn.style.transform = '';
                }
            });
        });
    }

    setupProjectsFilter() {
        const filterContainer = document.querySelector('.projects-filter');
        const filterBtns = document.querySelectorAll('.projects-filter .filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        if (!filterContainer || filterBtns.length === 0) {
            console.warn('⚠️ Projects filter elements not found');
            return;
        }

        console.log(`🎯 Projects: ${filterBtns.length} filter buttons, ${projectCards.length} cards`);

        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const category = btn.getAttribute('data-category');
                this.filterProjects(category, btn, filterBtns);
            });

            // Add hover effects
            btn.addEventListener('mouseenter', () => {
                if (!btn.classList.contains('active')) {
                    btn.style.transform = 'translateY(-2px) scale(1.02)';
                }
            });

            btn.addEventListener('mouseleave', () => {
                if (!btn.classList.contains('active')) {
                    btn.style.transform = '';
                }
            });
        });
    }

    filterSkills(category, activeBtn, allBtns) {
        console.log(`🔍 Filtering skills by: ${category}`);
        
        this.activeFilters.skills = category;
        this.updateActiveButton(activeBtn, allBtns);
        
        const skillCards = document.querySelectorAll('.skill-card');
        this.animateFilter(skillCards, category, 'skills');
    }

    filterProjects(category, activeBtn, allBtns) {
        console.log(`🔍 Filtering projects by: ${category}`);
        
        this.activeFilters.projects = category;
        this.updateActiveButton(activeBtn, allBtns);
        
        const projectCards = document.querySelectorAll('.project-card');
        this.animateFilter(projectCards, category, 'projects');
    }

    updateActiveButton(activeBtn, allBtns) {
        // Remove active class from all buttons
        allBtns.forEach(btn => {
            btn.classList.remove('active');
            btn.style.transform = '';
            btn.setAttribute('aria-pressed', 'false');
        });
        
        // Add active class to clicked button
        activeBtn.classList.add('active');
        activeBtn.style.transform = 'translateY(-2px)';
        activeBtn.setAttribute('aria-pressed', 'true');
    }

    animateFilter(items, category, type) {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        
        const visibleItems = [];
        const hiddenItems = [];
        
        // Categorize items
        items.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'all' || itemCategory === category) {
                visibleItems.push(item);
            } else {
                hiddenItems.push(item);
            }
        });

        console.log(`📊 ${type}: ${visibleItems.length} visible, ${hiddenItems.length} hidden`);

        // First hide items that should be hidden
        this.hideItems(hiddenItems, () => {
            // Then show items that should be visible
            this.showItems(visibleItems, () => {
                this.isAnimating = false;
                this.announceFilterChange(category, visibleItems.length, type);
            });
        });
    }

    hideItems(items, callback) {
        if (items.length === 0) {
            callback();
            return;
        }

        let completed = 0;
        const duration = 300;

        items.forEach((item, index) => {
            item.classList.add('hide');
            item.classList.remove('show');
            
            // Use GSAP if available, otherwise CSS transitions
            if (typeof gsap !== 'undefined') {
                gsap.to(item, {
                    duration: 0.3,
                    opacity: 0,
                    scale: 0.8,
                    y: 20,
                    ease: "power2.in",
                    delay: index * 0.05,
                    onComplete: () => {
                        item.style.display = 'none';
                        completed++;
                        if (completed === items.length) callback();
                    }
                });
            } else {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8) translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                        completed++;
                        if (completed === items.length) callback();
                    }, duration);
                }, index * 50);
            }
        });
    }

    showItems(items, callback) {
        if (items.length === 0) {
            callback();
            return;
        }

        let completed = 0;

        items.forEach((item, index) => {
            item.classList.remove('hide');
            item.classList.add('show');
            item.style.display = 'block';
            
            // Use GSAP if available, otherwise CSS transitions
            if (typeof gsap !== 'undefined') {
                gsap.set(item, { opacity: 0, scale: 0.8, y: 20 });
                gsap.to(item, {
                    duration: 0.5,
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    ease: "back.out(1.7)",
                    delay: index * 0.1,
                    onComplete: () => {
                        completed++;
                        if (completed === items.length) callback();
                    }
                });
            } else {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1) translateY(0)';
                    completed++;
                    if (completed === items.length) callback();
                }, index * 100 + 300);
            }
        });
    }

    showAllItems() {
        const allCards = document.querySelectorAll('.skill-card, .project-card');
        allCards.forEach(card => {
            card.classList.remove('hide');
            card.classList.add('show');
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
        });
    }

    addKeyboardSupport() {
        // Add keyboard navigation for filter buttons
        const allFilterBtns = document.querySelectorAll('.filter-btn');
        
        allFilterBtns.forEach(btn => {
            btn.setAttribute('role', 'button');
            btn.setAttribute('tabindex', '0');
            btn.setAttribute('aria-pressed', btn.classList.contains('active'));
            
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    btn.click();
                }
            });
        });
    }

    announceFilterChange(category, count, type) {
        // Create accessible announcement for screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `${type} filtered by ${category}. Showing ${count} items.`;
        
        document.body.appendChild(announcement);
        
        // Show visual feedback
        this.showFilterFeedback(category, count, type);
        
        // Remove announcement after screen readers have processed it
        setTimeout(() => {
            if (document.body.contains(announcement)) {
                document.body.removeChild(announcement);
            }
        }, 1000);
    }

    showFilterFeedback(category, count, type) {
        // Create or update filter feedback element
        let feedbackId = `${type}-filter-feedback`;
        let feedback = document.getElementById(feedbackId);
        
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.id = feedbackId;
            feedback.className = 'filter-feedback';
            
            // Insert after the filter buttons
            const filterContainer = document.querySelector(`.${type}-filter`);
            if (filterContainer) {
                filterContainer.appendChild(feedback);
            }
        }
        
        // Update feedback content
        const categoryDisplay = category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1);
        feedback.innerHTML = `
            <div class="filter-result">
                <span class="filter-category">${categoryDisplay}</span>
                <span class="filter-count">${count} item${count !== 1 ? 's' : ''}</span>
            </div>
        `;
        
        // Add animation
        feedback.style.opacity = '0';
        feedback.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            feedback.style.opacity = '1';
            feedback.style.transform = 'translateY(0)';
        }, 100);
    }

    // Public API methods
    resetFilters() {
        this.activeFilters = { skills: 'all', projects: 'all' };
        this.showAllItems();
        
        // Reset button states
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        document.querySelectorAll('.filter-btn[data-category="all"]').forEach(btn => {
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
        });
    }

    getActiveFilters() {
        return { ...this.activeFilters };
    }
}

// Auto-initialize when script loads
window.filterManager = new FilterManager();

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FilterManager;
}
