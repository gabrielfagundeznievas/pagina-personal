export function awaitableDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
