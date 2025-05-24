document.addEventListener('DOMContentLoaded', function () {
  const aside = document.querySelector('.aside');
  const openIcon = document.querySelector('.openIcon');
  const closeIcon = document.querySelector('.closeIcon');

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
});


(function () {
  const loader = document.getElementById('page-loader');
  const aside = document.querySelector('.aside');

  function hideLoaderAndAside() {
    if (loader) loader.classList.remove('active');
    if (aside) aside.style.display = 'none'; 
  }

  window.addEventListener('load', hideLoaderAndAside);
  window.addEventListener('pageshow', hideLoaderAndAside);

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
})();


// load animation
(function () {
  const loader = document.getElementById('page-loader');

  function hideLoader() {
    if (loader) loader.classList.remove('active');
  }

  
  window.addEventListener('load', hideLoader);
  window.addEventListener('pageshow', hideLoader);

  
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
})();


