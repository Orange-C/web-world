import {keyboard} from './keyboard';
import config from './config';
import { collisionDetection, BallCollision } from './collision';
import { addV, subtractV } from './utils'

let vDom = document.querySelectorAll('.ball-v');
let vDom2 = document.querySelector('.ball-2-v');
let backBtn = document.querySelector('.back-btn');
let resetBtn = document.querySelector('.reset-btn');
let timeDom = document.querySelector('.time');
let successMask = document.querySelector('.success-mask');
let failMask = document.querySelector('.fail-mask');

export default function animate() {
    if(config.isSingle) {
        // 摄像机旋转
        if(keyboard[79]) {
            config.camera.rotateY(Math.PI/180);
        }
        if(keyboard[80]) {
            config.camera.rotateY(Math.PI/180, true);        
        }
    }

    if(!config.isP) {
        if(config.isSingle) {
            ballVCalc(config.ball[0]);
            collisionDetection(config.ball[0]);
            ballMovement(config.ball[0], vDom[0]);
        } else {
            ballVCalc(config.ball[0], vDom[1]);
            ballVCalc(config.ball[1], vDom2);
            collisionDetection(config.ball[0]);
            collisionDetection(config.ball[1]);
            BallCollision(config.ball[0],config.ball[1]);
            collisionDetection(config.ball[0]);
            collisionDetection(config.ball[1]);
            BallCollision(config.ball[0],config.ball[1]);
            ballMovement(config.ball[0], vDom[1]);
            ballMovement(config.ball[1], vDom2);
        }
    }

    if(config.isSingle) {
        config.camera.lookAt(config.ball[0].position);
    }   

    config.renderer.render(config.scene, config.camera);
    config.id = requestAnimationFrame(animate);
}

function ballVCalc(ball) {
    if(!ball.v.y) {
        // 地面跳跃
        if(keyboard[ball.keyConf[0]]) {
            ball.f.y += 1/config.FJ;
        } else {
            // 摩擦力,仅平面存在
            let f = new THREE.Vector3(ball.v.x, ball.v.y, ball.v.z);
            f.negate().divideScalar(f.length() * config.FF);
            if(ball.v.length() <= f.length()) {
                ball.v.x = 0;
                ball.v.y = 0;
                ball.v.z = 0;
            } else {
                ball.v = ball.v.add(f);
            }
        }
    }

    let deltaX,deltaZ;

    if(config.isSingle) {
        deltaX = (ball.position.x - config.camera.position.x) / config.FA;
        deltaZ = (ball.position.z - config.camera.position.z) / config.FA;
    } else {
        deltaX = -config.camera.position.x / config.FA;
        deltaZ = -config.camera.position.z / config.FA;
    }

    // 改变小球速度
    if(keyboard[ball.keyConf[1]]) { // up
        ball.f.x += deltaX;
        ball.f.z += deltaZ;
    }
    if(keyboard[ball.keyConf[2]]) { // down
        ball.f.x -= deltaX;
        ball.f.z -= deltaZ;
    }
    if(keyboard[ball.keyConf[3]]) { // left
        ball.f.x += deltaZ;
        ball.f.z -= deltaX;
    }
    if(keyboard[ball.keyConf[4]]) { //right
        ball.f.x -= deltaZ;
        ball.f.z += deltaX;
    }

    // 重力
    ball.f.y += -1/config.FG;
    
    // 假设加速度
    let oldF = new THREE.Vector3(ball.f.x, ball.f.y, ball.f.z);
    let a = oldF.divideScalar(ball.m);
    let newV = addV(ball.v, a);

    ball.newP.x = ball.position.x + newV.x;
    ball.newP.y = ball.position.y + newV.y;
    ball.newP.z = ball.position.z + newV.z;
}

function ballMovement(ball, domEl) {
    // 实际加速度
    let a = ball.f.divideScalar(ball.m);
    ball.v.add(a);
    ball.f = new THREE.Vector3(0, 0, 0); 

    // 小球运动
    let vNum = (ball.v.length() * 100).toFixed(0);
    domEl.textContent = vNum;

    if(ball.position.y + ball.v.y < -30) {
        reset(ball)
    } else {
        ball.position.set(ball.position.x + ball.v.x, ball.position.y + ball.v.y, ball.position.z + ball.v.z);
        if(config.isSingle) {
            config.camera.position.set(config.camera.position.x + ball.v.x, config.camera.position.y + ball.v.y, config.camera.position.z + ball.v.z);
        }
    }
}

function reset(ball) {
    failMask.style.display = 'block';
    backBtn.className = 'back-btn back-btn-mask';
    resetBtn.className = 'reset-btn reset-btn-mask';
    // ball.position.set(...ball.initPos);
    // ball.v = new THREE.Vector3(0, 0, 0);
    // if(config.isSingle) {
    //     config.camera.position.set(4*config.focalDistance, 3*config.focalDistance, 5*config.focalDistance);
    // }
    // timer();
}

resetBtn.addEventListener('click', function(config) {
    config.ball.forEach((ball) => {
        ball.position.set(...ball.initPos);
        ball.v = new THREE.Vector3(0, 0, 0);
    })
    if(config.isSingle) {
        config.camera.position.set(4*config.focalDistance, 3*config.focalDistance, 5*config.focalDistance);
    }
    timer();
}.bind(this, config));

function timer() {
    failMask.style.display = 'none';
    successMask.style.display = 'none';
    backBtn.className = 'back-btn';
    resetBtn.className = 'reset-btn';
    config.isP = false;
    if(config.timeID) {
        clearInterval(config.timeID);
    }
    timeDom.textContent = 240;
    config.timeID = setInterval(() => {
        let num = +timeDom.textContent;
        num--;
        if(num == -1) {
            failMask.style.display = 'block';
            backBtn.className = 'back-btn back-btn-mask';
            resetBtn.className = 'reset-btn reset-btn-mask';
            config.isP = true;
        } else {
            timeDom.textContent = num;
        }
    }, 1000)
}
