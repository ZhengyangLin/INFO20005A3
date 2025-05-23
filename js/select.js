// update the price range
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

// Drop-down menu for filters and sort options
document.addEventListener('DOMContentLoaded', function () {
  // open and close the menu
  const sortToggle = document.querySelector('.sort-toggle');
  const sortDropdown = document.querySelector('.sort-dropdown');

  if (sortToggle && sortDropdown) {
    sortToggle.addEventListener('click', function () {
      sortDropdown.classList.toggle('active');
    });
  }

  // open and close the menu
  const filterToggle = document.querySelector('.filter-toggle');
  const filterDropdown = document.querySelector('.filter-dropdown');

  if (filterToggle && filterDropdown) {
    filterToggle.addEventListener('click', function () {
      filterDropdown.classList.toggle('active');
    });
  }

  // close the menu when click another spaces
  document.addEventListener('click', function (e) {
    if (sortDropdown && !sortDropdown.contains(e.target) && !sortToggle.contains(e.target)) {
      sortDropdown.classList.remove('active');
    }

    if (filterDropdown && !filterDropdown.contains(e.target) && !filterToggle.contains(e.target)) {
      filterDropdown.classList.remove('active');
    }
  });
});




