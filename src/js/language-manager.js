// Language Manager for Portfolio
class LanguageManager {
  constructor() {
    this.currentLanguage = localStorage.getItem('portfolio-language') || 'en';
    this.translations = {
      en: {
        // Navigation
        nav: {
          home: 'Home',
          skills: 'Skills',
          projects: 'Projects',
          knowledges: 'Knowledges',
          contact: 'Contact'
        },
        
        // Home/About Section
        home: {
          greeting: 'Hi, I\'m',
          name: 'Cambo-TU',
          roles: [
            'Flutter Developer',
            'UI/UX Designer', 
            'Mobile App Creator',
            'Digital Innovator',
            'Cross-Platform Expert'
          ],
          description: "I'm a passionate Flutter Developer and UX/UI Designer dedicated to creating seamless mobile applications and visually captivating interfaces. With expertise in Flutter, Dart, and design tools like Figma, I craft cross-platform apps that prioritize performance and user experience. My design philosophy centers on creating intuitive, user-friendly experiences that leave a lasting impression.",
          yearsExperience: 'Years Experience',
          projectsCompleted: 'Projects Completed',
          happyClients: 'Happy Clients',
          highlights: {
            crossPlatform: 'Cross-Platform Apps',
            crossPlatformDesc: 'Cross-platform Flutter apps with native performance',
            uiDesign: 'UI/UX Design',
            uiDesignDesc: 'Beautiful interfaces with modern design principles',
            performance: 'Performance',
            performanceDesc: 'Optimized code for smooth user experiences'
          },
          cta: {
            viewProjects: 'View My Projects',
            getInTouch: 'Get In Touch'
          }
        },

        // Skills Section
        skills: {
          title: 'My Skills',
          subtitle: 'Technologies I work with',
          categories: {
            all: 'All',
            mobile: 'Mobile',
            design: 'Design',
            backend: 'Backend'
          },
          skillsList: {
            flutter: {
              title: 'Flutter',
              description: 'Building high-performance cross-platform apps'
            },
            figma: {
              title: 'Figma',
              description: 'Creating stunning UI/UX designs'
            },
            apiIntegration: {
              title: 'API Integration',
              description: 'RESTful APIs and backend connectivity'
            }
          },
          levels: {
            expert: 'Expert',
            advanced: 'Advanced',
            intermediate: 'Intermediate'
          }
        },

        // Projects Section
        projects: {
          title: 'My Projects',
          categories: {
            all: 'All Projects',
            mobile: 'Mobile Apps',
            web: 'Web Projects',
            design: 'UI/UX Design'
          },
          projectsList: {
            noteApp: {
              title: 'Note-Taking App',
              description: 'A cross-platform note-taking app built with Flutter and API backend integration, featuring seamless data syncing and a sleek UI.'
            },
            groceryApp: {
              title: 'Grocery Delivery App',
              description: 'On-demand grocery delivery application with real-time tracking and payment integration.'
            },
            kidsApp: {
              title: 'Educational Kids App',
              description: 'Interactive learning app for children with engaging games and educational content.'
            },
            portfolio: {
              title: 'Portfolio Website',
              description: 'Personal portfolio website showcasing projects and skills with modern design.'
            },
            uiDesign: {
              title: 'UI Design Concepts',
              description: 'Collection of modern UI/UX design concepts and prototypes.'
            },
            expenseTracker: {
              title: 'Personal Expense Tracker',
              description: 'Mobile app for tracking personal expenses with charts and analytics.'
            }
          },
          buttons: {
            viewDetails: 'View Details',
            liveDemo: 'Live Demo',
            sourceCode: 'Source Code',
            viewDesigns: 'View Designs',
            figmaFile: 'Figma File',
            tryDemo: 'Try Demo',
            github: 'GitHub'
          }
        },

        // Contact Section
        contact: {
          title: 'Get in Touch',
          subtitle: "Let's create something amazing together. I'm always excited to work on new projects and collaborate with creative people.",
          infoTitle: "Let's Connect",
          infoSubtitle: "Ready to bring your ideas to life? Reach out and let's start the conversation.",
          emailTitle: 'Email Me',
          phoneTitle: 'Call Me',
          locationTitle: 'Location',
          locationText: 'Phnom Penh, Cambodia',
          responseTitle: 'Response Time',
          responseText: 'Within 24 hours',
          formTitle: 'Send Message',
          formSubtitle: "Fill out the form and I'll get back to you as soon as possible.",
          form: {
            nameLabel: 'Your Name',
            namePlaceholder: 'Enter your full name',
            emailLabel: 'Email Address', 
            emailPlaceholder: 'your@email.com',
            subjectLabel: 'Subject',
            subjectPlaceholder: "What's this about?",
            messageLabel: 'Message',
            messagePlaceholder: 'Tell me about your project, ideas, or how I can help you...',
            submitText: 'Send Message',
            sendMessage: 'Send me a message',
            responseTime: 'I\'ll get back to you within 24 hours',
            name: 'Name',
            email: 'Email',
            message: 'Message',
            sendButton: 'Send Message',
            sending: 'Sending...',
            messageSent: 'Message Sent!',
            errors: {
              nameRequired: 'Please enter your name',
              nameMinLength: 'Name must be at least 2 characters',
              emailRequired: 'Please enter your email',
              emailInvalid: 'Please enter a valid email address',
              subjectRequired: 'Please enter a subject',
              subjectMinLength: 'Subject must be at least 3 characters',
              messageRequired: 'Please enter your message',
              messageMinLength: 'Message must be at least 10 characters'
            }
          },
          emailOptions: {
            title: 'Message Ready to Send!',
            description: 'Your message has been prepared and copied to clipboard. Choose how to send:',
            openEmailApp: 'Open Email App',
            openEmailAppDesc: 'Opens your default email application',
            copyAgain: 'Copy Email Again',
            copyAgainDesc: 'Copy the email content to paste in any email app',
            openGmail: 'Open Gmail',
            openGmailDesc: 'Send directly via Gmail web interface',
            emailCopied: 'Email content copied to clipboard!'
          }
        },

        // Footer
        footer: {
          quickLinks: 'Quick Links',
          contactInfo: 'Contact Info',
          followMe: 'Follow Me',
          email: 'langvithu081@gmail.com',
          phone: '081578115',
          location: 'Phnom Penh, Cambodia',
          copyright: '© 2025 Cambo-TU | Designed with ❤️ by Lang Vithu'
        },

        // Notifications
        notifications: {
          messagePrepared: 'Message prepared! Check the popup to send your email.',
          themeChanged: 'Theme changed successfully!',
          languageChanged: 'Language changed to English'
        },

        // Theme
        theme: {
          light: 'Light',
          dark: 'Dark',
          auto: 'Auto'
        }
      },

      km: {
        // Navigation
        nav: {
          home: 'ទំព័រដើម',
          skills: 'ជំនាញ',
          projects: 'គម្រោង',
          knowledges: 'ចំណេះដឹង',
          contact: 'ទំនាក់ទំនង'
        },
        
        // Home/About Section
        home: {
          greeting: 'សួស្តី ខ្ញុំឈ្មោះ',
          name: 'Cambo-TU',
          roles: [
            'អ្នកអភិវឌ្ឍន៍ Flutter',
            'អ្នករចនា UI/UX', 
            'អ្នកបង្កើតកម្មវិធីទូរស័ព្ទ',
            'អ្នកច្នៃប្រឌិតឌីជីថល',
            'អ្នកជំនាញ Cross-Platform'
          ],
          description: "ខ្ញុំជាអ្នកអភិវឌ្ឍន៍ Flutter និងអ្នករចនា UX/UI ដែលមានចំណង់ចំណូលចិត្តក្នុងការបង្កើតកម្មវិធីទូរស័ព្ទដែលមានភាពរលូន និងចំណុចប្រទាក់ដ៏ស្រស់ស្អាត។ ជាមួយនឹងជំនាញក្នុង Flutter, Dart, និងឧបករណ៍រចនាដូចជា Figma ខ្ញុំបង្កើតកម្មវិធី cross-platform ដែលផ្តោតលើកមិ្មវិធី និងបទពិសោធន៍អ្នកប្រើប្រាស់។ ទស្សនវិស័យរចនារបស់ខ្ញុំផ្តោតលើការបង្កើតបទពិសោធន៍ងាយស្រួលប្រើ និងមិត្តភាពដែលបន្សល់ភាពចាំជាយូរអង្វែង។",
          yearsExperience: 'ឆ្នាំបទពិសោធន៍',
          projectsCompleted: 'គម្រោងបានបញ្ចប់',
          happyClients: 'អតិថិជនពេញចិត្ត',
          highlights: {
            crossPlatform: 'កម្មវិធី Cross-Platform',
            crossPlatformDesc: 'កម្មវិធី Flutter cross-platform ជាមួយនឹងកមិ្មវិធីដូច native',
            uiDesign: 'រចនា UI/UX',
            uiDesignDesc: 'ចំណុចប្រទាក់ស្រស់ស្អាតជាមួយនឹងគោលការណ៍រចនាទំនើប',
            performance: 'កមិ្មវិធី',
            performanceDesc: 'កូដដែលបានធ្វើឱ្យប្រសើរសម្រាប់បទពិសោធន៍អ្នកប្រើប្រាស់រលូន'
          },
          cta: {
            viewProjects: 'មើលគម្រោងរបស់ខ្ញុំ',
            getInTouch: 'ទាក់ទងមកខ្ញុំ'
          }
        },

        // Skills Section
        skills: {
          title: 'ជំនាញរបស់ខ្ញុំ',
          subtitle: 'បច្ចេកវិទ្យាដែលខ្ញុំធ្វើការជាមួយ',
          categories: {
            all: 'ទាំងអស់',
            mobile: 'ទូរស័ព្ទ',
            design: 'រចនា',
            backend: 'Backend'
          },
          skillsList: {
            flutter: {
              title: 'Flutter',
              description: 'បង្កើតកម្មវិធី cross-platform ដែលមានកមិ្មវិធីខ្ពស់'
            },
            figma: {
              title: 'Figma',
              description: 'បង្កើតការរចនា UI/UX ដ៏ស្រស់ស្អាត'
            },
            apiIntegration: {
              title: 'API Integration',
              description: 'RESTful APIs និងការតភ្ជាប់ backend'
            }
          },
          levels: {
            expert: 'ជំនាញខ្ពស់',
            advanced: 'កម្រិតខ្ពស់',
            intermediate: 'កម្រិតមធ្យម'
          }
        },

        // Projects Section
        projects: {
          title: 'គម្រោងរបស់ខ្ញុំ',
          categories: {
            all: 'គម្រោងទាំងអស់',
            mobile: 'កម្មវិធីទូរស័ព្ទ',
            web: 'គម្រោងវេបសាយ',
            design: 'រចនា UI/UX'
          },
          projectsList: {
            noteApp: {
              title: 'កម្មវិធីកត់ចំណាំ',
              description: 'កម្មវិធីកត់ចំណាំ cross-platform ដែលបង្កើតដោយ Flutter និងការតភ្ជាប់ API backend ដែលមានលក្ខណៈពិសេសនៃការធ្វើសមកាលកម្មទិន្នន័យដោយរលូន និង UI ទាន់សម័យ។'
            },
            groceryApp: {
              title: 'កម្មវិធីដឹកជញ្ជូនទំនិញ',
              description: 'កម្មវិធីដឹកជញ្ជូនទំនិញតាមតម្រូវការជាមួយនឹងការតាមដានពេលវេលាជាក់ស្តែង និងការរួមបញ្ចូលការទូទាត់។'
            },
            kidsApp: {
              title: 'កម្មវិធីអប់រំកុមារ',
              description: 'កម្មវិធីរៀនសម្រាប់កុមារដោយអន្តរកម្មជាមួយនឹងហ្គេម និងមាតិកាអប់រំគួរឱ្យចាប់អារម្មណ៍។'
            },
            portfolio: {
              title: 'វេបសាយ Portfolio',
              description: 'វេបសាយ portfolio ផ្ទាល់ខ្លួនដែលបង្ហាញគម្រោង និងជំនាញជាមួយនឹងការរចនាទំនើប។'
            },
            uiDesign: {
              title: 'គំនិតរចនា UI',
              description: 'បណ្តុំនៃគំនិតរចនា UI/UX ទំនើប និង prototypes។'
            },
            expenseTracker: {
              title: 'កម្មវិធីតាមដានការចំណាយ',
              description: 'កម្មវិធីទូរស័ព្ទសម្រាប់តាមដានការចំណាយផ្ទាល់ខ្លួនជាមួយនឹងតារាង និងការវិភាគ។'
            }
          },
          buttons: {
            viewDetails: 'មើលលម្អិត',
            liveDemo: 'Demo ផ្ទាល់',
            sourceCode: 'កូដប្រភព',
            viewDesigns: 'មើលការរចនា',
            figmaFile: 'ឯកសារ Figma',
            tryDemo: 'សាកល្បង Demo',
            github: 'GitHub'
          }
        },

        // Contact Section
        contact: {
          title: 'ទាក់ទងមកខ្ញុំ',
          subtitle: 'តោះបង្កើតអ្វីដ៏អស្ចារ្យជាមួយគ្នា។ ខ្ញុំតែងតែរំភើបចិត្តក្នុងការធ្វើការលើគម្រោងថ្មី និងសហការជាមួយមនុស្សច្នៃប្រឌិត។',
          infoTitle: 'តោះភ្ជាប់ទំនាក់ទំនង',
          infoSubtitle: 'ពិតជាត្រៀមរៀបចំនាំមកជីវិតគំនិតរបស់អ្នកហើយឬ? ទាក់ទងមក ហើយតោះចាប់ផ្តើមការសន្ទនា។',
          emailTitle: 'ផ្ញើអ៊ីមែលមកខ្ញុំ',
          phoneTitle: 'ហៅទូរសព្ទមកខ្ញុំ',
          locationTitle: 'ទីតាំង',
          locationText: 'ភ្នំពេញ, កម្ពុជា',
          responseTitle: 'ពេលវេលាឆ្លើយតប',
          responseText: 'ក្នុងរយៈពេល ២៤ ម៉ោង',
          formTitle: 'ផ្ញើសារ',
          formSubtitle: 'បំពេញបែបបទ ហើយខ្ញុំនឹងឆ្លើយតបដល់អ្នកឱ្យបានឆាប់បំផុត។',
          form: {
            nameLabel: 'ឈ្មោះរបស់អ្នក',
            namePlaceholder: 'បញ្ចូលឈ្មោះពេញរបស់អ្នក',
            emailLabel: 'អាសយដ្ឋានអ៊ីមែល',
            emailPlaceholder: 'your@email.com',
            subjectLabel: 'ប្រធានបទ',
            subjectPlaceholder: 'នេះអំពីអ្វី?',
            messageLabel: 'សារ',
            messagePlaceholder: 'ប្រាប់ខ្ញុំអំពីគម្រោង គំនិត ឬរបៀបដែលខ្ញុំអាចជួយអ្នក...',
            submitText: 'ផ្ញើសារ',
            sendMessage: 'ផ្ញើសារមកខ្ញុំ',
            responseTime: 'ខ្ញុំនឹងឆ្លើយតបក្នុងរយៈពេល 24 ម៉ោង',
            name: 'ឈ្មោះ',
            email: 'អ៊ីមែល',
            message: 'សារ',
            sendButton: 'ផ្ញើសារ',
            sending: 'កំពុងផ្ញើ...',
            messageSent: 'សារបានផ្ញើ!',
            errors: {
              nameRequired: 'សូមបញ្ចូលឈ្មោះរបស់អ្នក',
              nameMinLength: 'ឈ្មោះត្រូវមានយ៉ាងហោចណាស់ 2 តួអក្សរ',
              emailRequired: 'សូមបញ្ចូលអ៊ីមែលរបស់អ្នក',
              emailInvalid: 'សូមបញ្ចូលអាសយដ្ឋានអ៊ីមែលត្រឹមត្រូវ',
              subjectRequired: 'សូមបញ្ចូលប្រធានបទ',
              subjectMinLength: 'ប្រធានបទត្រូវមានយ៉ាងហោចណាស់ 3 តួអក្សរ',
              messageRequired: 'សូមបញ្ចូលសាររបស់អ្នក',
              messageMinLength: 'សារត្រូវមានយ៉ាងហោចណាស់ 10 តួអក្សរ'
            }
          },
          emailOptions: {
            title: 'សារត្រៀមរួចហើយ!',
            description: 'សាររបស់អ្នកត្រូវបានរៀបចំ និងចម្លងទៅ clipboard ហើយ។ ជ្រើសរើសរបៀបផ្ញើ:',
            openEmailApp: 'បើកកម្មវិធីអ៊ីមែល',
            openEmailAppDesc: 'បើកកម្មវិធីអ៊ីមែលលំនាំដើមរបស់អ្នក',
            copyAgain: 'ចម្លងអ៊ីមែលម្តងទៀត',
            copyAgainDesc: 'ចម្លងមាតិកាអ៊ីមែលដើម្បីបិទភ្ជាប់ក្នុងកម្មវិធីអ៊ីមែលណាមួយ',
            openGmail: 'បើក Gmail',
            openGmailDesc: 'ផ្ញើដោយផ្ទាល់តាមរយៈចំណុចប្រទាក់វេប Gmail',
            emailCopied: 'មាតិកាអ៊ីមែលត្រូវបានចម្លងទៅ clipboard!'
          }
        },

        // Footer
        footer: {
          quickLinks: 'តំណភ្ជាប់រហ័ស',
          contactInfo: 'ព័ត៌មានទំនាក់ទំនង',
          followMe: 'តាមដានខ្ញុំ',
          email: 'langvithu081@gmail.com',
          phone: '081578115',
          location: 'ភ្នំពេញ, កម្ពុជា',
          copyright: '© ២០២៥ Cambo-TU | រចនាដោយ ❤️ ដោយ Lang Vithu'
        },

        // Notifications
        notifications: {
          messagePrepared: 'សារត្រៀមរួចហើយ! ពិនិត្យ popup ដើម្បីផ្ញើអ៊ីមែលរបស់អ្នក។',
          themeChanged: 'ធីមបានប្តូរដោយជោគជ័យ!',
          languageChanged: 'ភាសាបានប្តូរទៅជាភាសាខ្មែរ'
        },

        // Theme
        theme: {
          light: 'ភ្លឺ',
          dark: 'ងងឹត',
          auto: 'ស្វ័យប្រវត្តិ'
        }
      }
    };
    
    this.init();
  }
  
