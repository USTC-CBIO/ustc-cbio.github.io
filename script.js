const slides = [...document.querySelectorAll(".hero-slide")];
const credits = {
  en: [
    "Spatial transcriptomics · CBIO Lab",
    "Single-cell omics · CBIO Lab",
    "3D spatial reconstruction · CBIO Lab"
  ],
  zh: [
    "空间转录组学 · CBIO Lab",
    "单细胞组学 · CBIO Lab",
    "3D 空间重建 · CBIO Lab"
  ]
};
const credit = document.querySelector("[data-credit]");
let slide = 0;

function language() {
  return window.CBIO_I18N?.getLanguage?.() === "zh" ? "zh" : "en";
}

function showSlide(index) {
  slides.forEach((item, i) => item.classList.toggle("on", i === index));
  if (credit) credit.textContent = credits[language()][index];
}

if (slides.length) showSlide(0);
document.addEventListener("cbio:language-change", () => showSlide(slide));
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
