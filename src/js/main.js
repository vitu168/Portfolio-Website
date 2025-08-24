// GSAP Animations
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Typing animation for hero section
  const animatedText = document.getElementById('animated-text');
  const textContent = 'Flutter Developer & UX/UI Designer';
  animatedText.textContent = '';
  gsap.to(animatedText, {
    text: { value: textContent, speed: 0.1 },
    duration: textContent.length * 0.05,
    ease: 'none',
    onStart: () => animatedText.classList.add('typing-cursor'),
    onComplete: () => animatedText.classList.add('typing-cursor')
  });

  // Hero buttons animation
  gsap.from('.btn-primary, .btn-secondary', {
    y: 20,
    opacity: 0,
    duration: 0.8,  
    delay: 0.5,
    stagger: 0.2,
    ease: 'power3.out'
  });

  // About section animation
  gsap.from('.profile-image', {
    scrollTrigger: { trigger: '#about', start: 'top 80%', toggleActions: 'play none none reset' },
    opacity: 0,
    scale: 0.9,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.to('.profile-text', {
    scrollTrigger: { trigger: '#about', start: 'top 80%', toggleActions: 'play none none reset' },
    opacity: 1,
    duration: 1.5,
    delay: 0.5,
    ease: 'power3.out'
  });

  // Skills section animation
  gsap.from('.skill-card', {
    scrollTrigger: { trigger: '#skills', start: 'top 80%', toggleActions: 'play none none reset' },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
  });

  // Projects section animation
  gsap.from('.project-card', {
    scrollTrigger: { trigger: '#projects', start: 'top 80%', toggleActions: 'play none none reset' },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
  });

  // Contact section animation
  gsap.from('.contact-container', {
    scrollTrigger: { trigger: '#contact', start: 'top 80%', toggleActions: 'play none none reset' },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });

  // Footer animation
  gsap.from('.footer-column', {
    scrollTrigger: { trigger: '.footer-bg', start: 'top 80%', toggleActions: 'play none none reset' },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
  });

  updateActiveLink();
});

// Navigation link handling
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      gsap.to(link, {
        scale: 1.1,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out'
      });
      updateActiveLink(targetId);
    }
  });
});

// Update active link on scroll
function updateActiveLink(targetId) {
  const sections = ['home', 'skills', 'projects', 'knowledges', 'contact'];
  const currentSection = targetId || sections.find(section => {
    const element = document.getElementById(section);
    if (element) {
      const rect = element.getBoundingClientRect();
      return rect.top <= 100 && rect.bottom >= 100;
    }
    return false;
  }) || 'home';

  navLinks.forEach(link => {
    const href = link.getAttribute('href').substring(1);
    const isActive = currentSection === href;
    link.classList.toggle('active', isActive);
    gsap.to(link, {
      color: isActive
        ? (document.body.classList.contains('dark') ? '#60a5fa' : '#3b82f6')
        : (document.body.classList.contains('dark') ? '#e0f2fe' : '#1e3a8a'),
      duration: 0.25,
      ease: 'power2.inOut'
    });
  });
}

window.addEventListener('scroll', () => updateActiveLink());

// Initialize Theme Manager with multiple fallbacks
let themeManager;

// Try to initialize as early as possible
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initThemeManager();
  });
} else {
  // DOM is already loaded
  initThemeManager();
}

function initThemeManager() {
  try {
    themeManager = new ThemeManager();
    console.log('ThemeManager initialized successfully');
  } catch (error) {
    console.error('Failed to initialize ThemeManager:', error);
    // Retry after a short delay
    setTimeout(() => {
      try {
        themeManager = new ThemeManager();
        console.log('ThemeManager initialized on retry');
      } catch (retryError) {
        console.error('ThemeManager retry failed:', retryError);
      }
    }, 100);
  }
}

// Form Submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  let isValid = true;

  nameError.classList.add('hidden');
  emailError.classList.add('hidden');
  messageError.classList.add('hidden');

  if (name.length < 2) {
    nameError.textContent = 'Name must be at least 2 characters long';
    nameError.classList.remove('hidden');
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    emailError.textContent = 'Please enter a valid email address';
    emailError.classList.remove('hidden');
    isValid = false;
  }

  if (message.length < 10) {
    messageError.textContent = 'Message must be at least 10 characters long';
    messageError.classList.remove('hidden');
    isValid = false;
  }

  if (isValid) {
    console.log('Form submitted:', { name, email, message });
    gsap.to('.contact-card', {
      opacity: 0.5,
      duration: 0.5,
      onComplete: () => {
        alert('Message sent! (Logged to console)');
        contactForm.reset();
        gsap.to('.contact-card', { opacity: 1, duration: 0.5 });
      }
    });
  }
});

// Filter System for Skills and Projects
class FilterSystem {
    constructor() {
        console.log('FilterSystem initialized');
        this.initSkillsFilter();
        this.initProjectsFilter();
    }

    initSkillsFilter() {
        const skillsFilterBtns = document.querySelectorAll('.skills-filter .filter-btn');
        const skillCards = document.querySelectorAll('.skill-card');
        
        console.log('Skills filter buttons found:', skillsFilterBtns.length);
        console.log('Skill cards found:', skillCards.length);

        skillsFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                console.log('Skills filter clicked:', btn.getAttribute('data-category'));
                
                // Remove active class from all buttons
                skillsFilterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const category = btn.getAttribute('data-category');
                this.filterItems(skillCards, category, 'skills');
            });
        });
    }

    initProjectsFilter() {
        const projectsFilterBtns = document.querySelectorAll('.projects-filter .filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        console.log('Projects filter buttons found:', projectsFilterBtns.length);
        console.log('Project cards found:', projectCards.length);

        projectsFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                console.log('Projects filter clicked:', btn.getAttribute('data-category'));
                
                // Remove active class from all buttons
                projectsFilterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const category = btn.getAttribute('data-category');
                this.filterItems(projectCards, category, 'projects');
            });
        });
    }

    filterItems(items, category, type = '') {
        console.log(`Filtering ${type} items for category:`, category);
        
        items.forEach((item, index) => {
            const itemCategory = item.getAttribute('data-category');
            console.log(`${type} item ${index}: category="${itemCategory}", target="${category}"`);
            
            if (category === 'all' || itemCategory === category) {
                item.classList.remove('hide');
                item.classList.add('show');
                item.style.display = 'block';
                
                // Animate in with GSAP if available
                if (typeof gsap !== 'undefined') {
                    gsap.set(item, { opacity: 0, scale: 0.8, y: 20 });
                    gsap.to(item, {
                        duration: 0.5,
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        ease: "back.out(1.7)",
                        delay: index * 0.1
                    });
                } else {
                    // Fallback animation without GSAP
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1) translateY(0)';
                }
            } else {
                item.classList.remove('show');
                item.classList.add('hide');
                
                // Animate out with GSAP if available
                if (typeof gsap !== 'undefined') {
                    gsap.to(item, {
                        duration: 0.3,
                        opacity: 0,
                        scale: 0.8,
                        y: 20,
                        ease: "power2.in",
                        onComplete: () => {
                            item.style.display = 'none';
                        }
                    });
                } else {
                    // Fallback animation without GSAP
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8) translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    }
}

// Initialize filter system when DOM loads
// NOTE: Using new FilterManager instead of legacy FilterSystem
// document.addEventListener('DOMContentLoaded', () => {
//     // Small delay to ensure all elements are rendered
//     setTimeout(() => {
//         new FilterSystem();
//     }, 100);
// });