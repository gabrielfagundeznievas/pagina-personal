import { SELECTORS, COLORS, FONT_STYLES, TIMINGS } from './constants.js';

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

export function matrixEffect() {
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
