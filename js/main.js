// Configuration and constants
const CONFIG = {
  SCROLL_THRESHOLD: 100,
  ANIMATION_DELAY: 100,
  TESTIMONIAL_INTERVAL: 5000,
  FORM_SUBMIT_DELAY: 4000,
  FORMSPREE_URL: 'https://formspree.io/f/xrbkbkeb',
  LAZY_LOAD_MARGIN: '50px 0px'
};

// Services data
const servicesData = {
  services: [
    {
      id: 'cloture-bois',
      title: 'Clôture Bois',
      description: 'Conception et réalisation de clôtures en bois sur mesure, combinant savoir-faire traditionnel et solutions modernes pour des installations durables et esthétiques.',
      image: 'img/cloture-volige-saint-jean-d-illac.webp',
      category: 'cloture'
    },
    {
      id: 'terrasses-bois',
      title: 'Terrasses en bois',
      description: 'Création de terrasses uniques adaptées à votre espace extérieur, avec un large choix d\'essences de bois pour un résultat à la fois durable et élégant.',
      image: 'img/terrasse-piscine.webp',
      category: 'terrasse'
    },
    {
      id: 'extensions-bois',
      title: 'Extensions bois',
      description: 'Agrandissement de votre espace de vie avec des extensions en ossature bois, alliant performance thermique et intégration parfaite à votre habitat existant.',
      image: 'img/extension.webp',
      category: 'extension'
    },
    {
      id: 'pergolas',
      title: 'Pergolas',
      description: 'Pergolas sur mesure pour créer des espaces extérieurs élégants et ombragés. Nos conceptions allient esthétisme, durabilité et adaptation parfaite à votre cadre de vie.',
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

  createElement(tag, className, innerHTML) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
  },

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};

// DOM Cache
class DOMCache {
  constructor() {
    this.cache = new Map();
  }

  get(selector) {
    if (!this.cache.has(selector)) {
      this.cache.set(selector, document.querySelector(selector));
    }
    return this.cache.get(selector);
  }

  getAll(selector) {
    if (!this.cache.has(selector)) {
      this.cache.set(selector, document.querySelectorAll(selector));
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
    window.addEventListener('scroll', utils.throttle(() => this.handleScroll(), 100));
    this.setupSmoothScrolling();
  }

  toggleMenu() {
    this.menuToggle.classList.toggle('active');
    this.nav.classList.toggle('active');
    this.body.classList.toggle('no-scroll');
  }

  closeMenu() {
    this.menuToggle.classList.remove('active');
    this.nav.classList.remove('active');
    this.body.classList.remove('no-scroll');
  }

  handleScroll() {
    const scrolled = window.scrollY > CONFIG.SCROLL_THRESHOLD;
    this.header.classList.toggle('scrolled', scrolled);
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
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

// Lazy Image Loader
class LazyImageLoader {
  constructor() {
    this.observer = new IntersectionObserver(
      entries => this.handleIntersection(entries),
      { rootMargin: CONFIG.LAZY_LOAD_MARGIN }
    );
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
          this.observer.unobserve(img);
        }
      }
    });
  }

  observe(elements) {
    elements.forEach(el => this.observer.observe(el));
  }
}

// Dynamic Content Manager
class DynamicContentManager {
  constructor(data) {
    this.data = data;
    this.lazyLoader = new LazyImageLoader();
    this.currentFilter = 'all';
  }

  init() {
    this.renderServices();
    this.renderPortfolio();
    this.renderPortfolioFilters();
  }

  renderServices() {
    const grid = dom.get('.services-grid');
    if (!grid) return;

    const fragment = document.createDocumentFragment();

    this.data.services.forEach(service => {
      const card = utils.createElement('div', 'service-card');
      card.innerHTML = `
        <div class="service-image-wrapper">
          <div class="service-image" data-src="${service.image}"></div>
        </div>
        <div class="service-content">
          <h3>${service.title}</h3>
          <p>${service.description}</p>
        </div>
      `;
      fragment.appendChild(card);
    });

    grid.innerHTML = '';
    grid.appendChild(fragment);

    const images = grid.querySelectorAll('.service-image[data-src]');
    this.lazyLoader.observe(images);
  }

