document.addEventListener('DOMContentLoaded', function () {
  const aside = document.querySelector('.aside');
  const filAside = document.querySelector('.filAside');
  const openIcon = document.querySelector('.openIcon');
  const closeIcon = document.querySelector('.closeIcon');
  const closeIcon1 = document.querySelector('.closeIcon1');
  const filters = document.querySelector('#filters');

 
  if (openIcon && aside) {
    openIcon.addEventListener('click', () => {
      aside.style.display = 'block';
    });
  }

  if (filters && filAside) {
    filters.addEventListener('click', () => {
      filAside.style.display = 'block';
    });
  }

  if (closeIcon && aside) {
    closeIcon.addEventListener('click', () => {
      console.log(1);
      aside.style.display = 'none';
    });
  }


  if (closeIcon1 && filAside) {
    closeIcon1.addEventListener('click', () => {
      filAside.style.display = 'none';
    });
  }
});

const loader = document.getElementById('page-loader');
  const links = document.querySelectorAll('a');

  links.forEach(link => {
    if (link.getAttribute('href') && !link.getAttribute('href').startsWith('#') && !link.getAttribute('href').startsWith('javascript')) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        loader.style.display = 'flex';
        const target = this.getAttribute('href');
        setTimeout(() => {
          window.location.href = target;
        }, 300); 
      });
    }
  });