  init() {
    if (this._initialized) {
      // Rebind only (e.g., after DOM moves)
      this.setupDropdownEvents();
      return;
    }
    this.createLanguageSwitcher();
    this.applyLanguage(this.currentLanguage);
    this.setupLanguageListeners();
    this._initialized = true;
  }
  
  createLanguageSwitcher() {
    // If one already exists anywhere, just reuse it
    if (document.querySelector('.language-switcher')) {
      return; // assume already in DOM (maybe moved to mobile)
    }
    // Find the theme switcher container to add language switcher next to it
    const themeContainer = document.querySelector('.nav-right');
    if (!themeContainer) return;
    
    const languageSwitcher = document.createElement('div');
    languageSwitcher.className = 'language-switcher';
    
    const currentLang = this.currentLanguage;
    const langData = {
      en: { flag: '🇺🇸', name: 'English' },
      km: { flag: '🇰🇭', name: 'ខ្មែរ' }
    };
    
    languageSwitcher.innerHTML = `
      <div class="language-dropdown">
        <button class="language-trigger" id="language-trigger">
          <div class="current-lang">
            <span class="flag">${langData[currentLang].flag}</span>
            <span class="lang-text">${langData[currentLang].name}</span>
          </div>
          <svg class="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div class="language-dropdown-menu" id="language-dropdown-menu">
          <button class="language-option ${currentLang === 'en' ? 'active' : ''}" data-lang="en">
            <span class="flag">${langData.en.flag}</span>
            <span class="lang-name">English</span>
          </button>
          <button class="language-option ${currentLang === 'km' ? 'active' : ''}" data-lang="km">
            <span class="flag">${langData.km.flag}</span>
            <span class="lang-name">ខ្មែរ</span>
          </button>
        </div>
      </div>
    `;
    
    // Insert before theme switcher
    const themeSwitcher = themeContainer.querySelector('.theme-switcher');
    if (themeSwitcher) {
      themeContainer.insertBefore(languageSwitcher, themeSwitcher);
    } else {
      themeContainer.appendChild(languageSwitcher);
    }
    
    // Setup dropdown functionality
    this.setupDropdownEvents();
  }
  
