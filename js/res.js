// side bar in the mobile version
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
      console.log(1);
      aside.style.display = 'none';
    });
  }


 
});

// load animation

window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if (loader) {
    loader.style.display = 'none';
  }
});

const loader = document.getElementById('page-loader');
const links = document.querySelectorAll('a');

links.forEach(link => {
  const href = link.getAttribute('href');
  if (
    href &&
    !href.startsWith('#') &&
    !href.startsWith('javascript') &&
    !link.classList.contains('no-loader')
  ) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      loader.style.display = 'flex';
      setTimeout(() => {
        window.location.href = href;
      }, 300);
    });
  }
});
