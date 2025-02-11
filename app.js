const popUp = document.querySelector("#popUp");
const button = document.querySelector("#button");
const x = document.querySelector(".but");
const cont = document.querySelector(".container");

button.addEventListener("mouseenter", () => {
  setTimeout(() => {
    const conten = popUp.classList.remove("hidden");
    cont.style.display = "none";
    button.style.display = "none";
  }, 1000);
});

document.addEventListener("DOMContentLoaded", function () {
  const slidesContainer = document.querySelector(".slider-inner");
  const slides = document.querySelectorAll(".slide");
  const menuItems = document.querySelectorAll(".list");
  const x = document.querySelector(".but");

  let currentIndex = 0;
  let slideHeight = document.querySelector(".slider-container").clientHeight;
  let autoSlideInterval;

  function updateSlider() {
    slidesContainer.style.transform = `translateY(${
      -currentIndex * slideHeight
    }px)`;
    menuItems.forEach((item, index) =>
      item.classList.toggle("active", index === currentIndex)
    );
  }

  function changeSlide(delta) {
    currentIndex = (currentIndex + delta + slides.length) % slides.length;
    updateSlider();
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => changeSlide(1), 7000);
  }
  window.goToSlide = function (index) {
    currentIndex = index;
    updateSlider();
    clearInterval(autoSlideInterval);
  };
  button.addEventListener("mouseenter", () => {
    setTimeout(() => {
      popUp.classList.remove("hidden");
      currentIndex = 0;
      updateSlider();
      cont.style.display = "none";
      button.style.display = "none";
    }, 1000);
  });
  x.addEventListener("click", () => {
    popUp.classList.add("hidden");

    currentIndex = 0;
    updateSlider();

    setTimeout(() => {
      button.style.display = "block";
      cont.style.display = "flex";
    }, 0);
  });
  slidesContainer.addEventListener(
    "touchstart",
    (event) => (this.startY = event.touches[0].clientY)
  );
  slidesContainer.addEventListener("touchend", (event) => {
    const endY = event.changedTouches[0].clientY;
    changeSlide(
      this.startY - endY > 50 ? 1 : this.startY - endY < -50 ? -1 : 0
    );
  });

  slidesContainer.addEventListener("mouseenter", () =>
    clearInterval(autoSlideInterval)
  );
  slidesContainer.addEventListener("mouseleave", startAutoSlide);

  menuItems.forEach((item) =>
    item.addEventListener("click", () => {
      currentIndex = parseInt(item.getAttribute("data-slide-index"));
      updateSlider();
      clearInterval(autoSlideInterval);
    })
  );

  window.addEventListener("resize", () => {
    slideHeight = document.querySelector(".slider-container").clientHeight;
    updateSlider();
  });

  updateSlider();
  startAutoSlide();

  function goToSlide(index) {
    if (currentIndex === index) updateSlider();
  }

  return goToSlide();
});

function sliderS(slider, slide, dots, next, prev) {
  const slidesContainer = document.querySelector(slider);
  const slides = document.querySelectorAll(slide);
  const prevButton = document.querySelector(prev);
  const nextButton = document.querySelector(next);
  const dotsContainer = document.querySelector(dots);

  let currentIndex = 1; 
  let slideWidth = slides[0].offsetWidth;

  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  slidesContainer.appendChild(firstClone);
  slidesContainer.insertBefore(lastClone, slidesContainer.firstChild);

  const allSlides = document.querySelectorAll(slide);
  const realSlidesCount = slides.length;

  slidesContainer.style.transform = `translateX(${
    -currentIndex * slideWidth
  }px)`;

  function updateSlider() {
    slidesContainer.style.transform = `translateX(${
      -currentIndex * slideWidth
    }px)`;
    updateDots();
    updateText(); 
  }

  function nextSlide() {
    if (currentIndex >= allSlides.length - 1) return;
    currentIndex++;
    updateSlider();

    if (currentIndex === allSlides.length - 1) {
      setTimeout(() => {
        slidesContainer.style.transition = "none";
        currentIndex = 1;
        slidesContainer.style.transform = `translateX(${
          -currentIndex * slideWidth
        }px)`;
        updateDots();
        updateText();
      }, 500);
    }
  }

  function prevSlide() {
    if (currentIndex <= 0) return;
    currentIndex--;
    updateSlider();

    if (currentIndex === 0) {
      setTimeout(() => {
        slidesContainer.style.transition = "none";
        currentIndex = allSlides.length - 2;
        slidesContainer.style.transform = `translateX(${
          -currentIndex * slideWidth
        }px)`;
        updateDots();
        updateText();
      }, 500);
    }
  }

  function createDots() {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < realSlidesCount; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goToSlide(index) {
    currentIndex = index + 1;
    updateSlider();
  }

  function updateDots() {
    document.querySelectorAll(".dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex - 1);
    });
  }

  function updateText() {
    document.querySelectorAll(".text-slider").forEach((text, index) => {
      text.style.display = index === currentIndex - 0 ? "block" : "none";
    });
  }

  prevButton.addEventListener("click", () => {
    prevSlide();
  });

  nextButton.addEventListener("click", () => {
    nextSlide();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      nextSlide();
    } else if (event.key === "ArrowLeft") {
      prevSlide();
    }
  });

  createDots();
  updateSlider();
  updateText(); 
}


