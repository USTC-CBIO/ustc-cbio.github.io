const slides = [...document.querySelectorAll(".hero-slide")];
const credits = {
  en: [
    "Spatial transcriptomics · CBIO Lab",
    "Single-cell omics · CBIO Lab",
    "3D spatial reconstruction · CBIO Lab"
  ]
};
const credit = document.querySelector("[data-credit]");
let slide = 0;

function showSlide(index) {
  slides.forEach((item, i) => item.classList.toggle("on", i === index));
  if (credit) credit.textContent = credits.en[index];
}

if (slides.length) showSlide(0);
if (slides.length > 1) {
  window.setInterval(() => {
    slide = (slide + 1) % slides.length;
    showSlide(slide);
  }, 5000);
}

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".main-nav");
if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const open = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();