  setupDropdownEvents() {
    // Remove any previous listeners by cloning (safe idempotent rebind)
    const oldTrigger = document.getElementById('language-trigger');
    const oldMenu = document.getElementById('language-dropdown-menu');
    if (!oldTrigger || !oldMenu) return;

    // If we previously attached a sentinel property, replace nodes to drop old listeners
    if (oldTrigger._langBound) {
      const newTrigger = oldTrigger.cloneNode(true);
      oldTrigger.parentNode.replaceChild(newTrigger, oldTrigger);
    }
    if (oldMenu._langBound) {
      const newMenu = oldMenu.cloneNode(true);
      oldMenu.parentNode.replaceChild(newMenu, oldMenu);
    }

    const trigger = document.getElementById('language-trigger');
    const menu = document.getElementById('language-dropdown-menu');
    if (!trigger || !menu) return;

    const options = menu.querySelectorAll('.language-option');

    // Determine if we're in mobile menu panel and adjust positioning (show above)
    const inMobilePanel = !!trigger.closest('#mobile-menu-panel');
    if (inMobilePanel) {
      // Position above: set bottom offset instead of top
      menu.style.top = 'auto';
      menu.style.bottom = 'calc(100% + 0.375rem)';
      menu.style.transformOrigin = 'bottom center';
    } else {
      // Reset to default in desktop context (CSS controls it)
      menu.style.bottom = '';
      menu.style.top = '';
      menu.style.transformOrigin = '';
    }

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.contains('show');
      if (isOpen) {
        this.closeDropdown();
      } else {
        this.openDropdown();
      }
    });

    const outsideHandler = (e) => {
      if (!trigger.contains(e.target) && !menu.contains(e.target)) {
        this.closeDropdown();
        document.removeEventListener('click', outsideHandler, true);
      }
    };
    // Use capture to ensure it fires even inside mobile overlay
    document.addEventListener('click', outsideHandler, true);

    options.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const lang = option.dataset.lang;
        if (lang && lang !== this.currentLanguage) {
          this.changeLanguage(lang);
          this.updateDropdownDisplay(lang);
        }
        this.closeDropdown();
      });
    });

    // Mark bound so we can safely replace later
    trigger._langBound = true;
    menu._langBound = true;
  }
  
  openDropdown() {
    const trigger = document.getElementById('language-trigger');
    const menu = document.getElementById('language-dropdown-menu');
    
    if (trigger && menu) {
      // If in mobile, ensure the menu renders above without being cut off
      if (trigger.closest('#mobile-menu-panel')) {
        // Make sure panel has overflow visible for dropdown
        const panel = trigger.closest('#mobile-menu-panel');
        if (panel) panel.style.overflow = 'visible';
      }
      trigger.classList.add('active');
      menu.classList.add('show');
    }
  }
  
  closeDropdown() {
    const trigger = document.getElementById('language-trigger');
    const menu = document.getElementById('language-dropdown-menu');
    
    if (trigger && menu) {
      trigger.classList.remove('active');
      menu.classList.remove('show');
    }
  }
  
  updateDropdownDisplay(lang) {
    const langData = {
      en: { flag: '🇺🇸', name: 'English' },
      km: { flag: '🇰🇭', name: 'ខ្មែរ' }
    };
    
    // Update trigger display
    const trigger = document.getElementById('language-trigger');
    if (trigger) {
      const currentLang = trigger.querySelector('.current-lang');
      if (currentLang) {
        currentLang.innerHTML = `
          <span class="flag">${langData[lang].flag}</span>
          <span class="lang-text">${langData[lang].name}</span>
        `;
      }
    }
    
    // Update active states
    const options = document.querySelectorAll('.language-option');
    options.forEach(option => {
      if (option.dataset.lang === lang) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
  }
  
  setupLanguageListeners() {
    // Language switching is now handled in setupDropdownEvents
    // Keep this method for any additional language-related event setup
    console.log('Language listeners setup complete');
  }
  
  changeLanguage(lang) {
    if (lang === this.currentLanguage) return;
    
    this.currentLanguage = lang;
    localStorage.setItem('portfolio-language', lang);
    
    // Update dropdown states (handled by updateDropdownDisplay)
    this.updateDropdownDisplay(lang);
    
    // Apply translations
    this.applyLanguage(lang);
    
    // Show notification
    const message = lang === 'en' ? 
      this.translations.en.notifications.languageChanged : 
      this.translations.km.notifications.languageChanged;
    
    this.showLanguageNotification(message);
    
    // Update auto-typing animation with new language
    this.restartAutoTyping();
  }
  
  applyLanguage(lang) {
    const t = this.translations[lang];
    
    // Update navigation
    this.updateNavigation(t.nav);
    
    // Update home section
    this.updateHomeSection(t.home);
    
    // Update skills section
    this.updateSkillsSection(t.skills);
    
    // Update projects section
    this.updateProjectsSection(t.projects);
    
    // Update contact section
    this.updateContactSection(t.contact);
    
    // Update footer
    this.updateFooter(t.footer);
    
    // Update theme switcher
    this.updateThemeSwitcher(t.theme);
    
    // Update document language attribute
    document.documentElement.lang = lang;
  }
  
  updateNavigation(nav) {
    const map = {
      home: nav.home,
      skills: nav.skills,
      projects: nav.projects,
      knowledges: nav.knowledges
    };
    document.querySelectorAll('a.nav-link').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (!href.startsWith('#')) return;
      const id = href.slice(1);
      const text = map[id];
      if (text) {
        const span = a.querySelector('span');
        if (span) span.textContent = text;
      }
    });
  }
  
  updateHomeSection(home) {
    // Update greeting and name
    const greeting = document.querySelector('.intro-text h1');
    if (greeting) {
      greeting.innerHTML = `${home.greeting} <span class="name-highlight">${home.name}</span>`;
    }
    
    // Update description
    const description = document.getElementById('auto-typing-description');
    if (description) {
      description.textContent = home.description;
    }
    
    // Update stats
    const stats = document.querySelectorAll('.stat-label');
    const statLabels = [home.yearsExperience, home.projectsCompleted, home.happyClients];
    stats.forEach((stat, index) => {
      if (statLabels[index]) {
        stat.textContent = statLabels[index];
      }
    });
    
    // Update highlights
    const highlights = document.querySelectorAll('.highlight-item');
    const highlightData = [
      { title: home.highlights.crossPlatform, desc: home.highlights.crossPlatformDesc },
      { title: home.highlights.uiDesign, desc: home.highlights.uiDesignDesc },
      { title: home.highlights.performance, desc: home.highlights.performanceDesc }
    ];
    
    highlights.forEach((highlight, index) => {
      if (highlightData[index]) {
        const title = highlight.querySelector('h5');
        const desc = highlight.querySelector('p');
        if (title) title.textContent = highlightData[index].title;
        if (desc) desc.textContent = highlightData[index].desc;
      }
    });
    
    // Update CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary');
    const buttonTexts = [home.cta.viewProjects, home.cta.getInTouch];
    ctaButtons.forEach((btn, index) => {
      if (buttonTexts[index]) {
        const textSpan = btn.querySelector('span') || btn;
        textSpan.textContent = buttonTexts[index];
      }
    });
    
    // Store roles for auto-typing restart
    this.currentRoles = home.roles;
  }
  
  updateSkillsSection(skills) {
    // Update section title
    const skillsTitle = document.querySelector('#skills .section-title');
    if (skillsTitle) skillsTitle.textContent = skills.title;
    
    // Update skill cards if they exist
    const skillCards = document.querySelectorAll('.skill-card');
    // Note: Skill card content is mostly icons and progress bars, 
    // but we can update the levels (Expert, Advanced, etc.)
    const badges = document.querySelectorAll('.skill-card .badge');
    badges.forEach(badge => {
      const badgeText = badge.textContent.toLowerCase();
      if (badgeText.includes('expert') || badgeText === 'expert') {
        badge.textContent = skills.levels.expert;
      } else if (badgeText.includes('advanced') || badgeText === 'advanced') {
        badge.textContent = skills.levels.advanced;
      } else if (badgeText.includes('intermediate') || badgeText === 'intermediate') {
        badge.textContent = skills.levels.intermediate;
      }
    });
  }
  
  updateProjectsSection(projects) {
    // Update section title
    const projectsTitle = document.querySelector('#projects .section-title');
    if (projectsTitle) projectsTitle.textContent = projects.title;
    
    // Update project cards descriptions
    const projectCards = document.querySelectorAll('.project-card');
    const projectKeys = ['noteApp', 'groceryApp', 'kidsApp', 'portfolio', 'uiDesign', 'expenseTracker'];
    
    projectCards.forEach((card, index) => {
      if (projectKeys[index] && projects.projectsList[projectKeys[index]]) {
        const title = card.querySelector('.card-title');
        const description = card.querySelector('.card-content');
        
        if (title) title.textContent = projects.projectsList[projectKeys[index]].title;
        if (description) description.textContent = projects.projectsList[projectKeys[index]].description;
      }
    });
  }
  
  updateContactSection(contact) {
    // Update section title and subtitle
    const contactTitle = document.querySelector('#contact .section-title');
    const contactSubtitle = document.querySelector('#contact .section-title + p');
    
    if (contactTitle) contactTitle.textContent = contact.title;
    if (contactSubtitle) contactSubtitle.textContent = contact.subtitle;
    
    // Update form elements
    const formTitle = document.querySelector('.contact-title');
    const formSubtitle = document.querySelector('.contact-subtitle');
    
    if (formTitle) formTitle.textContent = contact.form.sendMessage;
    if (formSubtitle) formSubtitle.textContent = contact.form.responseTime;
    
    // Update form labels and placeholders
    const nameLabel = document.querySelector('label[for="name"]');
    const emailLabel = document.querySelector('label[for="email"]');
    const messageLabel = document.querySelector('label[for="message"]');
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    const submitBtn = document.querySelector('.contact-btn .btn-text');
    
    if (nameLabel) nameLabel.textContent = contact.form.name;
    if (emailLabel) emailLabel.textContent = contact.form.email;
    if (messageLabel) messageLabel.textContent = contact.form.message;
    
    if (nameInput) nameInput.placeholder = contact.form.namePlaceholder;
    if (emailInput) emailInput.placeholder = contact.form.emailPlaceholder;
    if (messageInput) messageInput.placeholder = contact.form.messagePlaceholder;
    
    if (submitBtn) submitBtn.textContent = contact.form.sendButton;
  }
  
  updateFooter(footer) {
    // Update all elements with data-translate attributes
    const footerElements = document.querySelectorAll('[data-translate^="footer."]');
    
    footerElements.forEach(element => {
      const key = element.getAttribute('data-translate');
      const translationKey = key.replace('footer.', '');
      
      if (footer[translationKey]) {
        element.textContent = footer[translationKey];
      }
    });
    
    // Update navigation links in footer (they use nav. prefix)
    const navElements = document.querySelectorAll('[data-translate^="nav."]');
    const t = this.translations[this.currentLanguage];
    
    navElements.forEach(element => {
      const key = element.getAttribute('data-translate');
      const translationKey = key.replace('nav.', '');
      
      if (t.nav && t.nav[translationKey]) {
        element.textContent = t.nav[translationKey];
      }
    });
  }
  
  updateThemeSwitcher(theme) {
    // Update theme button titles if they exist
    const themeButtons = document.querySelectorAll('.theme-btn');
    const themeLabels = [theme.light, theme.dark, theme.auto];
    
    themeButtons.forEach((btn, index) => {
      if (themeLabels[index]) {
        btn.title = themeLabels[index];
      }
    });
  }
  
  restartAutoTyping() {
    // Restart the auto-typing animation with new language
    if (window.autoTypingManager && this.currentRoles) {
      window.autoTypingManager.roles = this.currentRoles;
      // Reset the role typing
      const roleElement = document.getElementById('auto-typing-role');
      if (roleElement) {
        roleElement.textContent = '';
        window.autoTypingManager.currentRoleIndex = 0;
      }
    }
  }
  
  showLanguageNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification notification-success show';
    notification.innerHTML = `
      <div class="notification-content">
        <div class="notification-icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10m0 0V18a2 2 0 01-2 2H9a2 2 0 01-2-2V8m5 0V3"></path>
          </svg>
        </div>
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 3000);
  }
  
  // Get current language translations
  getCurrentTranslations() {
    return this.translations[this.currentLanguage];
  }
  
  // Get translated text by key path (e.g., 'home.greeting')
  t(keyPath) {
    const keys = keyPath.split('.');
    let value = this.translations[this.currentLanguage];
    
    for (const key of keys) {
      value = value?.[key];
    }
    
    return value || keyPath;
  }
}

// Initialize Language Manager
document.addEventListener('DOMContentLoaded', () => {
  window.languageManager = new LanguageManager();
});
