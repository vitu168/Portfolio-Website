/**
 * Favicon Checker - Verifies that favicon files are loading correctly
 */

class FaviconChecker {
    constructor() {
        this.faviconFiles = [
            'favicon/favicon.svg',
            'favicon/favicon.ico',
            'favicon/favicon-16x16.png',
            'favicon/favicon-32x32.png',
            'favicon/apple-touch-icon.png',
            'favicon/android-chrome-192x192.png',
            'favicon/android-chrome-512x512.png',
            'favicon/site.webmanifest'
        ];
        
        this.checkFavicons();
    }

    async checkFavicons() {
        console.log('🔍 Checking favicon files...');
        
        for (const file of this.faviconFiles) {
            try {
                const response = await fetch(file);
                if (response.ok) {
                    console.log(`✅ ${file} - Found (${response.status})`);
                } else {
                    console.log(`❌ ${file} - Missing (${response.status})`);
                }
            } catch (error) {
                console.log(`❌ ${file} - Error: ${error.message}`);
            }
        }
        
        this.checkCurrentFavicon();
    }

    checkCurrentFavicon() {
        const favicon = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
        if (favicon) {
            console.log('🎯 Current favicon:', favicon.href);
            console.log('📄 Type:', favicon.type || 'not specified');
        } else {
            console.log('⚠️ No favicon link found in document');
        }
        
        // Check if favicon is actually loading
        const testImage = new Image();
        testImage.onload = () => {
            console.log('✅ Favicon image loads successfully');
        };
        testImage.onerror = () => {
            console.log('❌ Favicon image failed to load');
        };
        
        if (favicon) {
            testImage.src = favicon.href;
        }
    }

    // Force favicon refresh (useful for development)
    refreshFavicon() {
        const favicon = document.querySelector('link[rel="icon"]');
        if (favicon) {
            const newFavicon = favicon.cloneNode();
            newFavicon.href = favicon.href + '?v=' + Date.now();
            favicon.parentNode.replaceChild(newFavicon, favicon);
            console.log('🔄 Favicon refreshed');
        }
    }
}

// Auto-run checker when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.faviconChecker = new FaviconChecker();
    }, 1000);
});

// Add manual refresh function
window.refreshFavicon = () => {
    if (window.faviconChecker) {
        window.faviconChecker.refreshFavicon();
    }
};
