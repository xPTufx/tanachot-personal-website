"use strict";

// ================= DATA =================
// Edit these arrays to change the website. No HTML editing needed.
const skills = ["Statistics", "Data Analytics", "Data Science"];
const tools = ["Python"]; // change these to the tools you really use

const contacts = [
    {
        name: "Instagram",
        iconImg: "https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg",
        url: "https://www.instagram.com/xptufx/"
    },
    {
        name: "Facebook",
        iconImg: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
        url: "https://www.facebook.com/Dark.LightXD"
    }
];

// ================= ELEMENTS =================
const root = document.documentElement;
const themeBtn = document.querySelector("#theme-btn");
const menuBtn = document.querySelector("#menu-btn");
const navLinks = document.querySelector("#nav-links");
const greeting = document.querySelector("#greeting");
const skillsList = document.querySelector("#skills-list");
const skillsCount = document.querySelector("#skills-count");
const toolsList = document.querySelector("#tools-list");
const toolsCount = document.querySelector("#tools-count");
const footerContacts = document.querySelector("#footer-contacts");
const topBtn = document.querySelector("#top-btn");

// ================= HELPERS =================
function getGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning ☀️";
    if (hour < 18) return "Good Afternoon 🌤️";
    return "Good Evening 🌙";
}

// ================= THEME =================
// The button shows the mode you will switch TO ("Light" while in dark mode).
function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    themeBtn.textContent = theme === "dark" ? "Light" : "Dark";
    localStorage.setItem("theme", theme);
}

function loadTheme() {
    const saved = localStorage.getItem("theme");

    if (saved) {
        setTheme(saved);
    } else {
        // no saved choice yet: follow the visitor's device setting
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDark ? "dark" : "light");
    }
}

themeBtn.addEventListener("click", function () {
    const current = root.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
});

// ================= RENDER =================
// One reusable function fills any tag list and its badge.
function renderTags(listElement, countElement, items, singular, plural) {
    listElement.innerHTML = items
        .map((item) => `<li>${item}</li>`)
        .join("");

    const label = items.length === 1 ? singular : plural;
    countElement.textContent = items.length + " " + label;
}

function renderFooterContacts() {
    footerContacts.innerHTML = contacts
        .map((contact) => `
            <a class="footer-link" href="${contact.url}" target="_blank"
               rel="noopener noreferrer" title="${contact.name}" aria-label="${contact.name}">
                <img class="footer-icon" src="${contact.iconImg}" alt="">
            </a>
        `)
        .join("");
}

// ================= MOBILE MENU =================
menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("open");
});

// close the menu after tapping a link
navLinks.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
        navLinks.classList.remove("open");
    }
});

// ================= BACK TO TOP =================
window.addEventListener("scroll", function () {
    topBtn.classList.toggle("hidden", window.scrollY < 400);
});

topBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ================= SCROLL REVEAL =================
function setupReveal() {
    const items = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // animate only once
            }
        });
    }, { threshold: 0.15 });

    items.forEach(function (item) {
        observer.observe(item);
    });
}

// ================= START =================
function init() {
    loadTheme();
    greeting.textContent = getGreeting();
    document.querySelector("#year").textContent = new Date().getFullYear();

    renderTags(skillsList, skillsCount, skills, "Skill", "Skills");
    renderTags(toolsList, toolsCount, tools, "Tool", "Tools");
    renderFooterContacts();

    setupReveal();
    topBtn.classList.add("hidden");
}

init();