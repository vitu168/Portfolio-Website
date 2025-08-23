// Theme System
class ThemeManager {
  constructor() {
    this.currentTheme = this.getStoredTheme() || 'auto';
    console.log(`ThemeManager initialized. Stored theme: ${this.getStoredTheme()}, Current theme: ${this.currentTheme}`);
    this.init();
  }

  init() {
    // Apply theme immediately
    this.applyTheme(this.currentTheme);
    this.setupThemeToggle();
    this.setupSystemThemeListener();
    
    // Multiple attempts to ensure UI is updated properly
    requestAnimationFrame(() => {
      this.forceUpdateThemeButtons();
    });
    
    // Additional delay for DOM readiness
    setTimeout(() => {
      this.forceUpdateThemeButtons();
    }, 100);
    
    // One more attempt after full page load
    window.addEventListener('load', () => {
      this.forceUpdateThemeButtons();
    });
  }

  getStoredTheme() {
    return localStorage.getItem('portfolio-theme');
  }

  storeTheme(theme) {
    localStorage.setItem('portfolio-theme', theme);
  }

  applyTheme(theme) {
    console.log(`Applying theme: ${theme}`);
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme = theme;
    this.storeTheme(theme);
    this.updateThemeButtons();
    this.animateThemeChange();
    this.updateNavbarTheme();
    console.log(`Theme applied and stored: ${theme}`);
  }

  forceUpdateThemeButtons() {
    // Wait for DOM elements to be available
    const themeButtons = document.querySelectorAll('.theme-btn');
    if (themeButtons.length === 0) {
      // If buttons not found, try again after a short delay
      setTimeout(() => this.forceUpdateThemeButtons(), 50);
      return;
    }
    
    // Clear all active states first
    themeButtons.forEach(btn => {
      btn.classList.remove('active');
      // Force style reset to ensure clean state
      btn.style.removeProperty('background');
      btn.style.removeProperty('border');
      btn.style.removeProperty('box-shadow');
    });
    
    // Set the correct active button
    const targetButton = document.querySelector(`[data-theme="${this.currentTheme}"]`);
    if (targetButton) {
      targetButton.classList.add('active');
      console.log(`Theme button updated: ${this.currentTheme} is now active`);
    } else {
      console.warn(`Could not find theme button for: ${this.currentTheme}`);
    }
  }

  animateThemeChange() {
    // Add a subtle animation effect when theme changes
    const indicator = document.querySelector('.theme-toggle-indicator');
    if (indicator && window.gsap) {
      gsap.to(indicator, {
        scale: 1.2,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
    }
  }

  updateNavbarTheme() {
    const navbar = document.querySelector('.navbar');
    if (navbar && window.gsap) {
      // Get current theme colors
      const styles = getComputedStyle(document.documentElement);
      const bgColor = styles.getPropertyValue('--bg-primary').trim();
      const textColor = styles.getPropertyValue('--text-primary').trim();
      
      gsap.to(navbar, {
        backgroundColor: bgColor || 'var(--bg-primary)',
        color: textColor || 'var(--text-primary)',
        duration: 0.3,
        ease: 'power2.inOut'
      });
    }
  }

  setupThemeToggle() {
    // Setup for modern theme switcher
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    themeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const theme = button.getAttribute('data-theme');
        this.applyTheme(theme);
      });
    });

    // Also support legacy theme buttons
    const legacyButtons = document.querySelectorAll('[data-theme-option]');
    legacyButtons.forEach(button => {
      button.addEventListener('click', () => {
        const theme = button.getAttribute('data-theme-option');
        this.applyTheme(theme);
      });
    });
  }

  updateThemeButtons() {
    // Enhanced button state management
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    if (themeButtons.length === 0) {
      console.warn('No theme buttons found for updating');
      return;
    }
    
    themeButtons.forEach(button => {
      const theme = button.getAttribute('data-theme');
      const isActive = theme === this.currentTheme;
      
      // Update active class
      button.classList.toggle('active', isActive);
      
      // Force style reset for inactive buttons
      if (!isActive) {
        button.style.removeProperty('background');
        button.style.removeProperty('border');
        button.style.removeProperty('box-shadow');
      }
    });
    
    console.log(`Theme buttons updated. Current theme: ${this.currentTheme}`);
  }

  setupSystemThemeListener() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', () => {
        if (this.currentTheme === 'auto') {
          this.applyTheme('auto');
        }
      });
    }
    
    // Also listen for page visibility changes to refresh the UI
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        // Page became visible, refresh the theme UI
        setTimeout(() => {
          this.forceUpdateThemeButtons();
        }, 100);
      }
    });
    
    // Listen for focus events to refresh the UI
    window.addEventListener('focus', () => {
      setTimeout(() => {
        this.forceUpdateThemeButtons();
      }, 100);
    });
  }
}

