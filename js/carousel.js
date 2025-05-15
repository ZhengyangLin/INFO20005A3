
  document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const carouselInner = document.querySelector(".carousel-inner");
    const items = document.querySelectorAll(".carousel-item");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const indicatorsContainer = document.querySelector(".carousel-indicators");

    let currentIndex = 0;
    const totalItems = items.length;
    let timer;

  
    for (let i = 0; i < totalItems; i++) {
      const indicator = document.createElement("button");
      indicator.classList.add("carousel-indicator");
      if (i === 0) indicator.classList.add("active");
      indicator.addEventListener("click", () => moveTo(i));
      indicatorsContainer.appendChild(indicator);
    }

    const indicators = document.querySelectorAll(".carousel-indicator");

    function updateCarousel() {
      carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
      indicators.forEach(i => i.classList.remove("active"));
      indicators[currentIndex].classList.add("active");
    }

    function moveTo(index) {
      currentIndex = index;
      updateCarousel();
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateCarousel();
    }

    
    function startAutoSlide() {
      timer = setInterval(nextSlide, 3000);
    }

    function stopAutoSlide() {
      clearInterval(timer);
    }

  
    nextBtn.addEventListener("click", () => {
      stopAutoSlide();
      nextSlide();
      startAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
      stopAutoSlide();
      prevSlide();
      startAutoSlide();
    });

    carousel.addEventListener("mouseenter", stopAutoSlide);
    carousel.addEventListener("mouseleave", startAutoSlide);

    startAutoSlide();
  });

