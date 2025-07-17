import { SELECTORS, ATTRIBUTES, CLASS_NAMES, TEXTS } from './constants.js';

export function setupSmoothScrolling() {
    document.querySelectorAll(SELECTORS.HEADER_ANCHORS).forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute(ATTRIBUTES.HREF);
            document.querySelector(targetId).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
}

export function setupScrollSpy() {
    const navLinks = document.querySelectorAll(SELECTORS.HEADER_ANCHORS);
    const sections = document.querySelectorAll(SELECTORS.SECTIONS);

    window.addEventListener("scroll", () => {
        const pageHeight = document.body.offsetHeight;
        sections.forEach((section, index) => {
            if (section.getBoundingClientRect().bottom > pageHeight / 2) {
                navLinks.forEach(link => link.classList.remove(CLASS_NAMES.FOCUSING));
                if (navLinks[index + 1]) {
                    navLinks[index + 1].classList.add(CLASS_NAMES.FOCUSING);
                }
            }
        });
    });
}

export function setupMobileMenu() {
    const navToggle = document.querySelector(SELECTORS.NAV_TOGGLE);
    const navMenu = document.querySelector(SELECTORS.NAV_MENU);
    const navLinks = navMenu.querySelectorAll("a");

    navToggle.addEventListener("click", () => {
        navMenu.classList.toggle(CLASS_NAMES.NAV_MENU_VISIBLE);
        const isVisible = navMenu.classList.contains(CLASS_NAMES.NAV_MENU_VISIBLE);
        navToggle.setAttribute(ATTRIBUTES.ARIA_LABEL, isVisible ? TEXTS.CLOSE_MENU : TEXTS.OPEN_MENU);
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu.classList.contains(CLASS_NAMES.NAV_MENU_VISIBLE)) {
                navMenu.classList.remove(CLASS_NAMES.NAV_MENU_VISIBLE);
                navToggle.setAttribute(ATTRIBUTES.ARIA_LABEL, TEXTS.OPEN_MENU);
            }
        });
    });
}
