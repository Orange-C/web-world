export var keyboard = {};

export function createEvents() {
    document.addEventListener('keydown', (e) => {
        e.preventDefault();
        keyboard[e.keyCode] = true;
    });
    document.addEventListener('keyup', (e) => {
        e.preventDefault();        
        keyboard[e.keyCode] = false;
    });
}