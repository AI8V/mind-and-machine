// Enhanced interactions for Bootstrap-based educational article
document.addEventListener('DOMContentLoaded', () => {
  const mainElement = document.querySelector('main.container');
  if (!mainElement) return;

  // Smooth scrolling with ScrollSpy integration
  function initSmoothScrolling() {
    const links = mainElement.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.hash);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL without jumping
          history.pushState(null, null, this.hash);
        }
      });
    });

    // Bootstrap ScrollSpy initialization
    const scrollSpy = new bootstrap.ScrollSpy(mainElement, {
      target: '#toc',
      offset: 100
    });
  }

  // Dynamic Back to Top button
  function createBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary rounded-circle shadow-lg';
    btn.style.position = 'fixed';
    btn.style.bottom = '2rem';
    btn.style.right = '2rem';
    btn.style.width = '3.5rem';
    btn.style.height = '3.5rem';
    btn.style.display = 'none';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', 'Back to top');
    
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
      btn.style.display = window.scrollY > 500 ? 'block' : 'none';
    });

    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Lightbox image preview
  function initImageLightbox() {
    const images = mainElement.querySelectorAll('img:not(.accordion-image)');
    const modal = new bootstrap.Modal(document.createElement('div'));
    
    modal._element.className = 'modal fade';
    modal._element.innerHTML = `
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <img class="img-fluid" src="" alt="Enlarged view">
        </div>
      </div>
    `;
    document.body.appendChild(modal._element);

    images.forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        modal._element.querySelector('img').src = img.src;
        modal.show();
      });
    });
  }

  // Section reveal animations
  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    mainElement.querySelectorAll('.card, section').forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }

  // CTA and card enhancements
  function enhanceInteractiveElements() {
    // Card hover effects
    mainElement.querySelectorAll('.card').forEach(card => {
      card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });

    // Initialize Bootstrap popovers
    mainElement.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => {
      new bootstrap.Popover(el, {
        trigger: 'hover focus',
        container: mainElement
      });
    });
  }

  // Initialize all features
  initSmoothScrolling();
  createBackToTop();
  initImageLightbox();
  initScrollAnimations();
  enhanceInteractiveElements();
});

/* Add this CSS to your stylesheet for animations:
.fade-in { opacity: 0; transform: translateY(20px); transition: all 0.4s ease; }
.fade-in-visible { opacity: 1; transform: translateY(0); }
*/










// Enhanced UX effects for Bootstrap-based educational article
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Bootstrap components
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

  // Enhanced smooth scrolling with offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.hash);
      if (target) {
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Image optimization
  document.querySelectorAll('main img').forEach(img => {
    img.classList.add('img-fluid', 'rounded', 'shadow-sm');
    img.style.transition = 'transform 0.3s ease';
    img.addEventListener('mouseenter', () => img.style.transform = 'scale(1.02)');
    img.addEventListener('mouseleave', () => img.style.transform = 'scale(1)');
  });

  // Intersection Observer animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('main section, main .card').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    observer.observe(el);
  });

  // CTA hover effects
  document.querySelectorAll('.alert, .btn-warning').forEach(el => {
    el.style.transition = 'all 0.2s ease';
    el.addEventListener('mouseenter', () => {
      el.style.transform = 'translateY(-2px)';
      el.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.boxShadow = '';
    });
  });

  // Dynamic tooltip positioning
  window.addEventListener('resize', () => {
    tooltipTriggerList.forEach(tooltip => bootstrap.Tooltip.getInstance(tooltip).update());
  });
});