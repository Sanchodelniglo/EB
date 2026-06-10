// IIFE to prevent global scope pollution
(function() {
  'use strict';

  // Configuration and constants
  const CONFIG = {
    SCROLL_THRESHOLD: 100,
    ANIMATION_DELAY: 100,
    TESTIMONIAL_INTERVAL: 5000,
    FORM_SUBMIT_DELAY: 4000,
    FORMSPREE_URL: 'https://formspree.io/f/xrbkbkeb',
    LAZY_LOAD_MARGIN: '50px 0px',
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^[\d\s\-+().]{10,}$/,
    MIN_MESSAGE_LENGTH: 10
  };

  // Services data
  const servicesData = {
    services: [
      {
        id: 'cloture-bois',
        title: 'Clôture Bois Sur Mesure',
        description: 'Conception et pose de clôtures bois sur mesure en Gironde : volige, ajourée, persiennée, clôture piscine. Du portail au brise-vue, des solutions durables et esthétiques pour votre jardin.',
        image: 'img/cloture-volige-saint-jean-d-illac.webp',
        category: 'cloture'
      },
      {
        id: 'terrasses-bois',
        title: 'Terrasse Bois & Terrasse Piscine',
        description: 'Création de terrasses bois sur mesure : terrasse piscine, terrasse sur pilotis, terrasse multi-niveaux. Pin traité ou bois exotique selon vos envies et votre budget.',
        image: 'img/terrasse-piscine.webp',
        category: 'terrasse'
      },
      {
        id: 'extensions-bois',
        title: 'Extension & Abri Bois',
        description: 'Agrandissement en ossature bois, studio de jardin, carport et abri bois sur mesure. Performance thermique et intégration architecturale pour votre habitat en Gironde.',
        image: 'img/extension.webp',
        category: 'extension'
      },
      {
        id: 'pergolas',
        title: 'Pergola Bois Sur Mesure',
        description: 'Pergolas bois adossées ou autoportées, avec persiennes ou toile rétractable. Créez un espace extérieur élégant et ombragé, adapté au climat girondin.',
        image: 'img/pergola.webp',
        category: 'pergola'
      }
    ],
    portfolio: [
      {
        id: 'cloture-saint-jean-d-illac',
        title: 'Clôture en volige',
        location: 'Saint-Jean-d\'Illac',
        image: 'img/cloture-volige-saint-jean-d-illac.webp',
        category: 'cloture'
      },
      {
        id: 'pergola-arcachon',
        title: 'Pergola en bois',
        location: 'Arcachon',
        image: 'img/pergola.webp',
        category: 'pergola'
      },
      {
        id: 'extension-saint-jean-d-illac',
        title: 'Studio extension bois',
        location: 'Saint-Jean-d\'Illac',
        image: 'img/extension.webp',
        category: 'extension'
      },
      {
        id: 'cloture-portail',
        title: 'Clôture et portail en bois',
        location: 'Lège-Cap-Ferret',
        image: 'img/cloture-portail.webp',
        category: 'cloture'
      },
      {
        id: 'extension-pessac-2',
        title: 'Extension maison d\'architecte',
        location: 'Arès',
        image: 'img/extension-2.webp',
        category: 'extension'
      },
      {
        id: 'terrasse-piscine',
        title: "Terrasse en bois exotique piscine",
        location: 'Saint-Médard-en-Jalles',
        image: 'img/terrasse-piscine.webp',
        category: 'terrasse'
      },
      {
        id: 'terrasse-piscine-2',
        title: "Terrasse et clôture piscine",
        location: 'Saint-Médard-en-Jalles',
        image: 'img/header.webp',
        category: 'terrasse'
      },
      {
        id: 'pergola-persienne',
        title: 'Pergola avec persiennes',
        location: 'Saint-Médard-en-Jalles',
        image: 'img/pergola-persienne.webp',
        category: 'pergola'
      },
      {
        id: 'terrasse-multi-niveaux',
        title: 'Terrasse multi-niveaux',
        location: 'Le Haillan',
        image: 'img/terrasse-multi-niveaux.webp',
        category: 'terrasse'
      }
    ],
    filters: [
      { id: 'all', label: 'Tous' },
      { id: 'cloture', label: 'Clôtures' },
      { id: 'terrasse', label: 'Terrasses' },
      { id: 'pergola', label: 'Pergolas' },
      { id: 'extension', label: 'Extensions' }
    ]
  };

  // Testimonials data
  const testimonialsData = [
    {
      content: "Élégance Bois a réalisé notre terrasse en bois exotique, un travail remarquable avec un souci du détail impressionnant. Le résultat dépasse nos attentes et s'intègre parfaitement à notre jardin.",
      author: "Famille Lecomte",
      location: "La Teste, Gironde"
    },
    {
      content: "La rénovation de notre clôture était un projet ambitieux, mais l'équipe d'Élégance Bois a relevé le défi avec brio. Leur expertise et leur professionnalisme nous ont convaincus dès le premier contact.",
      author: "Jean-Pierre Brun",
      location: "Saint-Jean d'Illac, Gironde"
    },
    {
      content: "Nous recommandons vivement cette entreprise pour la qualité de leur travail et leur écoute attentive. Notre pergola est devenue le point central de notre jardin et fait l'admiration de tous nos invités.",
      author: "Sophie Lopez",
      location: "Arcachon, Gironde"
    }
  ];

  // Utility functions
  const utils = {
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    throttle(func, limit) {
      let inThrottle;
      return function (...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },

    createElement(tag, className, attributes = {}) {
      const element = document.createElement(tag);
      if (className) element.className = className;
      Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'textContent') {
          element.textContent = value;
        } else if (key === 'innerHTML') {
          element.innerHTML = value;
        } else {
          element.setAttribute(key, value);
        }
      });
      return element;
    },

    escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    },

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    supportsIntersectionObserver() {
      return 'IntersectionObserver' in window &&
             'IntersectionObserverEntry' in window &&
             'intersectionRatio' in window.IntersectionObserverEntry.prototype;
    }
  };

  // DOM Cache with null safety
  class DOMCache {
    constructor() {
      this.cache = new Map();
    }

    get(selector) {
      if (!this.cache.has(selector)) {
        const element = document.querySelector(selector);
        if (element) {
          this.cache.set(selector, element);
        }
        return element;
      }
      return this.cache.get(selector);
    }

    getAll(selector) {
      if (!this.cache.has(selector)) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          this.cache.set(selector, elements);
        }
        return elements;
      }
      return this.cache.get(selector);
    }

    clear() {
      this.cache.clear();
    }
  }

  const dom = new DOMCache();

  // Navigation Handler
  class NavigationHandler {
    constructor() {
      this.menuToggle = dom.get('.menu-toggle');
      this.nav = dom.get('nav');
      this.header = dom.get('header');
      this.body = document.body;
      this.init();
    }

    init() {
      this.menuToggle?.addEventListener('click', () => this.toggleMenu());
      this.setupSmoothScrolling();
    }

    toggleMenu() {
      this.menuToggle?.classList.toggle('active');
      this.nav?.classList.toggle('active');
      this.body?.classList.toggle('no-scroll');

      // Update aria-expanded
      const isExpanded = this.menuToggle?.classList.contains('active');
      this.menuToggle?.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    }

    closeMenu() {
      this.menuToggle?.classList.remove('active');
      this.nav?.classList.remove('active');
      this.body?.classList.remove('no-scroll');
      this.menuToggle?.setAttribute('aria-expanded', 'false');
    }

    setupSmoothScrolling() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
          e.preventDefault();
          const href = anchor.getAttribute('href');
          if (href === '#') return;

          const target = document.querySelector(href);
          if (target && this.header) {
            this.closeMenu();
            const offsetTop = target.offsetTop - this.header.offsetHeight;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        });
      });
    }
  }

  // Lazy Image Loader with feature detection
  class LazyImageLoader {
    constructor() {
      this.observer = null;
      if (utils.supportsIntersectionObserver()) {
        this.observer = new IntersectionObserver(
          entries => this.handleIntersection(entries),
          { rootMargin: CONFIG.LAZY_LOAD_MARGIN }
        );
      }
    }

    handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src;
          if (src) {
            img.style.backgroundImage = `url('${src}')`;
            img.classList.add('loaded');
            delete img.dataset.src;
            this.observer?.unobserve(img);
          }
        }
      });
    }

    observe(elements) {
      if (this.observer) {
        elements.forEach(el => this.observer.observe(el));
      } else {
        // Fallback for browsers without IntersectionObserver
        elements.forEach(el => {
          const src = el.dataset.src;
          if (src) {
            el.style.backgroundImage = `url('${src}')`;
            el.classList.add('loaded');
            delete el.dataset.src;
          }
        });
      }
    }
  }

  // Dynamic Content Manager
  class DynamicContentManager {
    constructor(data) {
      this.data = data;
      this.lazyLoader = new LazyImageLoader();
      this.currentFilter = 'all';
      this.filterTimeout = null;
    }

    init() {
      this.renderServices();
      this.renderPortfolio();
      this.renderPortfolioFilters();
    }

    renderServices() {
      const grid = dom.get('.services-grid');
      if (!grid) return;

      // Check if services are pre-rendered in HTML (for SEO)
      const existingCards = grid.querySelectorAll('.service-card');
      if (existingCards.length > 0) {
        // Services already rendered - just ensure images are set up correctly
        existingCards.forEach(card => {
          card.classList.add('loaded');
        });
        return;
      }

      // Fallback: render dynamically if HTML is empty
      const fragment = document.createDocumentFragment();

      this.data.services.forEach(service => {
        const card = utils.createElement('div', 'service-card', { role: 'listitem' });

        const imageWrapper = utils.createElement('div', 'service-image-wrapper');
        const image = utils.createElement('div', 'service-image', { 'data-src': service.image });
        imageWrapper.appendChild(image);

        const content = utils.createElement('div', 'service-content');
        const title = utils.createElement('h3', null, { textContent: service.title });
        const description = utils.createElement('p', null, { textContent: service.description });
        content.appendChild(title);
        content.appendChild(description);

        card.appendChild(imageWrapper);
        card.appendChild(content);
        fragment.appendChild(card);
      });

      grid.appendChild(fragment);

      const images = grid.querySelectorAll('.service-image[data-src]');
      this.lazyLoader.observe(images);
    }

    renderPortfolioFilters() {
      const container = dom.get('.portfolio-filter');
      if (!container) return;

      const fragment = document.createDocumentFragment();

      this.data.filters.forEach((filter, index) => {
        const btn = utils.createElement('button', `filter-btn ${index === 0 ? 'active' : ''}`, {
          'data-filter': filter.id,
          'role': 'tab',
          'aria-selected': index === 0 ? 'true' : 'false',
          'aria-controls': 'portfolio-grid',
          textContent: filter.label
        });
        btn.addEventListener('click', () => this.handleFilterClick(filter.id));
        fragment.appendChild(btn);
      });

      container.innerHTML = '';
      container.appendChild(fragment);
    }

    renderPortfolio() {
      const grid = dom.get('.portfolio-grid');
      if (!grid) return;

      // Check if portfolio is pre-rendered in HTML (for SEO)
      const existingItems = grid.querySelectorAll('.portfolio-item');
      if (existingItems.length > 0) {
        // Portfolio already rendered - just ensure items are set up correctly
        existingItems.forEach(item => {
          item.classList.add('loaded');
        });
        return;
      }

      // Fallback: render dynamically if HTML is empty
      const fragment = document.createDocumentFragment();

      this.data.portfolio.forEach(item => {
        const portfolioItem = utils.createElement('div', 'portfolio-item', {
          'data-category': item.category,
          role: 'listitem'
        });

        const image = utils.createElement('div', 'portfolio-image', { 'data-src': item.image });
        const overlay = utils.createElement('div', 'portfolio-overlay');
        const title = utils.createElement('h3', null, { textContent: item.title });
        const location = utils.createElement('p', null, { textContent: item.location });

        overlay.appendChild(title);
        overlay.appendChild(location);
        portfolioItem.appendChild(image);
        portfolioItem.appendChild(overlay);
        fragment.appendChild(portfolioItem);
      });

      grid.appendChild(fragment);

      const images = grid.querySelectorAll('.portfolio-image[data-src]');
      this.lazyLoader.observe(images);
    }

    handleFilterClick(filterId) {
      if (this.filterTimeout) {
        clearTimeout(this.filterTimeout);
      }

      this.currentFilter = filterId;

      // Update active button with ARIA
      document.querySelectorAll('.filter-btn').forEach(btn => {
        const isActive = btn.getAttribute('data-filter') === filterId;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      const grid = document.querySelector('.portfolio-grid');
      const items = document.querySelectorAll('.portfolio-item');

      // Phase 1: Fade out all visible items together
      items.forEach(item => {
        item.style.transition = 'opacity 0.2s ease';
        item.style.transitionDelay = '0s';
        item.style.opacity = '0';
      });

      // Phase 2: Swap visibility while everything is invisible
      this.filterTimeout = setTimeout(() => {
        items.forEach(item => item.classList.remove('featured'));

        const showItems = [];
        items.forEach(item => {
          const category = item.getAttribute('data-category');
          const shouldShow = filterId === 'all' || filterId === category;
          item.style.display = shouldShow ? '' : 'none';
          if (shouldShow) showItems.push(item);
        });

        // Featured layout only on "all" filter
        if (filterId === 'all' && showItems.length > 0) {
          showItems[0].classList.add('featured');
          grid.classList.add('grid-featured');
        } else {
          grid.classList.remove('grid-featured');
        }

        // Phase 3: Staggered fade in
        requestAnimationFrame(() => {
          showItems.forEach((item, index) => {
            item.style.transition = `opacity 0.4s ease ${index * 0.06}s`;
            item.style.opacity = '1';
          });
        });
      }, 200);
    }
  }

  // Portfolio Modal
  class PortfolioModal {
    constructor(data) {
      this.portfolio = data.portfolio;
      this.currentIndex = 0;
      this.focusableElements = null;
      this.previousActiveElement = null;
      this.scrollY = 0;
      this.initElements();
      this.bindEvents();
    }

    initElements() {
      this.modal = document.getElementById('portfolioModal');
      this.modalImage = document.getElementById('modalImage');
      this.modalTitle = document.getElementById('modalTitle');
      this.modalLocation = document.getElementById('modalLocation');
      this.prevBtn = document.getElementById('prevBtn');
      this.nextBtn = document.getElementById('nextBtn');
      this.closeBtn = document.getElementById('modalClose');
    }

    bindEvents() {
      // Portfolio item clicks
      document.addEventListener('click', e => {
        const item = e.target.closest('.portfolio-item');
        if (item) {
          const items = Array.from(document.querySelectorAll('.portfolio-item:not([style*="display: none"])'));
          const index = items.indexOf(item);
          if (index !== -1) {
            this.openModal(index);
          }
        }
      });

      // Keyboard support for portfolio items
      document.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          const item = e.target.closest('.portfolio-item');
          if (item) {
            e.preventDefault();
            const items = Array.from(document.querySelectorAll('.portfolio-item:not([style*="display: none"])'));
            const index = items.indexOf(item);
            if (index !== -1) {
              this.openModal(index);
            }
          }
        }
      });

      // Modal controls
      this.closeBtn?.addEventListener('click', () => this.closeModal());
      this.prevBtn?.addEventListener('click', () => this.navigate(-1));
      this.nextBtn?.addEventListener('click', () => this.navigate(1));

      // Keyboard navigation
      document.addEventListener('keydown', e => {
        if (!this.modal?.classList.contains('active')) return;

        const actions = {
          'Escape': () => this.closeModal(),
          'ArrowLeft': () => this.navigate(-1),
          'ArrowRight': () => this.navigate(1),
          'Tab': () => this.handleTabKey(e)
        };

        if (actions[e.key]) {
          if (e.key !== 'Tab') {
            e.preventDefault();
          }
          actions[e.key]();
        }
      });

      // Backdrop click
      this.modal?.addEventListener('click', e => {
        if (e.target.classList.contains('modal-backdrop')) {
          this.closeModal();
        }
      });
    }

    handleTabKey(e) {
      if (!this.modal) return;

      const focusableSelectors = 'button:not(:disabled), [href], [tabindex]:not([tabindex="-1"])';
      this.focusableElements = Array.from(this.modal.querySelectorAll(focusableSelectors));

      if (this.focusableElements.length === 0) return;

      const firstElement = this.focusableElements[0];
      const lastElement = this.focusableElements[this.focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }

    openModal(index) {
      if (!this.modal) return;

      // Store current focus to restore later
      this.previousActiveElement = document.activeElement;

      // Find the actual index in the full portfolio
      const currentFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
      const visiblePortfolio = this.portfolio.filter((item) => {
        return currentFilter === 'all' || item.category === currentFilter;
      });

      const clickedPortfolioItem = visiblePortfolio[index];
      this.currentIndex = this.portfolio.findIndex(item => item.id === clickedPortfolioItem?.id);

      if (this.currentIndex === -1) this.currentIndex = 0;

      this.updateModalContent();
      this.modal.classList.add('active');
      this.modal.setAttribute('aria-hidden', 'false');

      // Prevent background scroll
      this.scrollY = window.scrollY;
      document.body.style.top = `-${this.scrollY}px`;
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');

      // Focus the close button for accessibility
      setTimeout(() => this.closeBtn?.focus(), 100);
    }

    closeModal() {
      if (!this.modal) return;

      this.modal.classList.remove('active');
      this.modal.setAttribute('aria-hidden', 'true');

      // Restore background scroll
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
      document.body.style.top = '';
      window.scrollTo(0, this.scrollY || 0);

      // Restore focus to the element that opened the modal
      this.previousActiveElement?.focus();
    }

    navigate(direction) {
      const newIndex = this.currentIndex + direction;
      if (newIndex >= 0 && newIndex < this.portfolio.length) {
        this.currentIndex = newIndex;
        this.updateModalContent(true);
      }
    }

    updateModalContent(isNavigation = false) {
      const item = this.portfolio[this.currentIndex];
      if (!item || !this.modalImage) return;

      // Fade out first for smooth crossfade on navigation
      this.modalImage.classList.add('loading');

      const loadNewImage = () => {
        const img = new Image();
        img.onload = () => {
          if (this.modalImage) {
            this.modalImage.src = img.src;
            this.modalImage.alt = `${item.title} - ${item.location}`;
            // Small delay for smoother reveal
            requestAnimationFrame(() => {
              this.modalImage.classList.remove('loading');
            });
          }
        };
        img.onerror = () => {
          console.error(`Failed to load image: ${item.image}`);
          this.modalImage?.classList.remove('loading');
        };
        img.src = item.image;
      };

      // Delay load on navigation for smooth crossfade
      if (isNavigation) {
        setTimeout(loadNewImage, 150);
      } else {
        loadNewImage();
      }

      if (this.modalTitle) {
        this.modalTitle.textContent = item.title;
      }
      if (this.modalLocation) {
        this.modalLocation.textContent = item.location;
      }

      if (this.prevBtn) {
        this.prevBtn.disabled = this.currentIndex === 0;
      }
      if (this.nextBtn) {
        this.nextBtn.disabled = this.currentIndex === this.portfolio.length - 1;
      }
    }
  }

  // Testimonial Slider with cleanup
  class TestimonialSlider {
    constructor(testimonials) {
      this.testimonials = testimonials;
      this.currentIndex = 0;
      this.container = dom.get('.testimonial');
      this.dots = document.querySelectorAll('.slider-dot');
      this.interval = null;
      this.init();
      this.bindCleanup();
    }

    init() {
      this.setupDots();
      this.startAutoRotate();
      this.updateTestimonial(0);
    }

    bindCleanup() {
      // Clean up interval on page visibility change
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.stopAutoRotate();
        } else {
          this.startAutoRotate();
        }
      });

      // Clean up on page unload
      window.addEventListener('beforeunload', () => {
        this.stopAutoRotate();
      });
    }

    setupDots() {
      this.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          this.stopAutoRotate();
          this.updateTestimonial(index);
          this.startAutoRotate();
        });
      });
    }

    updateTestimonial(index) {
      this.currentIndex = index;
      const testimonial = this.testimonials[index];

      if (this.container && testimonial) {
        // Build testimonial with DOM methods for safety
        this.container.innerHTML = '';

        const content = utils.createElement('div', 'testimonial-content');
        const p = utils.createElement('p', null, { textContent: testimonial.content });
        content.appendChild(p);

        const author = utils.createElement('div', 'testimonial-author', { textContent: testimonial.author });
        const location = utils.createElement('div', 'testimonial-location', { textContent: testimonial.location });

        this.container.appendChild(content);
        this.container.appendChild(author);
        this.container.appendChild(location);

        // Update dots with ARIA
        this.dots.forEach((dot, i) => {
          const isActive = i === index;
          dot.classList.toggle('active', isActive);
          dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
      }
    }

    startAutoRotate() {
      this.stopAutoRotate(); // Clear any existing interval
      this.interval = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
        this.updateTestimonial(this.currentIndex);
      }, CONFIG.TESTIMONIAL_INTERVAL);
    }

    stopAutoRotate() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }
  }

  // Form Handler with improved validation
  class FormHandler {
    constructor() {
      this.form = document.getElementById('contactForm');
      this.init();
    }

    init() {
      this.form?.addEventListener('submit', e => this.handleSubmit(e));
    }

    validateEmail(email) {
      return CONFIG.EMAIL_REGEX.test(email);
    }

    validatePhone(phone) {
      return CONFIG.PHONE_REGEX.test(phone);
    }

    validateForm(formData) {
      const errors = [];

      const name = formData.get('name')?.toString().trim();
      const email = formData.get('email')?.toString().trim();
      const phone = formData.get('phone')?.toString().trim();
      const message = formData.get('message')?.toString().trim();
      const service = formData.get('service')?.toString().trim();

      if (!name || name.length < 2) {
        errors.push('Veuillez entrer un nom valide (au moins 2 caractères).');
      }

      if (!email || !this.validateEmail(email)) {
        errors.push('Veuillez entrer une adresse email valide.');
      }

      if (!phone || !this.validatePhone(phone)) {
        errors.push('Veuillez entrer un numéro de téléphone valide.');
      }

      if (!service) {
        errors.push('Veuillez sélectionner un service.');
      }

      if (!message || message.length < CONFIG.MIN_MESSAGE_LENGTH) {
        errors.push(`Veuillez entrer un message d'au moins ${CONFIG.MIN_MESSAGE_LENGTH} caractères.`);
      }

      return errors;
    }

    async handleSubmit(e) {
      e.preventDefault();

      if (!this.form) return;

      const formData = new FormData(this.form);
      const button = this.form.querySelector('button[type="submit"]');
      const originalButtonHTML = button?.innerHTML;

      // Validate form
      const errors = this.validateForm(formData);

      if (errors.length > 0) {
        this.showError(errors.join(' '));
        return;
      }

      // Show loading state
      if (button) {
        button.innerHTML = '<span class="loader"></span>';
        button.disabled = true;
      }

      try {
        const response = await fetch(CONFIG.FORMSPREE_URL, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          this.showSuccess();
        } else {
          console.error('Form submission failed:', response.status, response.statusText);
          this.showError('Une erreur est survenue lors de l\'envoi. Veuillez réessayer plus tard.');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        this.showError('Une erreur réseau est survenue. Veuillez vérifier votre connexion.');
      } finally {
        if (button) {
          button.innerHTML = originalButtonHTML || 'Envoyer ma demande';
          button.disabled = false;
        }
      }
    }

    showSuccess() {
      if (!this.form) return;

      this.form.reset();
      this.form.innerHTML = '';

      const successDiv = utils.createElement('div', 'form-success', {
        textContent: 'Merci pour votre message ! Nous vous contacterons très rapidement.'
      });
      this.form.appendChild(successDiv);
    }

    showError(message) {
      if (!this.form) return;

      // Remove existing error
      const existingError = this.form.querySelector('.form-error');
      existingError?.remove();

      const errorDiv = utils.createElement('div', 'form-error', { textContent: message });
      this.form.insertBefore(errorDiv, this.form.firstChild);
      setTimeout(() => errorDiv.remove(), 5000);
    }
  }

  // Scroll Reveal & Parallax Handler
  class ScrollAnimationHandler {
    constructor() {
      this.heroBg = document.querySelector('.hero-bg');
      this.ticking = false;
      this.init();
    }

    init() {
      if (utils.supportsIntersectionObserver()) {
        this.tagElements();
        this.observeReveals();
      }
      if (this.heroBg) {
        this.initParallax();
      }
    }

    tagElements() {
      // Section titles
      document.querySelectorAll('section:not(.hero) .section-title').forEach(el => {
        el.classList.add('reveal');
      });

      // About: text left, image right
      const aboutText = document.querySelector('.about-text');
      const aboutImage = document.querySelector('.about-image');
      if (aboutText) aboutText.classList.add('reveal-left');
      if (aboutImage) aboutImage.classList.add('reveal-right');

      // Service cards: staggered
      const servicesGrid = document.querySelector('.services-grid');
      if (servicesGrid) servicesGrid.classList.add('reveal-stagger');

      // Portfolio filter + grid: staggered
      const portfolioFilter = document.querySelector('.portfolio-filter');
      if (portfolioFilter) portfolioFilter.classList.add('reveal');
      const portfolioGrid = document.querySelector('.portfolio-grid');
      if (portfolioGrid) portfolioGrid.classList.add('reveal-stagger');

      // Services CTA
      const servicesCta = document.querySelector('.services-cta');
      if (servicesCta) servicesCta.classList.add('reveal');

      // Testimonials
      const testimonialsInner = document.querySelector('.testimonials-inner');
      if (testimonialsInner) testimonialsInner.classList.add('reveal');

      // FAQ items: staggered
      const faqContainer = document.querySelector('.faq-container');
      if (faqContainer) faqContainer.classList.add('reveal-stagger');

      // Contact: form left, info right
      const contactForm = document.querySelector('.contact-form');
      const contactInfo = document.querySelector('.contact-info');
      if (contactForm) contactForm.classList.add('reveal-left');
      if (contactInfo) contactInfo.classList.add('reveal-right');
    }

    observeReveals() {
      const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger');

      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '-40px' }
      );

      targets.forEach(el => observer.observe(el));
    }

    initParallax() {
      const header = document.querySelector('header');
      const onScroll = () => {
        if (!this.ticking) {
          requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            if (this.heroBg && scrollY < window.innerHeight) {
              this.heroBg.style.transform = `translateY(${scrollY * 0.35}px)`;
            }
            if (header) {
              header.classList.toggle('scrolled', scrollY > 40);
            }
            this.ticking = false;
          });
          this.ticking = true;
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  // Initialize Application
  class App {
    constructor() {
      this.init();
    }

    init() {
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.setup());
      } else {
        this.setup();
      }
    }

    setup() {
      try {
        // Initialize all components
        this.navigation = new NavigationHandler();
        this.contentManager = new DynamicContentManager(servicesData);
        this.contentManager.init();
        this.portfolioModal = new PortfolioModal(servicesData);
        this.testimonialSlider = new TestimonialSlider(testimonialsData);
        this.formHandler = new FormHandler();
        this.scrollAnimations = new ScrollAnimationHandler();
      } catch (error) {
        console.error('Application initialization error:', error);
      }
    }
  }

  // Start the application
  new App();
})();
