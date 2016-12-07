export var keyboard = {};

export function createEvents() {
    document.addEventListener('keydown', (e) => {
        e.preventDefault();
        keyboard[e.key] = true;
        console.log(e.key);
    });
    document.addEventListener('keyup', (e) => {
        e.preventDefault();        
        keyboard[e.key] = false;
    });
}