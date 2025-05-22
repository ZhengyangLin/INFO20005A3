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