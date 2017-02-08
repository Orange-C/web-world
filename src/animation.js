import {keyboard} from './keyboard';
import config from './config';
import {collisionObjs, collisionDetection} from './collision';
import { addV, subtractV } from './tools'


let vDom = document.getElementById('ball-v');

export default function animate() {
    // 摄像机旋转
    if(keyboard[90]) {
        camera.rotateY(Math.PI/180);
    }
    if(keyboard[88]) {
        camera.rotateY(Math.PI/180, true);        
    }
    
    if(ball.isPlane) {
        ball.isPlane = false;

        // 地面跳跃
        if(keyboard[32]) {
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

        let deltaX = (ball.position.x - camera.position.x) / config.FA;
        let deltaZ = (ball.position.z - camera.position.z) / config.FA;

        if(ball.v.length() < 0.8) { // 最大速度
            // 改变小球速度
            if(keyboard[38]) { // up
                ball.f.x += deltaX;
                ball.f.z += deltaZ;
            }
            if(keyboard[40]) { // down
                ball.f.x -= deltaX;
                ball.f.z -= deltaZ;
            }
            if(keyboard[37]) { // left
                ball.f.x += deltaZ;
                ball.f.z -= deltaX;
            }
            if(keyboard[39]) { //right
                ball.f.x -= deltaZ;
                ball.f.z += deltaX;
            }
        }
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

    collisionDetection(ball);

    // 实际加速度
    a = ball.f.divideScalar(ball.m);
    ball.v.add(a);
    ball.f = new THREE.Vector3(0, 0, 0); 

    // 小球运动
    let vNum = ball.v.length().toFixed(2);
    vDom.textContent = vNum;

    ball.position.set(ball.position.x + ball.v.x, ball.position.y + ball.v.y, ball.position.z + ball.v.z);
    camera.position.set(camera.position.x + ball.v.x, camera.position.y + ball.v.y, camera.position.z + ball.v.z);

    camera.lookAt(ball.position);
    renderer.render(scene, camera);
    id = requestAnimationFrame(animate);
}
