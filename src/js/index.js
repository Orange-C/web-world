// import 'whatwg-fetch';
import '../css/index.less';
import init from './init';

let singleBtn = document.querySelector('.single-btn');
let doubleBtn = document.querySelector('.double-btn');
let resetBtn = document.querySelector('.reset-btn');
let backBtn = document.querySelector('.back-btn');
let singleInfo = document.querySelector('.single-info');
let doubleInfo = document.querySelector('.double-info');

// fetch('http://127.0.0.1:4000/analyze_html',{
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         name: '123',
//     })
// }).then((res) => {
//     console.log(res);
// })

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