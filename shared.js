"use strict";

// ================= DATA =================
// Edit this section to change the website. No HTML editing needed.

// Each group becomes one block in the Skills section (home page only).
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

// ---------------------------------------------------------------
// PROJECTS (My Works page)
//
// HOW TO ADD A PROJECT:
//   1. Copy one whole { ... } block below, including the comma after it.
//   2. Paste it at the TOP of the list (newest first looks best).
//   3. Change the text. Delete any line you don't need; every field
//      except "title" is optional and simply won't show if left out.
//
// FIELDS:
//   title       Project name (required)
//   category    Used for the filter buttons, e.g. "Data Analysis", "Web", "Competition".
//               Filter buttons appear automatically when you have 2+ categories.
//   year        e.g. "2024" or "Jun 2026"
//   summary     One or two sentences: what is it?
//   problem     Why did you make it / what question did it answer?
//   role        What you did (especially for team projects)
//   result      A number, an award, a demo, or what you learned
//   reflection  "What I'd do differently now" (shows growth, great for older projects)
//   tools       List of tools used, e.g. ["Python", "Pandas"]
//   image       Path to a screenshot/chart/photo, e.g. "images/projects/pm25.png"
//               (if the file is missing, the card just shows without an image)
//   imageAlt    Short description of the image (for screen readers)
//   links       List of buttons: { label: "GitHub", url: "https://..." }
//
// To show the "To Be Continue" message again, make the list empty: const projects = [];
// Plain text only: characters like & and ' are fine, but HTML tags will show as text.
// ---------------------------------------------------------------
const projects = [
    {
        title: "Thailand's Imports and Exports of Fishery Products",
        category: "Data Analysis",
        year: "2026",
        summary: "According to the data, Thailand has firmly maintained its position as a trade surplus economy.",
        problem: "How does Thailand structure its strategy for the international trade of fishery products?",
        role: "Data Analyst (Solo Project)",
        result: "Thailand runs a trade deficit with resource-rich regions such as the Pacific island nations and its immediate neighbors to secure raw materials for production, while maintaining a trade surplus with nations possessing high purchasing power including the United States, Japan, and countries in the Middle East.",
        tools: ["Python", "NumPy", "Pandas", "Matplotlib"],
        image: "images/Thailand's_Fishery_Products.jpg",
        imageAlt: "Thailand's Fisheries Products",
        links: [
            { label: "Data Source", url: "https://www.thackle.or.th/th/dataset/93" },
            { label: "Google Colab", url: "https://colab.research.google.com/drive/1wMkF8ZyIqC2qu14bOYaAtTkkVaQJoAyS?usp=sharing" }
        ]
    },
    {
        title: "Storm Express: Delivery Time Prediction Challenge",
        category: "Machine Learning",
        year: "2025",
        summary: "It was a team-based Kaggle competition and the metric used to evaluate the model was Mean Absolute Error (MAE).",
        problem: "The Storm Express aims to predict delivery times as accurately as possible, based on historical data for each package such as distance, weight, and destination.",
        role: "Machine Learning Engineer (Selecting algorithms, tuning hyperparameters, validating models)",
        result: 'Our machine learning model ranked 7th place out of 88 teams. The model was developed under the team name "027-Apple Intelligence"',
        tools: ["Python", "NumPy", "Pandas", "Scikit-Learn", "Optuna", "CatBoost", "XGBoost", "LightGBM"],
        image: "images/Delivery_Time.jpg",
        imageAlt: "Delivery Time",
        links: [
            { label: "Kaggle Competition", url: "https://www.kaggle.com/competitions/hackathon-2-storm-express-delivery-time-prediction" },
            { label: "Google Colab", url: "https://colab.research.google.com/drive/1wBgsGx11XUaLVys3o8aqDdLy3_uXPUiH?usp=sharing" }
        ]
    }
];

// Footer contact icons (shown on every page).
const contacts = [
    {
        name: "LinkedIn",
        iconImg: "images/LinkedIn_icon.webp",
        url: "https://www.linkedin.com/in/tanachot-jekchatree-03210a443/"
    },
    {
        name: "GitHub",
        iconLight: "images/GitHub_iconLight.webp",
        iconDark: "images/GitHub_iconDark.webp",
        url: "https://github.com/xPTufx"
    },
    {
        name: "Gmail",
        iconImg: "images/Gmail_icon.svg",
        url: "mailto:topjekchatree@gmail.com"
    },
    {
        name: "Instagram",
        iconImg: "images/Instagram_icon.svg",
        url: "https://www.instagram.com/xptufx/"
    },
    {
        name: "Facebook",
        iconImg: "images/Facebook_icon.png",
        url: "https://www.facebook.com/Dark.LightXD"
    }
];

