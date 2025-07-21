// Portfolio pagination
let currentPage = 1;
let itemsPerPage = window.innerWidth <= 992 ? 2 : 6;
let portfolioData = [];

// Unified achievements system  
let achievementsData = [];
let currentAchievementsPage = 1;
let certificationItemsPerPage = window.innerWidth <= 992 ? 2 : 6;

// Helper function to calculate total pages
function getTotalPages(dataLength, itemsPerPage) {
  return Math.ceil(dataLength / itemsPerPage);
}

// Portfolio fetch with pagination
fetch("js/portfolio.json")
  .then(response => response.json())
  .then(data => {
    portfolioData = data;
    renderPortfolioPage(1);
    setupPagination();
  })
  .catch(error => console.log(error));

function renderPortfolioPage(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageItems = portfolioData.slice(startIndex, endIndex);
  
  const portfolioCards = document.getElementById('portfolioCards');
  portfolioCards.innerHTML = '';
  
  pageItems.forEach(portfolio => {
    const techIconsHtml = portfolio.technologies ? 
      portfolio.technologies.map(tech => `
        <div class="tech-icon">
          <img src="${tech.icon}" alt="${tech.name}" title="${tech.name}">
        </div>
      `).join('') : '';

    portfolioCards.innerHTML += `
          <div class="project-card">
            <div class="project-image-container">
              <img src="${portfolio.img}" class="project-image" alt="${portfolio.name}">
            </div>
            <div class="project-card-body">
              <div class="project-content">
                <div class="project-header">
                  <h4 class="project-title" data-en="${portfolio.nameEn || portfolio.name}" data-es="${portfolio.name}">${portfolio.name}</h4>
                  <div class="project-tech-icons">
                    ${techIconsHtml}
                  </div>
                </div>
                <p class="project-description" data-en="${portfolio.descriptionEn || portfolio.description}" data-es="${portfolio.description}">${portfolio.description}</p>
                <div class="project-buttons">
                  <a href="${portfolio.demo}" class="project-btn project-btn-primary" target="_blank">
                    <i class="bi bi-globe"></i> <span data-en="Demo" data-es="Demo">Demo</span>
                  </a>
                  <a href="${portfolio.code}" class="project-btn project-btn-outline" target="_blank">
                    <i class="bi bi-code-slash"></i> <span data-en="Code" data-es="Código">Código</span>
                  </a>
                </div>
              </div>
            </div>
          </div>`
  });
  
  if (currentLanguage) {
    updateLanguage(currentLanguage);
  }
}

function setupPagination() {
  const totalPages = getTotalPages(portfolioData.length, itemsPerPage);
  
  if (totalPages > 1) {
    document.getElementById('paginationContainer').style.display = 'flex';
    document.getElementById('totalPages').textContent = totalPages;
    updatePaginationUI();
  }
}

function changePage(direction) {
  const totalPages = getTotalPages(portfolioData.length, itemsPerPage);
  const newPage = currentPage + direction;
  
  if (newPage >= 1 && newPage <= totalPages) {
    // Disable ScrollSpy temporarily to prevent interference
    if (scrollSpyInstance) {
      scrollSpyInstance.dispose();
    }
    
    currentPage = newPage;
    renderPortfolioPage(currentPage);
    updatePaginationUI();
    
    // Clean URL hash
    cleanURLHash();
    
    // Re-initialize ScrollSpy without scrolling
    setTimeout(() => {
      if (window.innerWidth > 768) {
        scrollSpyInstance = new bootstrap.ScrollSpy(document.body, {
          target: '#navbar-example2'
        });
      }
      cleanURLHash();
    }, 100);
  }
}

function updatePaginationUI() {
  const totalPages = getTotalPages(portfolioData.length, itemsPerPage);
  
  document.getElementById('currentPage').textContent = currentPage;
  document.getElementById('prevBtn').disabled = currentPage === 1;
  document.getElementById('nextBtn').disabled = currentPage === totalPages;
}

