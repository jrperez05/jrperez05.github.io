"use strict";
import form from "./form.js";

document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    once: true,
  });
  form();

  const nav = document.querySelector("#nav");
  const navBtn = document.querySelector("#nav-btn");
  const navBtnImg = document.querySelector("#nav-btn-img");

  navBtn.onclick = () => {
    if (nav.classList.toggle("open")) {
      navBtnImg.src = "img/icons/close.svg";
    } else {
      navBtnImg.src = "img/icons/open.svg";
    }
  };

  const header = document.querySelector("#header");
  const hero = document.querySelector("#home");
  const goToTop = document.querySelector("#goToTop");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("header nav a");

  window.addEventListener("scroll", () => {
    const triggerHeight = hero ? hero.offsetHeight - 170 : 0;

    if (window.scrollY > triggerHeight) {
      if (header) header.classList.add("header-sticky");
      if (goToTop) goToTop.classList.add("reveal");
    } else {
      if (header) header.classList.remove("header-sticky");
      if (goToTop) goToTop.classList.remove("reveal");
    }

    sections.forEach((sec) => {
      const top = window.scrollY;
      const offset = sec.offsetTop - 170;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (top >= offset && top < offset + height) {
        navLinks.forEach((links) => {
          links.classList.remove("active");
        });
        const activeLink = document.querySelector(`header nav a[href*="${id}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });
  });

  const darkModeToggle = document.querySelector("#darkModeToggle");
  const html = document.documentElement;

  const currentTheme = localStorage.getItem("theme") || "light";
  html.setAttribute("data-theme", currentTheme);

  darkModeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
});
