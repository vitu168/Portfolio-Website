// Persistent navigation active state (independent, safe, last-loaded)
(function(){
  document.addEventListener('DOMContentLoaded', () => {
    // ----- MOBILE MENU SETUP -----
    const toggleBtn = document.getElementById('mobile-nav-toggle');
    const panel = document.getElementById('mobile-menu-panel');
    const desktopLinksContainer = document.querySelector('.nav-links');
    const mobileLinksContainer = document.getElementById('mobile-menu-links');
  const mobileThemeButtonsContainer = document.getElementById('mobile-theme-buttons');
  const desktopLanguageSwitcher = document.querySelector('.language-switcher, .language-dropdown');
  let languageOriginalParent = null;

    if (toggleBtn && panel && desktopLinksContainer && mobileLinksContainer) {
      // Clone nav links (anchor elements) for mobile menu
      mobileLinksContainer.innerHTML = '';
      desktopLinksContainer.querySelectorAll('a.nav-link').forEach(a => {
        const clone = a.cloneNode(true);
        clone.addEventListener('click', () => {
          // Close after selection
          closeMobileMenu();
        });
        mobileLinksContainer.appendChild(clone);
      });

  // Clone theme buttons if available
      const desktopThemeBtns = document.querySelectorAll('.theme-btn');
      if (mobileThemeButtonsContainer && desktopThemeBtns.length) {
        mobileThemeButtonsContainer.innerHTML = '';
        desktopThemeBtns.forEach(btn => {
          const clone = btn.cloneNode(true);
          clone.addEventListener('click', () => {
            if (window.themeManager) {
              window.themeManager.applyTheme(clone.getAttribute('data-theme'));
            }
            // Sync active state afterwards
            setTimeout(() => {
              syncMobileThemeButtons();
            }, 10);
          });
          mobileThemeButtonsContainer.appendChild(clone);
        });
      }

      function syncMobileThemeButtons(){
        const current = window.themeManager?.currentTheme;
        if (!current) return;
        mobileThemeButtonsContainer?.querySelectorAll('.theme-btn').forEach(btn => {
          btn.classList.toggle('active', btn.getAttribute('data-theme') === current);
        });
      }

      function mountLanguageIntoMobile(){
        if (!desktopLanguageSwitcher) return;
        // Inline placement inside theme switcher row
        const themeRow = panel.querySelector('.mobile-theme-switcher');
        if (!themeRow) return;
        if (!themeRow.querySelector('.mobile-language-inline')) {
          languageOriginalParent = languageOriginalParent || desktopLanguageSwitcher.parentElement;
          const inline = document.createElement('div');
          inline.className = 'mobile-language-inline';
          inline.appendChild(desktopLanguageSwitcher);
          themeRow.appendChild(inline);
        }
      }
      function restoreLanguageToDesktop(){
        if (!desktopLanguageSwitcher || !languageOriginalParent) return;
        // Use tablet breakpoint (>=768px) to return switcher to desktop bar
        if (window.innerWidth >= 768 && languageOriginalParent && !languageOriginalParent.contains(desktopLanguageSwitcher)) {
          languageOriginalParent.appendChild(desktopLanguageSwitcher);
          const inline = panel.querySelector('.mobile-language-inline');
          if (inline) inline.remove();
          // Rebind dropdown events for desktop context so styles reset
          if (window.languageManager && typeof window.languageManager.setupDropdownEvents === 'function') {
            setTimeout(() => { try { window.languageManager.setupDropdownEvents(); } catch(_){} }, 0);
          }
        }
      }

      function openMobileMenu(){
  panel.classList.add('open');
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleBtn.querySelector('.icon-menu')?.classList.add('hidden');
        toggleBtn.querySelector('.icon-close')?.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
        syncMobileThemeButtons();
  mountLanguageIntoMobile();
        // Rebind dropdown events (lighter than full re-init)
        if (window.languageManager && typeof window.languageManager.setupDropdownEvents === 'function') {
          setTimeout(() => {
            try { window.languageManager.setupDropdownEvents(); } catch(e) { /* ignore */ }
          }, 50);
        }
      }
      function closeMobileMenu(){
        panel.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.querySelector('.icon-menu')?.classList.remove('hidden');
        toggleBtn.querySelector('.icon-close')?.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }
      function toggleMobileMenu(){
        panel.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
      }
      toggleBtn.addEventListener('click', toggleMobileMenu);
      window.addEventListener('resize', () => { 
        if (window.innerWidth >= 768) {
          // Close mobile panel if transitioning to tablet/desktop
            closeMobileMenu();
            restoreLanguageToDesktop();
        }
      });
      // On load (desktop) ensure language switcher in original spot
  if (window.innerWidth >= 768) restoreLanguageToDesktop();
      document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobileMenu(); });
      // Close when clicking outside
      document.addEventListener('click', e => {
        if (!panel.contains(e.target) && !toggleBtn.contains(e.target) && panel.classList.contains('open')) {
          closeMobileMenu();
        }
      });
    }
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    if (!navLinks.length) return;

    // Build section map from existing links (href beginning with #)
    const sectionEntries = navLinks
      .map(link => {
        const id = (link.getAttribute('href') || '').trim().replace(/^#/, '');
        const el = document.getElementById(id);
        return el ? { id, el, link } : null;
      })
      .filter(Boolean);

    let currentActive = null;
    function setActiveById(id){
      if (currentActive === id) return; // no change → no DOM churn → no flicker
      currentActive = id;
      sectionEntries.forEach(se => {
        se.link.classList.toggle('active', se.id === id);
      });
    }

    // Click handling (with offset for fixed navbar ~80px)
    let clickSuppressUntil = 0;
    navLinks.forEach(l => {
      l.addEventListener('click', e => {
        const hash = l.getAttribute('href');
        if (!hash || !hash.startsWith('#')) return;
        e.preventDefault();
        const id = hash.substring(1);
        const target = document.getElementById(id);
        if (target) {
          setActiveById(id);
          const top = target.getBoundingClientRect().top + window.scrollY - 80;
          clickSuppressUntil = Date.now() + 700; // suppress observer/scroll overrides during smooth scroll
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, { passive: false });
    });

    // IntersectionObserver for reliable active state while scrolling
    const observer = new IntersectionObserver((entries) => {
      let best = null;
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
        }
      }
  if (best && Date.now() > clickSuppressUntil) setActiveById(best.target.id);
    }, {
      root: null,
      threshold: buildThresholds(),
      rootMargin: '-40% 0px -40% 0px'
    });

    function buildThresholds(){
      const t = [];
      for (let i=0;i<=1;i+=0.1) t.push(i);
      return t;
    }

    sectionEntries.forEach(se => observer.observe(se.el));

    // Always-on scroll fallback (helps for very short last section)
    const scrollFallback = throttle(() => {
      if (Date.now() < clickSuppressUntil) return; // don't fight the click smooth scroll
      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;
      const docH = document.documentElement.scrollHeight;

      // If near bottom (within 120px), force last section active
      if (docH - (scrollY + viewportH) < 120) {
        setActiveById(sectionEntries[sectionEntries.length - 1].id);
        return;
      }

      // Otherwise pick section whose top is just above middle of viewport
      const mid = scrollY + viewportH / 2;
      let candidate = sectionEntries[0].id;
      for (const se of sectionEntries) {
        if (mid >= se.el.offsetTop - 160) candidate = se.id;
      }
      setActiveById(candidate);
    }, 120);

    window.addEventListener('scroll', scrollFallback, { passive: true });

    // Fallback scroll listener (in case observer unsupported)
    if (!('IntersectionObserver' in window)) {
      window.addEventListener('scroll', throttle(() => {
        const scrollMid = window.scrollY + window.innerHeight/2;
        let current = sectionEntries[0].id;
        sectionEntries.forEach(se => {
          const top = se.el.offsetTop;
            if (scrollMid >= top - 160) current = se.id;
        });
        setActiveById(current);
      }, 100));
    }

    // Initial state
    setTimeout(() => setActiveById('home'), 50);

    // Expose for manual testing
    window.forceNavActive = setActiveById;
  });

  // Simple throttle
  function throttle(fn, wait){
    let last = 0; let timer;
    return function(...args){
      const now = Date.now();
      if (now - last >= wait){
        last = now; fn.apply(this,args);
      } else if (!timer){
        timer = setTimeout(()=>{ last = Date.now(); timer = null; fn.apply(this,args); }, wait - (now-last));
      }
    };
  }
})();
