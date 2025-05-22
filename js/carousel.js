document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".carousel").forEach((carousel) => {
    const carouselInner = carousel.querySelector(".carousel-inner");
    const items = carousel.querySelectorAll(".carousel-item");
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");
    const indicatorsContainer = carousel.querySelector(".carousel-indicators");

    let currentIndex = 0;
    const totalItems = items.length;

   
    for (let i = 0; i < totalItems; i++) {
      const btn = document.createElement("button");
      btn.classList.add("carousel-indicator");
      if (i === 0) btn.classList.add("active");
      btn.addEventListener("click", () => {
        currentIndex = i;
        updateCarousel();
      });
      indicatorsContainer.appendChild(btn);
    }

    const indicators = carousel.querySelectorAll(".carousel-indicator");

    function updateCarousel() {
      carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
      indicators.forEach((btn) => btn.classList.remove("active"));
      indicators[currentIndex].classList.add("active");
    }

    function moveNext() {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    }

    function movePrev() {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateCarousel();
    }

   
    setInterval(moveNext, 5000);

    nextBtn.addEventListener("click", moveNext);
    prevBtn.addEventListener("click", movePrev);

    updateCarousel();
  });
});