  renderPortfolioFilters() {
    const container = dom.get('.portfolio-filter');
    if (!container) return;

    const fragment = document.createDocumentFragment();

    this.data.filters.forEach((filter, index) => {
      const btn = utils.createElement('button', `filter-btn ${index === 0 ? 'active' : ''}`);
      btn.setAttribute('data-filter', filter.id);
      btn.textContent = filter.label;
      btn.addEventListener('click', () => this.handleFilterClick(filter.id));
      fragment.appendChild(btn);
    });

    container.innerHTML = '';
    container.appendChild(fragment);
  }

  renderPortfolio() {
    const grid = dom.get('.portfolio-grid');
    if (!grid) return;

    const fragment = document.createDocumentFragment();

    this.data.portfolio.forEach(item => {
      const portfolioItem = utils.createElement('div', 'portfolio-item');
      portfolioItem.setAttribute('data-category', item.category);
      portfolioItem.innerHTML = `
        <div class="portfolio-image" data-src="${item.image}"></div>
        <div class="portfolio-overlay">
          <h3>${item.title}</h3>
          <p>${item.location}</p>
        </div>
      `;
      fragment.appendChild(portfolioItem);
    });

    grid.innerHTML = '';
    grid.appendChild(fragment);

    const images = grid.querySelectorAll('.portfolio-image[data-src]');
    this.lazyLoader.observe(images);
  }

  handleFilterClick(filterId) {
    this.currentFilter = filterId;

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-filter') === filterId);
    });

    const items = document.querySelectorAll('.portfolio-item');

    // First, fade out items that need to be hidden
    items.forEach(item => {
      const category = item.getAttribute('data-category');
      if (filterId !== 'all' && filterId !== category) {
        item.style.opacity = '0';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300); // Wait for fade transition
      }
    });

    // Then show and fade in desired items
    setTimeout(() => {
      items.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterId === 'all' || filterId === category) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
          }, 50); // Small delay for smooth appearance
        }
      });
    }, 300);
  }
}

// Portfolio Modal
class PortfolioModal {
  constructor(data) {
    this.portfolio = data.portfolio;
    this.currentIndex = 0;
    this.filteredPortfolio = [...this.portfolio];
    this.focusableElements = null;
    this.previousActiveElement = null;
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

    // Modal controls
    this.closeBtn?.addEventListener('click', () => this.closeModal());
    this.prevBtn?.addEventListener('click', () => this.navigate(-1));
    this.nextBtn?.addEventListener('click', () => this.navigate(1));

    // Keyboard navigation
    document.addEventListener('keydown', e => {
      if (!this.modal.classList.contains('active')) return;

      const actions = {
        'Escape': () => this.closeModal(),
        'ArrowLeft': () => this.navigate(-1),
        'ArrowRight': () => this.navigate(1),
        'Tab': () => this.handleTabKey(e)
      };

      if (actions[e.key]) {
        if (e.key === 'Tab') {
          actions[e.key]();
        } else {
          actions[e.key]();
        }
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
    // Store current focus to restore later
    this.previousActiveElement = document.activeElement;

    // Update filtered portfolio based on current filter
    const currentFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
    this.filteredPortfolio = currentFilter === 'all'
      ? [...this.portfolio]
      : this.portfolio.filter(item => item.category === currentFilter);

    this.currentIndex = index;
    this.updateModalContent();
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus the close button for accessibility
    setTimeout(() => this.closeBtn?.focus(), 100);
  }

  closeModal() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';

    // Restore focus to the element that opened the modal
    this.previousActiveElement?.focus();
  }

  navigate(direction) {
    const newIndex = this.currentIndex + direction;
    if (newIndex >= 0 && newIndex < this.filteredPortfolio.length) {
      this.currentIndex = newIndex;
      this.updateModalContent();
    }
  }

  updateModalContent() {
    const item = this.filteredPortfolio[this.currentIndex];
    if (!item) return;

    this.modalImage.classList.add('loading');

    const img = new Image();
    img.onload = () => {
      this.modalImage.src = img.src;
      this.modalImage.classList.remove('loading');
    };
    img.src = item.image;

    this.modalImage.alt = `${item.title} - ${item.location}`;
    this.modalTitle.textContent = item.title;
    this.modalLocation.textContent = item.location;

    this.prevBtn.disabled = this.currentIndex === 0;
    this.nextBtn.disabled = this.currentIndex === this.filteredPortfolio.length - 1;
  }
}

// Testimonial Slider
class TestimonialSlider {
  constructor(testimonials) {
    this.testimonials = testimonials;
    this.currentIndex = 0;
    this.container = dom.get('.testimonial');
    this.dots = document.querySelectorAll('.slider-dot');
    this.interval = null;
    this.init();
  }

  init() {
    this.setupDots();
    this.startAutoRotate();
    this.updateTestimonial(0);
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
      this.container.innerHTML = `
        <div class="testimonial-content">
          <p>${testimonial.content}</p>
        </div>
        <div class="testimonial-author">${testimonial.author}</div>
        <div class="testimonial-location">${testimonial.location}</div>
      `;

      this.dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }
  }

  startAutoRotate() {
    this.interval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
      this.updateTestimonial(this.currentIndex);
    }, CONFIG.TESTIMONIAL_INTERVAL);
  }

  stopAutoRotate() {
    clearInterval(this.interval);
  }
}

