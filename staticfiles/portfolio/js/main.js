(function () {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');
  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => preloader.remove());
  }

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll('.init-swiper').forEach(swiperElement => {
      const config = JSON.parse(swiperElement.querySelector('.swiper-config').innerHTML.trim());
      if (swiperElement.classList.contains('swiper-tab')) {
        initSwiperWithCustomPagination(swiperElement, config); // Assuming this function exists elsewhere
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  /**
   * Navmenu Scrollspy
   */
  const navmenulinks = document.querySelectorAll('.navmenu a');
  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      const section = document.querySelector(navmenulink.hash);
      if (!section) return;
      const position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }

  /**
   * DOMContentLoaded Handler
   */
  document.addEventListener('DOMContentLoaded', function () {
    // Profile hover effects
    const profileContainers = document.querySelectorAll('.single-profile');
    profileContainers.forEach(container => {
      const overlay = container.querySelector('.single-profile-overlay');
      container.addEventListener('mouseenter', () => overlay.style.transform = 'scale(1)');
      container.addEventListener('mouseleave', () => overlay.style.transform = 'scale(0)');
    });

    // Typed.js initialization
    const typedElement = document.querySelector('.typed');
    if (typedElement) {
      const typedItems = typedElement.getAttribute('data-typed-items').split(',').map(item => item.trim());
      new Typed('.typed', {
        strings: typedItems,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000,
        loop: true
      });
    }

    // Formspree form handling
    document.addEventListener('DOMContentLoaded', function () {
      const form = document.querySelector('.php-email-form');
      if (!form) {
        console.error('Form with class "php-email-form" not found');
        return;
      }
    
      const loading = form.querySelector('.loading');
      const errorMessage = form.querySelector('.error-message');
      const sentMessage = form.querySelector('.sent-message');
    
      form.addEventListener('submit', async function (e) {
        e.preventDefault();
        console.log('Form submission intercepted'); // Debug
    
        loading.style.display = 'block';
        errorMessage.style.display = 'none';
        sentMessage.style.display = 'none';
    
        try {
          const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
          });
    
          const data = await response.json();
          console.log('Formspree response:', data); // Debug
          loading.style.display = 'none';
    
          if (response.ok && data.ok) {
            sentMessage.style.display = 'block'; // Briefly show success
            setTimeout(() => {
              window.location.href = '/exit'; // Redirect to exit page
            }, 1000); // Wait 1 second to show the success message
          } else {
            errorMessage.textContent = data.error || 'Submission failed. Please try again.';
            errorMessage.style.display = 'block';
          }
        } catch (error) {
          loading.style.display = 'none';
          errorMessage.textContent = 'Network error. Please check your connection and try again.';
          errorMessage.style.display = 'block';
          console.error('Fetch error:', error);
        }
      });
    });

  /**
   * Window Load Handler
   */
  window.addEventListener('load', function () {
    aosInit();
    initSwiper();
    navmenuScrollspy();
    if (window.location.hash && document.querySelector(window.location.hash)) {
      setTimeout(() => {
        const section = document.querySelector(window.location.hash);
        const scrollMarginTop = getComputedStyle(section).scrollMarginTop;
        window.scrollTo({
          top: section.offsetTop - parseInt(scrollMarginTop),
          behavior: 'smooth'
        });
      }, 100);
    }
  });

  document.addEventListener('scroll', navmenuScrollspy);

  // Pure Counter
  new PureCounter();

  // Skills animation with Waypoint
  document.querySelectorAll('.skills-animation').forEach(item => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function () {
        item.querySelectorAll('.progress .progress-bar').forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  // GLightbox
  const glightbox = GLightbox({ selector: '.glightbox' });

  // Isotope layout and filters (outside DOMContentLoaded for imagesLoaded dependency)
  document.querySelectorAll('.isotope-layout').forEach(isotopeItem => {
    const layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    const filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    const sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), () => {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(filter => {
      filter.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({ filter: this.getAttribute('data-filter') });
        if (typeof aosInit === 'function') aosInit();
      });
    });
  });
})();