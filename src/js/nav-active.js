// Persistent navigation active state (independent, safe, last-loaded)
(function(){
  document.addEventListener('DOMContentLoaded', () => {
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
