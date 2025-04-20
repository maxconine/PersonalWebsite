// script.js

// Smooth‑scroll for in‑page anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // Lightbox gallery with prev/next
  document.addEventListener('DOMContentLoaded', () => {
    const lightbox    = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const closeBtn    = lightbox.querySelector('.close');
    const prevBtn     = lightbox.querySelector('.prev');
    const nextBtn     = lightbox.querySelector('.next');
  
    let currentGallery = [];
    let currentIndex   = 0;
  
    function updateLightbox() {
      const { src, alt } = currentGallery[currentIndex];
      lightboxImg.src = src;
      lightboxImg.alt = alt;
    }
  
    document.querySelectorAll('.image-gallery img').forEach(thumb => {
      thumb.addEventListener('click', () => {
        const galleryEls = Array.from(thumb.closest('.image-gallery').querySelectorAll('img'));
        currentGallery = galleryEls.map(img => ({ src: img.src, alt: img.alt }));
        currentIndex = galleryEls.indexOf(thumb);
        updateLightbox();
        lightbox.style.display = 'flex';
      });
    });
  
    closeBtn.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) lightbox.style.display = 'none';
    });
  
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
      updateLightbox();
    });
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % currentGallery.length;
      updateLightbox();
    });

      // keyboard support
  document.addEventListener('keydown', e => {
    if (lightbox.style.display !== 'flex') return;
    if (e.key === 'ArrowLeft')  prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'Escape')     closeBtn.click();
  });

  const heroImg = document.querySelector('.hero-image');
  if (heroImg) {
    heroImg.addEventListener('click', () => {
      const heroSection = document.getElementById('hero');
      heroSection.classList.toggle('highlight');
    });
  }

  });
  