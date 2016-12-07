export var keyboard = {};

export function createEvents() {
    document.addEventListener('keydown', (e) => {
        keyboard[e.key] = true;
        console.log(e.key);
    });
    document.addEventListener('keyup', (e) => {
        keyboard[e.key] = false;
    });
}