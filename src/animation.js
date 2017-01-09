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

        // 改变小球速度
        if(keyboard.ArrowUp) {
            ball.v.x -= camera.position.x / config.VA;
            ball.v.z -= camera.position.z / config.VA;
        }
        if(keyboard.ArrowDown) {
            ball.v.x += camera.position.x / config.VA;
            ball.v.z += camera.position.z / config.VA;
        }
        if(keyboard.ArrowLeft) {
            ball.v.x -= camera.position.z / config.VA;
            ball.v.z += camera.position.x / config.VA;
        }
        if(keyboard.ArrowRight) {
            ball.v.x += camera.position.z / config.VA;
            ball.v.z -= camera.position.x / config.VA;
        }
    } else {
        // 重力
        ball.v.y -= 1 / config.VG;
    }

    // 小球运动
    ball.position.set(ball.position.x + ball.v.x, ball.position.y + ball.v.y, ball.position.z + ball.v.z);
    
    renderer.render(scene, camera);
    id = requestAnimationFrame(animate);
}
