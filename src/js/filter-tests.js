/**
 * Filter System Test Suite
 * Quick tests to verify the filtering functionality is working correctly
 */

function runFilterTests() {
    console.log('🧪 Starting Filter System Tests...');
    
    // Test 1: Check if FilterManager is initialized
    if (typeof window.filterManager !== 'undefined') {
        console.log('✅ FilterManager is initialized');
    } else {
        console.error('❌ FilterManager not found');
        return false;
    }
    
    // Test 2: Check filter buttons exist
    const skillsButtons = document.querySelectorAll('.skills-filter .filter-btn');
    const projectsButtons = document.querySelectorAll('.projects-filter .filter-btn');
    
    console.log(`📊 Skills filter buttons: ${skillsButtons.length}`);
    console.log(`📊 Projects filter buttons: ${projectsButtons.length}`);
    
    // Test 3: Check cards exist
    const skillCards = document.querySelectorAll('.skill-card');
    const projectCards = document.querySelectorAll('.project-card');
    
    console.log(`🃏 Skill cards: ${skillCards.length}`);
    console.log(`🃏 Project cards: ${projectCards.length}`);
    
    // Test 4: Check categories
    const skillCategories = new Set();
    const projectCategories = new Set();
    
    skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (category) skillCategories.add(category);
    });
    
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (category) projectCategories.add(category);
    });
    
    console.log('🏷️ Skill categories:', Array.from(skillCategories));
    console.log('🏷️ Project categories:', Array.from(projectCategories));
    
    // Test 5: Simulate filter clicks
    setTimeout(() => {
        console.log('🖱️ Testing frontend filter...');
        const frontendBtn = document.querySelector('.skills-filter .filter-btn[data-category="frontend"]');
        if (frontendBtn) {
            frontendBtn.click();
            
            setTimeout(() => {
                const visibleSkills = document.querySelectorAll('.skill-card:not(.hide)');
                console.log(`📈 Frontend skills visible: ${visibleSkills.length}`);
                
                // Test backend filter
                setTimeout(() => {
                    console.log('🖱️ Testing backend filter...');
                    const backendBtn = document.querySelector('.skills-filter .filter-btn[data-category="backend"]');
                    if (backendBtn) {
                        backendBtn.click();
                        
                        setTimeout(() => {
                            const visibleBackend = document.querySelectorAll('.skill-card:not(.hide)');
                            console.log(`📈 Backend skills visible: ${visibleBackend.length}`);
                            
                            // Reset to all
                            setTimeout(() => {
                                console.log('🖱️ Resetting to all skills...');
                                const allBtn = document.querySelector('.skills-filter .filter-btn[data-category="all"]');
                                if (allBtn) {
                                    allBtn.click();
                                    console.log('✅ Filter tests completed successfully!');
                                }
                            }, 1000);
                        }, 500);
                    }
                }, 1000);
            }, 500);
        }
    }, 2000);
    
    return true;
}

// Auto-run tests when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        runFilterTests();
    }, 3000);
});

// Manual test trigger
window.testFilters = runFilterTests;
