/**
 * Educational Content Enhancement Script
 * Provides interactive features for Bootstrap-based educational articles
 * Compatible with Bootstrap 5
 */

document.addEventListener('DOMContentLoaded', function() {
  const mainElement = document.querySelector('main');
  if (!mainElement) return;

  // Initialize all features
  initSmoothScrolling();
  initFAQAccordion();
  createBackToTopButton();
  initImageLightbox();
  initScrollAnimations();

  /**
   * Smooth scrolling for Table of Contents links
   */
  function initSmoothScrolling() {
    const tocLinks = mainElement.querySelectorAll('a[href^="#"]');
    
    tocLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        // Calculate offset to account for fixed headers if present
        const offset = 20;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without scrolling
        history.pushState(null, null, targetId);
        
        // Set focus on target for accessibility
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      });
    });
  }

  /**
   * Initialize FAQ accordion functionality
   * Works with Bootstrap's accordion or enhances custom FAQ sections
   */
  function initFAQAccordion() {
    // Check if there's an accordion that's not initialized by Bootstrap
    const accordionItems = mainElement.querySelectorAll('.accordion-item:not([data-bs-toggle])');
    
    if (accordionItems.length === 0) return;
    
    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header button');
      const collapse = item.querySelector('.accordion-collapse');
      
      if (!header || !collapse) return;
      
      // Initialize if not already handled by Bootstrap
      if (!header.hasAttribute('data-bs-toggle')) {
        header.setAttribute('aria-expanded', 'false');
        
        header.addEventListener('click', function(e) {
          e.preventDefault();
          
          const isExpanded = this.getAttribute('aria-expanded') === 'true';
          
          // Toggle current accordion item
          this.setAttribute('aria-expanded', !isExpanded);
          
          if (isExpanded) {
            collapse.classList.remove('show');
            collapse.style.maxHeight = '0px';
          } else {
            collapse.classList.add('show');
            collapse.style.maxHeight = collapse.scrollHeight + 'px';
          }
        });
      }
    });
  }

  /**
   * Create and handle "Back to Top" button
   */
  function createBackToTopButton() {
    // Create the button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top btn btn-primary rounded-circle';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 15a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V14.5a.5.5 0 0 0 .5.5z"></path></svg>';
    backToTopBtn.style.cssText = 'position: fixed; bottom: 20px; right: 20px; width: 45px; height: 45px; opacity: 0; visibility: hidden; transition: opacity 0.3s, visibility 0.3s; z-index: 1000;';
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollPosition > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
      }
    });
    
    // Handle button click
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Add RTL support
    if (mainElement.getAttribute('dir') === 'rtl') {
      backToTopBtn.style.right = 'auto';
      backToTopBtn.style.left = '20px';
    }
  }

  /**
   * Initialize lightbox for images
   */
  function initImageLightbox() {
    const images = mainElement.querySelectorAll('img:not(.no-lightbox)');
    
    if (images.length === 0) return;
    
    // Create modal elements if not already present
    if (!document.getElementById('imageLightbox')) {
      const modalHTML = `
        <div class="modal fade" id="imageLightbox" tabindex="-1" aria-labelledby="imageLightboxLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content bg-light">
              <div class="modal-header border-0 p-2">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body text-center p-0">
                <img src="" class="img-fluid" id="lightboxImage" alt="">
                <p class="mt-2 text-muted small" id="lightboxCaption"></p>
              </div>
            </div>
          </div>
        </div>
      `;
      
      const modalContainer = document.createElement('div');
      modalContainer.innerHTML = modalHTML;
      document.body.appendChild(modalContainer.firstElementChild);
    }
    
    // Initialize Bootstrap modal
    let lightboxModal;
    
    // Check if Bootstrap is available
    if (typeof bootstrap !== 'undefined') {
      lightboxModal = new bootstrap.Modal(document.getElementById('imageLightbox'));
    }
    
    // Make images clickable
    images.forEach(img => {
      if (img.parentElement.tagName === 'A') return; // Skip if already wrapped in link
      
      img.classList.add('cursor-pointer');
      img.style.cursor = 'pointer';
      
      img.addEventListener('click', function() {
        const lightboxImg = document.getElementById('lightboxImage');
        const caption = document.getElementById('lightboxCaption');
        
        // Set image source
        lightboxImg.src = this.src;
        
        // Set caption if available (from alt text or figcaption)
        const figcaption = this.closest('figure') ? this.closest('figure').querySelector('figcaption') : null;
        caption.textContent = figcaption ? figcaption.textContent : this.alt;
        
        // Show modal
        if (lightboxModal) {
          lightboxModal.show();
        } else {
          // Fallback if Bootstrap is not available
          document.getElementById('imageLightbox').classList.add('show');
          document.getElementById('imageLightbox').style.display = 'block';
        }
      });
    });
  }

  /**
   * Initialize scroll animations using Intersection Observer
   */
  function initScrollAnimations() {
    // Check if IntersectionObserver is available
    if (!('IntersectionObserver' in window)) return;
    
    // Elements to animate
    const elementsToAnimate = mainElement.querySelectorAll('section, .card, blockquote, .alert');
    
    // Add initial styles
    elementsToAnimate.forEach(el => {
      el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
    });
    
    // Create observer
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements
    elementsToAnimate.forEach(el => {
      observer.observe(el);
    });
  }

  /**
   * Helper function: Safely check for Bootstrap components
   */
  function bootstrapComponentExists(componentName) {
    return typeof bootstrap !== 'undefined' && 
           typeof bootstrap[componentName] !== 'undefined';
  }
});