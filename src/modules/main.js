import { matrixEffect } from './matrixEffect.js';
import { animateText } from './textAnimation.js';
import { setupSmoothScrolling, setupScrollSpy, setupMobileMenu } from './navigation.js';
import { setupForm } from './formHandler.js';
import { SELECTORS, TEXTS, TIMINGS } from './constants.js';

document.addEventListener("DOMContentLoaded", () => {
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
