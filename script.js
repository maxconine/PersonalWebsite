// Lightbox gallery with prev/next
const lightbox    = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-image');
const caption     = document.getElementById('lightbox-caption');
const closeBtn    = lightbox.querySelector('.close');
const prevBtn     = lightbox.querySelector('.prev');
const nextBtn     = lightbox.querySelector('.next');

let currentGallery = [];
let currentIndex   = 0;
let lastFocused    = null;

const fullSrc = img => img.dataset.full || img.src;

function updateLightbox() {
  const { src, alt } = currentGallery[currentIndex];
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  caption.textContent = alt;
}

function openLightbox(items, index) {
  currentGallery = items;
  currentIndex = index;
  lastFocused = document.activeElement;
  updateLightbox();
  lightbox.classList.toggle('single', items.length < 2);
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  closeBtn.focus();
}

function closeLightbox() {
  lightbox.style.display = 'none';
  document.body.style.overflow = '';
  lightboxImg.removeAttribute('src');
  if (lastFocused) lastFocused.focus();
}

function step(delta) {
  currentIndex = (currentIndex + delta + currentGallery.length) % currentGallery.length;
  updateLightbox();
}

document.querySelectorAll('.image-gallery img').forEach(thumb => {
  thumb.tabIndex = 0;
  const open = () => {
    const galleryEls = Array.from(thumb.closest('.image-gallery').querySelectorAll('img'));
    openLightbox(galleryEls.map(img => ({ src: fullSrc(img), alt: img.alt })), galleryEls.indexOf(thumb));
  };
  thumb.addEventListener('click', open);
  thumb.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  });
});

const heroImg = document.querySelector('.hero-image');
if (heroImg) {
  heroImg.addEventListener('click', () => {
    openLightbox([{ src: fullSrc(heroImg), alt: heroImg.alt }], 0);
  });
}

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', () => step(-1));
nextBtn.addEventListener('click', () => step(1));
lightbox.addEventListener('click', e => {
  if (e.target === lightbox || e.target.classList.contains('lightbox-content')) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (lightbox.style.display !== 'flex') return;
  if (e.key === 'ArrowLeft')  step(-1);
  if (e.key === 'ArrowRight') step(1);
  if (e.key === 'Escape')     closeLightbox();
});

// Only one project open at a time
const projects = document.querySelectorAll('details.project');
projects.forEach(project => {
  project.addEventListener('toggle', () => {
    if (!project.open) return;
    projects.forEach(other => { if (other !== project) other.open = false; });
    // closing a long card above can push this one off-screen; bring it back
    const headerH = document.querySelector('header').offsetHeight;
    if (project.getBoundingClientRect().top < headerH) {
      window.scrollTo({ top: project.getBoundingClientRect().top + window.scrollY - headerH - 12 });
    }
  });
});

// Keep the footer year current
document.querySelectorAll('.year').forEach(el => { el.textContent = new Date().getFullYear(); });
