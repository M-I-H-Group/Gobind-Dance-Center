/**
 * Scroll Animations & Utilities
 */

/**
 * Initialize scroll reveal animations
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-item');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Unobserve after reveal (for single animation)
          if (!entry.target.classList.contains('stagger-item')) {
            revealObserver.unobserve(entry.target);
          }
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));

    // Stagger animation for children
    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach(container => {
      const items = container.querySelectorAll('.stagger-item');
      items.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
      });
    });
  } else {
    // Fallback for older browsers - show all
    reveals.forEach(el => el.classList.add('visible'));
  }
}

/**
 * rAF-throttled scroll handler — guarantees at most one update per
 * frame regardless of how many scroll events fire. Eliminates the
 * layout thrash that made long pages feel janky on scroll.
 */
function createRafScrollHandler(fn) {
  let ticking = false;
  let lastArgs = null;

  const update = () => {
    ticking = false;
    fn(lastArgs);
  };

  return function (...args) {
    lastArgs = args;
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  };
}

/**
 * Initialize parallax effect
 *
 * Two flavors, selected via `data-effect` on the .parallax-container:
 *   - "shift" (default) — translate the image vertically (parallax).
 *   - "zoom"            — keep the image pinned, scale it up smoothly
 *                         as the section scrolls through the viewport.
 */
function initParallax() {
  const parallaxContainers = document.querySelectorAll('.parallax-container');

  if (parallaxContainers.length === 0) return;

  const handleScroll = () => {
    parallaxContainers.forEach(container => {
      const img = container.querySelector('img');
      if (!img) return;

      const effect = container.dataset.effect || 'shift';
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;

      if (effect === 'zoom') {
        // Progress: 0 when the section is fully below the viewport,
        //           1 when it has fully scrolled past the top.
        // We also account for the section being inside the viewport so
        // the zoom is visible while the user is looking at it.
        const totalScroll = rect.height + vh;
        const traveled = vh - rect.top;
        const progress = Math.max(0, Math.min(1, traveled / totalScroll));

        // Ease the progress so the zoom feels natural — slow start,
        // noticeable in the middle, slow finish.
        const eased = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        const maxZoom = parseFloat(container.dataset.maxZoom) || 1.18;
        const scale = 1 + (maxZoom - 1) * eased;
        img.style.transform = `translate3d(0, 0, 0) scale(${scale})`;
      } else {
        // Classic vertical parallax translate.
        const center = rect.top + rect.height / 2 - vh / 2;
        const speed = parseFloat(container.dataset.speed) || 0.15;
        const offset = center * speed;
        img.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    });
  };

  window.addEventListener('scroll', createRafScrollHandler(handleScroll), { passive: true });
  handleScroll(); // Initial check
}

/**
 * Initialize count-up animation
 */
function initCountUp() {
  const countElements = document.querySelectorAll('.count-up');

  if ('IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target) || 0;
          const suffix = el.dataset.suffix || '';
          const duration = parseInt(el.dataset.duration) || 2000;

          animateCount(el, target, suffix, duration);
          countObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    countElements.forEach(el => countObserver.observe(el));
  }
}

/**
 * Animate count number
 * @param {HTMLElement} element - Element to animate
 * @param {number} target - Target number
 * @param {string} suffix - Suffix to add
 * @param {number} duration - Duration in ms
 */
function animateCount(element, target, suffix, duration) {
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  const stepDuration = duration / steps;

  const interval = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + suffix;
      clearInterval(interval);
    } else {
      element.textContent = Math.floor(current) + suffix;
    }
  }, stepDuration);
}

/**
 * Initialize text reveal animation
 */
function initTextReveal() {
  const textRevealElements = document.querySelectorAll('.text-reveal');

  if ('IntersectionObserver' in window) {
    const textObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.dataset.text || el.textContent;
          const words = text.split(' ');

          el.innerHTML = words.map((word, i) => `
            <span style="animation-delay: ${i * 0.04}s">${word}</span>
          `).join('');

          textObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    textRevealElements.forEach(el => textObserver.observe(el));
  }
}

/**
 * Initialize scroll to top button
 */
function initScrollToTop() {
  const scrollBtn = document.getElementById('scroll-to-top');

  if (!scrollBtn) {
    // Create the button if it doesn't exist
    const btn = document.createElement('button');
    btn.id = 'scroll-to-top';
    btn.className = 'scroll-to-top-btn';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    `;
    document.body.appendChild(btn);
  }

  const button = document.getElementById('scroll-to-top');
  if (!button) return;

  const handleScroll = () => {
    if (window.scrollY > 600) {
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', createRafScrollHandler(handleScroll), { passive: true });

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Initial check
  handleScroll();
}

/**
 * Initialize scroll-driven hero image reveal.
 *
 * On touch devices (no hover) and small screens, the hero image's
 * hover-state (morph + lift + glow) is replicated as a scroll-driven
 * animation instead of an auto-cycle:
 *
 *   - Scroll DOWN past the hero  → image opens as it enters the
 *                                  center of the viewport, then
 *                                  contracts once it scrolls past.
 *   - Scroll UP past the hero    → same behavior, mirrored.
 *
 * The "open zone" is the middle 60% of the viewport. When the
 * image's vertical center falls inside that zone, the wrapper
 * gets `.is-open`, which triggers the same styles as `:hover`.
 *
 * On large screens this is harmless — the hover handler still wins
 * for desktop users; the scroll handler just stays a no-op because
 * the wrapper isn't in the small-screen layout path.
 */
function initHeroImageScroll() {
  const wrappers = document.querySelectorAll('.hero-image-wrapper');
  if (wrappers.length === 0) return;

  // Skip on large screens with a real pointer — hover already works.
  // `hover: hover` matches laptops/desktops/TVs; everything else (touch
  // laptops, phones, tablets) gets the scroll-driven effect.
  const prefersHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isWideScreen = window.matchMedia('(min-width: 1024px)').matches;
  if (prefersHover && isWideScreen) return;

  // Each wrapper gets its own ticking handler. We measure progress as
  // a 0..1 ratio: 0 when the image's center is at the bottom of the
  // viewport, 1 when it has scrolled past the top. The "open" range
  // is 0.15..0.85 (the middle 70% of the page).
  const update = (wrapper) => {
    const rect = wrapper.getBoundingClientRect();
    const vh = window.innerHeight;
    const center = rect.top + rect.height / 2;
    // progress: 0 when the image just entered from the bottom,
    //           1 when it just left through the top.
    const progress = 1 - (center / vh);
    if (progress > 0.15 && progress < 0.85) {
      wrapper.classList.add('is-open');
    } else {
      wrapper.classList.remove('is-open');
    }
  };

  const handleScroll = () => {
    wrappers.forEach(update);
  };

  // rAF-throttle just like the parallax handler so we don't thrash.
  window.addEventListener('scroll', createRafScrollHandler(handleScroll), { passive: true });
  window.addEventListener('resize', createRafScrollHandler(handleScroll), { passive: true });
  handleScroll(); // Initial check so the state is right on load.
}

/**
 * Initialize all scroll utilities
 */
function initScroll() {
  initScrollReveal();
  initParallax();
  initCountUp();
  initTextReveal();
  initScrollToTop();
  initHeroImageScroll();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScroll);
} else {
  initScroll();
}

// Export
window.initScroll = initScroll;
window.initScrollReveal = initScrollReveal;
window.initParallax = initParallax;
window.initCountUp = initCountUp;
window.initTextReveal = initTextReveal;
window.initScrollToTop = initScrollToTop;
window.initHeroImageScroll = initHeroImageScroll;