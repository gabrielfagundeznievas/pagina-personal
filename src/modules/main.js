import { matrixEffect } from './matrixEffect.js';
import { animateText } from './textAnimation.js';
import { setupSmoothScrolling, setupScrollSpy, setupMobileMenu } from './navigation.js';
import { setupForm } from './formHandler.js';
import { SELECTORS, TEXTS, TIMINGS } from './constants.js';
import { awaitableDelay } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
    async function init() {
        setInterval(matrixEffect, TIMINGS.MATRIX_INTERVAL);

        const form = document.querySelector(SELECTORS.FORM);
        if (form) {
            form.reset();
        }
        window.scrollTo(0, 0);

        await awaitableDelay(TIMINGS.TEXT_ANIMATION_DELAY);
        animateText(TEXTS.GABRIEL, SELECTORS.TITLE_N, 11);
        animateText(TEXTS.WEB_DEVELOPER, SELECTORS.SUBTITLE, 3);
        animateText(TEXTS.FAGUNDEZ, SELECTORS.TITLE_L, 8);
        
        setupSmoothScrolling();
        setupScrollSpy();
        setupMobileMenu();
        setupForm();
    }

    init();
});
