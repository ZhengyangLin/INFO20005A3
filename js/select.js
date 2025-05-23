const minRange = document.getElementById("minRange");
  const maxRange = document.getElementById("maxRange");
  const minPrice = document.getElementById("minPrice");
  const maxPrice = document.getElementById("maxPrice");

  function updatePrices() {
    let minVal = Math.min(parseInt(minRange.value), parseInt(maxRange.value));
    let maxVal = Math.max(parseInt(minRange.value), parseInt(maxRange.value));
    minPrice.textContent = `$${minVal}`;
    maxPrice.textContent = `$${maxVal}`;
  }

  minRange.addEventListener("input", updatePrices);
  maxRange.addEventListener("input", updatePrices);
  updatePrices();



document.addEventListener('DOMContentLoaded', function () {
 
  const sortToggle = document.querySelector('.sort-toggle');
  const sortDropdown = document.querySelector('.sort-dropdown');

  if (sortToggle && sortDropdown) {
    sortToggle.addEventListener('click', function () {
      sortDropdown.classList.toggle('active');
    });
  }

 
  const filterToggle = document.querySelector('.filter-toggle');
  const filterDropdown = document.querySelector('.filter-dropdown');
  const filterLabel = document.querySelector('.filter-label');
  const filterItems = document.querySelectorAll('.filter-menu li');

  if (filterToggle && filterDropdown && filterLabel) {
    const originalFilterText = filterLabel.textContent;

    filterToggle.addEventListener('click', function () {
      filterDropdown.classList.toggle('active');
    });

    filterItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        filterLabel.textContent = item.textContent;
      });
      item.addEventListener('mouseleave', () => {
        filterLabel.textContent = originalFilterText;
      });
    });
  }

  
  document.addEventListener('click', function (e) {
    if (sortDropdown && !sortDropdown.contains(e.target)) {
      sortDropdown.classList.remove('active');
    }

    if (filterDropdown && !filterDropdown.contains(e.target)) {
      filterDropdown.classList.remove('active');
      if (filterLabel) filterLabel.textContent = filterLabel.dataset.original || 'Filters';
    }
  });
});