// Form Handler
class FormHandler {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.init();
  }

  init() {
    this.form?.addEventListener('submit', e => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(this.form);
    const button = this.form.querySelector('button[type="submit"]');
    const originalButtonHTML = button.innerHTML;

    // Validate form
    const requiredFields = ['name', 'email', 'phone', 'message', 'service'];
    const isValid = requiredFields.every(field =>
      formData.get(field)?.toString().trim()
    );

    if (!isValid) {
      this.showError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Show loading state
    button.innerHTML = '<span class="loader"></span>';
    button.disabled = true;

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
        this.showError('Une erreur est survenue lors de l\'envoi. Veuillez réessayer plus tard.');
      }
    } catch (error) {
      this.showError('Une erreur réseau est survenue. Veuillez vérifier votre connexion.');
    } finally {
      button.innerHTML = originalButtonHTML;
      button.disabled = false;
    }
  }

  showSuccess() {
    this.form.reset();
    this.form.innerHTML = `
      <div class="form-success">
        ✅ Merci pour votre message ! Nous vous contacterons très rapidement.
      </div>
    `;
  }

  showError(message) {
    const errorDiv = utils.createElement('div', 'form-error', `❌ ${message}`);
    this.form.insertBefore(errorDiv, this.form.firstChild);
    setTimeout(() => errorDiv.remove(), 5000);
  }
}

// Scroll Animation Handler
class ScrollAnimationHandler {
  constructor() {
    this.sections = document.querySelectorAll('section:not(.hero)');
    this.init();
  }

  init() {
    this.setupInitialStyles();
    this.observeSections();
  }

  setupInitialStyles() {
    this.sections.forEach((section, index) => {
      section.style.cssText = `
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s cubic-bezier(0.19, 1, 0.22, 1),
                    transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
        transition-delay: ${index * 0.05}s;
      `;
    });
  }

  observeSections() {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Small delay for smoother sequential animations
            requestAnimationFrame(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    this.sections.forEach(section => observer.observe(section));
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
    // Initialize all components
    this.navigation = new NavigationHandler();
    this.contentManager = new DynamicContentManager(servicesData);
    this.contentManager.init();
    this.portfolioModal = new PortfolioModal(servicesData);
    this.testimonialSlider = new TestimonialSlider(testimonialsData);
    this.formHandler = new FormHandler();
    this.scrollAnimations = new ScrollAnimationHandler();

    // Performance optimizations
    this.optimizePerformance();
  }

  optimizePerformance() {
    // Note: Critical images are preloaded in HTML <head> for optimal performance
  }
}

// Start the application
const app = new App();