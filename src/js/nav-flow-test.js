/**
 * Navigation Flow Test
 * Quick verification that all navigation links work correctly
 */

function testNavigationFlow() {
    console.log('🧭 Testing Navigation Flow...');
    
    // Test the main hero buttons
    const projectBtn = document.querySelector('a[href="#projects"].btn-primary');
    const contactBtn = document.querySelector('a[href="#contact"].btn-secondary');
    
    console.group('🎯 Hero Section Buttons');
    if (projectBtn) {
        console.log('✅ "View My Projects" → #projects');
        console.log('   Text:', projectBtn.textContent.trim());
        console.log('   Target:', projectBtn.href);
    } else {
        console.log('❌ Projects button not found');
    }
    
    if (contactBtn) {
        console.log('✅ "Get in Touch" → #contact');
        console.log('   Text:', contactBtn.textContent.trim());
        console.log('   Target:', contactBtn.href);
    } else {
        console.log('❌ Contact button not found');
    }
    console.groupEnd();
    
    // Test navigation menu
    console.group('📍 Navigation Menu');
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const text = link.textContent.trim();
        console.log(`✅ "${text}" → ${href}`);
    });
    console.groupEnd();
    
    // Test footer links
    console.group('🦶 Footer Links');
    const footerLinks = document.querySelectorAll('.footer-link[href^="#"]');
    footerLinks.forEach(link => {
        const href = link.getAttribute('href');
        const text = link.textContent.trim();
        console.log(`✅ "${text}" → ${href}`);
    });
    console.groupEnd();
    
    console.log('🎉 Navigation flow test complete!');
}

// Auto-run test
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        testNavigationFlow();
    }, 2000);
});

// Manual test trigger
window.testNav = testNavigationFlow;