// ================= ELEMENTS =================
// Elements that only exist on some pages are null on the others.
// Every feature below checks for its element first, so one file works everywhere.
const root = document.documentElement;
const themeBtn = document.querySelector("#theme-btn");
const greeting = document.querySelector("#greeting");
const skillGroupsBox = document.querySelector("#skill-groups");
const footerContacts = document.querySelector("#footer-contacts");
const yearEl = document.querySelector("#year");
const topBtn = document.querySelector("#top-btn");
const filterBar = document.querySelector("#filter-bar");
const projectList = document.querySelector("#project-list");
const worksEmpty = document.querySelector("#works-empty");

// ================= HELPERS =================
function getGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning ☀️";
    if (hour < 18) return "Good Afternoon 🌤️";
    return "Good Evening 🌙";
}

// Makes text safe to place inside HTML, so characters like < or & can't break the page.
function escapeHTML(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
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
                    <div class="group-head">
                        <h3>${group.title}</h3>
                        <span class="badge">${count} ${label}</span>
                    </div>
                    <ul class="tag-list">${tags}</ul>
                </div>
            `;
        })
        .join("");
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

// ================= WORKS PAGE ONLY =================
let activeCategory = "All";

// Builds one card from one object in the projects array.
// Any field that is missing is simply left out.
function buildProjectCard(project) {
    // small line above the title: category + year
    const meta = [project.category, project.year]
        .filter(Boolean)
        .map(escapeHTML)
        .join(" · ");

    const image = project.image
        ? `<div class="project-img">
               <img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.imageAlt || project.title)}" loading="lazy">
           </div>`
        : "";

    const summary = project.summary
        ? `<p class="project-summary">${escapeHTML(project.summary)}</p>`
        : "";

    // label + text rows (only the ones that have text)
    const rows = [
        ["Problem", project.problem],
        ["My role", project.role],
        ["Result", project.result],
        ["What I'd do differently", project.reflection]
    ]
        .filter((row) => row[1])
        .map((row) => `
            <div class="project-row">
                <dt>${escapeHTML(row[0])}</dt>
                <dd>${escapeHTML(row[1])}</dd>
            </div>
        `)
        .join("");

    const details = rows ? `<dl class="project-details">${rows}</dl>` : "";

    const tools = project.tools && project.tools.length > 0
        ? `<ul class="tag-list tag-list-small">
               ${project.tools.map((tool) => `<li>${escapeHTML(tool)}</li>`).join("")}
           </ul>`
        : "";

    const links = project.links && project.links.length > 0
        ? `<div class="project-links">
               ${project.links.map((link) => {
                   const isWebLink = link.url.startsWith("http");
                   const linkTarget = isWebLink ? 'target="_blank" rel="noopener noreferrer"' : "";
                   return `<a class="project-link" href="${escapeHTML(link.url)}" ${linkTarget}>${escapeHTML(link.label)} ↗</a>`;
               }).join("")}
           </div>`
        : "";

    return `
        <article class="project-card">
            ${image}
            <div class="project-body">
                ${meta ? `<p class="project-meta">${meta}</p>` : ""}
                <h2 class="project-title">${escapeHTML(project.title)}</h2>
                ${summary}
                ${details}
                ${tools}
                ${links}
            </div>
        </article>
    `;
}

// Shows the cards that match the active filter.
function renderProjects() {
    if (!projectList) return;

    const visible = activeCategory === "All"
        ? projects
        : projects.filter((project) => project.category === activeCategory);

    projectList.innerHTML = visible.map(buildProjectCard).join("");

    // if an image file is missing or broken, remove it so no empty box is left behind
    projectList.querySelectorAll(".project-img img").forEach(function (img) {
        img.addEventListener("error", function () {
            img.parentElement.remove();
        });
    });
}

// Builds the filter buttons from the categories found in the projects array.
function renderFilters() {
    if (!filterBar) return;

    const categories = [];
    projects.forEach(function (project) {
        if (project.category && !categories.includes(project.category)) {
            categories.push(project.category);
        }
    });

    // filters are only useful with 2 or more categories
    if (categories.length < 2) {
        filterBar.hidden = true;
        return;
    }

    const names = ["All"].concat(categories);

    filterBar.innerHTML = names
        .map((name) => `
            <button class="filter-btn${name === activeCategory ? " active" : ""}"
                    type="button" data-category="${escapeHTML(name)}"
                    aria-pressed="${name === activeCategory}">
                ${escapeHTML(name)}
            </button>
        `)
        .join("");

    filterBar.hidden = false;

    filterBar.addEventListener("click", function (event) {
        const button = event.target.closest(".filter-btn");
        if (!button) return;

        activeCategory = button.dataset.category;

        filterBar.querySelectorAll(".filter-btn").forEach(function (btn) {
            const isActive = btn === button;
            btn.classList.toggle("active", isActive);
            btn.setAttribute("aria-pressed", isActive);
        });

        renderProjects();
    });
}

function setupWorksPage() {
    if (!projectList) return;

    // no projects yet: show the "To Be Continue" message instead
    if (projects.length === 0) {
        projectList.hidden = true;
        if (worksEmpty) worksEmpty.hidden = false;
        return;
    }

    renderFilters();
    renderProjects();
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
    setupBackToTop();
    setupReveal();

    // works page only
    setupWorksPage();
}

init();