// Auto-typing animations for About section
class AutoTypingManager {
  constructor() {
    this.roles = [
      'Flutter Developer',
      'UI/UX Designer', 
      'Mobile App Creator',
      'Digital Innovator',
      'Cross-Platform Expert'
    ];
    
    this.description = "I'm a passionate Flutter Developer and UX/UI Designer dedicated to creating seamless mobile applications and visually captivating interfaces. With expertise in Flutter, Dart, and design tools like Figma, I craft cross-platform apps that prioritize performance and user experience. My design philosophy centers on creating intuitive, user-friendly experiences that leave a lasting impression.";
    
    this.currentRoleIndex = 0;
    this.isTyping = false;
    
    this.init();
  }
  
  init() {
    // Wait for DOM to be ready, then start animations
    setTimeout(() => {
      this.startRoleTyping();
      this.startDescriptionTyping();
    }, 1000);
  }
  
  async startRoleTyping() {
    const element = document.getElementById('auto-typing-role');
    if (!element) return;
    
    while (true) {
      const currentRole = this.roles[this.currentRoleIndex];
      
      // Type the role
      await this.typeText(element, currentRole, 100);
      
      // Wait before deleting
      await this.wait(2000);
      
      // Delete the role
      await this.deleteText(element, 50);
      
      // Move to next role
      this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
      
      // Wait before typing next role
      await this.wait(500);
    }
  }
  
  async startDescriptionTyping() {
    const element = document.getElementById('auto-typing-description');
    if (!element) return;
    
    // Wait a bit before starting description
    await this.wait(1500);
    
    // Type the description
    await this.typeText(element, this.description, 30);
  }
  
  async typeText(element, text, speed = 100) {
    element.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
      element.textContent += text[i];
      await this.wait(speed);
    }
  }
  
  async deleteText(element, speed = 50) {
    const text = element.textContent;
    
    for (let i = text.length; i > 0; i--) {
      element.textContent = text.substring(0, i - 1);
      await this.wait(speed);
    }
  }
  
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Counter animation for stats
class StatsCounter {
  constructor() {
    this.animated = false;
    this.init();
  }
  
  init() {
    // Create intersection observer for stats animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animated) {
          this.animateStats();
          this.animated = true;
        }
      });
    });
    
    const statsSection = document.querySelector('.profile-stats');
    if (statsSection) {
      observer.observe(statsSection);
    }
  }
  
  animateStats() {
    const stats = [
      { element: '.stat-item:nth-child(1) .stat-number', target: 3, suffix: '+' },
      { element: '.stat-item:nth-child(2) .stat-number', target: 50, suffix: '+' },
      { element: '.stat-item:nth-child(3) .stat-number', target: 20, suffix: '+' }
    ];
    
    stats.forEach(stat => {
      const element = document.querySelector(stat.element);
      if (element) {
        this.animateNumber(element, 0, stat.target, stat.suffix, 2000);
      }
    });
  }
  
  animateNumber(element, start, target, suffix, duration) {
    const range = target - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + suffix;
    }, 16);
  }
}

// Scroll animations for about section
class AboutScrollAnimations {
  constructor() {
    this.init();
  }
  
  init() {
    // Create intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1
    });
    
    // Observe elements for animation
    const elements = document.querySelectorAll('.highlight-item, .profile-image-container, .intro-section');
    elements.forEach(el => observer.observe(el));
  }
}

// Initialize all About section features
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure everything is loaded
  setTimeout(() => {
    window.autoTypingManager = new AutoTypingManager();
    new StatsCounter();
    new AboutScrollAnimations();
  }, 500);
});

// Add CSS classes for scroll animations
const style = document.createElement('style');
style.textContent = `
  .highlight-item,
  .profile-image-container,
  .intro-section {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
  }
  
  .highlight-item.animate-in,
  .profile-image-container.animate-in,
  .intro-section.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  .highlight-item:nth-child(1).animate-in { transition-delay: 0.1s; }
  .highlight-item:nth-child(2).animate-in { transition-delay: 0.2s; }
  .highlight-item:nth-child(3).animate-in { transition-delay: 0.3s; }
`;
document.head.appendChild(style);
