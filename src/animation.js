import {keyboard} from './keyboard';
import config from './config';
import {collisionObjs, collisionDetection} from './collision';
import { addV, subtractV } from './utils'

let vDom = document.querySelector('.ball-v');
let resetBtn = document.querySelector('.reset-btn');

export default function animate() {
    // 摄像机旋转
    if(keyboard[90]) {
        config.camera.rotateY(Math.PI/180);
    }
    if(keyboard[88]) {
        config.camera.rotateY(Math.PI/180, true);        
    }
    
    if(config.ball.isPlane) {
        config.ball.isPlane = false;

        // 地面跳跃
        if(keyboard[32]) {
            config.ball.f.y += 1/config.FJ;
        } else {
            // 摩擦力,仅平面存在
            let f = new THREE.Vector3(config.ball.v.x, config.ball.v.y, config.ball.v.z);
            f.negate().divideScalar(f.length() * config.FF);
            if(config.ball.v.length() <= f.length()) {
                config.ball.v.x = 0;
                config.ball.v.y = 0;
                config.ball.v.z = 0;
            } else {
                config.ball.v = config.ball.v.add(f);
            }
        }
    }

    let deltaX = (config.ball.position.x - config.camera.position.x) / config.FA;
    let deltaZ = (config.ball.position.z - config.camera.position.z) / config.FA;

    // 改变小球速度
    if(keyboard[87]) { // up
        config.ball.f.x += deltaX;
        config.ball.f.z += deltaZ;
    }
    if(keyboard[83]) { // down
        config.ball.f.x -= deltaX;
        config.ball.f.z -= deltaZ;
    }
    if(keyboard[65]) { // left
        config.ball.f.x += deltaZ;
        config.ball.f.z -= deltaX;
    }
    if(keyboard[68]) { //right
        config.ball.f.x -= deltaZ;
        config.ball.f.z += deltaX;
    }

    // 重力
    config.ball.f.y += -1/config.FG;
    
    // 假设加速度
    let oldF = new THREE.Vector3(config.ball.f.x, config.ball.f.y, config.ball.f.z);
    let a = oldF.divideScalar(config.ball.m);
    let newV = addV(config.ball.v, a);

    config.ball.newP.x = config.ball.position.x + newV.x;
    config.ball.newP.y = config.ball.position.y + newV.y;
    config.ball.newP.z = config.ball.position.z + newV.z;

    collisionDetection(config.ball);

    // 实际加速度
    a = config.ball.f.divideScalar(config.ball.m);
    config.ball.v.add(a);
    config.ball.f = new THREE.Vector3(0, 0, 0); 

    // 小球运动
    let vNum = config.ball.v.length().toFixed(2);
    vDom.textContent = vNum;

    if(config.ball.position.y + config.ball.v.y < -30) {
        reset(config.ball)
    } else {
        config.ball.position.set(config.ball.position.x + config.ball.v.x, config.ball.position.y + config.ball.v.y, config.ball.position.z + config.ball.v.z);
        if(config.isSingle) {
            config.camera.position.set(config.camera.position.x + config.ball.v.x, config.camera.position.y + config.ball.v.y, config.camera.position.z + config.ball.v.z);
        }
    }

    if(config.isSingle) {
        config.camera.lookAt(config.ball.position);
    }    
    config.renderer.render(config.scene, config.camera);
    config.id = requestAnimationFrame(animate);
}

function reset(ball) {
    ball.position.set(0, 10, 0);
    ball.v = new THREE.Vector3(0, 0, 0);
    if(config.isSingle) {
        config.camera.position.set(4*config.focalDistance, 3*config.focalDistance, 5*config.focalDistance);
    }
}

resetBtn.addEventListener('click', reset);
