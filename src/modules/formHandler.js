import { SELECTORS, ATTRIBUTES, CLASS_NAMES, TEXTS, AUDIO_PATHS, FORM_CONFIG, TIMINGS } from './constants.js';

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

export function setupForm() {
    const formButton = document.getElementById(SELECTORS.FORM_BUTTON);
    const form = document.querySelector(SELECTORS.FORM);
    const formFields = document.querySelectorAll(SELECTORS.FORM_FIELDS);
    const consoleContainer = document.querySelector(SELECTORS.CONSOLE_INTER);
    const consoleOutput = document.createElement("p");
    const knockSound = new Audio(AUDIO_PATHS.KNOCK_SOUND);

    consoleOutput.classList.add(CLASS_NAMES.TEXT_CONSOLE);

    function playKnockSound() {
        knockSound.play();
    }

    formButton.addEventListener("click", (event) => {
        event.preventDefault();
        form.style.display = "none";
        consoleContainer.appendChild(consoleOutput);

        typeMessage(`${TEXTS.WAKE_UP}${formFields[0].value}...`, TIMINGS.TYPE_MESSAGE_INTERVAL, consoleOutput);
        setTimeout(() => typeMessage(TEXTS.THE_MATRIX_HAS_YOU, TIMINGS.TYPE_MESSAGE_INTERVAL, consoleOutput), TIMINGS.MATRIX_MESSAGE_DELAY);
        setTimeout(() => typeMessage(`${TEXTS.KNOCK_KNOCK}${formFields[0].value}.`, TIMINGS.TYPE_MESSAGE_INTERVAL, consoleOutput), TIMINGS.KNOCK_MESSAGE_DELAY);
        setTimeout(playKnockSound, TIMINGS.SOUND_PREPARE_DELAY);

        // Manually redirect after the delay
        setTimeout(() => {
            const nextUrlInput = form.querySelector(SELECTORS.NEXT_URL_INPUT);
            if (nextUrlInput && nextUrlInput.value) {
                window.location.href = nextUrlInput.value;
            } else {
                console.error(TEXTS.NEXT_URL_ERROR);
            }
        }, TIMINGS.SUBMIT_FORM_DELAY);
    });
}
