import {keyboard} from './keyboard';
import _ from 'lodash';
import config from './config';

export default function animate() {
    // 摄像机旋转
    if(keyboard.z) {
        camera.rotateY(Math.PI/180);
    }
    if(keyboard.x) {
        camera.rotateY(Math.PI/180, true);        
    }
    
    if(ball.position.y <= config.R) {
        // 接触地面
        ball.position.setY(config.R);
        ball.v.setY(0);

        // 地面跳跃
        if(keyboard[' ']) {
            ball.f.add(new THREE.Vector3(0, 1/config.FJ, 0));
        } else {
            // 摩擦力,仅地面存在
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

        // 改变小球速度
        if(keyboard.ArrowUp) {
            ball.f.add(new THREE.Vector3(deltaX, 0, deltaZ));
        }
        if(keyboard.ArrowDown) {
            ball.f.add(new THREE.Vector3(-deltaX, 0, -deltaZ));
        }
        if(keyboard.ArrowLeft) {
            ball.f.add(new THREE.Vector3(deltaZ, 0, -deltaX));
        }
        if(keyboard.ArrowRight) {
            ball.f.add(new THREE.Vector3(-deltaZ, 0, +deltaX));
        }

        // 支持力
        ball.f.add(new THREE.Vector3(0, 1/config.FG, 0));
    }

    // 重力
    ball.f.add(new THREE.Vector3(0, -1/config.FG, 0));

    let a = ball.f.divideScalar(ball.m);
    ball.v.add(a);
    ball.f = new THREE.Vector3(0, 0, 0); 

    // 小球运动
    ball.position.set(ball.position.x + ball.v.x, ball.position.y + ball.v.y, ball.position.z + ball.v.z);
    camera.position.set(camera.position.x + ball.v.x, camera.position.y + ball.v.y, camera.position.z + ball.v.z);

    camera.lookAt(ball.position);
    renderer.render(scene, camera);
    id = requestAnimationFrame(animate);
}
