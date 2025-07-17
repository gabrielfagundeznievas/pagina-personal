import { ANIMATION_CHARS } from './constants.js';

export function animateText(text, selector, interval) {
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