// Toast Notification System
class ToastManager {
  constructor() {
    this.container = this.createContainer();
    this.toasts = new Map();
    this.toastId = 0;
  }

  createContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
  }

  show(message, type = 'info', options = {}) {
    const id = ++this.toastId;
    const toast = this.createToast(message, type, options, id);
    
    this.container.appendChild(toast);
    this.toasts.set(id, toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto dismiss
    const duration = options.duration || 5000;
    setTimeout(() => {
      this.dismiss(id);
    }, duration);

    return id;
  }

  createToast(message, type, options, id) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = this.getIcon(type);
    const title = options.title || this.getDefaultTitle(type);
    
    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" onclick="toastManager.dismiss(${id})">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;

    return toast;
  }

  getIcon(type) {
    const icons = {
      success: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--success)">
        <polyline points="20,6 9,17 4,12"></polyline>
      </svg>`,
      warning: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--warning)">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>`,
      error: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--error)">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>`,
      info: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--info)">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>`
    };
    return icons[type] || icons.info;
  }

  getDefaultTitle(type) {
    const titles = {
      success: 'Success',
      warning: 'Warning',
      error: 'Error',
      info: 'Information'
    };
    return titles[type] || 'Notification';
  }

  dismiss(id) {
    const toast = this.toasts.get(id);
    if (toast) {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
        this.toasts.delete(id);
      }, 300);
    }
  }
}

// Loading Screen Manager
class LoadingManager {
  constructor() {
    this.loadingScreen = null;
    this.isLoading = false;
  }

  show(text = 'Loading...') {
    if (this.isLoading) return;
    
    this.isLoading = true;
    this.loadingScreen = document.createElement('div');
    this.loadingScreen.className = 'loading-screen';
    this.loadingScreen.innerHTML = `
      <div class="loader"></div>
      <div class="loading-text">${text}</div>
    `;
    
    document.body.appendChild(this.loadingScreen);
    document.body.style.overflow = 'hidden';
  }

  hide() {
    if (!this.isLoading || !this.loadingScreen) return;
    
    this.loadingScreen.classList.add('hidden');
    setTimeout(() => {
      if (this.loadingScreen && this.loadingScreen.parentNode) {
        this.loadingScreen.parentNode.removeChild(this.loadingScreen);
      }
      document.body.style.overflow = '';
      this.isLoading = false;
    }, 500);
  }
}

// Scroll Progress Indicator
class ScrollProgressIndicator {
  constructor() {
    this.progressBar = null;
    this.init();
  }

  init() {
    this.createProgressBar();
    this.setupScrollListener();
  }

  createProgressBar() {
    this.progressBar = document.createElement('div');
    this.progressBar.className = 'scroll-progress';
    document.body.appendChild(this.progressBar);
  }

  setupScrollListener() {
    let ticking = false;
    
    const updateProgress = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      
      this.progressBar.style.width = `${Math.min(scrolled, 100)}%`;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    });
  }
}

// Scroll to Top Button
class ScrollToTopButton {
  constructor() {
    this.button = null;
    this.init();
  }

  init() {
    this.createButton();
    this.setupScrollListener();
    this.setupClickListener();
  }

  createButton() {
    this.button = document.createElement('button');
    this.button.className = 'scroll-to-top';
    this.button.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5,12 12,5 19,12"></polyline>
      </svg>
    `;
    this.button.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(this.button);
  }

  setupScrollListener() {
    let ticking = false;
    
    const updateVisibility = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const shouldShow = scrollTop > 300;
      
      this.button.classList.toggle('visible', shouldShow);
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateVisibility);
        ticking = true;
      }
    });
  }

  setupClickListener() {
    this.button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Modal Manager
class ModalManager {
  constructor() {
    this.modals = new Map();
    this.setupGlobalListeners();
  }

  create(id, content, options = {}) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = `modal-${id}`;
    
    const title = options.title || 'Modal';
    const size = options.size || 'medium';
    
    modal.innerHTML = `
      <div class="modal-content ${size}">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button class="modal-close" data-modal-close="${id}">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          ${content}
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    this.modals.set(id, modal);
    
    return modal;
  }