// Unified achievements system
fetch("js/achievements.json")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    achievementsData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
    currentAchievementsPage = 1;
    renderAchievementsPage(1);
    setupAchievementsPagination();
  })
  .catch(error => {
    console.error('Error loading achievements data:', error);
  });

function renderAchievementsPage(page) {
  const startIndex = (page - 1) * certificationItemsPerPage;
  const endIndex = startIndex + certificationItemsPerPage;
  const pageItems = achievementsData.slice(startIndex, endIndex);
  
  const container = document.getElementById('certificationsCard');
  
  if (!container) {
    console.error('Container with id certificationsCard not found');
    return;
  }
  
  container.innerHTML = '';
  
  pageItems.forEach((item) => {
    const name = item.name || 'Certificate name not specified';
    const nameEn = item.nameEn || name;
    const platform = item.platform || 'Platform not specified';
    const platformEn = item.platformEn || platform;
    const image = item.img || 'img/default-cert.png';
    const dateEs = item.year || 'Fecha no especificada';
    const dateEn = item.yearEn || item.year || 'Date not specified';
    
    container.innerHTML += `
      <div class="certification-card">
        <img src="${image}" alt="${name}" class="cert-image">
        <div class="certification-card-content">
          <h4 class="cert-title" data-en="${nameEn}" data-es="${name}">${name}</h4>
          <p class="cert-platform" data-en="${platformEn}" data-es="${platform}">${platform}</p>
          <p class="cert-date" data-en="${dateEn}" data-es="${dateEs}">${dateEs}</p>
        </div>
      </div>`;
  });
  
  if (currentLanguage) {
    updateLanguage(currentLanguage);
  }
  
  if (window.addImageListeners) {
    window.addImageListeners();
  }
}

function setupAchievementsPagination() {
  const totalPages = getTotalPages(achievementsData.length, certificationItemsPerPage);
  
  const paginationContainer = document.getElementById('coursesPaginationContainer');
    
  if (totalPages > 1) {
    paginationContainer.style.display = 'flex';
    document.getElementById('coursesTotalPages').textContent = totalPages;
    updateAchievementsPaginationUI();
  } else {
    paginationContainer.style.display = 'none';
  }
}

function changeCertificationPage(direction, type) {
  const totalPages = getTotalPages(achievementsData.length, certificationItemsPerPage);
  const newPage = currentAchievementsPage + direction;
  
  if (newPage >= 1 && newPage <= totalPages) {
    // Disable ScrollSpy temporarily to prevent interference
    if (scrollSpyInstance) {
      scrollSpyInstance.dispose();
    }
    
    currentAchievementsPage = newPage;
    renderAchievementsPage(currentAchievementsPage);
    updateAchievementsPaginationUI();
    
    // Clean URL hash
    cleanURLHash();
    
    // Re-initialize ScrollSpy without scrolling
    setTimeout(() => {
      if (window.innerWidth > 768) {
        scrollSpyInstance = new bootstrap.ScrollSpy(document.body, {
          target: '#navbar-example2'
        });
      }
      cleanURLHash();
    }, 100);
  }
}

function updateAchievementsPaginationUI() {
  const totalPages = getTotalPages(achievementsData.length, certificationItemsPerPage);
  
  document.getElementById('coursesCurrentPage').textContent = currentAchievementsPage;
  document.getElementById('coursesPrevBtn').disabled = currentAchievementsPage === 1;
  document.getElementById('coursesNextBtn').disabled = currentAchievementsPage === totalPages;
}

// Helper function to clean URL hash
function cleanURLHash() {
  if (window.location.hash && window.location.hash !== '#aboutMe') {
    history.replaceState(null, null, window.location.pathname);
  }
}

// Modern tabs functionality
// Helper function to remove active states on mobile
function removeActiveStatesOnMobile() {
  if (window.innerWidth <= 768) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
  }
}

// Active links scroll - Only for desktop
let scrollSpyInstance;

