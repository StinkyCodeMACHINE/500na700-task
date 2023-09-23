import "./scss/index.scss";

const menuItems = document.querySelector(".header__menu-items");
const headerFade = document.querySelector(".header__fade");
const arrowPrev = document.querySelector(".slider__arrow-prev");
const arrowNext = document.querySelector(".slider__arrow-next");
const slideContainer = document.querySelector(".slider__main-container");
const slides = Array.from(slideContainer.children);
const questionsContainer = document.querySelector(".faq__questions-container");
const phoneInput = document.querySelector("#phone");
const menuIcon = document.querySelector(".header__menu-icon");

const sliderTimerTime = 5000;
let selectedMenuItem, selectedQuestion;
+
//щёлкание по элементу меню
menuItems.addEventListener("click", (e) => {
  const targetMenuItem = e.target.closest(".header__menu-item");

  if (targetMenuItem && targetMenuItem != selectedMenuItem) {
    targetMenuItem.classList.toggle("selected");
    if (selectedMenuItem) {
      selectedMenuItem.classList.toggle("selected");
    }
    selectedMenuItem = targetMenuItem;
    !menuItems.classList.contains("displayed") &&
      headerFade.classList.toggle("displayed");
  }
});

//ховер по элементу меню
menuItems.addEventListener("mouseover", (e) => {
  const targetMenuItem = e.target.closest(".header__menu-item");

  if (targetMenuItem && targetMenuItem != selectedMenuItem) {
    if (selectedMenuItem) {
      selectedMenuItem.classList.toggle("selected");
      selectedMenuItem = null;
      !menuItems.classList.contains("displayed") &&
        headerFade.classList.remove("displayed");
    }
  }
});

headerFade.addEventListener("click", (e) => {
  selectedMenuItem && selectedMenuItem.classList.toggle("selected");
  selectedMenuItem = null;
  headerFade.classList.remove("displayed");
  menuItems.classList.contains("displayed") &&
    menuItems.classList.toggle("displayed");
});

//работа меню на мобилках
menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("clicked");
  menuItems.classList.toggle("displayed");
  menuItems.classList.contains;
  headerFade.classList.toggle("displayed");
});

//slider магия
function moveToSlide(currentSlide, targetSlide) {
  const slideWidth = slides[0].getBoundingClientRect().width;
  const targetSlideIndex = slides.indexOf(targetSlide);
  const quickMaths =
    window.innerWidth > 320
      ? (-slideWidth * targetSlideIndex - 20) * 0.92
      : -slideWidth * targetSlideIndex;
  slideContainer.style.transform = `translateX(${quickMaths}px)`;
  currentSlide.classList.toggle("current-slide");
  targetSlide.classList.toggle("current-slide");
}

function autoMoveSlides() {
  const currentSlide = slideContainer.querySelector(".current-slide");
  const currentSlideIndex = slides.indexOf(currentSlide);
  const nextSlide =
    currentSlideIndex === slides.length - 1
      ? slides[0]
      : currentSlide.nextElementSibling;

  moveToSlide(currentSlide, nextSlide);
  clearTimeout(slideTimer);
  slideTimer = setInterval(autoMoveSlides, sliderTimerTime);
}

arrowPrev.addEventListener("click", (e) => {
  const currentSlide = slideContainer.querySelector(".current-slide");
  const currentSlideIndex = slides.indexOf(currentSlide);
  const prevSlide =
    currentSlideIndex === 0
      ? slides[slides.length - 1]
      : currentSlide.previousElementSibling;
  moveToSlide(currentSlide, prevSlide);
  clearTimeout(slideTimer);
  slideTimer = setInterval(autoMoveSlides, sliderTimerTime);
});

arrowNext.addEventListener("click", (e) => {
  const currentSlide = slideContainer.querySelector(".current-slide");
  const currentSlideIndex = slides.indexOf(currentSlide);
  const nextSlide =
    currentSlideIndex === slides.length - 1
      ? slides[0]
      : currentSlide.nextElementSibling;

  moveToSlide(currentSlide, nextSlide);
  clearTimeout(slideTimer);
  slideTimer = setInterval(autoMoveSlides, sliderTimerTime);
});

let slideTimer = setInterval(autoMoveSlides, sliderTimerTime);

//щёлкание вопросам faq
questionsContainer.addEventListener("click", (e) => {
  const targetQuestion = e.target.closest(".faq__question-container");

  if (targetQuestion) {
    targetQuestion.classList.toggle("selected");
    if (selectedQuestion && selectedQuestion !== targetQuestion) {
      selectedQuestion.classList.remove("selected");
    }
    selectedQuestion = targetQuestion;
  }
});

//маска
function mask(e) {
  let keyCode = e.keyCode && e.keyCode;
  const pos = e.target.selectionStart;
  pos < 3 && e.preventDefault();
  let matrix = "+7 (___) ___ ____";
  let i = 0;
  const val = e.target.value.replace(/\D/g, "");
  let new_value = matrix.replace(/[_\d]/g, function (a) {
    return i < val.length ? val.charAt(i++) : a;
  });
  i = new_value.indexOf("_");
  if (i != -1) {
    i < 5 && (i = 3);
    new_value = new_value.slice(0, i);
  }
  let reg = matrix
    .substring(0, e.target.value.length)
    .replace(/_+/g, function (a) {
      return "\\d{1," + a.length + "}";
    })
    .replace(/[+()]/g, "\\$&");
  reg = new RegExp("^" + reg + "$");

  if (
    !reg.test(e.target.value) ||
    e.target.value.length < 5 ||
    (keyCode > 47 && keyCode < 58)
  ) {
    e.target.value = new_value;
  }
}

phoneInput.addEventListener("input", mask, false);
phoneInput.addEventListener("keydown", mask, false);
