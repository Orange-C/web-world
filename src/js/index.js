import init from './init'

let singleBtn = document.querySelector('.single-btn');
let doubleBtn = document.querySelector('.double-btn');
let resetBtn = document.querySelector('.reset-btn');
let backBtn = document.querySelector('.back-btn');
let singleInfo = document.querySelector('.single-info');
let doubleInfo = document.querySelector('.double-info');

backBtn.addEventListener('click', (e) => {
    window.location.reload();
})

singleBtn.addEventListener('click', (e) => {
    resetBtn.style.display = 'block';
    backBtn.style.display = 'block';
    singleInfo.style.display = 'block';
    doubleInfo.style.display = 'none';
    init('single');
});

doubleBtn.addEventListener('click', (e) => {
    resetBtn.style.display = 'block';
    backBtn.style.display = 'block';
    singleInfo.style.display = 'none';
    doubleInfo.style.display = 'block';
    init('double');
});