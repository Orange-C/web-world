import init from './init'

let singleBtn = document.querySelector('.single-btn');
let doubleBtn = document.querySelector('.double-btn');

singleBtn.addEventListener('click', (e) => {
    document.querySelector('.single-info').style.display = 'block';
    document.querySelector('.double-info').style.display = 'none';
    init('single');
});

doubleBtn.addEventListener('click', (e) => {
    document.querySelector('.single-info').style.display = 'none';
    document.querySelector('.double-info').style.display = 'block';
    init('double');
});