  open(id) {
    const modal = this.modals.get(id);
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  close(id) {
    const modal = this.modals.get(id);
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  setupGlobalListeners() {
    document.addEventListener('click', (e) => {
      // Close button clicks
      if (e.target.matches('[data-modal-close]')) {
        const id = e.target.getAttribute('data-modal-close');
        this.close(id);
      }
      
      // Modal backdrop clicks
      if (e.target.classList.contains('modal')) {
        const id = e.target.id.replace('modal-', '');
        this.close(id);
      }
    });

    // ESC key to close modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.modals.forEach((modal, id) => {
          if (modal.classList.contains('open')) {
            this.close(id);
          }
        });
      }
    });
  }
}

// FAB Menu Manager
class FABManager {
  constructor() {
    this.isOpen = false;
    this.init();
  }

  init() {
    this.createFAB();
    this.setupEventListeners();
  }

  createFAB() {
    const fabContainer = document.createElement('div');
    fabContainer.className = 'fab-menu';
    fabContainer.id = 'fab-menu';
    
    fabContainer.innerHTML = `
      <div class="fab-menu-item" data-action="contact" title="Contact Me">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      </div>
      <div class="fab-menu-item" data-action="projects" title="View Projects">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <rect x="7" y="7" width="3" height="9"></rect>
          <rect x="14" y="7" width="3" height="5"></rect>
        </svg>
      </div>
      <div class="fab-menu-item" data-action="resume" title="Download Resume">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14,2 14,8 20,8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10,9 9,9 8,9"></polyline>
        </svg>
      </div>
    `;

    const fab = document.createElement('button');
    fab.className = 'fab';
    fab.id = 'fab-button';
    fab.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    `;

    document.body.appendChild(fabContainer);
    document.body.appendChild(fab);
  }

  setupEventListeners() {
    const fab = document.getElementById('fab-button');
    const fabMenu = document.getElementById('fab-menu');

    fab.addEventListener('click', () => {
      this.toggle();
    });

    // FAB menu item actions
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-action]')) {
        const action = e.target.closest('[data-action]').getAttribute('data-action');
        this.handleAction(action);
        this.close();
      }
    });
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    const fab = document.getElementById('fab-button');
    const fabMenu = document.getElementById('fab-menu');
    
    this.isOpen = true;
    fab.classList.add('menu-open');
    fabMenu.classList.add('open');
    
    fab.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;
  }

  close() {
    const fab = document.getElementById('fab-button');
    const fabMenu = document.getElementById('fab-menu');
    
    this.isOpen = false;
    fab.classList.remove('menu-open');
    fabMenu.classList.remove('open');
    
    fab.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    `;
  }

  handleAction(action) {
    switch (action) {
      case 'contact':
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        break;
      case 'projects':
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        break;
      case 'resume':
        // Trigger resume download
        toastManager.show('Resume download started!', 'success');
        break;
    }
  }
}

// Initialize all managers
let themeManager, toastManager, loadingManager, scrollProgress, scrollToTop, modalManager, fabManager;

document.addEventListener('DOMContentLoaded', () => {
  // Show loading screen initially
  loadingManager = new LoadingManager();
  loadingManager.show('Initializing Portfolio...');

  // Initialize managers after a short delay to show loading
  setTimeout(() => {
    themeManager = new ThemeManager();
    toastManager = new ToastManager();
    scrollProgress = new ScrollProgressIndicator();
    scrollToTop = new ScrollToTopButton();
    modalManager = new ModalManager();
    fabManager = new FABManager();

    // Hide loading screen
    loadingManager.hide();

    // Show welcome toast
    setTimeout(() => {
      toastManager.show('Welcome to my portfolio! 🚀', 'success', {
        title: 'Hello!',
        duration: 4000
      });
    }, 1000);
  }, 2000);
});

// Export for global access
window.themeManager = themeManager;
window.toastManager = toastManager;
window.modalManager = modalManager;
