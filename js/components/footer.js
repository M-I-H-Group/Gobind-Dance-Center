/**
 * Footer Component
 */

const FOOTER_LINKS = [
  { label: 'Home', href: 'index.html' },
  { label: 'About', href: 'about.html' },
  { label: 'Courses', href: 'course.html' },
  { label: 'Gallery', href: 'gallery.html' },
  { label: 'Blog', href: 'blog.html' },
  { label: 'Contact', href: 'contact.html' },
];

const FOOTER_PROGRAMS = [
  'Kids Dance Courses',
  'Neplai Cultural Dance ',
  'Semi Classical Basic',
  'Dance Video Direction/Compose',
  'Choreography for Events',
  'Advance Sepcial Classes',
];

/**
 * Create footer HTML
 * @returns {string} - Footer HTML
 */
function createFooterHTML() {
  const currentYear = new Date().getFullYear();

  return `
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-grid">
          <!-- Brand -->
          <div class="footer-brand">
            <div class="footer-brand-logo">
              <a href="index.html"><img class="footer-logo-image" src="assets/icons/FooterIcone.png" alt="Febicone" width="72" height="72" /></a>
            </div>
            <p class="footer-brand-desc">
              Preserving heritage through movement. Over three decades of cinematic choreography, cultural education, and artistic excellence.
            </p>
            <div class="footer-social">
              <a href="https://facebook.com/gobind.rai.5" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="Facebook">
                <!-- Facebook brand logo (real image) -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" aria-hidden="true">
                  <path fill="#1877F2" d="M24 4C12.95 4 4 12.95 4 24c0 9.99 7.31 18.27 16.79 19.83V29.84h-5.05V24h5.05v-4.41c0-4.99 2.97-7.74 7.51-7.74 2.18 0 4.45.39 4.45.39v4.9h-2.51c-2.47 0-3.24 1.53-3.24 3.1V24h5.51l-.88 5.84h-4.63v13.99C36.69 42.27 44 33.99 44 24 44 12.95 35.05 4 24 4z"/>
                </svg>
              </a>
              <a href="https://wa.me/19296417574" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="WhatsApp">
                <!-- WhatsApp brand logo (real image) -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" aria-hidden="true">
                  <path fill="#25D366" d="M24 4C12.95 4 4 12.95 4 24c0 3.7 1.02 7.16 2.78 10.13L4 44l10.13-2.65A19.9 19.9 0 0 0 24 44c11.05 0 20-8.95 20-20S35.05 4 24 4z"/>
                  <path fill="#FFFFFF" d="M33.6 28.4c-.5-.25-2.95-1.45-3.4-1.62-.45-.16-.78-.25-1.12.25-.33.5-1.27 1.62-1.56 1.95-.29.33-.57.37-1.07.12-.5-.25-2.1-.78-4.01-2.47-1.48-1.32-2.48-2.95-2.77-3.45-.29-.5-.03-.77.22-1.02.22-.22.5-.58.75-.87.25-.29.33-.5.5-.83.16-.33.08-.62-.04-.87-.13-.25-1.12-2.7-1.54-3.7-.4-.97-.82-.84-1.12-.85-.29-.01-.62-.01-.95-.01-.33 0-.87.12-1.33.62-.45.5-1.74 1.7-1.74 4.15 0 2.45 1.78 4.82 2.03 5.15.25.33 3.5 5.35 8.49 7.5 1.19.51 2.11.82 2.84 1.05 1.19.38 2.27.32 3.13.2.95-.15 2.95-1.21 3.37-2.37.41-1.16.41-2.16.29-2.37-.12-.21-.45-.33-.95-.58z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@GobindRaiEntertainment" target="_blank" rel="noopener noreferrer" class="footer-social-link footer-social-link--img" aria-label="YouTube">
                <!-- Real YouTube brand logo (image file) -->
                <img src="assets/icons/youtube.png" alt="YouTube" class="footer-social-img" loading="lazy" />
              </a>
              <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" class="footer-social-link footer-social-link--img" aria-label="TikTok">
                <!-- Real TikTok brand logo (image file) -->
                <img src="assets/icons/tiktok.avif" alt="TikTok" class="footer-social-img" loading="lazy" />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" class="footer-social-link footer-social-link--img" aria-label="Instagram">
                <!-- Real Instagram brand logo (image file) -->
                <img src="assets/icons/instagram.avif" alt="Instagram" class="footer-social-img" loading="lazy" />
              </a>
            </div>
          </div>

          <!-- Navigation -->
          <div class="footer-nav">
            <h4 class="footer-title">Navigation</h4>
            <ul class="footer-links">
              ${FOOTER_LINKS.map(link => `
                <li>
                  <a href="${link.href}" class="footer-link">
                    <span class="footer-link-arrow"></span>
                    ${link.label}
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Programs -->
          <div class="footer-programs">
            <h4 class="footer-title">Programs</h4>
            <ul class="footer-program-list">
              ${FOOTER_PROGRAMS.map(program => `
                <li>
                  <a href="course.html" class="footer-program-link">${program}</a>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Contact -->
          <div class="footer-contact">
            <h4 class="footer-title">Studio</h4>
            <div class="footer-contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="footer-contact-icon">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <p class="footer-contact-text">
                <a href="https://maps.app.goo.gl/D6KbNcKLLepX2wMv7" target="_blank" rel="noopener noreferrer" class="footer-location-link">
                  Gobind Dance Center<br />
                  40-08 76th St, Elmhurst<br />
                  New York City, USA
                </a>
              </p>
            </div>
            <div class="footer-contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="footer-contact-icon">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <p class="footer-contact-text">
                <a href="tel:+1(929)641-7574" class="footer-location-link">+1(929)641-7574</a>
              </p>
            </div>
            <a href="book-meeting.html" class="footer-cta">
              Book a Session
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-bottom-inner">
          <p class="footer-copyright">© ${currentYear} Gobind Dance Center. All rights reserved.</p>
          <p class="footer-location">Elmhurst, New York City • Dharan, Nepal</p>
        </div>
      </div>
    </footer>
  `;
}

/**
 * Initialize footer
 */
function initFooter() {
  const footerContainer = document.getElementById('footer-container');
  if (!footerContainer) return;

  footerContainer.innerHTML = createFooterHTML();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFooter);
} else {
  initFooter();
}

// Export
window.createFooterHTML = createFooterHTML;
window.initFooter = initFooter;