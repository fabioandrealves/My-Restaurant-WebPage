"use strict"; // Enable strict mode

// Helper function to add event listeners to elements
const addEventOnElements = (elem, type, callback) => {
  elem.forEach((item) => item.addEventListener(type, callback));
};

// Preloader functionality
const loadingElement = document.querySelector("[data-loading-container]");
window.addEventListener("load", () => {
  loadingElement.classList.add("loaded");
  document.body.classList.add("loaded");
});

// Navbar toggle functionality
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = () => {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);

const closeNavbar = () => {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("active");
};

addEventOnElements(navbarLinks, "click", closeNavbar);

// Header activation on scroll
const header = document.querySelector("[data-header]");
const headerActive = () => {
  window.scrollY > 200 ? header.classList.add("active") : header.classList.remove("active");
};

window.addEventListener("scroll", headerActive);

// Scroll reveal functionality
const revealElements = document.querySelectorAll("[data-reveal]");
const scrollReveal = () => {
  revealElements.forEach((element) => {
    if (element.getBoundingClientRect().top < window.innerHeight / 1.2) {
      element.classList.add("revealed");
    }
  });
};

window.addEventListener("scroll", scrollReveal);
window.addEventListener("load", scrollReveal);

// Button redirection
document.getElementById("Peça Agora").addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "./lib/components/menu/menu.html";
});
