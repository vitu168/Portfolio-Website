// Animated Profile JavaScript
class AnimatedProfile {
  constructor() {
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.addHoverEffects();
  }

  // Intersection Observer for triggering animations when section comes into view
  setupIntersectionObserver() {
    const profileSection = document.querySelector('.profile-section');
    
    if (!profileSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateStats();
          this.triggerProfileAnimation();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });

    observer.observe(profileSection);
  }

  // Animate counting numbers for stats
  animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    statNumbers.forEach((stat, index) => {
      const finalCount = parseInt(stat.dataset.count);
      const duration = 2000; // 2 seconds
      const increment = finalCount / (duration / 16); // 60fps
      let currentCount = 0;
      
      // Add delay for staggered effect
      setTimeout(() => {
        const counter = setInterval(() => {
          currentCount += increment;
          
          if (currentCount >= finalCount) {
            stat.textContent = finalCount;
            clearInterval(counter);
            
            // Add completion animation
            stat.style.animation = 'pulse-glow 0.5s ease-in-out';
            setTimeout(() => {
              stat.style.animation = '';
            }, 500);
          } else {
            stat.textContent = Math.floor(currentCount);
          }
        }, 16);
      }, index * 200); // Stagger by 200ms
    });
  }

  // Trigger profile image and orbit animations
  triggerProfileAnimation() {
    const profileContainer = document.querySelector('.profile-image-container');
    const orbits = document.querySelectorAll('.circle-orbit');
    const staticCircles = document.querySelectorAll('.static-circle');
    const profileImage = document.querySelector('.profile-image-modern');
    
    // Add entrance animation to profile image
    if (profileImage) {
      profileImage.style.opacity = '0';
      profileImage.style.transform = 'scale(0.8)';
      
      setTimeout(() => {
        profileImage.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        profileImage.style.opacity = '1';
        profileImage.style.transform = 'scale(1)';
      }, 300);
    }

    // Animate orbits entrance
    orbits.forEach((orbit, index) => {
      orbit.style.opacity = '0';
      orbit.style.transform = 'translate(-50%, -50%) scale(0.5)';
      
      setTimeout(() => {
        orbit.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        orbit.style.opacity = '1';
        orbit.style.transform = 'translate(-50%, -50%) scale(1)';
      }, index * 150);
    });

    // Animate static circles
    staticCircles.forEach((circle, index) => {
      circle.style.opacity = '0';
      circle.style.transform = 'scale(0)';
      
      setTimeout(() => {
        circle.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        circle.style.opacity = '1';
        circle.style.transform = 'scale(1)';
      }, 800 + (index * 100));
    });
  }

  // Add interactive hover effects
  addHoverEffects() {
    const statItems = document.querySelectorAll('.stat-item');
    const profileImage = document.querySelector('.profile-image-modern');
    
    // Stats hover effects
    statItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        this.createHoverParticles(item);
      });
    });

    // Profile image hover effect
    if (profileImage) {
      profileImage.addEventListener('mouseenter', () => {
        this.pauseOrbits();
      });
      
      profileImage.addEventListener('mouseleave', () => {
        this.resumeOrbits();
      });
    }
  }

  // Create particle effect on stat hover
  createHoverParticles(element) {
    const rect = element.getBoundingClientRect();
    const particles = 5;
    
    for (let i = 0; i < particles; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, #3b82f6, #8b5cf6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        animation: particle-burst 0.6s ease-out forwards;
        animation-delay: ${i * 0.1}s;
      `;
      
      document.body.appendChild(particle);
      
      setTimeout(() => {
        document.body.removeChild(particle);
      }, 600);
    }
  }

  // Pause orbit animations on hover
  pauseOrbits() {
    const orbits = document.querySelectorAll('.circle-orbit');
    orbits.forEach(orbit => {
      orbit.style.animationPlayState = 'paused';
    });
  }

  // Resume orbit animations
  resumeOrbits() {
    const orbits = document.querySelectorAll('.circle-orbit');
    orbits.forEach(orbit => {
      orbit.style.animationPlayState = 'running';
    });
  }
}

// Particle burst animation
const style = document.createElement('style');
style.textContent = `
  @keyframes particle-burst {
    0% {
      opacity: 1;
      transform: translate(0, 0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0);
    }
  }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new AnimatedProfile();
});

// Handle window resize
window.addEventListener('resize', () => {
  // Recalculate positions if needed
  const profileContainer = document.querySelector('.profile-image-container');
  if (profileContainer) {
    // Add any resize handling logic here
  }
});
