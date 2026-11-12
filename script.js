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

// Projects: one open at a time, and each has its own link (e.g. maxconine.com/#qcalc)
const projects = document.querySelectorAll('details.project');
const headerHeight = () => document.querySelector('header').offsetHeight;

function scrollToProject(project, smooth) {
  window.scrollTo({
    top: project.getBoundingClientRect().top + window.scrollY - headerHeight() - 12,
    behavior: smooth ? 'smooth' : 'instant',
  });
}

function setHash(hash) {
  const url = location.pathname + location.search + hash;
  if (location.hash !== hash) history.replaceState(null, '', url);
}

projects.forEach(project => {
  project.addEventListener('toggle', () => {
    if (!project.open) {
      if (location.hash === '#' + project.id) setHash('');
      return;
    }
    projects.forEach(other => { if (other !== project) other.open = false; });
    setHash('#' + project.id);
    // closing a long card above can push this one off-screen; bring it back
    if (project.getBoundingClientRect().top < headerHeight()) scrollToProject(project, false);
  });

  // "Copy link" button at the bottom of each project
  const details = project.querySelector('.project-details');
  if (details && project.id) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-link';
    btn.textContent = 'Copy link to this project';
    btn.addEventListener('click', async () => {
      const link = location.origin + location.pathname + '#' + project.id;
      try {
        await navigator.clipboard.writeText(link);
        btn.textContent = 'Link copied!';
      } catch {
        btn.textContent = link;
      }
      setTimeout(() => { btn.textContent = 'Copy link to this project'; }, 2000);
    });
    details.appendChild(btn);
  }
});

// Open the project named in the URL (on load, or when a #project link is followed)
function openFromHash() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!id) return;
  const project = document.getElementById(id);
  if (!project || !project.matches('details.project')) return;
  project.open = true;
  setTimeout(() => scrollToProject(project, false), 0);
}
openFromHash();
// images above the card can still shift the page while loading; settle once they're in
window.addEventListener('load', openFromHash);
window.addEventListener('hashchange', openFromHash);

// Keep the footer year current
document.querySelectorAll('.year').forEach(el => { el.textContent = new Date().getFullYear(); });
