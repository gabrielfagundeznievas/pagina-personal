import { matrixEffect } from './matrixEffect.js';
import { animateText } from './textAnimation.js';
import { setupSmoothScrolling, setupScrollSpy, setupMobileMenu } from './navigation.js';
import { setupForm } from './formHandler.js';
import { SELECTORS, TEXTS, TIMINGS } from './constants.js';
import { awaitableDelay } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
    async function init() {
        setInterval(matrixEffect, TIMINGS.MATRIX_INTERVAL);
        await awaitableDelay(TIMINGS.TEXT_ANIMATION_DELAY);
        animateText(TEXTS.GABRIEL, SELECTORS.TITLE_N, 15);
        animateText(TEXTS.FAGUNDEZ, SELECTORS.TITLE_L, 11.8);
        animateText(TEXTS.WEB_DEVELOPER, SELECTORS.SUBTITLE, 5.8);
        
        setupSmoothScrolling();
        setupScrollSpy();
        setupMobileMenu();
        setupForm();
    }

    init();
});