document.addEventListener("DOMContentLoaded", () => {
  sliderS(
    ".inner-choose",
    ".swiper-slide",
    ".dots-trip",
    ".custom-next",
    ".custom-prev"
  );
});

document.addEventListener("DOMContentLoaded", function () {
  const slidesContainer = document.querySelector(".family");
  const slides = document.querySelectorAll(".slide-family");
  const prevButton = document.querySelector(".custom-prevs-f");
  const nextButton = document.querySelector(".custom-nexts-f");
  const dotsContainer = document.querySelector(".dots-family");

  let currentIndex = 0;

  function updateSlider() {
    let slideWidth = slides[0].offsetWidth;
    slidesContainer.style.transform = `translateX(${
      -currentIndex * slideWidth
    }px)`;
    updateDots();
    updateButtons();
  }

  function nextSlide() {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateSlider();
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  }

  function createDots() {
    dotsContainer.innerHTML = "";
    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (index === currentIndex) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    });
  }
  function updateButtons() {
    if (currentIndex === 0) {
      prevButton.disabled = true;
      prevButton.classList.add("disabled");
    } else {
      prevButton.disabled = false;
      prevButton.classList.remove("disabled");
    }

    if (currentIndex === slides.length - 1) {
      nextButton.disabled = true;
      nextButton.classList.add("disabled");
    } else {
      nextButton.disabled = false;
      nextButton.classList.remove("disabled");
    }
  }

  function updateDots() {
    const allDots = dotsContainer.querySelectorAll(".dot");
    allDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  prevButton.addEventListener("click", () => {
    prevSlide();
  });

  nextButton.addEventListener("click", () => {
    nextSlide();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      nextSlide();
    } else if (event.key === "ArrowLeft") {
      prevSlide();
    }
  });

  createDots();
  updateSlider();

  window.addEventListener("resize", updateSlider);
});
function sliderFunction(slider, slide, dots, next, prev, i) {
  const slidesContainer = document.querySelector(slider);
  const slides = document.querySelectorAll(slide);
  const prevButton = document.querySelector(prev);
  const nextButton = document.querySelector(next);
  const dotsContainer = document.querySelector(dots);

  let currentIndex = i;

  function updateSlider() {
    let slideWidth = slides[0].offsetWidth;
    slidesContainer.style.transform = `translateX(${
      -currentIndex * slideWidth
    }px)`;
    updateDots();
    updateButtons();
  }

  function nextSlide() {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateSlider();
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  }

  function updateButtons() {
    if (currentIndex === 0) {
      prevButton.disabled = true;
      prevButton.classList.add("disabled");
    } else {
      prevButton.disabled = false;
      prevButton.classList.remove("disabled");
    }

    if (currentIndex === slides.length - 1) {
      nextButton.disabled = true;
      nextButton.classList.add("disabled");
    } else {
      nextButton.disabled = false;
      nextButton.classList.remove("disabled");
    }
  }

  function createDots() {
    dotsContainer.innerHTML = "";
    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (index === currentIndex) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateDots() {
    const allDots = dotsContainer.querySelectorAll(".dot");
    allDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  prevButton.addEventListener("click", () => {
    prevSlide();
  });

  nextButton.addEventListener("click", () => {
    nextSlide();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      nextSlide();
    } else if (event.key === "ArrowLeft") {
      prevSlide();
    }
  });

  createDots();
  updateSlider();

  window.addEventListener("resize", updateSlider);
}

document.addEventListener("DOMContentLoaded", () => {
  sliderFunction(
    ".swiper-pals",
    ".swipe-pals",
    ".dots-pals",
    ".custom-nexts",
    ".custom-prevs",
    0
  );
  sliderFunction(
    ".partners-slide",
    ".partners",
    ".dots-partners",
    ".custom-nexts1",
    ".custom-prevs1",
    0
  );
});
