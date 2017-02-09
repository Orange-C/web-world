import {keyboard} from './keyboard';
import config from './config';
import {collisionObjs, collisionDetection} from './collision';
import { addV, subtractV } from './utils'

let vDom = document.getElementById('ball-v');

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

        let deltaX = (config.ball.position.x - config.camera.position.x) / config.FA;
        let deltaZ = (config.ball.position.z - config.camera.position.z) / config.FA;

        if(config.ball.v.length() < 0.8) { // 最大速度
            // 改变小球速度
            if(keyboard[38]) { // up
                config.ball.f.x += deltaX;
                config.ball.f.z += deltaZ;
            }
            if(keyboard[40]) { // down
                config.ball.f.x -= deltaX;
                config.ball.f.z -= deltaZ;
            }
            if(keyboard[37]) { // left
                config.ball.f.x += deltaZ;
                config.ball.f.z -= deltaX;
            }
            if(keyboard[39]) { //right
                config.ball.f.x -= deltaZ;
                config.ball.f.z += deltaX;
            }
        }
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
        config.ball.position.set(0, 10, 0);
        config.ball.v = new THREE.Vector3(0, 0, 0);
        config.camera.position.set(4*config.focalDistance, 3*config.focalDistance, 5*config.focalDistance);
    } else {
        config.ball.position.set(config.ball.position.x + config.ball.v.x, config.ball.position.y + config.ball.v.y, config.ball.position.z + config.ball.v.z);
        config.camera.position.set(config.camera.position.x + config.ball.v.x, config.camera.position.y + config.ball.v.y, config.camera.position.z + config.ball.v.z);
    }

    config.camera.lookAt(config.ball.position);
    config.renderer.render(config.scene, config.camera);
    config.id = requestAnimationFrame(animate);
}
