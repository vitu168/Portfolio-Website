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
  const sections = ['home', 'about', 'skills', 'projects', 'contact'];
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

// Theme Toggle
const toggleButton = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const navbar = document.querySelector('.navbar');

function updateThemeIcon(isDark) {
  sunIcon.classList.toggle('hidden', isDark);
  moonIcon.classList.toggle('hidden', !isDark);
}

function updateNavbarTheme(isDark) {
  gsap.to(navbar, {
    backgroundColor: isDark ? '#1e293b' : '#ffffff',
    color: isDark ? '#e0f2fe' : '#1e3a8a',
    duration: 0.3,
    ease: 'power2.inOut'
  });
}

toggleButton.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('dark');
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeIcon(isDark);
  updateNavbarTheme(isDark);
  updateActiveLink();
  gsap.to(toggleButton, { rotation: 360, duration: 0.5, ease: 'power2.out' });
});

// Initialize theme
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  document.body.classList.add('dark');
  updateThemeIcon(true);
  updateNavbarTheme(true);
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
    gsap.to('.contact-container', {
      opacity: 0.5,
      duration: 0.5,
      onComplete: () => {
        alert('Message sent! (Logged to console)');
        contactForm.reset();
        gsap.to('.contact-container', { opacity: 1, duration: 0.5 });
      }
    });
  }
});