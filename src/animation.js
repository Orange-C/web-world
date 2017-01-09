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
            ball.v.y += 1 / config.VH;
        } else {
            // 摩擦力,仅地面存在
            let f = new THREE.Vector3(ball.v.x, 0, ball.v.z);
            f.negate().divideScalar(f.length() * config.VF);
            if(ball.v.length() <= f.length()) {
                ball.v.x = 0;
                ball.v.y = 0;
                ball.v.z = 0;
            } else {
                ball.v = ball.v.add(f);
            }
        }

        let deltaX = (ball.position.x - camera.position.x) / config.VA;
        let deltaZ = (ball.position.z - camera.position.z) / config.VA;

        // 改变小球速度
        if(keyboard.ArrowUp) {
            ball.v.x += deltaX;
            ball.v.z += deltaZ;
        }
        if(keyboard.ArrowDown) {
            ball.v.x -= deltaX;
            ball.v.z -= deltaZ;
        }
        if(keyboard.ArrowLeft) {
            ball.v.x += deltaZ;
            ball.v.z -= deltaX;
        }
        if(keyboard.ArrowRight) {
            ball.v.x -= deltaZ;
            ball.v.z += deltaX;
        }
    } else {
        // 重力
        ball.v.y -= 1 / config.VG;
    }

    // 小球运动
    ball.position.set(ball.position.x + ball.v.x, ball.position.y + ball.v.y, ball.position.z + ball.v.z);
    camera.position.set(camera.position.x + ball.v.x, camera.position.y + ball.v.y, camera.position.z + ball.v.z);

    camera.lookAt(ball.position);
    renderer.render(scene, camera);
    id = requestAnimationFrame(animate);
}