function initializeScrollSpy() {
  // Clean any existing instance
  if (scrollSpyInstance) {
    scrollSpyInstance.dispose();
    scrollSpyInstance = null;
  }
  
  if (window.innerWidth <= 768) {
    removeActiveStatesOnMobile();
    return;
  }
  
  if (window.innerWidth > 768) {
    // Clean URL hash before initializing
    cleanURLHash();
    
    scrollSpyInstance = new bootstrap.ScrollSpy(document.body, {
      target: '#navbar-example2'
    });
  }
}

window.addEventListener('load', initializeScrollSpy);
window.addEventListener('resize', function() {
  // Clean ScrollSpy before reinitializing
  if (scrollSpyInstance) {
    scrollSpyInstance.dispose();
    scrollSpyInstance = null;
  }
  
  // Clean URL hash
  cleanURLHash();
  
  initializeScrollSpy();
  updateItemsPerPageOnResize();
});

function updateItemsPerPageOnResize() {
  const newItemsPerPage = window.innerWidth <= 992 ? 2 : 6;
  const newCertificationItemsPerPage = window.innerWidth <= 992 ? 2 : 6;
  
  if (itemsPerPage !== newItemsPerPage) {
    itemsPerPage = newItemsPerPage;
    currentPage = 1;
    renderPortfolioPage(1);
    setupPagination();
  }
  
  if (certificationItemsPerPage !== newCertificationItemsPerPage) {
    certificationItemsPerPage = newCertificationItemsPerPage;
    currentAchievementsPage = 1;
    if (achievementsData.length > 0) {
      renderAchievementsPage(1);
      setupAchievementsPagination();
    }
  }
}

// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
  const navbarToggler = document.getElementById('navbarToggler');
  const navbarCollapse = document.getElementById('navbarNav');
  
  navbarToggler.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    
    if (!isExpanded) {
      this.classList.add('active');
    } else {
      this.classList.remove('active');
    }
  });

  navbarCollapse.addEventListener('hidden.bs.collapse', function() {
    navbarToggler.classList.remove('active');
  });

  navbarCollapse.addEventListener('shown.bs.collapse', function() {
    navbarToggler.classList.add('active');
  });
});

