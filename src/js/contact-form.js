// Contact Form Handler
class ContactFormManager {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.submitBtn = document.getElementById('contact-submit');
    this.btnText = this.submitBtn.querySelector('.btn-text');
    this.btnIcon = this.submitBtn.querySelector('.btn-icon');
    
    // Your email configuration
    this.recipientEmail = 'langvitu081@gmail.com';
    
    this.init();
  }
  
  init() {
    if (this.form) {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
      
      // Add input validation listeners
      this.addInputListeners();
    }
  }
  
  addInputListeners() {
    const inputs = this.form.querySelectorAll('.form-input');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });
  }
  
  async handleSubmit(e) {
    e.preventDefault();
    
    // Validate all fields
    if (!this.validateForm()) {
      return;
    }
    
    // Get form data
    const formData = this.getFormData();
    
    // Show loading state
    this.setLoadingState(true);
    
    try {
      // Send email using Formspree (free service)
      await this.sendEmail(formData);
      
      // Show success message and button state
      this.setSuccessState();
      this.showSuccessMessage();
      
      // Reset form
      this.form.reset();
      
    } catch (error) {
      console.error('Error sending email:', error);
      this.showErrorMessage();
    } finally {
      this.setLoadingState(false);
    }
  }
  
  async sendEmail(formData) {
    // SIMPLE SOLUTION: Use mailto link (works without any backend)
    
    // Create email content
    const subject = `New Contact from ${formData.name} - Portfolio Website`;
    const body = `
Hi Vitu,

You have a new message from your portfolio website!

Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}

---
Sent from your portfolio contact form
Time: ${new Date().toLocaleString()}
    `.trim();
    
    // Create mailto URL
    const mailtoUrl = `mailto:${this.recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Method 1: Auto-open email client
    const openEmailClient = () => {
      window.location.href = mailtoUrl;
    };
    
    // Method 2: Copy to clipboard and show instructions
    const copyToClipboard = async () => {
      const emailText = `To: ${this.recipientEmail}\nSubject: ${subject}\n\n${body}`;
      
      try {
        await navigator.clipboard.writeText(emailText);
        return true;
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = emailText;
        document.body.appendChild(textArea);
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
      }
    };
    
    // Try to copy to clipboard first
    try {
      const copied = await copyToClipboard();
      
      if (copied) {
        // Show custom notification with email options
        this.showEmailOptions(mailtoUrl, formData);
        return { success: true, method: 'clipboard' };
      }
    } catch (error) {
      console.log('Clipboard not available, using mailto directly');
    }
    
    // Fallback: Open email client directly
    setTimeout(() => {
      openEmailClient();
    }, 1000);
    
    // Store the email data locally as backup
    const emailData = {
      timestamp: new Date().toISOString(),
      to: this.recipientEmail,
      from: formData.email,
      name: formData.name,
      subject: subject,
      message: formData.message
    };
    
    const existingEmails = JSON.parse(localStorage.getItem('portfolioEmails') || '[]');
    existingEmails.push(emailData);
    localStorage.setItem('portfolioEmails', JSON.stringify(existingEmails));
    
    console.log('� Email prepared for sending:', emailData);
    
    return { success: true, method: 'mailto' };
  }
  
  showEmailOptions(mailtoUrl, formData) {
    // Create a custom modal with email sending options
    const modal = document.createElement('div');
    modal.className = 'email-options-modal';
    modal.innerHTML = `
      <div class="email-options-content">
        <div class="email-options-header">
          <h3>📧 Message Ready to Send!</h3>
          <button class="close-btn" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
        </div>
        <div class="email-options-body">
          <p>Your message has been prepared and copied to clipboard. Choose how to send:</p>
          
          <div class="email-option">
            <button class="email-btn primary" onclick="window.open('${mailtoUrl}'); this.parentElement.parentElement.parentElement.parentElement.remove();">
              🚀 Open Email App
            </button>
            <small>Opens your default email application</small>
          </div>
          
          <div class="email-option">
            <button class="email-btn secondary" onclick="copyEmailAgain('${formData.name}', '${formData.email}', '${formData.message.replace(/'/g, "\\'")}')">
              📋 Copy Email Again
            </button>
            <small>Copy the email content to paste in any email app</small>
          </div>
          
          <div class="email-option">
            <button class="email-btn tertiary" onclick="window.open('https://mail.google.com/mail/?view=cm&to=${this.recipientEmail}&subject=${encodeURIComponent('New Contact from ' + formData.name)}&body=${encodeURIComponent(formData.message)}'); this.parentElement.parentElement.parentElement.parentElement.remove();">
              📬 Open Gmail
            </button>
            <small>Send directly via Gmail web interface</small>
          </div>
        </div>
        <div class="email-options-footer">
          <p><strong>To:</strong> ${this.recipientEmail}</p>
          <p><strong>From:</strong> ${formData.name} (${formData.email})</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-remove after 30 seconds
    setTimeout(() => {
      if (modal.parentElement) {
        modal.remove();
      }
    }, 30000);
  }
  
  // Alternative method using EmailJS (also free)
  async sendEmailWithEmailJS(formData) {
    // You would need to set up EmailJS service
    // 1. Create account at https://www.emailjs.com/
    // 2. Create email service and template
    // 3. Replace the IDs below
    
    const emailjsConfig = {
      serviceID: 'YOUR_SERVICE_ID',
      templateID: 'YOUR_TEMPLATE_ID',
      publicKey: 'YOUR_PUBLIC_KEY'
    };
    
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: this.recipientEmail
    };
    
    // Load EmailJS if not already loaded
    if (typeof emailjs === 'undefined') {
      await this.loadEmailJS();
    }
    
    return emailjs.send(
      emailjsConfig.serviceID,
      emailjsConfig.templateID,
      templateParams,
      emailjsConfig.publicKey
    );
  }
  
  async loadEmailJS() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  
  getFormData() {
    return {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      message: document.getElementById('message').value.trim()
    };
  }
  
  validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    // Validate name
    if (!this.validateField(name)) {
      isValid = false;
    }
    
    // Validate email
    if (!this.validateField(email)) {
      isValid = false;
    }
    
    // Validate message
    if (!this.validateField(message)) {
      isValid = false;
    }
    
    return isValid;
  }
  
  validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldId = field.id;
    let isValid = true;
    let errorMessage = '';
    
    // Get current translations
    const t = window.languageManager?.getCurrentTranslations()?.contact?.form?.errors || {};
    
    // Check if field is empty
    if (!value) {
      switch (fieldId) {
        case 'name':
          errorMessage = t.nameRequired || `Please enter your ${fieldId}`;
          break;
        case 'email':
          errorMessage = t.emailRequired || `Please enter your ${fieldId}`;
          break;
        case 'message':
          errorMessage = t.messageRequired || `Please enter your ${fieldId}`;
          break;
        default:
          errorMessage = `Please enter your ${fieldId}`;
      }
      isValid = false;
    } else {
      // Specific validations
      switch (fieldType) {
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            errorMessage = t.emailInvalid || 'Please enter a valid email address';
            isValid = false;
          }
          break;
        case 'text':
          if (fieldId === 'name' && value.length < 2) {
            errorMessage = t.nameMinLength || 'Name must be at least 2 characters';
            isValid = false;
          }
          break;
        default:
          if (fieldId === 'message' && value.length < 10) {
            errorMessage = t.messageMinLength || 'Message must be at least 10 characters';
            isValid = false;
          }
      }
    }
    
    // Show/hide error
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement) {
      if (isValid) {
        errorElement.classList.add('hidden');
        field.classList.remove('error');
      } else {
        errorElement.textContent = errorMessage;
        errorElement.classList.remove('hidden');
        field.classList.add('error');
      }
    }
    
    return isValid;
  }
  
  clearError(field) {
    const fieldId = field.id;
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement) {
      errorElement.classList.add('hidden');
      field.classList.remove('error');
    }
  }
  
  setLoadingState(isLoading) {
    if (isLoading) {
      this.submitBtn.disabled = true;
      this.submitBtn.classList.add('loading');
      this.btnText.textContent = 'Sending...';
      this.btnIcon.innerHTML = `
        <svg class="animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      `;
    } else {
      this.submitBtn.disabled = false;
      this.submitBtn.classList.remove('loading');
      this.btnText.textContent = 'Send Message';
      this.btnIcon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
      `;
    }
  }
  
  setSuccessState() {
    this.submitBtn.classList.add('success');
    this.btnText.textContent = 'Message Sent!';
    this.btnIcon.innerHTML = `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
    `;
    
    // Reset to normal state after 3 seconds
    setTimeout(() => {
      this.submitBtn.classList.remove('success');
      this.btnText.textContent = 'Send Message';
      this.btnIcon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
      `;
    }, 3000);
  }
  
  showSuccessMessage() {
    const message = window.languageManager?.getCurrentTranslations()?.notifications?.messagePrepared || 
                   '📧 Message prepared! Check the popup to send your email.';
    this.showNotification(message, 'success');
  }
  
  showErrorMessage() {
    this.showNotification('Failed to send message. Please try again or contact me directly.', 'error');
  }
  
  showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <div class="notification-icon">
          ${type === 'success' ? 
            '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' :
            '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
          }
        </div>
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 5000);
    
    // Animate in
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ContactFormManager();
});

// Global helper function for copying email content
window.copyEmailAgain = async function(name, email, message) {
  const subject = `New Contact from ${name} - Portfolio Website`;
  const body = `
Hi Vitu,

You have a new message from your portfolio website!

Name: ${name}
Email: ${email}

Message:
${message}

---
Sent from your portfolio contact form
Time: ${new Date().toLocaleString()}
  `.trim();
  
  const emailText = `To: langvitu081@gmail.com\nSubject: ${subject}\n\n${body}`;
  
  try {
    await navigator.clipboard.writeText(emailText);
    
    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'notification notification-success show';
    notification.innerHTML = `
      <div class="notification-content">
        <div class="notification-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <span class="notification-message">📋 Email content copied to clipboard!</span>
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 3000);
    
    // Close the modal
    const modal = document.querySelector('.email-options-modal');
    if (modal) {
      modal.remove();
    }
    
  } catch (err) {
    alert('Could not copy to clipboard. Please use the "Open Email App" option instead.');
  }
};
