import 'whatwg-fetch';
import '../css/index.less';
import init from './init';
import texture from './texture';

let singleBtn = document.querySelector('.single-btn');
let doubleBtn = document.querySelector('.double-btn');
let resetBtn = document.querySelector('.reset-btn');
let backBtn = document.querySelector('.back-btn');
let singleInfo = document.querySelector('.single-info');
let doubleInfo = document.querySelector('.double-info');
let analyzeBox = document.querySelector('.analyze-box');
let analyzeUrl = document.querySelector('.analyze-url');
let analyzeBtn = document.querySelector('.analyze-btn');
let timeBox = document.querySelector('.time-box');

fetch('http://127.0.0.1:4000').then((res) => {
    if(res.status === 200) {
        analyzeBox.style.display = 'block';
        analyzeBtn.addEventListener('click', (e) => {
            sendUrl()
        })
    }
    // return res.json();
}).then((data) => {
    // console.log(data);
}).catch((err) => {
    console.log(err);
})

function sendUrl() {
    let msg = analyzeUrl.value;
    console.log(msg);
    fetch('http://127.0.0.1:4000/analyze',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: msg
        })
    }).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
        resetBtn.style.display = 'block';
        backBtn.style.display = 'block';
        singleInfo.style.display = 'block';
        doubleInfo.style.display = 'none';
        init('single', data.dom);
    }).catch((err) => {
        console.log(err);
    })
}

texture();

backBtn.addEventListener('click', (e) => {
    window.location.reload();
})

singleBtn.addEventListener('click', (e) => {
    resetBtn.style.display = 'block';
    backBtn.style.display = 'block';
    singleInfo.style.display = 'block';
    doubleInfo.style.display = 'none';
    timeBox.style.display = 'block';
    init('single');
});

doubleBtn.addEventListener('click', (e) => {
    resetBtn.style.display = 'block';
    backBtn.style.display = 'block';
    singleInfo.style.display = 'none';
    doubleInfo.style.display = 'block';
    timeBox.style.display = 'block';
    init('double');
});