// Age and Experience calculation functions
function calculateAge() {
  const birthDate = new Date(2000, 3, 5); // April 5, 2000
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

function calculateExperience() {
  const startDate = new Date(2022, 8, 19); // September 19, 2022
  const today = new Date();
  
  let years = today.getFullYear() - startDate.getFullYear();
  let months = today.getMonth() - startDate.getMonth();
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  if (today.getMonth() < 8 || (today.getMonth() === 8 && today.getDate() < 19)) {
    if (years > 0) years--;
  }
  
  return Math.max(years, 0);
}

function updateAge() {
  const age = calculateAge();
  const experience = calculateExperience();
  
  const heroDescription = document.querySelector('.hero-description');
  const currentTextEs = heroDescription.getAttribute('data-es');
  const currentTextEn = heroDescription.getAttribute('data-en');
  
  const newTextEs = currentTextEs.replace(/Tengo \d+ años/, `Tengo ${age} años`);
  heroDescription.setAttribute('data-es', newTextEs);
  
  const newTextEn = currentTextEn.replace(/I'm \d+ years old/, `I'm ${age} years old`);
  heroDescription.setAttribute('data-en', newTextEn);
  
  if (currentLanguage === 'es') {
    heroDescription.innerHTML = newTextEs;
  } else {
    heroDescription.innerHTML = newTextEn;
  }
}

// Language functionality
let currentLanguage = 'es';

function initializeLanguageToggle() {
  const langToggle = document.getElementById('langToggle');
  const langOptions = document.querySelectorAll('.lang-option');
  
  langToggle.classList.add('es');
  langOptions.forEach(option => {
    if (option.getAttribute('data-lang') === 'es') {
      option.classList.add('active');
    } else {
      option.classList.remove('active');
    }
  });
  
  langToggle.addEventListener('click', function() {
    currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
    
    langToggle.classList.toggle('en');
    langToggle.classList.toggle('es');
    
    langOptions.forEach(option => {
      if (option.getAttribute('data-lang') === currentLanguage) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
    
    updateLanguage(currentLanguage);
  });
}

function updateLanguage(lang) {
  const elements = document.querySelectorAll('[data-en][data-es]');
  
  elements.forEach(element => {
    if (element.tagName === 'INPUT' && element.type !== 'submit') {
      element.placeholder = element.getAttribute('data-' + lang);
    } else {
      const text = element.getAttribute('data-' + lang);
      if (element.innerHTML.includes('<br>') || element.classList.contains('hero-description')) {
        element.innerHTML = text;
      } else {
        const icons = element.querySelectorAll('i');
        element.innerHTML = text;
        icons.forEach(icon => {
          if (text.includes('Demo') || text.includes('Código') || text.includes('Code')) {
            element.insertBefore(icon, element.firstChild);
            element.insertBefore(document.createTextNode(' '), icon.nextSibling);
          } else {
            element.appendChild(document.createTextNode(' '));
            element.appendChild(icon);
          }
        });
      }
    }
  });
}

// Scroll animations
function animateOnScroll() {
  const elements = document.querySelectorAll('.fade-in');
  const windowHeight = window.innerHeight;
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// EmailJs functionality
const btn = document.getElementById('emailButton');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   const originalText = btn.innerHTML;
   btn.innerHTML = '<span class="loading"></span> ' + (currentLanguage === 'es' ? 'Enviando...' : 'Sending...');
   btn.disabled = true;

   const serviceID = 'default_service';
   const templateID = 'template_9sc225f';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      
      Swal.fire({
        title: currentLanguage === 'es' ? '¡Mensaje enviado!' : 'Message sent!',
        text: currentLanguage === 'es' ? 'Gracias por contactarme. Te responderé pronto.' : 'Thank you for contacting me. I will respond soon.',
        icon: 'success',
        confirmButtonColor: '#4facfe',
        confirmButtonText: currentLanguage === 'es' ? 'Perfecto' : 'Perfect',
        background: 'rgba(0, 0, 0, 0.9)',
        color: '#ffffff',
        customClass: {
          popup: 'glass-card'
        }
      }).then(function(result) {
       if (result.isConfirmed) {
         clearInputs();
       }
      });
    }, (err) => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      
      Swal.fire({
        title: currentLanguage === 'es' ? 'Error' : 'Error',
        text: currentLanguage === 'es' ? 'Hubo un problema al enviar el mensaje. Por favor, intenta nuevamente.' : 'There was a problem sending the message. Please try again.',
        icon: 'error',
        confirmButtonColor: '#f5576c',
        confirmButtonText: currentLanguage === 'es' ? 'Entendido' : 'Understood',
        background: 'rgba(0, 0, 0, 0.9)',
        color: '#ffffff',
        customClass: {
          popup: 'glass-card'
        }
      });
      console.error('Error:', err);
    });
});

function clearInputs() {
  document.getElementById('name').value = "";
  document.getElementById('lastname').value = "";
  document.getElementById('email').value = "";
  document.getElementById('message').value = "";
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      // Clean URL hash before scrolling
      cleanURLHash();
      
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Clean hash again after scrolling to prevent persistence
      setTimeout(() => {
        cleanURLHash();
      }, 500);
    }
  });
});

// Image Modal Functionality
function setupImageModal() {
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const closeButton = document.querySelector('.modal-close');
  
  function openModal(imageSrc, altText) {
    modal.style.display = 'block';
    modalImage.src = imageSrc;
    modalCaption.innerHTML = altText;
    document.body.style.overflow = 'hidden';
    
    // Trigger reflow to ensure display change takes effect
    modal.offsetHeight;
    
    // Add show class for smooth transition
    modal.classList.add('show');
  }
  
  function closeModal() {
    modal.classList.remove('show');
    
    // Wait for transition to complete before hiding
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300);
  }
  
  closeButton.addEventListener('click', closeModal);
  
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
  
  function addImageListeners() {
    document.querySelectorAll('.cert-image').forEach(img => {
      img.addEventListener('click', function() {
        openModal(this.src, this.alt);
      });
    });
  }
  
  window.addImageListeners = addImageListeners;
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
  setupImageModal();
  initializeLanguageToggle();
  updateAge();
});
