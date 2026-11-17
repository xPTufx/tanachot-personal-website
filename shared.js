"use strict";

// ================= DATA =================
// Edit this section to change the website. No HTML editing needed.

// Each group becomes one block inside the Skills card (home page only).
// Add a new object to add a new group.
const skillGroups = [
    {
        title: "Programming Languages",
        items: ["Python"],
        singular: "Language",
        plural: "Languages"
    },
    {
        title: "Data Science & AI",
        items: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-Learn", "PyTorch"],
        singular: "Library",
        plural: "Libraries"
    },
    {
        title: "Spoken Languages",
        items: ["Thai (Native)", "English (CEFR B2)"],
        singular: "Language",
        plural: "Languages"
    }
];

// Footer contact icons (shown on every page).
const contacts = [
    {
        name: "LinkedIn",
        iconImg: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/960px-LinkedIn_icon.svg.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
        url: "https://www.linkedin.com/in/tanachot-jekchatree-03210a443/"
    },
    {
        name: "GitHub",
        iconLight: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/960px-GitHub_Invertocat_Logo.svg.png?utm_source=io.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
        iconDark: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-white-icon.png",
        url: "https://github.com/xPTufx"
    },
    {
        name: "Gmail",
        iconImg: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Gmail_icon_%282026%29.svg?utm_source=th.wikipedia.org&utm_campaign=index&utm_content=original",
        url: "mailto:topjekchatree@gmail.com"
    },
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
// Elements that only exist on the home page are null on other pages.
// Every feature below checks for its element first, so one file works everywhere.
const root = document.documentElement;
const themeBtn = document.querySelector("#theme-btn");
const navWrap = document.querySelector("#nav-wrap");
const navSentinel = document.querySelector("#nav-sentinel");
const navAnchors = document.querySelectorAll(".nav-links a");
const greeting = document.querySelector("#greeting");
const skillGroupsBox = document.querySelector("#skill-groups");
const footerContacts = document.querySelector("#footer-contacts");
const yearEl = document.querySelector("#year");
const topBtn = document.querySelector("#top-btn");

// ================= HELPERS =================
function getGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning ☀️";
    if (hour < 18) return "Good Afternoon 🌤️";
    return "Good Evening 🌙";
}

// ================= THEME (all pages) =================
// The button shows the mode you will switch TO ("Light Mode" while in dark mode).
// localStorage is wrapped in try/catch because some browsers block it
// (for example private mode), and the site should still work.
function setTheme(theme) {
    root.setAttribute("data-theme", theme);

    if (themeBtn) {
        themeBtn.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
    }

    try {
        localStorage.setItem("theme", theme);
    } catch (error) {
        // saving failed: the theme still works, it just won't be remembered
    }
}

function loadTheme() {
    let saved = null;

    try {
        saved = localStorage.getItem("theme");
    } catch (error) {
        // reading failed: fall back to the device setting below
    }

    if (saved === "dark" || saved === "light") {
        setTheme(saved);
    } else {
        // no saved choice yet: follow the visitor's device setting
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDark ? "dark" : "light");
    }
}

function setupThemeButton() {
    if (!themeBtn) return;

    themeBtn.addEventListener("click", function () {
        const current = root.getAttribute("data-theme");
        setTheme(current === "dark" ? "light" : "dark");
    });
}

// ================= FOOTER (all pages) =================
function renderFooterContacts() {
    if (!footerContacts) return;

    footerContacts.innerHTML = contacts
        .map((contact) => {
            // two logos (light + dark) or just one
            const icons = contact.iconLight && contact.iconDark
                ? `<img class="footer-icon icon-light" src="${contact.iconLight}" alt="">
                   <img class="footer-icon icon-dark" src="${contact.iconDark}" alt="">`
                : `<img class="footer-icon" src="${contact.iconImg}" alt="">`;

            // web links open in a new tab; mailto links open the email app instead
            const isWebLink = contact.url.startsWith("http");
            const linkTarget = isWebLink ? 'target="_blank" rel="noopener noreferrer"' : "";

            return `
                <a class="footer-link" href="${contact.url}" ${linkTarget}
                   title="${contact.name}" aria-label="${contact.name}">
                    ${icons}
                </a>
            `;
        })
        .join("");
}

function setupYear() {
    if (!yearEl) return;
    yearEl.textContent = new Date().getFullYear();
}

// ================= HOME PAGE ONLY =================
function setupGreeting() {
    if (!greeting) return;
    greeting.textContent = getGreeting();
}

// Builds one block (title, count badge, tags) for every group in skillGroups.
function renderSkillGroups() {
    if (!skillGroupsBox) return;

    skillGroupsBox.innerHTML = skillGroups
        .map((group) => {
            const count = group.items.length;
            const label = count === 1 ? group.singular : group.plural;
            const tags = group.items.map((item) => `<li>${item}</li>`).join("");

            return `
                <div class="skill-group">
                    <div class="card-head">
                        <h3>${group.title}</h3>
                        <span class="badge">${count} ${label}</span>
                    </div>
                    <ul class="tag-list">${tags}</ul>
                </div>
            `;
        })
        .join("");
}

// The sentinel is a tiny invisible element just above the nav.
// When it scrolls off the top of the screen, the nav is stuck, so we add "stuck".
function setupStickyNav() {
    if (!navWrap || !navSentinel) return;

    const observer = new IntersectionObserver(function (entries) {
        const entry = entries[0];
        const isStuck = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        navWrap.classList.toggle("stuck", isStuck);
    });

    observer.observe(navSentinel);
}

// Highlights the nav link of the section you are currently reading.
function setupActiveLinks() {
    if (navAnchors.length === 0) return;

    const sections = document.querySelectorAll("#home, #about, #education, #skills");

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                navAnchors.forEach(function (link) {
                    const isCurrent = link.getAttribute("href") === "#" + entry.target.id;
                    link.classList.toggle("active", isCurrent);
                });
            }
        });
    }, { rootMargin: "-40% 0px -50% 0px" }); // checks a line near the middle of the screen

    sections.forEach(function (section) {
        observer.observe(section);
    });
}

function setupBackToTop() {
    if (!topBtn) return;

    topBtn.classList.add("hidden");

    window.addEventListener("scroll", function () {
        topBtn.classList.toggle("hidden", window.scrollY < 400);
    });

    topBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function setupReveal() {
    const items = document.querySelectorAll(".reveal");
    if (items.length === 0) return;

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
    // all pages
    loadTheme();
    setupThemeButton();
    renderFooterContacts();
    setupYear();

    // home page only (each one quietly does nothing if its elements are missing)
    setupGreeting();
    renderSkillGroups();
    setupStickyNav();
    setupActiveLinks();
    setupBackToTop();
    setupReveal();
}

init();