/**
 * Professional Contact Form Handler
 * Manages the enhanced contact form with animations and validation
 */

class ProfessionalContactForm {
    constructor() {
        this.form = document.getElementById('professional-contact-form');
        this.submitButton = this.form?.querySelector('.submit-button');
        this.characterCount = document.getElementById('char-count');
        this.messageField = document.getElementById('contact-message');
        
        this.init();
    }

    init() {
        if (!this.form) return;
        
        this.setupEventListeners();
        this.setupCharacterCounter();
        this.setupFieldAnimations();
        this.setupFormValidation();
    }

    setupEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('.field-input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        // Project type selection
        const projectCheckboxes = this.form.querySelectorAll('input[name="project-type"]');
        projectCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.handleProjectTypeChange(checkbox));
        });
    }

    setupCharacterCounter() {
        if (!this.messageField || !this.characterCount) return;

        this.messageField.addEventListener('input', () => {
            const currentLength = this.messageField.value.length;
            const maxLength = 500;
            
            this.characterCount.textContent = currentLength;
            
            // Color coding for character count
            if (currentLength > maxLength * 0.9) {
                this.characterCount.style.color = '#ef4444';
            } else if (currentLength > maxLength * 0.7) {
                this.characterCount.style.color = '#f59e0b';
            } else {
                this.characterCount.style.color = '#9ca3af';
            }

            // Limit characters
            if (currentLength > maxLength) {
                this.messageField.value = this.messageField.value.substring(0, maxLength);
                this.characterCount.textContent = maxLength;
            }
        });
    }

    setupFieldAnimations() {
        const inputs = this.form.querySelectorAll('.field-input');
        
        inputs.forEach(input => {
            // Focus animations
            input.addEventListener('focus', () => {
                const wrapper = input.closest('.field-wrapper');
                wrapper?.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                const wrapper = input.closest('.field-wrapper');
                wrapper?.classList.remove('focused');
                
                // Add filled class if has value
                if (input.value.trim()) {
                    wrapper?.classList.add('filled');
                } else {
                    wrapper?.classList.remove('filled');
                }
            });
        });
    }

    setupFormValidation() {
        // Custom validation rules
        this.validationRules = {
            'contact-name': {
                required: true,
                minLength: 2,
                pattern: /^[a-zA-Z\s]+$/,
                message: 'Please enter a valid name (letters only)'
            },
            'contact-email': {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
            },
            'contact-subject': {
                required: true,
                minLength: 5,
                message: 'Subject must be at least 5 characters long'
            },
            'contact-message': {
                required: true,
                minLength: 20,
                maxLength: 500,
                message: 'Message must be between 20 and 500 characters'
            }
        };
    }

    validateField(input) {
        const rules = this.validationRules[input.id];
        if (!rules) return true;

        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Required validation
        if (rules.required && !value) {
            isValid = false;
            errorMessage = `${this.getFieldName(input)} is required`;
        }
        // Length validation
        else if (rules.minLength && value.length < rules.minLength) {
            isValid = false;
            errorMessage = `${this.getFieldName(input)} must be at least ${rules.minLength} characters`;
        }
        else if (rules.maxLength && value.length > rules.maxLength) {
            isValid = false;
            errorMessage = `${this.getFieldName(input)} cannot exceed ${rules.maxLength} characters`;
        }
        // Pattern validation
        else if (rules.pattern && !rules.pattern.test(value)) {
            isValid = false;
            errorMessage = rules.message;
        }

        this.showFieldValidation(input, isValid, errorMessage);
        return isValid;
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('.field-input[required]');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    showFieldValidation(input, isValid, errorMessage) {
        const wrapper = input.closest('.field-wrapper') || input.closest('.form-field');
        
        // Remove existing validation classes
        wrapper?.classList.remove('field-valid', 'field-error');
        
        // Add appropriate class
        if (input.value.trim()) {
            wrapper?.classList.add(isValid ? 'field-valid' : 'field-error');
        }

        // Show error message (implement if you have error elements)
        const errorElement = wrapper?.querySelector('.field-error-message');
        if (errorElement) {
            errorElement.textContent = isValid ? '' : errorMessage;
            errorElement.style.display = isValid ? 'none' : 'block';
        }
    }

    clearFieldError(input) {
        const wrapper = input.closest('.field-wrapper') || input.closest('.form-field');
        wrapper?.classList.remove('field-error');
        
        const errorElement = wrapper?.querySelector('.field-error-message');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    getFieldName(input) {
        const label = this.form.querySelector(`label[for="${input.id}"]`);
        return label?.textContent || input.name || 'Field';
    }

    handleProjectTypeChange(checkbox) {
        const label = checkbox.nextElementSibling;
        
        if (checkbox.checked) {
            // Add selection animation
            label.style.transform = 'scale(1.05)';
            setTimeout(() => {
                label.style.transform = '';
            }, 200);
        }

        // Update form data
        this.updateProjectTypes();
    }

    updateProjectTypes() {
        const checkedTypes = Array.from(
            this.form.querySelectorAll('input[name="project-type"]:checked')
        ).map(cb => cb.value);

        // Store for form submission
        this.selectedProjectTypes = checkedTypes;
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Validate form
        if (!this.validateForm()) {
            this.showFormError('Please fix the errors above before submitting.');
            return;
        }

        // Show loading state
        this.setSubmitState('loading');

        try {
            // Get form data
            const formData = this.getFormData();
            
            // Simulate API call (replace with actual submission)
            await this.simulateFormSubmission(formData);
            
            // Success state
            this.setSubmitState('success');
            this.showSuccessMessage();
            this.resetForm();

        } catch (error) {
            // Error state
            this.setSubmitState('error');
            this.showFormError('There was an error sending your message. Please try again.');
            console.error('Form submission error:', error);
        }
    }

    getFormData() {
        const data = new FormData(this.form);
        const formObject = {};

        // Get basic form fields
        for (let [key, value] of data.entries()) {
            if (key === 'project-type') {
                // Handle multiple project types
                if (!formObject[key]) formObject[key] = [];
                formObject[key].push(value);
            } else {
                formObject[key] = value;
            }
        }

        // Add project types if any selected
        if (this.selectedProjectTypes) {
            formObject['project-types'] = this.selectedProjectTypes;
        }

        return formObject;
    }

    async simulateFormSubmission(data) {
        // Simulate network delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success (90% of the time)
                if (Math.random() > 0.1) {
                    resolve(data);
                } else {
                    reject(new Error('Simulated network error'));
                }
            }, 2000);
        });
    }

    setSubmitState(state) {
        const buttonText = this.submitButton.querySelector('.button-text');
        const sendIcon = this.submitButton.querySelector('.send-icon');
        const successIcon = this.submitButton.querySelector('.success-icon');
        const loadingSpinner = this.submitButton.querySelector('.loading-spinner');

        // Reset all states
        sendIcon.style.display = '';
        successIcon.style.display = 'none';
        loadingSpinner.style.display = 'none';
        this.submitButton.disabled = false;
        this.submitButton.classList.remove('loading', 'success', 'error');

        switch (state) {
            case 'loading':
                buttonText.textContent = 'Sending...';
                sendIcon.style.display = 'none';
                loadingSpinner.style.display = 'block';
                this.submitButton.disabled = true;
                this.submitButton.classList.add('loading');
                break;

            case 'success':
                buttonText.textContent = 'Message Sent!';
                sendIcon.style.display = 'none';
                successIcon.style.display = 'block';
                this.submitButton.classList.add('success');
                
                // Reset after 3 seconds
                setTimeout(() => {
                    this.setSubmitState('default');
                }, 3000);
                break;

            case 'error':
                buttonText.textContent = 'Try Again';
                this.submitButton.classList.add('error');
                
                // Reset after 3 seconds
                setTimeout(() => {
                    this.setSubmitState('default');
                }, 3000);
                break;

            default:
                buttonText.textContent = 'Send Message';
                break;
        }
    }

    showSuccessMessage() {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'form-success-notification';
        notification.innerHTML = `
            <div class="success-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"/>
                </svg>
                <div>
                    <h4>Message sent successfully!</h4>
                    <p>I'll get back to you within 24 hours.</p>
                </div>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border: 1px solid #10b981;
            border-radius: 12px;
            padding: 1rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    showFormError(message) {
        // Create error notification
        const notification = document.createElement('div');
        notification.className = 'form-error-notification';
        notification.innerHTML = `
            <div class="error-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                <div>
                    <h4>Error</h4>
                    <p>${message}</p>
                </div>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border: 1px solid #ef4444;
            border-radius: 12px;
            padding: 1rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    resetForm() {
        // Reset form fields
        this.form.reset();
        
        // Reset character counter
        if (this.characterCount) {
            this.characterCount.textContent = '0';
            this.characterCount.style.color = '#9ca3af';
        }

        // Clear validation states
        const wrappers = this.form.querySelectorAll('.field-wrapper, .form-field');
        wrappers.forEach(wrapper => {
            wrapper.classList.remove('field-valid', 'field-error', 'focused', 'filled');
        });

        // Reset project types
        this.selectedProjectTypes = [];
    }
}

// CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .form-success-notification .success-content,
    .form-error-notification .error-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .form-success-notification svg {
        color: #10b981;
        flex-shrink: 0;
    }

    .form-error-notification svg {
        color: #ef4444;
        flex-shrink: 0;
    }

    .form-success-notification h4,
    .form-error-notification h4 {
        margin: 0 0 0.25rem 0;
        font-weight: 600;
        font-size: 0.95rem;
    }

    .form-success-notification p,
    .form-error-notification p {
        margin: 0;
        font-size: 0.85rem;
        color: #64748b;
    }

    /* Field validation states */
    .field-wrapper.field-valid .field-input {
        border-color: #10b981;
        background: #f0fdf4;
    }

    .field-wrapper.field-error .field-input {
        border-color: #ef4444;
        background: #fef2f2;
    }

    .field-wrapper.focused .field-input {
        transform: scale(1.02);
    }

    /* Submit button states */
    .submit-button.loading {
        background: linear-gradient(135deg, #9ca3af 0%, #64748b 100%);
        cursor: not-allowed;
    }

    .submit-button.success {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    }

    .submit-button.error {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProfessionalContactForm();
});

// Export for potential external use
window.ProfessionalContactForm = ProfessionalContactForm;
