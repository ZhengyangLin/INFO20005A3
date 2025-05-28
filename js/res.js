document.addEventListener('DOMContentLoaded', function () {
  const loader = document.getElementById('page-loader');
  const aside = document.querySelector('.aside');
  const openIcon = document.querySelector('.openIcon');
  const closeIcon = document.querySelector('.closeIcon');

  // control the hidden sidebar
  if (openIcon && aside) {
    openIcon.addEventListener('click', () => {
      aside.style.display = 'block';
    });
  }

  if (closeIcon && aside) {
    closeIcon.addEventListener('click', () => {
      aside.style.display = 'none';
    });
  }

  // hide loader and sidebar after loading
  function hideLoaderAndAside() {
    if (loader) loader.classList.remove('active');
    if (aside) aside.style.display = 'none';
  }

  window.addEventListener('load', hideLoaderAndAside);
  window.addEventListener('pageshow', hideLoaderAndAside);

  // loading animation
  const links = document.querySelectorAll('a[href]:not(.no-loader)');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (
      href &&
      !href.startsWith('#') &&
      !href.startsWith('javascript')
    ) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        if (loader) loader.classList.add('active');
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      });
    }
  });
});
