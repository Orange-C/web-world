import init from './init'


let singleBtn = document.querySelector('.single-btn');
let doubleBtn = document.querySelector('.double-btn');

singleBtn.addEventListener('click', (e) => {
    init('single');
});

doubleBtn.addEventListener('click', (e) => {
    init('double');
});