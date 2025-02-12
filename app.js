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
  const text = document.querySelector('#animetion-text')
  const body = document.querySelector('body')

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
    autoSlideInterval = setInterval(() => changeSlide(1), 12000);
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
      body.classList.add("width")
      text.classList.add("text-animation") 
      cont.style.display = "none";
      button.style.display = "none";
    }, 1000);
  });
  x.addEventListener("click", () => {
    popUp.classList.add("hidden");
    currentIndex = 0;
    updateSlider();
    setTimeout(() => {
      body.classList.remove("width")
      text.classList.remove("text-animation")
      button.style.display = "flex";
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
  let slideWidth = slides[0].clientWidth;
  console.log(slideWidth);

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
      }, 0);
    }
  }

  function prevSlide() {
    if (currentIndex <= 0) return;
    currentIndex--;
    updateSlider();

    if (currentIndex === 0) {
      setTimeout(() => {
        currentIndex = allSlides.length - 2;
        slidesContainer.style.transition = "transform 0.5s ease";
        slidesContainer.style.transform = `translateX(${
          -currentIndex * slideWidth
        }px)`;
        updateDots();
        updateText();
      }, 0);
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

document.addEventListener("DOMContentLoaded", () => {
  function initSlider(slider, slide, dots, next, prev, startIndex = 1) {
    const slidesContainer = document.querySelector(slider);
    const slides = document.querySelectorAll(slide);
    const prevButton = document.querySelector(prev);
    const nextButton = document.querySelector(next);
    const dotsContainer = document.querySelector(dots);
    let slideWidth = slides[0].offsetWidth;
    let currentIndex = startIndex;
    let autoSlideInterval;

    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    slidesContainer.appendChild(firstClone);
    slidesContainer.insertBefore(lastClone, slidesContainer.firstChild);

    let allSlides = document.querySelectorAll(slide);

    slidesContainer.style.transform = `translateX(${
      -currentIndex * slideWidth
    }px)`;

    function updateSlider(transition = true) {
      slideWidth = slides[0].offsetWidth;
      slidesContainer.style.transition = transition
        ? "transform 0.4s ease-in-out"
        : "none";
      slidesContainer.style.transform = `translateX(${
        -currentIndex * slideWidth
      }px)`;
      updateDots();
    }

    function nextSlide() {
      if (currentIndex >= allSlides.length - 1) return;
      currentIndex++;
      updateSlider();

      if (currentIndex === allSlides.length - 1) {
        setTimeout(() => {
          slidesContainer.style.transition = "none";
          currentIndex = 1;
          updateSlider(false);
        }, 400);
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
          updateSlider(false);
        }, 400);
      }
    }

    function startAutoSlide() {
      stopAutoSlide();
      autoSlideInterval = setInterval(() => {
        nextSlide();
      }, 3500);
    }

    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    function createDots() {
      dotsContainer.innerHTML = "";
      for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dot.addEventListener("click", () => {
          stopAutoSlide();
          goToSlide(i + 1);
          startAutoSlide();
        });
        dotsContainer.appendChild(dot);
      }
      updateDots();
    }

    function goToSlide(index) {
      currentIndex = index;
      updateSlider();
    }

    function updateDots() {
      dotsContainer.querySelectorAll(".dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex - 1);
      });
    }

    prevButton.addEventListener("click", () => {
      stopAutoSlide();
      prevSlide();
      startAutoSlide();
    });

    nextButton.addEventListener("click", () => {
      stopAutoSlide();
      nextSlide();
      startAutoSlide();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
      } else if (event.key === "ArrowLeft") {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
      }
    });

    slidesContainer.addEventListener("mouseenter", stopAutoSlide);
    slidesContainer.addEventListener("mouseleave", startAutoSlide);

    createDots();
    updateSlider();
    startAutoSlide();
    window.addEventListener("resize", () => updateSlider(false));
  }

  initSlider(
    ".swiper-pals",
    ".swipe-pals",
    ".dots-pals",
    ".custom-nexts",
    ".custom-prevs"
  );
  initSlider(
    ".partners-slide",
    ".partners",
    ".dots-partners",
    ".custom-nexts1",
    ".custom-prevs1"
  );
  initSlider(
    ".family",
    ".slide-family",
    ".dots-family",
    ".custom-nexts-f",
    ".custom-prevs-f"
  );
});
