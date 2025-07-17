document.addEventListener("DOMContentLoaded", () => {
    // --- Constants ---
    const SELECTORS = {
        CANVAS: "canv",
        HEADER_ANCHORS: "#header a",
        SECTIONS: "section",
        NAV_TOGGLE: ".nav-toggle",
        NAV_MENU: ".nav",
        FORM_BUTTON: "btn",
        FORM: ".form",
        FORM_FIELDS: ".campoField",
        CONSOLE_INTER: ".consoleInter",
        TITLE_N: ".titleN",
        TITLE_L: ".titleL",
        SUBTITLE: ".subtitle",
    };

    const CLASS_NAMES = {
        FOCUSING: "focusing",
        NAV_MENU_VISIBLE: "nav-menu_visible",
        TEXT_CONSOLE: "textConsole",
    };

    const ATTRIBUTES = {
        ARIA_LABEL: "aria-label",
        HREF: "href",
        ACTION: "action",
        METHOD: "method",
    };

    const TEXTS = {
        CLOSE_MENU: "Cerrar menú",
        OPEN_MENU: "Abrir menú",
        WAKE_UP: "Wake up, ",
        THE_MATRIX_HAS_YOU: "The Matrix has you...",
        KNOCK_KNOCK: "Knock, knock, knock, ",
        GABRIEL: "gabriel",
        FAGUNDEZ: "fagundez",
        WEB_DEVELOPER: "desarrollador web",
    };

    const COLORS = {
        BLACK: "#000",
        TRANSPARENT_BLACK: "rgba(0, 0, 0, 0.05)",
        ORANGE: "#ff7300",
    };

    const FONT_STYLES = {
        MATRIX_FONT: "11pt foundationtitleshandmedium",
    };

    const ANIMATION_CHARS = " 0123456789abcdefghijklmnopqrstuvwxyz".split("");

    const AUDIO_PATHS = {
        KNOCK_SOUND: "public/Knock.mp3",
    };

    const FORM_CONFIG = {
        SUBMIT_URL: "https://formsubmit.co/d294e71093c7206943c3e205a62802a3",
        FORM_NAME: "form1",
    };

    const TIMINGS = {
        MATRIX_INTERVAL: 38,
        TEXT_ANIMATION_DELAY: 1500,
        TYPE_MESSAGE_INTERVAL: 100,
        MATRIX_MESSAGE_DELAY: 4000,
        KNOCK_MESSAGE_DELAY: 8000,
        SOUND_PREPARE_DELAY: 9000,
        SUBMIT_FORM_DELAY: 10000,
    };

    // --- Matrix Effect ---
    const canvas = document.getElementById(SELECTORS.CANVAS);
    const ctx = canvas.getContext("2d");
    let canvasWidth, canvasHeight;

    function resizeCanvas() {
        canvasWidth = canvas.width = window.innerWidth;
        canvasHeight = canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    ctx.fillStyle = COLORS.BLACK;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const columns = Math.floor(canvasWidth / 28) + 1;
    const yPositions = Array(columns).fill(0);

    function matrixEffect() {
        ctx.fillStyle = COLORS.TRANSPARENT_BLACK;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = COLORS.ORANGE;
        ctx.font = FONT_STYLES.MATRIX_FONT;

        yPositions.forEach((y, index) => {
            const char = String.fromCharCode(256 * Math.random());
            const x = 28 * index;
            ctx.fillText(char, x, y);

            if (y > 12 + 1e5 * Math.random()) {
                yPositions[index] = 0;
            } else {
                yPositions[index] = y + 17;
            }
        });
    }

    // --- Text Animation ---
    function animateText(text, selector, interval) {
        const element = document.querySelector(selector);
        const textChars = text.split("");
        const charIndexes = textChars.map(char => ANIMATION_CHARS.indexOf(char));
        
        element.textContent = "";
        let currentCharIndex = 0;
        let animationFrame = -1;

        const animationInterval = setInterval(() => {
            animationFrame++;
            let newText = element.textContent.split("");
            newText[currentCharIndex] = ANIMATION_CHARS[animationFrame];
            element.textContent = newText.join("");

            if (animationFrame === charIndexes[currentCharIndex]) {
                currentCharIndex++;
                animationFrame = -1;
            }

            if (currentCharIndex === textChars.length) {
                clearInterval(animationInterval);
            }
        }, interval);
    }

    // --- Navigation ---
    function setupSmoothScrolling() {
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

    function setupScrollSpy() {
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

    function setupMobileMenu() {
        const navToggle = document.querySelector(SELECTORS.NAV_TOGGLE);
        const navMenu = document.querySelector(SELECTORS.NAV_MENU);
        const navLinks = navMenu.querySelectorAll("a"); // 'a' is a tag name, not a magic string in this context

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

    // --- Form Handling ---
    function setupForm() {
        const formButton = document.getElementById(SELECTORS.FORM_BUTTON);
        const form = document.querySelector(SELECTORS.FORM);
        const formFields = document.querySelectorAll(SELECTORS.FORM_FIELDS);
        const consoleContainer = document.querySelector(SELECTORS.CONSOLE_INTER);
        const consoleOutput = document.createElement("p"); // 'p' is a tag name, not a magic string in this context
        const knockSound = new Audio(AUDIO_PATHS.KNOCK_SOUND);

        consoleOutput.classList.add(CLASS_NAMES.TEXT_CONSOLE);

        function typeMessage(message, interval, element) {
            let text = message.split("");
            element.innerHTML = "";
            let charIndex = 0;
            const typingInterval = setInterval(() => {
                element.innerHTML += text[charIndex];
                charIndex++;
                if (charIndex === text.length) {
                    clearInterval(typingInterval);
                }
            }, interval);
        }

        function playKnockSound() {
            knockSound.play();
        }

        function prepareFormForSubmission() {
            form.setAttribute(ATTRIBUTES.ACTION, FORM_CONFIG.SUBMIT_URL);
            form.setAttribute(ATTRIBUTES.METHOD, FORM_CONFIG.METHOD);
        }

        function submitForm() {
            document[FORM_CONFIG.FORM_NAME].submit();
        }

        formButton.addEventListener("click", (event) => {
            event.preventDefault();
            form.style.display = "none"; // 'none' is a CSS value, not a magic string to be extracted
            consoleContainer.appendChild(consoleOutput);

            typeMessage(`${TEXTS.WAKE_UP}${formFields[0].value}...`, TIMINGS.TYPE_MESSAGE_INTERVAL, consoleOutput);
            setTimeout(() => typeMessage(TEXTS.THE_MATRIX_HAS_YOU, TIMINGS.TYPE_MESSAGE_INTERVAL, consoleOutput), TIMINGS.MATRIX_MESSAGE_DELAY);
            setTimeout(() => typeMessage(`${TEXTS.KNOCK_KNOCK}${formFields[0].value}.`, TIMINGS.TYPE_MESSAGE_INTERVAL, consoleOutput), TIMINGS.KNOCK_MESSAGE_DELAY);
            setTimeout(playKnockSound, TIMINGS.SOUND_PREPARE_DELAY);
            setTimeout(prepareFormForSubmission, TIMINGS.SOUND_PREPARE_DELAY);
            setTimeout(submitForm, TIMINGS.SUBMIT_FORM_DELAY);
        });
    }

    // --- Initialization ---
    function init() {
        setInterval(matrixEffect, TIMINGS.MATRIX_INTERVAL);
        setTimeout(() => animateText(TEXTS.GABRIEL, SELECTORS.TITLE_N, 15), TIMINGS.TEXT_ANIMATION_DELAY);
        setTimeout(() => animateText(TEXTS.FAGUNDEZ, SELECTORS.TITLE_L, 11.8), TIMINGS.TEXT_ANIMATION_DELAY);
        setTimeout(() => animateText(TEXTS.WEB_DEVELOPER, SELECTORS.SUBTITLE, 5.8), TIMINGS.TEXT_ANIMATION_DELAY);
        
        setupSmoothScrolling();
        setupScrollSpy();
        setupMobileMenu();
        setupForm();
    }

    init();
});