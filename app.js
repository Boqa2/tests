const popUp = document.querySelector("#popUp");
const button = document.querySelector("#button");
const x = document.querySelector(".but");
const cont = document.querySelector(".container");
const li = document.querySelectorAll(".list");

button.addEventListener("mouseenter", () => {
  setTimeout(() => {
    const conten = popUp.classList.remove("hidden");
    cont.style.display = "none";
    button.style.display = "none";
  }, 1000);
});

function startSlide(index) {
  li.forEach((e) => {
    e.addEventListener("click", () => {
      index == 0;
    });
  });
}
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
    autoSlideInterval = setInterval(() => changeSlide(1), 4000);
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
    }, 1200);
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

function sliderS(slider, slide, dots, next, prev, i) {
  const slidesContainer = document.querySelector(slider);
  const slides = document.querySelectorAll(slide);
  const prevButton = document.querySelector(prev);
  const nextButton = document.querySelector(next);
  const dotsContainer = document.querySelector(dots);

  let currentIndex = 0;
  let slideWidth = slides[0].clientWidth;

  function updateSlider() {
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

  li.forEach((e) => {
    e.addEventListener("click", () => {
      currentIndex = 0;
      updateSlider();
    });
  });

  function createDots() {
    slides.forEach((_, index) => {
      if (currentIndex >= 0) {
        currentIndex = 0;
      }
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
      prevButton.classList.add("disabled");
    } else {
      prevButton.classList.remove("disabled");
    }

    if (currentIndex === slides.length - 1) {
      nextButton.classList.add("disabled");
    } else {
      nextButton.classList.remove("disabled");
    }
  }

  function updateDots() {
    document.querySelectorAll(".dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
      console.log(currentIndex);
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
}

document.addEventListener("DOMContentLoaded", () => {
  sliderS(
    ".inner-choose",
    ".swiper-slide",
    ".dots-trip",
    ".custom-next",
    ".custom-prev",
    0
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

  li.forEach((e) => {
    e.addEventListener("click", () => {
      currentIndex = 0;
      updateSlider();
    });
  });

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

  li.forEach((e) => {
    e.addEventListener("click", () => {
      currentIndex = 0;
      updateSlider();
    });
  });

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
