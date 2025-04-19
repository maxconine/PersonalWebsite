// smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = link.getAttribute('href');
      if (target.startsWith('#')) {
        e.preventDefault();
        document.querySelector(target)
                .scrollIntoView({behavior: 'smooth'});
      }
    });
  });
  