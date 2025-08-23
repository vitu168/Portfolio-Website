/**
 * Enhanced Contact Form Button Manager
 * Handles loading, success, and error states for the send message button
 */

class EnhancedButtonManager {
    constructor() {
        this.button = document.getElementById('contact-submit');
        this.originalText = this.button?.querySelector('.btn-text')?.textContent || 'Send Message';
        this.init();
    }

    init() {
        if (!this.button) return;
        
        // Listen for form submission events
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                this.handleSubmit(e);
            });
        }
        
        console.log('📤 Enhanced button manager initialized');
    }

    handleSubmit(event) {
        event.preventDefault();
        this.showLoading();
        
        // Simulate form processing (replace with actual form submission logic)
        setTimeout(() => {
            // For demo purposes, randomly show success or error
            const success = Math.random() > 0.3; // 70% success rate for demo
            
            if (success) {
                this.showSuccess();
                setTimeout(() => this.reset(), 3000);
            } else {
                this.showError();
                setTimeout(() => this.reset(), 2000);
            }
        }, 2000);
    }

    showLoading() {
        if (!this.button) return;
        
        this.button.classList.add('loading');
        this.button.disabled = true;
        
        const textElement = this.button.querySelector('.btn-text');
        if (textElement) {
            textElement.textContent = 'Sending...';
        }
        
        console.log('📤 Button: Loading state');
    }

    showSuccess() {
        if (!this.button) return;
        
        this.button.classList.remove('loading');
        this.button.classList.add('success');
        
        const textElement = this.button.querySelector('.btn-text');
        if (textElement) {
            textElement.textContent = 'Message Sent!';
        }
        
        // Add success animation
        this.button.style.animation = 'pulse 0.6s ease-in-out';
        
        console.log('✅ Button: Success state');
    }

    showError() {
        if (!this.button) return;
        
        this.button.classList.remove('loading');
        this.button.classList.add('error');
        
        const textElement = this.button.querySelector('.btn-text');
        if (textElement) {
            textElement.textContent = 'Try Again';
        }
        
        console.log('❌ Button: Error state');
    }

    reset() {
        if (!this.button) return;
        
        this.button.classList.remove('loading', 'success', 'error');
        this.button.disabled = false;
        this.button.style.animation = '';
        
        const textElement = this.button.querySelector('.btn-text');
        if (textElement) {
            textElement.textContent = this.originalText;
        }
        
        console.log('🔄 Button: Reset to default state');
    }

    // Public methods for integration with existing form handler
    setLoading() {
        this.showLoading();
    }

    setSuccess(message = 'Message Sent!') {
        this.showSuccess();
        const textElement = this.button?.querySelector('.btn-text');
        if (textElement && message) {
            textElement.textContent = message;
        }
    }

    setError(message = 'Try Again') {
        this.showError();
        const textElement = this.button?.querySelector('.btn-text');
        if (textElement && message) {
            textElement.textContent = message;
        }
    }

    resetButton() {
        this.reset();
    }
}

// Initialize enhanced button manager
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.enhancedButtonManager = new EnhancedButtonManager();
    }, 500);
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnhancedButtonManager;
}
